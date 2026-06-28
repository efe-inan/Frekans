export type GameState = 'LANDING' | 'SETUP' | 'PLAYING' | 'RESULTS' | 'PRIVACY' | 'TERMS' | 'ABOUT';

export type TeamInfo = {
  name: string;
  score: number;
};

export type GameConfig = {
  teams: TeamInfo[];
  targetScore: number;
  currentTurn: number;
  round: number;
  cards: ClueCard[];
};

export type ClueCard = {
  id: string;
  leftConcept: string;
  rightConcept: string;
};
