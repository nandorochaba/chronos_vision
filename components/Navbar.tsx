
import React from 'react';
import { CollectionType } from '../types';

interface NavbarProps {
  isScrolled: boolean;
  cartCount: number;
  onOpenCart: () => void;
  currentCollection: CollectionType;
  onToggleCollection: (c: CollectionType) => void;
  theme: any;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isScrolled, 
  cartCount, 
  onOpenCart, 
  currentCollection, 
  onToggleCollection,
  theme
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 md:px-12 ${
      isScrolled 
        ? `${theme.bg}/90 backdrop-blur-md border-b ${theme.border} py-3` 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-xl md:text-2xl font-serif tracking-widest uppercase">
            Chronos<span className={theme.accent}>&</span>Vision
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-12 text-[10px] tracking-[0.2em] uppercase font-bold">
          <div className="flex bg-black/5 rounded-full p-1 border border-current/10">
            <button 
              onClick={() => onToggleCollection('masculine')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${currentCollection === 'masculine' ? `${theme.accentBg} text-white md:text-black shadow-lg` : 'opacity-40 hover:opacity-100'}`}
            >
              Masculino
            </button>
            <button 
              onClick={() => onToggleCollection('feminine')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${currentCollection === 'feminine' ? `${theme.accentBg} text-white md:text-black shadow-lg` : 'opacity-40 hover:opacity-100'}`}
            >
              Feminino
            </button>
          </div>

          <button onClick={() => scrollTo('catalog')} className="hover:opacity-60 transition-opacity">Catálogo</button>
          <button onClick={() => scrollTo('about')} className="hover:opacity-60 transition-opacity">Visão</button>
          
          <button 
            onClick={onOpenCart}
            className="flex items-center space-x-3 hover:opacity-60 transition-all relative"
          >
            <span>Sacola</span>
            {cartCount > 0 && (
              <span className={`absolute -top-3 -right-4 ${theme.accentBg} text-white md:text-black text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-pulse`}>
                {cartCount}
              </span>
            )}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-6">
          <button onClick={onOpenCart} className="relative p-2">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute top-0 right-0 ${theme.accentBg} text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-black/20`}>
                  {cartCount}
                </span>
              )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
