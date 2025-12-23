export interface ScoreRecord {
  id: number;
  nickname: string;
  score: number;
  createdAt: string;
}

// Chave de armazenamento local para os scores
const STORAGE_KEY = 'outline_snake_scores';

// Fallback usando localStorage com JSON
function saveScoreFallback(nickname: string, score: number): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  } catch (err: unknown) {
    console.error('[scoreDb] Erro no saveScore', err);
    throw err;
  }
}

function getTopScoresFallback(limit = 10): ScoreRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const scores: ScoreRecord[] = JSON.parse(saved);
    return scores.slice(0, limit);
  } catch (err: unknown) {
    console.error('[scoreDb] Erro no getTopScores', err);
    return [];
  }
}

export async function saveScore(nickname: string, score: number): Promise<void> {
  if (!Number.isFinite(score) || score <= 0) return;
  saveScoreFallback(nickname, score);
}

export async function getTopScores(limit = 10): Promise<ScoreRecord[]> {
  return getTopScoresFallback(limit);
}
