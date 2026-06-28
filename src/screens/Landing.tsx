import { motion } from "motion/react";
import { GameState } from "../types";

interface LandingProps {
  setGameState: (state: GameState) => void;
}

export default function Landing({ setGameState }: LandingProps) {
  return (
    <div className="flex-grow flex flex-col items-center w-full relative">
      <section className="relative w-full min-h-[calc(100vh-160px)] flex flex-col items-center justify-center overflow-hidden px-8 py-16">
        
        {/* Animated Background Rings */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
          <motion.svg 
            className="w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] text-brand-cream" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            viewBox="0 0 800 800"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="400" cy="400" r="380" strokeDasharray="10 20"></circle>
            <circle cx="400" cy="400" r="300" strokeDasharray="5 15"></circle>
            <circle cx="400" cy="400" opacity="0.5" r="220"></circle>
            <line strokeDasharray="2 8" x1="400" x2="400" y1="20" y2="780"></line>
            <line strokeDasharray="2 8" x1="20" x2="780" y1="400" y2="400"></line>
          </motion.svg>
        </div>

        {/* Central Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-brand-coral/10 blur-[100px] rounded-full pointer-events-none z-0"></div>
        
        {/* Subtle Hotlinked Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay z-0" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl gap-8"
        >
          <span className="font-label-sm text-brand-coral mb-4 block tracking-[0.3em] uppercase">BEYOND THE SPECTRUM</span>
          
          <h1 className="text-5xl md:text-[80px] leading-tight font-extrabold text-brand-cream tracking-tight">
            Zihinleri <span className="text-brand-coral drop-shadow-[0_0_10px_rgba(229,95,61,0.6)]">hizala.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-cream/80 max-w-2xl font-light">
            Telepatik yeteneklerinizi test eden sosyal bir deneyim. İpuçlarını yorumlayın, spektrumu okuyun ve takımınızla aynı frekansta buluşun.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState('SETUP')}
              className="bg-brand-coral text-brand-base font-bold uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(229,95,61,0.4)] flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              HEMEN OYNA
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-brand-cream text-brand-cream font-bold uppercase tracking-widest px-8 py-4 rounded-lg transition-all duration-300 hover:bg-brand-cream/10 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">info</span>
              Nasıl Oynanır?
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* How to Play Section */}
      <section className="w-full max-w-6xl px-8 py-24 relative z-10" id="how-to-play">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-coral mb-4">Göreviniz</h2>
          <div className="h-1 w-12 bg-brand-coral mx-auto mb-4"></div>
          <p className="text-brand-cream/80 max-w-lg mx-auto">Üç basit adımda takımınızı spektrumun gizli merkezine yönlendirin.</p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { step: 1, title: 'Hedefi Gör', icon: 'visibility', desc: 'Sadece "Medyum" gizli hedefin nerede olduğunu bilir. İki zıt kavram arasında bir yerdedir.' },
            { step: 2, title: 'İpucu Ver', icon: 'chat_bubble', desc: 'Hedefin konumunu yansıtacak tek bir kavram veya kelime öbeği sunun.' },
            { step: 3, title: 'Frekansı Ayarla', icon: 'tune', desc: 'Takımınız ipucunu tartışır ve kadranı hedefin olduğuna inandıkları yere çevirir.' }
          ].map((item, idx) => (
            <motion.div 
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-panel p-8 rounded-xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(229,95,61,0.2)] hover:border-brand-coral/50 group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-coral/20 text-brand-coral flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                {item.step}
              </div>
              <span className="material-symbols-outlined text-4xl text-brand-coral/70 mb-4 group-hover:text-brand-coral transition-colors">{item.icon}</span>
              <h3 className="text-2xl font-semibold text-brand-cream mb-3">{item.step}. Adım: {item.title}</h3>
              <p className="text-brand-cream/80 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
