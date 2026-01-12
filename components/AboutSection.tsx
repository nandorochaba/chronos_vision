
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
      { threshold: 0.2 }
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
      className={`${theme.sectionBg} py-32 px-4 overflow-hidden transition-colors duration-700`}
    >
      <div className={`max-w-4xl mx-auto text-center space-y-12 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h2 className="text-3xl md:text-5xl font-serif">A Essência Chronos & Vision</h2>
        <p className={`text-xl md:text-2xl ${theme.muted} leading-relaxed font-light italic`}>
          "A Chronos&Vision nasce da união entre o tempo e a visão de futuro. Cada peça é escolhida para representar mais do que horas — representa presença, estilo e identidade."
        </p>
        <div className={`flex justify-center pt-8 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <div className={`w-12 h-12 border ${theme.accentBorder} rounded-full flex items-center justify-center italic ${theme.accent} font-serif`}>
            CV
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
