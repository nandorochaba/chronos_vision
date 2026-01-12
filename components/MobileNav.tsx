
import React from 'react';
import { CollectionType } from '../types';

interface MobileNavProps {
  currentCollection: CollectionType;
  onToggleCollection: (c: CollectionType) => void;
  onOpenCart: () => void;
  cartCount: number;
  theme: any;
}

const MobileNav: React.FC<MobileNavProps> = ({ 
  currentCollection, 
  onToggleCollection, 
  onOpenCart, 
  cartCount,
  theme 
}) => {
  const isMasculine = currentCollection === 'masculine';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] px-4 pointer-events-none">
      <div className={`${theme.bg}/60 backdrop-blur-3xl border border-white/10 rounded-2xl py-2 px-2 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto max-w-sm mx-auto ring-1 ring-white/5`}>
        
        {/* HOME */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 flex flex-col items-center py-2 gap-1 active:scale-90 transition-all opacity-40 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">Início</span>
        </button>

        {/* CATALOGO */}
        <button 
          onClick={() => scrollTo('catalog')}
          className="flex-1 flex flex-col items-center py-2 gap-1 active:scale-90 transition-all opacity-40 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">Catálogo</span>
        </button>

        {/* TOGGLE MASC/FEM - O Ponto Focal */}
        <button 
          onClick={() => onToggleCollection(isMasculine ? 'feminine' : 'masculine')}
          className="flex-1 flex flex-col items-center py-2 gap-1 relative group transition-all"
        >
          <div className={`relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 ${theme.bg} shadow-lg active:scale-95 transition-transform`}>
            <div className={`absolute inset-0 rounded-full opacity-20 blur-md ${theme.accentBg}`}></div>
            <svg className={`w-5 h-5 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${theme.accent} mt-1`}>
            {isMasculine ? 'Masculino' : 'Feminino'}
          </span>
        </button>

        {/* CARRINHO */}
        <button 
          onClick={onOpenCart}
          className="flex-1 flex flex-col items-center py-2 gap-1 relative active:scale-90 transition-all opacity-40 hover:opacity-100"
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 ${theme.accentBg} text-white md:text-black text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full ring-2 ring-black/20 shadow-glow`}>
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">Sacola</span>
        </button>

      </div>
      <style>{`
        .shadow-glow {
          box-shadow: 0 0 10px rgba(198, 167, 94, 0.4);
        }
      `}</style>
    </div>
  );
};

export default MobileNav;
