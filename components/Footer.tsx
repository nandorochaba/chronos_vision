
import React from 'react';

interface FooterProps {
  theme: any;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer id="contact" className={`${theme.bg} border-t ${theme.border} py-20 px-4 transition-colors duration-700`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-2">
            Chronos<span className={theme.accent}>&</span>Vision
          </h2>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">The Art of Time</p>
        </div>

        <div className={`flex space-x-12 text-xs uppercase tracking-[0.2em] font-medium opacity-60`}>
          <a href="#" className={`hover:${theme.accent} transition-colors`}>Instagram</a>
          <a href="#" className={`hover:${theme.accent} transition-colors`}>WhatsApp</a>
          <a href="#" className={`hover:${theme.accent} transition-colors`}>Direct</a>
        </div>

        <div className="text-center space-y-4">
          <p className="text-[10px] opacity-30 uppercase tracking-[0.15em]">
            © Chronos&Vision — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
