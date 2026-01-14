
import React, { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
  theme: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`${theme.sectionBg} py-48 px-6 overflow-hidden transition-colors duration-1000 relative bg-onyx-radial`}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
        <span className="text-[20vw] font-serif select-none tracking-tighter translate-y-12">CHRONOS</span>
      </div>

      <div className={`max-w-5xl mx-auto text-center space-y-20 transition-all duration-[2000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 blur-md'}`}>
        <div className="space-y-8">
          <div className="flex items-center justify-center space-x-6 opacity-30">
            <span className="text-[10px] tracking-[1em] uppercase font-black">Heritage Mastery</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight italic">
            "A engenharia do invisível <br/> manifestada no pulso."
          </h2>
          <div className={`h-[1px] w-20 mx-auto ${theme.accentBg} opacity-20`}></div>
        </div>
        
        <p className={`text-xl md:text-3xl ${theme.muted} leading-relaxed font-light px-4 max-w-4xl mx-auto opacity-80 font-serif italic`}>
          A Chronos & Vision nasce da união entre o tempo e a visão de futuro. Cada peça é escolhida sob critérios rigorosos de manufatura, representando mais do que horas — representa presença, estilo e identidade.
        </p>
        
        <div className={`flex justify-center pt-12 transition-all duration-[2500ms] delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="w-px h-24 bg-gradient-to-b from-[#C6A75E] to-transparent opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
