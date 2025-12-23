import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

export interface ScoreRecord {
  id: number;
  nickname: string;
  score: number;
  createdAt: string;
}

// Chave de armazenamento local do banco serializado
const STORAGE_KEY = 'outline_snake_sqlite_db';
const FALLBACK_STORAGE_KEY = 'outline_snake_scores_fallback';

let SQLPromise: Promise<SqlJsStatic> | null = null;
let dbInstance: Database | null = null;
let initError: Error | null = null;
let useFallback = false;

function loadFromLocalStorage(): Uint8Array | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const binaryString = atob(saved);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (err) {
    console.error('[scoreDb] Erro ao carregar DB do localStorage', err);
    return null;
  }
}

function saveToLocalStorage(db: Database) {
  try {
    const data = db.export();
    let binaryString = '';
    for (let i = 0; i < data.length; i++) {
      binaryString += String.fromCharCode(data[i]);
    }
    const base64 = btoa(binaryString);
    localStorage.setItem(STORAGE_KEY, base64);
  } catch (err) {
    console.error('[scoreDb] Erro ao salvar DB no localStorage', err);
  }
}

async function getDb(): Promise<Database> {
  if (useFallback) {
    throw new Error('Usando fallback, SQLite não disponível');
  }

  if (initError) {
    useFallback = true;
    throw initError;
  }

  if (!SQLPromise) {
    SQLPromise = initSqlJs({
      // Tenta múltiplos caminhos para o arquivo WASM
      locateFile: (file: string) => {
        // Primeiro tenta CDN
        if (file.endsWith('.wasm')) {
          return `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/${file}`;
        }
        return file;
      },
    }).catch((err) => {
      console.error('[scoreDb] Erro ao inicializar sql.js, usando fallback', err);
      initError = err;
      useFallback = true;
      throw err;
    });
  }

  try {
    const SQL = await SQLPromise;

    if (!dbInstance) {
      try {
        const saved = loadFromLocalStorage();
        if (saved && saved.length > 0) {
          dbInstance = new SQL.Database(saved);
        } else {
          dbInstance = new SQL.Database();
        }
        dbInstance.exec(`
          CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname TEXT NOT NULL,
            score INTEGER NOT NULL,
            created_at TEXT NOT NULL
          );
        `);
        saveToLocalStorage(dbInstance);
      } catch (err) {
        console.error('[scoreDb] Erro ao criar/restaurar DB', err);
        // Tenta criar um novo banco em memória
        dbInstance = new SQL.Database();
        dbInstance.exec(`
          CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname TEXT NOT NULL,
            score INTEGER NOT NULL,
            created_at TEXT NOT NULL
          );
        `);
      }
    }

    return dbInstance;
  } catch (err) {
    console.error('[scoreDb] Erro fatal ao obter DB', err);
    throw err;
  }
}

// Fallback usando localStorage com JSON
function saveScoreFallback(nickname: string, score: number): void {
  try {
    const saved = localStorage.getItem(FALLBACK_STORAGE_KEY);
    const scores: ScoreRecord[] = saved ? JSON.parse(saved) : [];
    const newScore: ScoreRecord = {
      id: Date.now(),
      nickname: nickname || 'Anônimo',
      score,
      createdAt: new Date().toISOString(),
    };
    scores.push(newScore);
    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    // Mantém apenas os top 100
    const topScores = scores.slice(0, 100);
    localStorage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(topScores));
  } catch (err) {
    console.error('[scoreDb] Erro no fallback saveScore', err);
    throw err;
  }
}

function getTopScoresFallback(limit = 10): ScoreRecord[] {
  try {
    const saved = localStorage.getItem(FALLBACK_STORAGE_KEY);
    if (!saved) return [];
    const scores: ScoreRecord[] = JSON.parse(saved);
    return scores.slice(0, limit);
  } catch (err) {
    console.error('[scoreDb] Erro no fallback getTopScores', err);
    return [];
  }
}

export async function saveScore(nickname: string, score: number): Promise<void> {
  if (!Number.isFinite(score) || score <= 0) return;

  if (useFallback) {
    saveScoreFallback(nickname, score);
    return;
  }

  try {
    const db = await getDb();
    const nowIso = new Date().toISOString();

    db.run(
      'INSERT INTO scores (nickname, score, created_at) VALUES (?, ?, ?);',
      [nickname || 'Anônimo', score, nowIso]
    );

    saveToLocalStorage(db);
  } catch (err) {
    console.warn('[scoreDb] Erro ao salvar com SQLite, usando fallback', err);
    useFallback = true;
    saveScoreFallback(nickname, score);
  }
}

export async function getTopScores(limit = 10): Promise<ScoreRecord[]> {
  if (useFallback) {
    return getTopScoresFallback(limit);
  }

  try {
    const db = await getDb();

    const stmt = db.prepare(
      'SELECT id, nickname, score, created_at FROM scores ORDER BY score DESC, datetime(created_at) DESC LIMIT ?;'
    );

    const result: ScoreRecord[] = [];
    stmt.bind([limit]);

    while (stmt.step()) {
      const row = stmt.getAsObject() as {
        id: number;
        nickname: string;
        score: number;
        created_at: string;
      };
      result.push({
        id: row.id,
        nickname: row.nickname,
        score: row.score,
        createdAt: row.created_at,
      });
    }

    stmt.free();
    return result;
  } catch (err) {
    console.warn('[scoreDb] Erro ao ler com SQLite, usando fallback', err);
    useFallback = true;
    return getTopScoresFallback(limit);
  }
}


