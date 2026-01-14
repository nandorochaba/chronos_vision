
import React, { useEffect, useRef, useState } from 'react';

interface TrustSectionProps {
  theme: any;
}

const TrustSection: React.FC<TrustSectionProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    { title: 'Curadoria Premium', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { title: 'Envio Seguro', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1M18 16h1a1 1 0 001-1v-5a1 1 0 00-1-1h-2V7a1 1 0 00-1-1H9' },
    { title: 'Atendimento Personalizado', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 11-8 0 4 4 0 018 0z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75' },
    { title: 'Garantia de Qualidade', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-2.066 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 2.066 3.42 3.42 0 013.112 3.112 3.42 3.42 0 002.066 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-2.066 1.946 3.42 3.42 0 01-3.112 3.112 3.42 3.42 0 00-1.946 2.066 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-2.066 3.42 3.42 0 01-3.112-3.112 3.42 3.42 0 00-2.066-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 002.066-1.946 3.42 3.42 0 013.112-3.112z' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-32 px-4 transition-colors duration-700 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
        {items.map((item, i) => (
          <div 
            key={i} 
            className={`flex flex-col items-center text-center space-y-6 group transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
            style={{ 
              transitionDelay: `${i * 100}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
            }}
          >
            <div className={`w-20 h-20 rounded-full border ${theme.border} flex items-center justify-center group-hover:${theme.accentBorder} transition-all duration-700 relative`}>
              {/* Outer glow effect on hover */}
              <div className={`absolute inset-0 rounded-full bg-[#C6A75E] opacity-0 group-hover:opacity-5 blur-md transition-opacity duration-700`}></div>
              
              <svg className={`w-7 h-7 ${theme.accent.replace('text-', 'text-[#').replace(']', ']')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={item.icon} />
              </svg>
            </div>
            <div className="space-y-1">
              <span className={`text-[11px] tracking-[0.25em] uppercase font-black opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:${theme.accent}`}>
                {item.title}
              </span>
              <div className={`h-px w-0 group-hover:w-8 mx-auto ${theme.accentBg} transition-all duration-700 opacity-50`}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
