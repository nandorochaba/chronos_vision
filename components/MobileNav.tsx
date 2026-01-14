
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[150] px-6 pb-8 pointer-events-none">
      <div className={`mx-auto max-w-sm w-full bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl h-20 px-2 flex items-center justify-around shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-auto`}>
        
        {/* INÍCIO */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex-1 flex flex-col items-center justify-center h-full min-w-[64px] gap-1.5 active:scale-90 transition-all group"
        >
          <svg className="w-6 h-6 opacity-40 group-active:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Início</span>
        </button>

        {/* CATÁLOGO */}
        <button 
          onClick={() => scrollTo('catalog')}
          className="flex-1 flex flex-col items-center justify-center h-full min-w-[64px] gap-1.5 active:scale-90 transition-all group"
        >
          <svg className="w-6 h-6 opacity-40 group-active:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Coleção</span>
        </button>

        {/* SACOLA */}
        <button 
          onClick={onOpenCart}
          className="flex-1 flex flex-col items-center justify-center h-full min-w-[64px] gap-1.5 relative active:scale-90 transition-all group"
        >
          <div className="relative">
            <svg className={`w-6 h-6 ${cartCount > 0 ? theme.accent : 'opacity-40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className={`absolute -top-1.5 -right-1.5 ${theme.accentBg} text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-[#0B0B0B] shadow-lg animate-pulse`}>
                {cartCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${cartCount > 0 ? theme.accent : 'opacity-30'}`}>Sacola</span>
        </button>

      </div>
    </div>
  );
};

export default MobileNav;
