
import React, { useState, useMemo, useEffect } from 'react';
import { WatchProduct, CollectionType, Campaign } from '../types';
import CampaignBanner from './CampaignBanner';
import ProductGrid from './ProductGrid';

interface CatalogSectionProps {
  collection: CollectionType;
  setCollection: (c: CollectionType) => void;
  products: WatchProduct[];
  campaigns: Campaign[];
  onSelectProduct: (p: WatchProduct) => void;
  theme: any;
}

const CatalogSection: React.FC<CatalogSectionProps> = ({ 
  products,
  campaigns,
  onSelectProduct, 
  theme 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Destaques');

  const categories = useMemo(() => {
    const cats = products.filter(p => p.collection === 'masculine').map(p => p.category);
    return ['Destaques', ...Array.from(new Set(cats))];
  }, [products]);

  const displayProducts = useMemo(() => {
    return activeCategory === 'Destaques' 
      ? products.filter(p => p.collection === 'masculine')
      : products.filter(p => p.collection === 'masculine' && p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="catalog" className="py-24 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-20 space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight">
            Nossa <span className="italic font-light">Seleção</span>
          </h2>
          <p className="text-[9px] uppercase tracking-[0.4em] opacity-40">Qualidade garantida em cada detalhe</p>
        </div>

        {/* Categories */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-8 pt-8 overflow-x-auto no-scrollbar pb-4 px-4 -mx-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group relative whitespace-nowrap text-[9px] tracking-[0.3em] uppercase font-bold transition-all duration-500 ${
                activeCategory === cat ? theme.accent : 'opacity-30 hover:opacity-100'
              }`}
            >
              {cat}
              <span className={`absolute -bottom-2 left-0 w-full h-px ${theme.accentBg} transition-transform duration-500 ${activeCategory === cat ? 'scale-x-100' : 'scale-x-0'}`}></span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-24 animate-[fade-in_1s_ease-out]">
        <ProductGrid products={displayProducts} onSelect={onSelectProduct} theme={theme} />
      </div>

      <CampaignBanner collection={'masculine'} campaigns={campaigns} theme={theme} />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CatalogSection;
