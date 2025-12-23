# PRD — Site institucional + “Outline Snake (versão errada)” (MVP)

## 1) Contexto e identidade

**Brand cues que vamos “herdar” do Media Kit:**

* Linguagem de **impacto + minimalismo + noturno** (fundo escuro, elementos “neon”, grid/cards).
* Conteúdo-base institucional que já existe: banda fundada em 2021 em Fortaleza, retomada pós-pandemia, etc. 
* Mensagem: conexão com público, carisma, bom humor e energia. 
* Prova de repertório/gêneros (setlist dividido por estilos). 
* Contato e redes: @outlinemusic_ + telefones do material.  

> Observação prática: no MVP, a gente usa o visual “preto + verde neon” e o padrão de cards/bordas do kit. O hex exato do verde você pode **pegar no conta-gotas** do PDF (pra ficar 1:1).

---

## 2) Objetivo do produto (MVP de hoje)

Entregar **um site one-page** com:

1. **Header fixo** com navegação por seções: Datas, Game, Quem Somos, Contatos/Redes.
2. **Jogo da cobrinha** (Snake) como centro do site, com a piada: “come e caga pra ficar maior” (sem lore, sem expor demais integrantes).
3. **Ranking global** + registro mínimo de jogadas.

---

## 3) Métricas de sucesso (pra validar rápido)

* **Play starts** (quantas pessoas iniciam o jogo)
* **Plays concluídos** (game over com score salvo)
* **Tempo médio de sessão**
* **CTR para redes** (cliques em Instagram/WhatsApp/Spotify)
* **Retorno** (usuário jogou 2+ vezes)

---

## 4) Público-alvo / Personas

* **Fã/curioso**: entra pelo Insta, quer entretenimento rápido e datas.
* **Contratante**: quer contato direto e referência de banda (quem somos + repertório “resumo”).
* **Amigo do rolê**: só quer jogar, printar score e mandar no grupo.

---

# Escopo Funcional (Features)

## A) Navegação e Layout (One-page)

### A1. Header fixo

**Requisitos**

* Header fixo no topo, com links âncora:

  * **Datas**
  * **Game**
  * **Quem Somos**
  * **Contato & Redes**
* Estado ativo (scrollspy): destaca seção atual.
* Mobile: vira “menu compacto” (hamburger) ou lista horizontal com scroll.

**Critérios de aceite**

* Clicar no item → scroll suave até seção.
* Header não cobre o título da seção (offset aplicado).
* Em mobile, navegação permanece usável sem quebrar layout.

---

## B) Seção HERO (entrada)

**Objetivo:** dar cara de Outline, sem texto longo.

* Logo/wordmark grande
* CTA primário: **“Jogar agora”** (leva pro Game)
* CTA secundário: **“Ver datas”**

**Aceite**

* A primeira dobra (fold) tem CTA visível (desktop e mobile).
* Visual coerente com o kit (preto + neon + textura leve).

---

## C) Seção GAME — Outline Snake

### C1. Gameplay (MVP)

**Descrição**

* Snake em grid (clássico), com tema Outline.
* “Comida” (ícones): cerveja/palheta/microfone/caixinha/qualquer item idiota.
* Ao comer, a cobra cresce e **o novo segmento aparece como “cocô”** (ou “rastro tosco”), reforçando a piada.
* Colisão: parede ou próprio corpo → game over.

**Controles**

* Desktop: setas + WASD (opcional).
* Mobile: swipe ou D-pad overlay simples.

**Pontuação**

* Score = itens comidos
* Velocidade aumenta a cada N itens (ex.: a cada 5).

**UX do jogo**

* Botão: “Jogar de novo”
* Pause (opcional) via tecla “P” ou botão pequeno.

**Aceite**

* Roda liso a 60fps (ou tick estável) em desktop e aceitável em mobile.
* Controles funcionam sem “input lag”.
* Game over sempre detecta colisão corretamente.

---

### C2. UI do jogo

Componentes:

* Canvas do jogo (responsivo)
* Score atual
* Recorde local (localStorage)
* Ranking global (Top 10)
* CTA: “Compartilhar meu score” (gera texto pronto pra copiar)

**Aceite**

* Ranking carrega em até 1s em rede normal.
* Se ranking falhar, o jogo ainda funciona (graceful degradation).

---

## D) Ranking e Registro (banco de dados)

### D1. Registro de jogada

Campos mínimos:

* score (int)
* nickname (string curta, opcional)
* created_at
* session_id (uuid local)

**Fluxo**

* Game over → modal leve:

  * “Salvar score?”
  * Nickname opcional (default: “Anônimo”)
* Salva no DB e atualiza ranking.

**Aceite**

* Não exige login.
* Não coleta dados sensíveis.
* Não trava o jogo se usuário não quiser salvar.

---

### D2. Anti-abuso (MVP pragmático)

Cheating é inevitável, mas dá pra reduzir:

* score limitado (ex.: 0–500)
* duration_ms mínimo por ponto (heurística simples)
* rate limit por session_id (ex.: 20 submits/h)

**Aceite**

* Submits absurdos são rejeitados (server-side).

---

## E) Seção DATAS

**MVP**

* Lista de próximos shows (0–10 itens).
* Cada item:

  * data (dd/mm/aaaa)
  * local / casa
  * cidade
  * link opcional (Sympla/Instagram)

**Fonte de dados (MVP)**

* **JSON local** versionado no repo (mais rápido hoje).
* Backlog: migrar pra tabela no Supabase com painel admin.

**Aceite**

* Se não houver datas: mensagem “Novas datas em breve”.

---

## F) Quem Somos (resumo)

**MVP copy** derivado do material:

* Fundação/ano/cidade: 2021, Fortaleza. 
* Propósito: experiência, conexão, carisma/bom humor/energia. 
* Gêneros: indie rock/clássicos/pop/grunge/surf/brasilidades. 

**Aceite**

* Texto curto (máx 6–8 linhas).
* 1 foto opcional (otimizada, lazy-load).

---

## G) Contato & Redes

**MVP**

* Instagram: **@outlinemusic_** 
* Telefones conforme material: **+55 85 99904-4016** e **+55 85 99618-8080** 
* Botões: WhatsApp (link direto), Instagram, Spotify/YouTube (se tiver URL)

**Aceite**

* Botões grandes e clicáveis no mobile.
* Copy curta (“Chama.” / “Contato direto.”).

---

# Escopo Não-Objetivo (fora do MVP)

* Discografia completa / blog / loja
* Login/contas de usuário
* Sistema de cadastro de contratante
* Admin panel completo
* Multi-jogos / fases

---

# Detalhamento Técnico (Lovable + Vite)

## 1) Stack recomendada (compatível com Lovable/Vite)

* **Vite + React + TypeScript**
* **TailwindCSS** (pra bater a estética neon fácil)
* **Supabase** (Postgres + RLS) para ranking
* Hospedagem: Vercel/Netlify (o Lovable costuma facilitar deploy)

> Dá pra fazer com JS puro, mas React/TS ajuda a organizar rápido no Lovable sem virar bagunça.

---

## 2) Arquitetura de front-end

### Estrutura de pastas (sugestão)

```txt
src/
  app/
    App.tsx
    routes.ts (opcional, mas one-page pode dispensar)
  components/
    Header.tsx
    Section.tsx
    Hero.tsx
    Dates.tsx
    About.tsx
    Game/
      SnakeGame.tsx
      engine.ts
      renderer.ts
      controls.ts
      ui/
        ScoreBar.tsx
        Leaderboard.tsx
        SubmitScoreModal.tsx
  lib/
    supabaseClient.ts
    analytics.ts (opcional)
    scrollSpy.ts
    session.ts
  data/
    shows.json
  styles/
    globals.css
```

### Padrões (pra não perder tempo)

* Estado do jogo isolado em `engine.ts` (puro, testável).
* Canvas render separado (facilita ajuste visual).
* UI do ranking e modal separado (não mistura regra do jogo com DOM).

---

## 3) Engine do Snake (detalhe suficiente pra implementar sem “inventar”)

### Modelo de jogo

* Grid: `cols x rows` (ex.: 24x24)
* Snake: array de células `{x,y}`
* Direção: `{dx, dy}`
* Food: `{x,y,type}`
* Tick: intervalo base (ex.: 120ms), acelera com score.

### Loop

* A cada tick:

  1. lê input (troca direção com regra anti-reverso)
  2. calcula nova cabeça
  3. checa colisão
  4. checa comida

     * se comeu:

       * score++
       * adiciona segmento (crescimento)
       * dispara “poop effect” (visual)
     * se não comeu:

       * remove cauda
  5. renderiza frame

### Visual “cocô”

MVP simples:

* Cada segmento novo pode renderizar como “💩” ou sprite tosco.
* Ou: cobra normal + “trail” de 💩 (mais engraçado).
* Escolha simples pra hoje: **segmentos = 💩** (imediato e barato).

### Mobile controls

* Swipe: detecta direção dominante do gesto.
* D-pad overlay: 4 botões com `pointerdown`.

---

## 4) Banco de dados (Supabase)

### Tabelas (MVP)

**scores**

* id uuid PK default gen_random_uuid()
* created_at timestamptz default now()
* nickname text null
* score int not null
* duration_ms int null
* session_id uuid not null

### Índices

* index em `score desc, created_at desc`

### Policies (RLS)

* `select` liberado (para leaderboard)
* `insert` permitido com checks:

  * score entre 0 e 500
  * nickname tamanho <= 20
  * rate limit (via trigger ou RPC)

**Sugestão pragmática (boa pra hoje):**

* Criar uma **RPC `submit_score(nickname, score, duration_ms, session_id)`** como `security definer`
* Na função:

  * valida score range
  * valida `duration_ms >= score * X` (ex.: 250ms por ponto)
  * limita submits por session_id por janela de tempo

Isso dá uma blindagem mínima sem exigir autenticação.

---

## 5) Integração front ↔ Supabase

* `GET` leaderboard: `select nickname, score, created_at from scores order by score desc, created_at desc limit 10`
* `POST` submit: chamar RPC `submit_score(...)`

**Falha tolerante**

* Se Supabase cair: o jogo continua, só não salva ranking.

---

## 6) Performance e qualidade (MVP mas decente)

* Canvas dimensionado com **pixel ratio** (evitar borrado em mobile).
* `requestAnimationFrame` só para render; **tick** controlado por timer (estável).
* Lazy-load de imagens (foto da banda).
* `prefers-reduced-motion`: reduzir glitch/anim.

---

# Plano de Execução (hoje, sem viagem)

## Etapa 1 — Base do site (1–2h)

* Setup Lovable Vite (React/TS)
* Tailwind + tokens (preto + neon)
* Header fixo + scroll suave
* Seções vazias (Hero/Game/Datas/Quem Somos/Contato)

## Etapa 2 — Snake jogável (2–4h)

* Engine + canvas render
* Controles desktop + mobile
* UI score + restart

## Etapa 3 — Ranking (1–2h)

* Supabase schema + RLS/RPC
* Modal submit + leaderboard top 10

## Etapa 4 — Polimento (1h)

* Microcopy engraçada
* Ajuste visual “Outline kit”
* Deploy

---

# Prompt para Lovable (copiar e colar)

Use este prompt como briefing único:

```text
Crie um projeto Vite (React + TypeScript) com Tailwind. O site é one-page da banda “Outline”, com estética noturna (fundo escuro) e acentos em verde neon (bordas, hovers, botões). Deve haver um header fixo com navegação por âncoras para as seções: Game, Datas, Quem Somos, Contato & Redes.

Seções:
1) HERO: logo/texto curto + botões “Jogar agora” (scroll para Game) e “Ver datas”.
2) GAME: implementar um jogo Snake em canvas. Tema: “Outline Snake (versão errada)”. Ao comer itens, a cobra cresce; os segmentos do corpo devem ser renderizados como um “rastro tosco”/emoji 💩 para ser engraçado. Controles: setas no desktop + swipe e/ou D-pad no mobile. Mostrar score atual, recorde local (localStorage), botão “Jogar de novo”.
3) LEADERBOARD: top 10 global, carregado do Supabase. Após game over, abrir modal para salvar score com nickname opcional.
4) DATAS: listar shows a partir de um arquivo local data/shows.json (MVP).
5) QUEM SOMOS: texto curto sobre a banda.
6) CONTATO & REDES: botões para Instagram/WhatsApp/Spotify.

Integração Supabase:
- criar client em lib/supabaseClient.ts (via env vars VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY)
- implementar função submitScore chamando uma RPC “submit_score” (se já existir) ou fazer insert direto como fallback (com validações client-side).
- leaderboard: select top 10 (score desc, created_at desc)

Entregar código com components bem separados: Header, Hero, Dates, About, Contact, Game/SnakeGame, Game/engine, Game/controls, Leaderboard.
```

---

# Onde vale mandar pro Cursor (refino)

* Ajustar “scrollspy” do header (ativo por seção).
* Polir engine do Snake (anti-reverso, swipe, aceleração suave).
* Melhorar validação anti-cheat na RPC do Supabase.