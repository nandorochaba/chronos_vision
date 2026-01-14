
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
  collection, 
  products,
  campaigns,
  onSelectProduct, 
  theme 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [displayProducts, setDisplayProducts] = useState<WatchProduct[]>([]);

  const categories = useMemo(() => {
    const cats = products.filter(p => p.collection === 'masculine').map(p => p.category);
    return ['Todos', ...Array.from(new Set(cats))];
  }, [products]);

  useEffect(() => {
    const filtered = activeCategory === 'Todos' 
      ? products.filter(p => p.collection === 'masculine')
      : products.filter(p => p.collection === 'masculine' && p.category === activeCategory);
    setDisplayProducts(filtered);
  }, [products, activeCategory]);

  return (
    <section id="catalog" className="py-24 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-20 space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif tracking-tight">
            Curadoria Heritage
          </h2>
          <p className={`${theme.muted} text-[10px] tracking-[0.5em] uppercase font-black`}>Engenharia de Alta Performance</p>
          <div className={`h-[1.5px] w-16 mx-auto opacity-40 ${theme.accentBg} mt-6`}></div>
        </div>

        {/* Touch-Friendly Category Scroll - Simplified */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-10 pt-10 overflow-x-auto no-scrollbar pb-2 px-4 -mx-4 mask-fade-edges">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-[9px] tracking-[0.4em] uppercase font-black transition-all active:scale-90 ${
                activeCategory === cat ? theme.accent : 'opacity-20 hover:opacity-60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-32 min-h-[50vh] animate-[fade-in_0.8s_ease-out]">
        <ProductGrid products={displayProducts} onSelect={onSelectProduct} theme={theme} />
        {displayProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-20 space-y-4">
             <div className={`w-12 h-px ${theme.accentBg}`}></div>
             <p className="text-[10px] uppercase tracking-widest">Nenhuma peça disponível nesta categoria</p>
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
