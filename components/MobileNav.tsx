
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
  onOpenCart, 
  cartCount,
  theme 
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] px-6 pointer-events-none">
      <div className={`${theme.bg}/80 backdrop-blur-3xl border border-white/5 rounded-full py-2.5 px-4 flex items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] pointer-events-auto max-w-xs mx-auto ring-1 ring-white/10`}>
        
        {/* HOME */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 flex flex-col items-center py-1 gap-1 active:scale-90 transition-all opacity-40 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">Início</span>
        </button>

        {/* CATALOGO */}
        <button 
          onClick={() => scrollTo('catalog')}
          className="flex-1 flex flex-col items-center py-1 gap-1 active:scale-90 transition-all opacity-40 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">Catálogo</span>
        </button>

        {/* CARRINHO */}
        <button 
          onClick={onOpenCart}
          className="flex-1 flex flex-col items-center py-1 gap-1 relative active:scale-90 transition-all group"
        >
          <div className="relative">
            <svg className={`w-5 h-5 ${cartCount > 0 ? theme.accent : 'opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 ${theme.accentBg} text-white md:text-black text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full ring-2 ring-black/20 shadow-glow animate-pulse`}>
                {cartCount}
              </span>
            )}
          </div>
          <span className={`text-[6px] font-black uppercase tracking-[0.3em] ${cartCount > 0 ? theme.accent : 'opacity-40'}`}>Sacola</span>
        </button>

      </div>
      <style>{`
        .shadow-glow {
          box-shadow: 0 0 12px rgba(198, 167, 94, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MobileNav;
