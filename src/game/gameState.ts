export interface GameState {
  level: number;
  health: number;
  score: number;
  isGameOver: boolean;
}

export const initialGameState: GameState = {
  level: 1,
  health: 5, // 5 hearts
  score: 0,
  isGameOver: false,
};
