import { GameState } from '../types';

interface FooterProps {
  setGameState: (state: GameState) => void;
}

export default function Footer({ setGameState }: FooterProps) {
  return (
    <footer className="w-full py-8 mt-auto bg-surface-container-lowest border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center px-8 gap-4 z-50">
      <div className="font-label-sm uppercase tracking-widest text-brand-cream/60 order-3 md:order-1">
        © 2026 FREKANS DIGITAL. BEYOND THE SPECTRUM.
      </div>
      <div className="flex gap-8 order-2 font-label-sm uppercase tracking-widest text-brand-cream/80">
        <button onClick={() => setGameState('ABOUT')} className="hover:text-brand-coral transition-colors duration-200">Ben Kimim?</button>
        <button onClick={() => setGameState('PRIVACY')} className="hover:text-brand-coral transition-colors duration-200">Gizlilik Politikası</button>
        <button onClick={() => setGameState('TERMS')} className="hover:text-brand-coral transition-colors duration-200">Kullanım Şartları</button>
      </div>
      <div className="font-label-sm uppercase tracking-widest text-brand-coral order-1 md:order-3">
        FREKANS
      </div>
    </footer>
  );
}
