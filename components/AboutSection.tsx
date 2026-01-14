
import React, { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
  theme: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`${theme.sectionBg} py-32 md:py-48 px-4 overflow-hidden transition-colors duration-700 relative`}
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <span className="text-[20vw] font-serif select-none">HERITAGE</span>
      </div>

      <div className={`max-w-4xl mx-auto text-center space-y-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-8 blur-sm'
      }`}>
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight">A Essência Chronos & Vision</h2>
          <div className={`h-px w-12 mx-auto ${theme.accentBg} opacity-40`}></div>
        </div>
        
        <p className={`text-xl md:text-2xl lg:text-3xl ${theme.muted} leading-relaxed font-light italic px-4`}>
          "A Chronos&Vision nasce da união entre o tempo e a visão de futuro. Cada peça é escolhida para representar mais do que horas — representa presença, estilo e identidade."
        </p>
        
        <div className={`flex justify-center pt-8 transition-all duration-1000 delay-700 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className={`w-16 h-16 border ${theme.accentBorder} rounded-full flex items-center justify-center italic ${theme.accent} font-serif text-xl shadow-[0_0_20px_rgba(198,167,94,0.1)]`}>
            CV
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
