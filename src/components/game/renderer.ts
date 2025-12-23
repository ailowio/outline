import { GameState, GRID_SIZE, Direction } from './engine';
import { Integrante } from './CharacterSelector';
import { imageCache } from './imageCache';

// Função para obter o ângulo de rotação baseado na direção
const getRotationAngle = (direction: Direction): number => {
  switch (direction) {
    case 'UP': return 0; // 0 graus (para cima)
    case 'RIGHT': return Math.PI / 2; // 90 graus (para direita)
    case 'DOWN': return Math.PI; // 180 graus (para baixo)
    case 'LEFT': return -Math.PI / 2; // -90 graus (para esquerda)
  }
};

export const getCachedImage = (integranteId: string, imageSrc: string): HTMLImageElement | null => {
  // Try cache first
  if (imageCache.has(integranteId)) {
    const cached = imageCache.get(integranteId)!;
    if (cached.complete && cached.naturalWidth > 0) {
      return cached;
    }
  }
  
  // Try DOM element
  const domImg = document.querySelector(`img[data-integrante="${integranteId}"]`) as HTMLImageElement;
  if (domImg && domImg.complete && domImg.naturalWidth > 0) {
    imageCache.set(integranteId, domImg);
    return domImg;
  }
  
  // Try to create new image (if already loaded by browser)
  const newImg = new Image();
  newImg.src = imageSrc;
  if (newImg.complete && newImg.naturalWidth > 0) {
    imageCache.set(integranteId, newImg);
    return newImg;
  }
  
  return null;
};

export const drawGame = (
  ctx: CanvasRenderingContext2D, 
  state: GameState, 
  width: number, 
  height: number,
  integrante?: Integrante
) => {
  const cellSize = width / GRID_SIZE;

  // Clear canvas
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, width, height);

  // Draw grid (optional, very subtle)
  ctx.strokeStyle = 'rgba(57, 255, 20, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(width, i * cellSize);
    ctx.stroke();
  }

  // Draw Food (varied items)
  ctx.font = `${cellSize * 0.8}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    state.foodType, 
    state.food.x * cellSize + cellSize / 2, 
    state.food.y * cellSize + cellSize / 2
  );

  // Draw Snake
  state.snake.forEach((segment, index) => {
    const isHead = index === 0;
    
    if (isHead) {
      // Draw head - Use integrante image if available, otherwise neon square
      if (integrante) {
        const headSize = cellSize * 1.0; // Aumentado de 0.9 para 1.0 para melhor visibilidade
        const centerX = segment.x * cellSize + cellSize / 2;
        const centerY = segment.y * cellSize + cellSize / 2;
        
        // Get cached image
        const img = getCachedImage(integrante.id, integrante.image);
        
        if (img && img.complete && img.naturalWidth > 0) {
          // Save context for rotation
          ctx.save();
          
          // Translate to center of cell for rotation
          ctx.translate(centerX, centerY);
          
          // Rotate based on direction
          const angle = getRotationAngle(state.direction);
          ctx.rotate(angle);
          
          // Draw with glow effect (rotated)
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#39FF14';
          ctx.drawImage(
            img, 
            -headSize / 2, // Offset to center
            -headSize / 2, // Offset to center
            headSize, 
            headSize
          );
          ctx.shadowBlur = 0;
          
          // Restore context
          ctx.restore();
        } else {
          // Fallback: Neon green square (also rotated)
          ctx.save();
          ctx.translate(centerX, centerY);
          const angle = getRotationAngle(state.direction);
          ctx.rotate(angle);
          
          ctx.fillStyle = '#39FF14';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#39FF14';
          ctx.fillRect(
            -headSize / 2 + 2, 
            -headSize / 2 + 2, 
            headSize - 4, 
            headSize - 4
          );
          ctx.shadowBlur = 0;
          ctx.restore();
        }
      } else {
        // Fallback: Neon green square (also rotated)
        const centerX = segment.x * cellSize + cellSize / 2;
        const centerY = segment.y * cellSize + cellSize / 2;
        const headSize = cellSize * 1.0;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        const angle = getRotationAngle(state.direction);
        ctx.rotate(angle);
        
        ctx.fillStyle = '#39FF14';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#39FF14';
        ctx.fillRect(
          -headSize / 2 + 2, 
          -headSize / 2 + 2, 
          headSize - 4, 
          headSize - 4
        );
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    } else {
      // Draw body - 💩 Emoji as requested in PRD
      ctx.font = `${cellSize * 0.7}px Arial`;
      ctx.fillText(
        '💩', 
        segment.x * cellSize + cellSize / 2, 
        segment.y * cellSize + cellSize / 2
      );
    }
  });

  // Game Over Overlay
  if (state.isGameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#39FF14';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('GAME OVER', width / 2, height / 2 - 20);
    
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${state.score}`, width / 2, height / 2 + 20);
  }
};

