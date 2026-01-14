
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
  theme
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-5 md:px-12 ${
      isScrolled 
        ? `${theme.bg}/95 backdrop-blur-xl border-b ${theme.border} py-4` 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col cursor-pointer active:scale-95 transition-transform" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-xl md:text-2xl font-serif tracking-widest uppercase">
            Chronos<span className={theme.accent}>&</span>Vision
          </span>
          <span className="text-[7px] tracking-[0.5em] uppercase opacity-40 font-black -mt-1 ml-0.5">Heritage Mastery</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-12 text-[10px] tracking-[0.2em] uppercase font-black">
          <button onClick={() => scrollTo('catalog')} className="hover:opacity-50 transition-opacity">Catálogo</button>
          <button onClick={() => scrollTo('about')} className="hover:opacity-50 transition-opacity">A Marca</button>
          
          <button 
            onClick={onOpenCart}
            className="flex items-center space-x-3 hover:opacity-50 transition-all relative group"
          >
            <span className="group-hover:translate-x-[-4px] transition-transform">Sacola</span>
            <div className="relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 ${theme.accentBg} text-black text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full`}>
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* MOBILE CART TRIGGER - ESPAÇADO PARA POLEGAR */}
        <div className="md:hidden flex items-center">
          <button onClick={onOpenCart} className="relative p-3 -mr-3 active:scale-90 transition-transform">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute top-1 right-1 ${theme.accentBg} text-black text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-[#0B0B0B]`}>
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
