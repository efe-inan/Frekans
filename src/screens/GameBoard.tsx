import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameConfig, GameState, ClueCard } from "../types";
import { getRandomTarget } from "../gameLogic";

interface GameBoardProps {
  config: GameConfig;
  setGameConfig: (config: GameConfig) => void;
  setGameState: (state: GameState) => void;
}

export default function GameBoard({ config, setGameConfig, setGameState }: GameBoardProps) {
  const [phase, setPhase] = useState<'CLUE' | 'GUESS' | 'REVEAL'>('CLUE');
  const [card, setCard] = useState<ClueCard>(config.cards[Math.floor(Math.random() * config.cards.length)]);
  const [targetValue, setTargetValue] = useState<number>(getRandomTarget());
  const [guessValue, setGuessValue] = useState<number>(0);
  const [clue, setClue] = useState<string>("");
  const [isTargetVisible, setIsTargetVisible] = useState(true);

  const activeTeam = config.teams[config.currentTurn];

  const handleNextTurn = () => {
    // Check if someone won
    if (config.teams.some(team => team.score >= config.targetScore)) {
      setGameState('RESULTS');
      return;
    }
    
    setPhase('CLUE');
    setCard(config.cards[Math.floor(Math.random() * config.cards.length)]);
    setTargetValue(getRandomTarget());
    setGuessValue(0);
    setClue("");
    setIsTargetVisible(true);
    
    setGameConfig({
      ...config,
      currentTurn: (config.currentTurn + 1) % config.teams.length,
      round: config.currentTurn === config.teams.length - 1 ? config.round + 1 : config.round
    });
  };

  const calculateScore = () => {
    const diff = Math.abs(targetValue - guessValue);
    let points = 0;
    if (diff <= 3) points = 4;
    else if (diff <= 8) points = 3;
    else if (diff <= 13) points = 2;
    
    if (points > 0) {
      const newTeams = [...config.teams];
      newTeams[config.currentTurn].score += points;
      setGameConfig({ ...config, teams: newTeams });
    }
  };

  const handleReveal = () => {
    calculateScore();
    setPhase('REVEAL');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-start p-4 md:p-8 relative z-10 min-h-screen"
    >
      
      {/* Scoreboard Header */}
      <motion.header layout className="w-full flex justify-center items-center mb-8 md:mb-16 flex-wrap gap-4 md:gap-8">
        {config.teams.map((team, idx) => {
          const isTurn = config.currentTurn === idx;
          return (
            <motion.div key={idx} layout className={`glass-panel p-3 md:p-4 rounded-xl flex flex-col items-center border-b-4 ${isTurn ? 'border-brand-mustard bg-brand-mustard/10 shadow-[0_0_15px_rgba(216,154,33,0.2)]' : 'border-brand-stone'} min-w-[100px] md:min-w-[140px] transition-all relative`}>
              {isTurn && (
                <div className="absolute -top-2 w-3 h-3 rounded-full bg-brand-mustard shadow-[0_0_10px_rgba(216,154,33,0.8)] animate-pulse" />
              )}
              <span className={`text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 ${isTurn ? 'text-brand-mustard font-bold' : 'opacity-80'}`}>{team.name}</span>
              <motion.div key={team.score} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl md:text-4xl font-display font-bold">{team.score}</motion.div>
            </motion.div>
          );
        })}
      </motion.header>

      {/* Clue Area */}
      <motion.section layout className="w-full max-w-4xl mb-12 flex flex-col items-center gap-6">
        <motion.div layout className="w-full bg-[#B6B0A7] text-[#3D364C] p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 text-center">
              <span className="text-xs font-bold uppercase block mb-1 opacity-60">SOL</span>
              <motion.div key={card.leftConcept} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl font-bold leading-tight">{card.leftConcept}</motion.div>
            </div>
            <div className="w-px h-16 bg-[#3D364C]/20"></div>
            <div className="flex-1 text-center">
              <span className="text-xs font-bold uppercase block mb-1 opacity-60">SAĞ</span>
              <motion.div key={card.rightConcept} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl font-bold leading-tight">{card.rightConcept}</motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
        {phase === 'CLUE' && (
          <motion.div 
            key="clue-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-6 rounded-xl w-full flex flex-col items-center gap-4 relative"
          >
            <button 
              onClick={() => setIsTargetVisible(!isTargetVisible)}
              className="absolute top-4 right-4 bg-brand-base/50 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-base transition-colors border border-brand-stone/20 text-brand-cream/80 hover:text-brand-cream"
            >
              <span className="material-symbols-outlined text-[18px]">{isTargetVisible ? 'visibility_off' : 'visibility'}</span>
              <span className="text-xs uppercase tracking-widest font-bold hidden sm:inline">{isTargetVisible ? 'Hedefi Gizle' : 'Hedefi Göster'}</span>
            </button>
            <h3 className="text-xl font-bold text-brand-cream mt-2">İpucu Belirleme Aşaması</h3>
            <p className="text-center text-sm opacity-80 max-w-md">Medyum hedefi görebilir. Takıma hedefin yerini belli edecek bir ipucu düşünün veya yapay zekadan yardım alın. İpucunu verdikten sonra takım görmeden hedefi gizleyin.</p>
            
            <div className="flex gap-4 w-full max-w-sm mt-2">
              <input 
                type="text" 
                placeholder="İpucunuz..." 
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                className="flex-1 bg-brand-base border border-brand-stone/30 rounded-lg px-4 py-2 focus:outline-none focus:border-brand-coral text-center"
              />
              <button 
                onClick={() => { if(clue) { setPhase('GUESS'); setIsTargetVisible(false); } }}
                className="bg-brand-coral text-brand-base font-bold px-6 py-2 rounded-lg disabled:opacity-50 transition-colors hover:bg-brand-coral/90"
                disabled={!clue}
              >
                ONAYLA
              </button>
            </div>
          </motion.div>
        )}

        {(phase === 'GUESS' || phase === 'REVEAL') && (
          <motion.div 
            key="guess-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel px-8 py-6 rounded-xl text-center border border-brand-coral/30 shadow-[0_0_20px_rgba(229,95,61,0.1)]"
          >
            <span className="text-xs text-brand-coral uppercase tracking-widest font-bold">Verilen İpucu</span>
            <div className="text-3xl font-display font-bold mt-2 text-brand-cream tracking-wide">{clue}</div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.section>

      {/* Wheel Section */}
      <motion.section layout className="relative w-full max-w-[900px] flex items-end justify-center gap-4 md:gap-8 mb-16 mx-auto px-4">
        <div className="pb-8 hidden sm:flex w-8 md:w-12 lg:w-16 justify-end items-end relative h-48">
          <span className="text-sm md:text-base lg:text-xl text-brand-stone uppercase tracking-widest whitespace-nowrap transform -rotate-90 absolute bottom-8 right-0 origin-bottom-right opacity-60">{card.leftConcept}</span>
        </div>

        <div className="relative w-full max-w-[600px] flex flex-col items-center justify-end">
          
          {/* The Wheel Arc */}
          <div className="w-full aspect-[2/1] rounded-t-full overflow-hidden relative bg-[#1a2027] border-2 border-brand-stone/20 shadow-2xl">
            
            {/* Target Zones - Only visible in CLUE or REVEAL phase */}
            <AnimatePresence>
              {((phase === 'CLUE' && isTargetVisible) || phase === 'REVEAL') && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: "50%", rotate: targetValue }}
                  animate={{ opacity: phase === 'CLUE' ? 0.8 : 1, scale: 1, y: "50%", rotate: targetValue }}
                  exit={{ opacity: 0, scale: 0.8, y: "50%", rotate: targetValue }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="absolute bottom-0 left-0 w-full aspect-square"
                >
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" style={{ 
                    background: 'conic-gradient(from -12.5deg at 50% 50%, #77BAB7 0deg 5deg, #1F857C 5deg 10deg, #5F0626 10deg 15deg, #1F857C 15deg 20deg, #77BAB7 20deg 25deg, transparent 25deg)'
                  }} />
                  
                  {/* Score labels */}
                  {[
                    { score: 2, angle: -10 },
                    { score: 3, angle: -5 },
                    { score: 4, angle: 0 },
                    { score: 3, angle: 5 },
                    { score: 2, angle: 10 }
                  ].map(item => (
                    <div 
                      key={item.angle}
                      className="absolute top-1/2 left-1/2 origin-bottom flex justify-center"
                      style={{ 
                        height: '48%', 
                        transform: `translate(-50%, -100%) rotate(${item.angle}deg)`,
                        paddingTop: '2%'
                      }}
                    >
                      <span className="text-brand-cream font-bold text-xs sm:text-base md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90">{item.score}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wheel Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard-flat.png')"}}></div>
            
            {/* Wheel Ticks */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(37)].map((_, i) => {
                const angle = -90 + i * 5;
                const isMajor = i % 3 === 0;
                return (
                  <div 
                    key={i} 
                    className="absolute bottom-0 left-1/2 origin-bottom flex justify-center"
                    style={{ 
                      height: '100%', 
                      transform: `translateX(-50%) rotate(${angle}deg)` 
                    }}
                  >
                    <div className={`bg-brand-stone/40 rounded-b-full ${isMajor ? 'w-[2px] h-4 sm:h-6' : 'w-px h-2 sm:h-3'}`}></div>
                  </div>
                );
              })}
            </div>
            
            {/* Center Hub Decor */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-brand-base rounded-t-full border-t border-brand-stone/30 z-20"></div>
          </div>

          {/* Needle */}
          <motion.div 
            className="absolute bottom-0 left-1/2 w-2 h-[85%] bg-brand-coral rounded-full shadow-[0_0_15px_rgba(229,95,61,0.6)] z-30 origin-bottom"
            animate={{ rotate: guessValue }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            style={{ x: "-50%" }}
          >
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-coral border-[6px] border-brand-base shadow-lg"></div>
          </motion.div>

          {/* Range Input for Guessing */}
          {phase === 'GUESS' && (
            <input 
              type="range" 
              min="-85" 
              max="85" 
              value={guessValue}
              onChange={(e) => setGuessValue(parseInt(e.target.value))}
              className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer z-40"
            />
          )}
        </div>

        <div className="pb-8 hidden sm:flex w-8 md:w-12 lg:w-16 justify-start items-end relative h-48">
          <span className="text-sm md:text-base lg:text-xl text-brand-stone uppercase tracking-widest whitespace-nowrap transform rotate-90 absolute bottom-8 left-0 origin-bottom-left opacity-60">{card.rightConcept}</span>
        </div>
      </motion.section>

      {/* Action Buttons */}
      <motion.section layout className="w-full max-w-2xl flex flex-col sm:flex-row justify-center gap-4 mt-auto">
        <AnimatePresence mode="popLayout">
          {phase === 'GUESS' && (
            <motion.button 
              key="btn-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReveal}
              className="flex-1 bg-brand-coral text-brand-base font-bold py-4 px-6 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(229,95,61,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">analytics</span>
              SONUCU GÖSTER
            </motion.button>
          )}
          
          {phase === 'REVEAL' && (
            <motion.button 
              key="btn-next"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextTurn}
              className="flex-1 bg-brand-mustard text-brand-base font-bold py-4 px-6 rounded-lg uppercase tracking-widest hover:shadow-[0_0_20px_rgba(216,154,33,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">forward</span>
              SONRAKİ TUR
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>
      
    </motion.div>
  );
}
