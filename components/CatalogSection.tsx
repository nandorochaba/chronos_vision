
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
  const [activeCategory, setActiveCategory] = useState<string>('Universo');

  const categories = useMemo(() => {
    const cats = products.filter(p => p.collection === 'masculine').map(p => p.category);
    return ['Universo', ...Array.from(new Set(cats))];
  }, [products]);

  const displayProducts = useMemo(() => {
    return activeCategory === 'Universo' 
      ? products.filter(p => p.collection === 'masculine')
      : products.filter(p => p.collection === 'masculine' && p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <section id="catalog" className="py-32 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-24 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4 opacity-30">
            <span className="text-[10px] tracking-[0.8em] uppercase font-black">Heritage Masterpiece</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight">
            Curadoria <span className="italic font-light">Atelier</span>
          </h2>
          <div className={`h-[1px] w-12 mx-auto ${theme.accentBg} opacity-30`}></div>
        </div>

        {/* Exclusive Concierge Filters */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-12 pt-12 overflow-x-auto no-scrollbar pb-4 px-4 -mx-4 mask-fade-edges">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group relative whitespace-nowrap text-[10px] tracking-[0.5em] uppercase font-black transition-all duration-700 active:scale-90 ${
                activeCategory === cat ? theme.accent : 'opacity-20 hover:opacity-100'
              }`}
            >
              {cat}
              <span className={`absolute -bottom-3 left-0 w-full h-px ${theme.accentBg} transition-transform duration-700 origin-right ${activeCategory === cat ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`}></span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-40 min-h-[60vh] animate-[fade-in_1.2s_ease-out]">
        <ProductGrid products={displayProducts} onSelect={onSelectProduct} theme={theme} />
        {displayProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 opacity-20 space-y-6">
             <div className={`w-16 h-px ${theme.accentBg}`}></div>
             <p className="text-[10px] uppercase tracking-[0.5em]">Atelier em preparação para esta categoria</p>
          </div>
        )}
      </div>

      <CampaignBanner collection={'masculine'} campaigns={campaigns} theme={theme} />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
        @media (min-width: 768px) {
          .mask-fade-edges { mask-image: none; }
        }
      `}</style>
    </section>
  );
};

export default CatalogSection;
