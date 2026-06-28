import { motion } from "motion/react";
import { GameState } from "../types";

interface NavigationProps {
  setGameState: (state: GameState) => void;
  gameState: GameState;
}

export default function Navigation({ setGameState, gameState }: NavigationProps) {
  return (
    <nav className="bg-brand-base/80 backdrop-blur-xl sticky top-0 z-50 border-b border-brand-cream/10 flex justify-between items-center w-full px-8 py-4">
      <div 
        className="font-display text-2xl md:text-3xl font-extrabold text-brand-coral tracking-tighter cursor-pointer flex items-center gap-2"
        onClick={() => setGameState('LANDING')}
      >
        <svg className="text-brand-coral" fill="none" height="32" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="32">
          <path d="M2 12C2 12 5 4 12 12C19 20 22 12 22 12"></path>
          <path d="M6 12L10 20L14 4L18 12" opacity="0.7" strokeWidth="1.5"></path>
        </svg>
        FREKANS
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <button 
          onClick={() => setGameState('LANDING')}
          className={`font-label-sm uppercase tracking-widest transition-colors duration-300 hover:text-brand-coral ${gameState === 'LANDING' ? 'text-brand-coral font-bold' : 'text-brand-cream/80'}`}
        >
          Nasıl Oynanır
        </button>
        <button 
          onClick={() => setGameState('SETUP')}
          className={`font-label-sm uppercase tracking-widest transition-colors duration-300 hover:text-brand-coral ${gameState === 'SETUP' ? 'text-brand-coral font-bold border-b-2 border-brand-coral pb-1' : 'text-brand-cream/80'}`}
        >
          Oda Kur
        </button>
      </div>
    </nav>
  );
}
