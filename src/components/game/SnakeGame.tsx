import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameState, createInitialState, moveSnake, Direction } from './engine';
import { drawGame } from './renderer';
import CharacterSelector, { Integrante, integrantes } from './CharacterSelector';
import { imageCache } from './imageCache';

// Pré-carregar todas as caricaturas
const preloadImages = () => {
  integrantes.forEach(integrante => {
    if (!imageCache.has(integrante.id)) {
      const img = new Image();
      img.src = integrante.image;
      img.onload = () => {
        imageCache.set(integrante.id, img);
      };
      img.onerror = () => {
        // Fallback para logo se caricatura falhar
        const fallbackImg = new Image();
        fallbackImg.src = '/logo.svg';
        fallbackImg.onload = () => {
          imageCache.set(integrante.id, fallbackImg);
        };
      };
    }
  });
};

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedIntegrante, setSelectedIntegrante] = useState<Integrante | null>(null);
  const [state, setState] = useState<GameState>(createInitialState());
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem('outline_snake_highscore') || 0)
  );
  
  const requestRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  
  // Pré-carregar imagens ao montar o componente
  useEffect(() => {
    preloadImages();
  }, []);
  
  // Exportar cache para o renderer
  useEffect(() => {
    // Sincronizar cache com o renderer
    const syncCache = () => {
      integrantes.forEach(integrante => {
        const domImg = document.querySelector(`img[data-integrante="${integrante.id}"]`) as HTMLImageElement;
        if (domImg && domImg.complete && !imageCache.has(integrante.id)) {
          imageCache.set(integrante.id, domImg);
        }
      });
    };
    
    // Sincronizar periodicamente enquanto o seletor está visível
    const interval = setInterval(syncCache, 100);
    return () => clearInterval(interval);
  }, [selectedIntegrante]);

  const setDirection = (newDir: Direction) => {
    setState(prev => {
      if (newDir === 'UP' && prev.direction === 'DOWN') return prev;
      if (newDir === 'DOWN' && prev.direction === 'UP') return prev;
      if (newDir === 'LEFT' && prev.direction === 'RIGHT') return prev;
      if (newDir === 'RIGHT' && prev.direction === 'LEFT') return prev;
      return { ...prev, direction: newDir };
    });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'ArrowUp') setDirection('UP');
    if (key === 'ArrowDown') setDirection('DOWN');
    if (key === 'ArrowLeft') setDirection('LEFT');
    if (key === 'ArrowRight') setDirection('RIGHT');
  }, []);

  const resetGame = () => {
    setState(createInitialState());
  };

  const update = useCallback((time: number) => {
    if (!selectedIntegrante) return;
    
    if (lastUpdateTimeRef.current === 0) {
      lastUpdateTimeRef.current = time;
    }

    const deltaTime = time - lastUpdateTimeRef.current;

    if (deltaTime > state.speed && !state.isGameOver) {
      setState(prev => {
        if (prev.isGameOver) return prev;
        const newState = moveSnake(prev);
        if (newState.isGameOver && newState.score > highScore) {
          setHighScore(newState.score);
          localStorage.setItem('outline_snake_highscore', String(newState.score));
        }
        return newState;
      });
      lastUpdateTimeRef.current = time;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawGame(ctx, state, canvas.width, canvas.height, selectedIntegrante || undefined);
      }
    }

    requestRef.current = requestAnimationFrame(update);
  }, [state, highScore, selectedIntegrante]);

  useEffect(() => {
    if (!selectedIntegrante) return;
    
    window.addEventListener('keydown', handleKeyDown);
    requestRef.current = requestAnimationFrame(update);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [update, handleKeyDown, selectedIntegrante]);

  // Show character selector if no integrante selected
  if (!selectedIntegrante) {
    return (
      <div className="flex flex-col items-center w-full">
        <CharacterSelector onSelect={(integrante) => {
          setSelectedIntegrante(integrante);
          // Reset game state when integrante is selected
          setState(createInitialState());
          lastUpdateTimeRef.current = 0;
        }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Jogando como</p>
        <p className="text-lg font-black text-neon">{selectedIntegrante.name}</p>
        <button
          onClick={() => setSelectedIntegrante(null)}
          className="mt-2 text-xs text-gray-600 hover:text-outline-neon transition-colors"
        >
          Trocar personagem
        </button>
      </div>
      
      <div className="flex justify-between w-full max-w-md mb-4 px-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</span>
          <span className="text-2xl font-black text-neon">{state.score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Best</span>
          <span className="text-2xl font-black text-white">{highScore}</span>
        </div>
      </div>

      <div className="relative group w-full max-w-[600px] mx-auto">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full h-auto border-2 border-outline-neon/20 rounded-sm shadow-[0_0_30px_rgba(57,255,20,0.05)] bg-black"
        />
        
        {state.isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="pointer-events-auto mt-24 px-8 py-3 bg-outline-neon text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button 
          onPointerDown={() => setDirection('UP')}
          className="w-16 h-16 bg-outline-black border-2 border-outline-neon/20 rounded-xl flex items-center justify-center active:bg-outline-neon active:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <div />
        
        <button 
          onPointerDown={() => setDirection('LEFT')}
          className="w-16 h-16 bg-outline-black border-2 border-outline-neon/20 rounded-xl flex items-center justify-center active:bg-outline-neon active:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onPointerDown={() => setDirection('DOWN')}
          className="w-16 h-16 bg-outline-black border-2 border-outline-neon/20 rounded-xl flex items-center justify-center active:bg-outline-neon active:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onPointerDown={() => setDirection('RIGHT')}
          className="w-16 h-16 bg-outline-black border-2 border-outline-neon/20 rounded-xl flex items-center justify-center active:bg-outline-neon active:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="mt-6 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
        Use as setas para controlar • Colete os itens 🍺🎸🎤🥁 e deixe o rastro de 💩
      </p>
    </div>
  );
};

export default SnakeGame;

