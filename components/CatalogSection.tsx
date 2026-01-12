
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
  setCollection, 
  products,
  campaigns,
  onSelectProduct, 
  theme 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayProducts, setDisplayProducts] = useState<WatchProduct[]>([]);
  
  const isMasculine = collection === 'masculine';

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['Todos', ...Array.from(new Set(cats))];
  }, [products]);

  useEffect(() => {
    const filtered = activeCategory === 'Todos' 
      ? products.filter(p => p.collection === collection)
      : products.filter(p => p.collection === collection && p.category === activeCategory);
    setDisplayProducts(filtered);
  }, [products, collection, activeCategory]);

  const handleFilterChange = (newCollection?: CollectionType, newCategory?: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (newCollection) setCollection(newCollection);
      if (newCategory) setActiveCategory(newCategory);
      setIsTransitioning(false);
    }, 500); 
  };

  return (
    <section id="catalog" className="py-24 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-20 space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight">
            Curadoria {isMasculine ? 'Masculina' : 'Feminina'}
          </h2>
          <div className={`h-[1.5px] w-16 mx-auto opacity-40 ${theme.accentBg}`}></div>
        </div>

        {/* Ergonomic Collection Switcher */}
        <div className="flex justify-center">
          <div className={`inline-flex p-1.5 rounded-full border ${theme.border} bg-current/5 backdrop-blur-3xl transition-all duration-700 shadow-inner ring-1 ring-white/5`}>
            <button 
              onClick={() => handleFilterChange('masculine', 'Todos')}
              className={`relative px-8 md:px-12 py-3.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-500 active:scale-95 ${
                isMasculine ? `${theme.accentBg} text-white md:text-black shadow-lg scale-105 z-10` : 'text-current opacity-40 hover:opacity-100'
              }`}
            >
              Masculino
            </button>
            <button 
              onClick={() => handleFilterChange('feminine', 'Todos')}
              className={`relative px-8 md:px-12 py-3.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-500 active:scale-95 ${
                !isMasculine ? `${theme.accentBg} text-white md:text-black shadow-lg scale-105 z-10` : 'text-current opacity-40 hover:opacity-100'
              }`}
            >
              Feminino
            </button>
          </div>
        </div>

        {/* Touch-Friendly Category Scroll */}
        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-8 pt-6 overflow-x-auto no-scrollbar pb-2 px-4 -mx-4 mask-fade-edges">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(undefined, cat)}
              className={`whitespace-nowrap text-[10px] tracking-[0.4em] uppercase font-bold transition-all active:scale-90 ${
                activeCategory === cat ? theme.accent : 'opacity-30 hover:opacity-80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={`mb-32 min-h-[50vh] transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-[0.98] blur-xl' : 'opacity-100 scale-100 blur-0'}`}>
        <ProductGrid products={displayProducts} onSelect={onSelectProduct} theme={theme} />
        {displayProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 opacity-20 space-y-4">
             <div className={`w-12 h-px ${theme.accentBg}`}></div>
             <p className="text-[10px] uppercase tracking-widest">Nenhuma peça encontrada nesta categoria</p>
          </div>
        )}
      </div>

      <CampaignBanner collection={collection} campaigns={campaigns} theme={theme} />
      
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
