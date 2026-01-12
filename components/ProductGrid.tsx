
import React from 'react';
import { WatchProduct } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: WatchProduct[];
  onSelect: (product: WatchProduct) => void;
  theme: any;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelect, theme }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
      {products.map((watch) => (
        <ProductCard 
          key={watch.id} 
          product={watch} 
          onClick={() => onSelect(watch)} 
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
