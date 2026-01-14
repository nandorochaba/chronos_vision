
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
      className="group cursor-pointer flex flex-col space-y-3 transition-all duration-700 active:scale-98"
      onClick={onClick}
    >
      <div className={`relative aspect-[3/4] overflow-hidden ${theme.sectionBg} rounded-lg shadow-lg transition-all duration-700`}>
        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className={`text-[8px] tracking-[0.2em] uppercase font-black px-2.5 py-1 bg-black/60 backdrop-blur-md text-[#C6A75E] border border-[#C6A75E]/20 rounded-sm`}>
            Destaque
          </div>
        </div>

        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Desktop Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/30 transition-all duration-700"></div>
        
        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
          <div className={`px-8 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 text-[9px] tracking-[0.4em] uppercase font-black text-white rounded-sm`}>
            Explorar
          </div>
        </div>
      </div>
      
      <div className="space-y-1 px-1">
        <h3 className={`text-xs md:text-sm font-serif tracking-tight leading-tight group-hover:${theme.accent} transition-colors`}>
          {product.name}
        </h3>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {product.originalPriceLabel && (
              <span className="text-[10px] opacity-20 line-through font-serif decoration-[#C6A75E]/40">
                {product.originalPriceLabel}
              </span>
            )}
            <p className="text-xs md:text-sm font-serif text-[#C6A75E] font-medium">
              {product.priceLabel}
            </p>
          </div>
          <p className="text-[8px] opacity-40 uppercase tracking-[0.2em] font-black">
            {product.maxInstallments}x R$ {(product.price / product.maxInstallments).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
