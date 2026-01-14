
import React from 'react';
import { CollectionType } from '../types';

interface HeroProps {
  collection: CollectionType;
  theme: any;
}

const Hero: React.FC<HeroProps> = ({ collection, theme }) => {
  const isMasculine = collection === 'masculine';
  
  const content = {
    tag: 'Curadoria Heritage',
    title: 'O tempo não passa. \nEle se revela.',
    subtitle: 'Onde a engenharia de alta performance encontra a estética imortal. Relógios que não apenas marcam as horas, mas definem legados.',
    img: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop'
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`relative h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-1000 ${theme.bg}`}>
      <div className="absolute inset-0 z-0">
        <img 
          src={content.img} 
          alt="Luxury watch detail" 
          className="w-full h-full object-cover opacity-30 scale-105 animate-[slow-zoom_30s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]"></div>
      </div>

      <div className="relative z-10 text-center space-y-10 md:space-y-12 px-6 max-w-5xl animate-[fade-in-up_1.5s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-center space-x-6">
          <span className={`w-8 h-px ${theme.accentBg} opacity-50`}></span>
          <h2 className={`${theme.accent} tracking-[0.6em] uppercase text-[9px] md:text-[11px] font-black`}>
            {content.tag}
          </h2>
          <span className={`w-8 h-px ${theme.accentBg} opacity-50`}></span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-9xl font-serif leading-[1.05] md:leading-[1.1] tracking-tighter">
          {content.title.split('\n')[0]} <br />
          <span className="italic font-light opacity-80">{content.title.split('\n')[1]}</span>
        </h1>
        
        <p className={`text-sm md:text-lg ${theme.muted} max-w-xl mx-auto font-light leading-relaxed tracking-wide opacity-70`}>
          {content.subtitle}
        </p>
        
        <div className="pt-10">
          <button 
            onClick={scrollToCatalog}
            className={`group relative inline-block px-12 py-5 border ${theme.accentBorder} overflow-hidden transition-all duration-700 active:scale-95`}
          >
            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 ${theme.accentBg} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`}></div>
            <span className={`relative z-10 ${theme.accent} group-hover:text-black tracking-[0.4em] uppercase text-[10px] font-black transition-colors duration-700`}>
              Explorar Universo
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-30" onClick={scrollToCatalog}>
        <div className={`w-px h-16 bg-gradient-to-b from-[#C6A75E] to-transparent`}></div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
