/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Landing from './screens/Landing';
import Setup from './screens/Setup';
import GameBoard from './screens/GameBoard';
import Results from './screens/Results';
import About from './screens/About';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import { GameState, GameConfig } from './types';

import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LANDING');
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-cream relative overflow-x-hidden cosmic-gradient selection:bg-brand-mustard/30">
      <Navigation setGameState={setGameState} gameState={gameState} />
      
      <main className="flex-1 flex flex-col items-center w-full relative z-10">
        <AnimatePresence mode="wait">
          {gameState === 'LANDING' && (
            <motion.div key="landing" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Landing setGameState={setGameState} />
            </motion.div>
          )}
          {gameState === 'SETUP' && (
            <motion.div key="setup" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Setup setGameState={setGameState} setGameConfig={setGameConfig} />
            </motion.div>
          )}
          {gameState === 'PLAYING' && gameConfig && (
            <motion.div key="gameboard" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GameBoard 
                config={gameConfig} 
                setGameConfig={setGameConfig} 
                setGameState={setGameState} 
              />
            </motion.div>
          )}
          {gameState === 'RESULTS' && gameConfig && (
            <motion.div key="results" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Results 
                config={gameConfig} 
                setGameState={setGameState} 
                setGameConfig={setGameConfig} 
              />
            </motion.div>
          )}
          {gameState === 'ABOUT' && (
            <motion.div key="about" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <About />
            </motion.div>
          )}
          {gameState === 'PRIVACY' && (
            <motion.div key="privacy" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Privacy />
            </motion.div>
          )}
          {gameState === 'TERMS' && (
            <motion.div key="terms" className="w-full h-full flex flex-col flex-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Terms />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setGameState={setGameState} />
    </div>
  );
}
