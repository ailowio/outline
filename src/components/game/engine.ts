export type Point = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Itens de comida variados para o jogo
export const FOOD_ITEMS = ['🍺', '🎸', '🎤', '🥁', '🎵', '🎹', '🎧', '🎪', '🔥', '⚡'];

export interface GameState {
  snake: Point[];
  food: Point;
  foodType: string; // Emoji do item de comida atual
  direction: Direction;
  isGameOver: boolean;
  score: number;
  speed: number;
}

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 60;
export const SPEED_INCREMENT = 2;

export const getRandomFoodType = (): string => {
  return FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
};

export const createInitialState = (): GameState => ({
  snake: [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ],
  food: { x: 5, y: 5 },
  foodType: getRandomFoodType(),
  direction: 'UP',
  isGameOver: false,
  score: 0,
  speed: INITIAL_SPEED,
});

export const getRandomPoint = (exclude: Point[]): Point => {
  let newPoint: Point;
  const isOccupied = (p: Point) => exclude.some(s => s.x === p.x && s.y === p.y);
  
  do {
    newPoint = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (isOccupied(newPoint));
  
  return newPoint;
};

export const moveSnake = (state: GameState): GameState => {
  if (state.isGameOver) return state;

  const head = state.snake[0];
  const newHead = { ...head };

  switch (state.direction) {
    case 'UP': newHead.y -= 1; break;
    case 'DOWN': newHead.y += 1; break;
    case 'LEFT': newHead.x -= 1; break;
    case 'RIGHT': newHead.x += 1; break;
  }

  // Check wall collision
  if (
    newHead.x < 0 || 
    newHead.x >= GRID_SIZE || 
    newHead.y < 0 || 
    newHead.y >= GRID_SIZE
  ) {
    return { ...state, isGameOver: true };
  }

  // Check self collision
  if (state.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    return { ...state, isGameOver: true };
  }

  const newSnake = [newHead, ...state.snake];

  // Check food collision
  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    const newScore = state.score + 1;
    return {
      ...state,
      snake: newSnake,
      food: getRandomPoint(newSnake),
      foodType: getRandomFoodType(), // Nova comida aleatória
      score: newScore,
      speed: Math.max(MIN_SPEED, INITIAL_SPEED - (newScore * SPEED_INCREMENT)),
    };
  }

  // Remove tail if no food eaten
  newSnake.pop();

  return {
    ...state,
    snake: newSnake,
  };
};

