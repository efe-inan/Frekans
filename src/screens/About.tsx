import { motion } from "motion/react";

export default function About() {
  return (
    <div className="flex-grow flex flex-col items-center justify-start px-8 py-16 w-full max-w-4xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-2xl w-full flex flex-col items-center text-center space-y-8 relative overflow-hidden"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-cream uppercase tracking-tight">
          Ben Kimim?
        </h1>
        
        <div className="text-brand-cream/80 text-lg leading-relaxed max-w-2xl text-left space-y-6">
          <p>
            Merhaba! Ben Efe. Frekans, takım arkadaşlarınızla aynı frekansta olup olmadığınızı test eden, zihinleri hizalayan sosyal bir kutu oyununun dijital bir web uyarlamasıdır.
          </p>
          <p>
            Bu projeyi geliştirirken modern web teknolojilerini kullanarak hızlı, eğlenceli ve etkileşimli bir deneyim oluşturmayı hedefledim. Arkadaşlarınızla keyifli vakit geçirmeniz dileğiyle!
          </p>
          <div className="pt-8 border-t border-brand-cream/10 text-center">
            <h3 className="text-xl font-bold mb-4 text-brand-coral uppercase tracking-widest">Bana Ulaşın</h3>
            <a 
              href="https://github.com/efe-inan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-base/20 hover:bg-brand-base/40 border border-brand-cream/20 rounded-lg transition-colors font-bold text-brand-cream"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub Profilim (efe-inan)
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
