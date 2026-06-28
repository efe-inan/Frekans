import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameConfig, GameState, ClueCard, TeamInfo } from "../types";
import { CARDS, CARDS_PLUS } from "../gameLogic";
import { Plus, X } from "lucide-react";

interface SetupProps {
  setGameState: (state: GameState) => void;
  setGameConfig: (config: GameConfig) => void;
}

export default function Setup({ setGameState, setGameConfig }: SetupProps) {
  const [teams, setTeams] = useState<TeamInfo[]>([
    { name: "Takım Alpha", score: 0 },
    { name: "Takım Omega", score: 0 }
  ]);
  const [targetScore, setTargetScore] = useState(10);
  const [deckType, setDeckType] = useState<"GENEL" | "GENEL+" | "OZEL">("GENEL");
  const [customDeckText, setCustomDeckText] = useState("");

  const handleStart = () => {
    let selectedCards: ClueCard[] = [...CARDS];

    if (deckType === "GENEL+") {
      selectedCards = [...CARDS_PLUS];
    } else if (deckType === "OZEL" && customDeckText.trim() !== "") {
      const parsedCards: ClueCard[] = customDeckText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.includes('-'))
        .map((line, index) => {
          const [left, right] = line.split('-').map(part => part.trim());
          return { id: `custom-${index}`, leftConcept: left, rightConcept: right };
        });
      
      if (parsedCards.length > 0) {
        selectedCards = parsedCards;
      }
    }

    setGameConfig({
      teams: teams.map(t => ({ ...t, name: t.name.trim() || `Takım ${teams.indexOf(t) + 1}` })),
      targetScore,
      currentTurn: 0,
      round: 1,
      cards: selectedCards
    });
    setGameState('PLAYING');
  };

  const addTeam = () => {
    if (teams.length < 6) {
      setTeams([...teams, { name: `Takım ${teams.length + 1}`, score: 0 }]);
    }
  };

  const removeTeam = (index: number) => {
    if (teams.length > 2) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const updateTeamName = (index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-8 py-16 w-full max-w-2xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-brand-stone text-brand-base rounded-xl p-8 shadow-2xl relative overflow-hidden border border-brand-stone/20"
      >
        <h1 className="text-3xl font-bold text-center mb-10 tracking-widest relative z-10">Oyunu Kur</h1>
        
        <form className="space-y-10 relative z-10" onSubmit={(e) => { e.preventDefault(); handleStart(); }}>
          
          {/* Teams */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm text-brand-base/60 uppercase tracking-wider font-bold">TAKIMLAR</label>
              {teams.length < 6 && (
                <button
                  type="button"
                  onClick={addTeam}
                  className="text-brand-coral hover:text-brand-coral/80 font-bold flex items-center gap-1 text-sm uppercase"
                >
                  <Plus size={16} /> Takım Ekle
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {teams.map((team, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative flex items-center group"
                  >
                    <input 
                      type="text" 
                      placeholder={`Takım ${index + 1}`}
                      value={team.name}
                      onChange={(e) => updateTeamName(index, e.target.value)}
                      className="w-full bg-transparent border-0 border-b-2 border-brand-base text-brand-base text-lg py-2 px-1 text-center placeholder:text-brand-base/40 font-bold uppercase focus:outline-none focus:ring-0"
                    />
                    {teams.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeTeam(index)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-base/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Deck Selection */}
          <div className="space-y-4">
            <label className="block text-sm text-brand-base/60 text-center uppercase tracking-wider font-bold">KART DESTESİ</label>
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-lg p-1 bg-brand-base/10 w-full max-w-md">
                <button
                  type="button"
                  onClick={() => setDeckType("GENEL")}
                  className={`flex-1 px-4 py-2 rounded font-bold text-xs md:text-sm transition-colors ${deckType === "GENEL" ? 'bg-brand-base text-brand-stone shadow-sm' : 'text-brand-base hover:bg-brand-base/20'}`}
                >
                  Genel Deste
                </button>
                <button
                  type="button"
                  onClick={() => setDeckType("GENEL+")}
                  className={`flex-1 px-4 py-2 rounded font-bold text-xs md:text-sm transition-colors ${deckType === "GENEL+" ? 'bg-brand-base text-brand-stone shadow-sm' : 'text-brand-base hover:bg-brand-base/20'}`}
                >
                  Genel+ Deste
                </button>
                <button
                  type="button"
                  onClick={() => setDeckType("OZEL")}
                  className={`flex-1 px-4 py-2 rounded font-bold text-xs md:text-sm transition-colors ${deckType === "OZEL" ? 'bg-brand-base text-brand-stone shadow-sm' : 'text-brand-base hover:bg-brand-base/20'}`}
                >
                  Özel Deste
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {deckType === "OZEL" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full"
                >
                  <label className="block text-xs text-brand-base/60 text-center uppercase tracking-wider mb-2">Özel Kartlarınızı Girin (Her satıra bir kart: Sol - Sağ)</label>
                  <textarea
                    value={customDeckText}
                    onChange={(e) => setCustomDeckText(e.target.value)}
                    placeholder="Sıkıcı - Eğlenceli&#10;Zor - Kolay&#10;Yavaş - Hızlı"
                    className="w-full h-32 bg-brand-base/10 border-2 border-brand-base/20 rounded-lg p-3 text-brand-base placeholder:text-brand-base/40 focus:outline-none focus:border-brand-base focus:bg-brand-base/20 resize-none"
                  ></textarea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Target Score */}
          <div className="space-y-4">
            <label className="block text-sm text-brand-base/60 text-center uppercase tracking-wider font-bold">HEDEF PUAN</label>
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg p-1 bg-brand-base/10 w-full max-w-sm">
                {[8, 10, 12].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setTargetScore(score)}
                    className={`flex-1 px-6 py-2 rounded font-bold text-sm transition-colors ${targetScore === score ? 'bg-brand-base text-brand-stone shadow-sm' : 'text-brand-base hover:bg-brand-base/20'}`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-brand-coral text-brand-base text-2xl py-4 rounded-lg flex items-center justify-center gap-2 transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(229,95,61,0.4)] font-bold shadow-xl uppercase"
            >
              Dalgayı Yakala
              <span className="material-symbols-outlined">arrow_forward</span>
            </motion.button>
          </div>
        </form>
        
        {/* Subtle Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')"}}></div>
      </motion.div>
    </div>
  );
}
