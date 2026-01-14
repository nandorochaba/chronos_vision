
import React from 'react';
import { CollectionType } from '../types';

interface HeroProps {
  collection: CollectionType;
  theme: any;
}

const Hero: React.FC<HeroProps> = ({ collection, theme }) => {
  const content = {
    tag: 'Estilo & Presença',
    title: 'O Luxo que você \nmerece usar hoje.',
    subtitle: 'Relógios com design de alta joalheria e a qualidade que o seu dia a dia exige. Sofisticação real, agora ao seu alcance.',
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
          className="w-full h-full object-cover opacity-25 scale-105 animate-[slow-zoom_30s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/90 via-transparent to-[#0B0B0B]"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 md:space-y-10 px-6 max-w-5xl animate-[fade-in-up_1.5s_cubic-bezier(0.22,1,0.36,1)]">
        <div className="flex items-center justify-center space-x-4">
          <span className={`w-6 h-px ${theme.accentBg} opacity-50`}></span>
          <h2 className={`${theme.accent} tracking-[0.4em] uppercase text-[8px] md:text-[10px] font-black`}>
            {content.tag}
          </h2>
          <span className={`w-6 h-px ${theme.accentBg} opacity-50`}></span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-[1.1] md:leading-[1.1] tracking-tight">
          {content.title.split('\n')[0]} <br />
          <span className="italic font-light opacity-90">{content.title.split('\n')[1]}</span>
        </h1>
        
        <p className={`text-xs md:text-base ${theme.muted} max-w-lg mx-auto font-light leading-relaxed tracking-wide opacity-80`}>
          {content.subtitle}
        </p>
        
        <div className="pt-8 space-y-4">
          <button 
            onClick={scrollToCatalog}
            className={`group relative inline-block px-10 py-5 bg-[#C6A75E] text-black overflow-hidden transition-all duration-700 active:scale-95 shadow-[0_20px_40px_rgba(198,167,94,0.3)]`}
          >
            <span className={`relative z-10 tracking-[0.3em] uppercase text-[9px] font-black`}>
              Ver Coleção Completa
            </span>
          </button>
          <p className="text-[8px] uppercase tracking-[0.3em] opacity-40">Parcele em até 12x no cartão</p>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-20" onClick={scrollToCatalog}>
        <div className={`w-px h-12 bg-gradient-to-b from-[#C6A75E] to-transparent`}></div>
      </div>

      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        @keyframes fade-in-up { 
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); } 
          to { opacity: 1; transform: translateY(0); filter: blur(0); } 
        }
      `}</style>
    </section>
  );
};

export default Hero;
