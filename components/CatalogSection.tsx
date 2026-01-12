
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
    <section id="catalog" className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-16 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif">
            Catálogo {isMasculine ? 'Heritage' : 'Ethereal'}
          </h2>
          <div className={`h-px w-24 mx-auto opacity-60 ${theme.accentBg}`}></div>
        </div>

        <div className="flex justify-center">
          <div className={`inline-flex p-1.5 rounded-full border ${theme.border} bg-current/5 backdrop-blur-xl transition-all duration-700 shadow-inner`}>
            <button 
              onClick={() => handleFilterChange('masculine', 'Todos')}
              className={`relative px-10 py-3 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all duration-500 ${
                isMasculine ? 'bg-[#C6A75E] text-black shadow-lg scale-105 z-10' : 'text-current opacity-40'
              }`}
            >
              Masculino
            </button>
            <button 
              onClick={() => handleFilterChange('feminine', 'Todos')}
              className={`relative px-10 py-3 rounded-full text-[10px] tracking-[0.25em] uppercase font-black transition-all duration-500 ${
                !isMasculine ? 'bg-[#B08968] text-white shadow-lg scale-105 z-10' : 'text-current opacity-40'
              }`}
            >
              Feminino
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(undefined, cat)}
              className={`text-[9px] tracking-[0.3em] uppercase font-bold transition-all ${
                activeCategory === cat ? theme.accent : 'opacity-40 hover:opacity-80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={`mb-32 min-h-[60vh] transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        <ProductGrid products={displayProducts} onSelect={onSelectProduct} theme={theme} />
      </div>

      <CampaignBanner collection={collection} campaigns={campaigns} theme={theme} />
    </section>
  );
};

export default CatalogSection;
