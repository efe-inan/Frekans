import { motion } from "motion/react";
import { GameConfig, GameState } from "../types";

interface ResultsProps {
  config: GameConfig;
  setGameState: (state: GameState) => void;
  setGameConfig: (config: GameConfig) => void;
}

export default function Results({ config, setGameState, setGameConfig }: ResultsProps) {
  const sortedTeams = [...config.teams].sort((a, b) => b.score - a.score);
  const highestScore = sortedTeams[0].score;
  const winners = sortedTeams.filter(t => t.score === highestScore);
  const isTie = winners.length > 1;

  const handleRestart = () => {
    setGameConfig({
      ...config,
      teams: config.teams.map(t => ({ ...t, score: 0 })),
      currentTurn: 0,
      round: 1
    });
    setGameState('PLAYING');
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 relative z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="mb-4">
          <span className="text-xs text-brand-mustard tracking-[0.2em] bg-brand-mustard/10 px-4 py-1 rounded-full uppercase font-bold border border-brand-mustard/20">
            FİNAL SONUÇLARI
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-cream leading-tight mt-6 mb-2 uppercase">
          {isTie ? "BERABERE!" : `${winners[0].name.toUpperCase()} KAZANDI`}
        </h1>
        <p className="text-lg text-brand-cream/80 mt-4">
          {isTie ? "Spektrumda tam bir denge sağlandı." : "Spektrum boyunca kesin bir zafer."}
        </p>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sortedTeams.map((team, index) => {
          const isWinner = team.score === highestScore;
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: isWinner ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className={`glass-panel p-8 rounded-xl ring-2 ${isWinner && !isTie ? 'ring-brand-coral/50 shadow-[0_0_30px_rgba(229,95,61,0.2)]' : (isTie && isWinner ? 'ring-brand-cream/50' : 'border border-brand-cream/10 ring-0')} relative overflow-hidden flex flex-col gap-6`}
            >
              {isWinner && !isTie && (
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <span className="material-symbols-outlined text-[64px] text-brand-coral">emoji_events</span>
                </div>
              )}
              
              <div className="flex justify-between items-end mb-4 relative z-10">
                <div>
                  <span className={`text-xs uppercase tracking-widest font-bold ${isWinner && !isTie ? 'text-brand-coral' : 'text-brand-cream/60'}`}>
                    {isWinner ? (isTie ? 'KAZANAN' : 'BİRİNCİ') : `${index + 1}. SIRA`}
                  </span>
                  <h3 className="text-3xl font-bold text-brand-cream mt-1">{team.name}</h3>
                </div>
                <div className="text-right">
                  <div className={`text-[56px] font-display leading-none font-bold ${isWinner && !isTie ? 'text-brand-coral' : 'text-brand-cream/60'}`}>{team.score}</div>
                  <div className="text-xs text-brand-cream/60 uppercase tracking-widest mt-1 font-bold">PUAN</div>
                </div>
              </div>
              
              <div className="w-full bg-brand-base/50 rounded-full h-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (team.score / config.targetScore) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  className={`${isWinner && !isTie ? 'bg-brand-coral shadow-[0_0_10px_rgba(229,95,61,0.6)]' : 'bg-brand-cream/40'} h-3 rounded-full`} 
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 relative z-20"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
          className="bg-brand-coral text-brand-base rounded-lg text-xl transition-shadow hover:shadow-[0_0_20px_rgba(229,95,61,0.4)] flex items-center justify-center gap-2 px-8 py-4 uppercase font-bold"
        >
          <span className="material-symbols-outlined">replay</span>
          YENİDEN OYNA
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameState('LANDING')}
          className="bg-transparent border-2 border-brand-mustard text-brand-mustard rounded-lg text-xl transition-colors hover:bg-brand-mustard/10 flex items-center justify-center gap-2 px-8 py-4 uppercase font-bold"
        >
          <span className="material-symbols-outlined">home</span>
          ANA MENÜ
        </motion.button>
      </motion.div>

    </div>
  );
}
