import React from 'react';
import type { ScoreRecord } from '../../lib/scoreDb';

interface RankingProps {
  scores: ScoreRecord[];
}

const Ranking: React.FC<RankingProps> = ({ scores }) => {
  if (!scores.length) {
    return (
      <div className="mt-8 w-full max-w-md mx-auto text-center text-xs text-gray-600">
        Nenhum score salvo ainda. Jogue e salve sua pontuação para aparecer aqui.
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500 mb-3">
        Ranking Local
      </h3>
      <div className="border border-outline-neon/20 bg-outline-black/60 rounded-md overflow-hidden text-xs">
        <div className="grid grid-cols-[32px,1fr,60px] px-4 py-2 bg-outline-black/80 text-gray-400 font-semibold uppercase tracking-widest">
          <span>#</span>
          <span>Nome</span>
          <span className="text-right">Score</span>
        </div>
        <div>
          {scores.map((score, index) => (
            <div
              key={score.id ?? index}
              className="grid grid-cols-[32px,1fr,60px] px-4 py-2 border-t border-outline-neon/10 bg-black/40"
            >
              <span className="text-gray-500 font-semibold">{index + 1}</span>
              <span className="text-gray-200 truncate">{score.nickname}</span>
              <span className="text-outline-neon font-bold text-right">
                {score.score}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-gray-600">
        Ranking salvo apenas neste navegador (não é global).
      </p>
    </div>
  );
};

export default Ranking;


