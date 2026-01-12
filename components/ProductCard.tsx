
import React from 'react';
import { WatchProduct } from '../types';

interface ProductCardProps {
  product: WatchProduct;
  onClick: () => void;
  theme: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, theme }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col space-y-5 transition-all duration-700 hover:-translate-y-3 hover:scale-[1.03]"
      onClick={onClick}
    >
      <div className={`relative aspect-[3/4] overflow-hidden ${theme.sectionBg} shadow-2xl transition-shadow duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]`}>
        {/* Decorative elements */}
        <div className={`absolute top-4 left-4 z-10 text-[7px] tracking-[0.4em] uppercase font-black px-2 py-1 border ${theme.border} bg-black/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700`}>
          Mastery Series
        </div>

        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
          <div className={`px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] tracking-[0.3em] uppercase font-black text-white`}>
            Descobrir Peça
          </div>
        </div>
      </div>
      
      <div className="space-y-2 px-1 text-center md:text-left">
        <h3 className={`text-sm md:text-base font-serif tracking-tight transition-colors duration-500 group-hover:${theme.accent}`}>
          {product.name}
        </h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <p className={`text-[8px] md:text-[9px] ${theme.muted} uppercase tracking-[0.25em] font-medium`}>
            {product.material}
          </p>
          <p className="text-[10px] md:text-xs font-serif opacity-80 italic">
            {product.priceLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
