
import React from 'react';
import { CollectionType } from '../types';

interface HeroProps {
  collection: CollectionType;
  theme: any;
}

const Hero: React.FC<HeroProps> = ({ collection, theme }) => {
  const isMasculine = collection === 'masculine';
  
  const content = isMasculine ? {
    tag: 'Coleção Masculina',
    title: 'O tempo não passa. \nEle se revela.',
    subtitle: 'Relógios que unem precisão técnica, design disruptivo e identidade inquestionável.',
    img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop'
  } : {
    tag: 'Coleção Feminina',
    title: 'A alma do tempo \nem cada detalhe.',
    subtitle: 'Uma curadoria de peças que celebram a sofisticação feminina com leveza e brilho eterno.',
    img: 'https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=2000&auto=format&fit=crop'
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700 ${theme.bg}`}>
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <img 
          key={content.img}
          src={content.img} 
          alt="Luxury watch detail" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-[slow-zoom_20s_infinite_alternate]"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${isMasculine ? 'from-[#0B0B0B]/60 via-[#0B0B0B]/20 to-[#0B0B0B]' : 'from-[#FAF7F2]/60 via-[#FAF7F2]/20 to-[#FAF7F2]'}`}></div>
      </div>

      <div className="relative z-10 text-center space-y-6 md:space-y-8 px-6 max-w-4xl opacity-0 animate-[fade-in-up_1.2s_ease-out_forwards]">
        <h2 className={`${theme.accent} tracking-[0.3em] uppercase text-[10px] md:text-sm font-semibold`}>
          {content.tag}
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-[1.1] md:leading-tight whitespace-pre-line">
          {content.title.split('\n')[0]} <br />
          <span className="italic">{content.title.split('\n')[1]}</span>
        </h1>
        <p className={`text-sm md:text-xl ${theme.muted} max-w-2xl mx-auto font-light leading-relaxed px-4`}>
          {content.subtitle}
        </p>
        
        <div className="pt-6 md:pt-8">
          <button 
            onClick={scrollToCatalog}
            className={`inline-block px-8 py-3.5 md:px-10 md:py-4 border ${theme.accentBorder} ${theme.accent} hover:${theme.accentBg} hover:text-white transition-all duration-500 tracking-widest uppercase text-[10px] md:text-xs font-bold active:scale-95`}
          >
            Ver Catálogo
          </button>
        </div>
      </div>

      <div className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-30 md:opacity-100" onClick={scrollToCatalog}>
        <div className={`w-px h-8 md:h-12 bg-gradient-to-b ${isMasculine ? 'from-[#C6A75E]' : 'from-[#B08968]'} to-transparent`}></div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
