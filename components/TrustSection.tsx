
import React, { useEffect, useRef, useState } from 'react';

interface TrustSectionProps {
  theme: any;
}

const TrustSection: React.FC<TrustSectionProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items = [
    { title: 'Qualidade Premium', desc: 'Acabamento impecável', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-2.066 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 2.066 3.42 3.42 0 013.112 3.112 3.42 3.42 0 002.066 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-2.066 1.946 3.42 3.42 0 01-3.112 3.112 3.42 3.42 0 00-1.946 2.066 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-2.066 3.42 3.42 0 01-3.112-3.112 3.42 3.42 0 00-2.066-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 002.066-1.946 3.42 3.42 0 013.112-3.112z' },
    { title: 'Parcelamento 12x', desc: 'No cartão de crédito', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { title: 'Entrega Rápida', desc: 'Todo o Maranhão', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { title: 'Compra Segura', desc: 'Garantia Chronos', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`py-24 px-4 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <div key={i} className={`flex flex-col items-center text-center space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
            <div className={`w-14 h-14 rounded-full border ${theme.border} flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={item.icon} />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-black block">{item.title}</span>
              <span className="text-[8px] opacity-40 uppercase tracking-widest">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
