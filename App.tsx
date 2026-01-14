
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import ProductModal from './components/ProductModal';
import AboutSection from './components/AboutSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';
import MobileNav from './components/MobileNav';
import { WatchProduct, CartItem, CollectionType, Campaign } from './types';
import { WATCHES, INITIAL_CAMPAIGNS } from './constants';

const App: React.FC = () => {
  const [watches] = useState<WatchProduct[]>(WATCHES);
  const [campaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  
  const [selectedProduct, setSelectedProduct] = useState<WatchProduct | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Fixado em masculino conforme nova estratégia
  const collection: CollectionType = 'masculine';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openProduct = (product: WatchProduct) => {
    setSelectedProduct(product);
    document.body.classList.add('modal-open');
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    document.body.classList.remove('modal-open');
  };

  const addToCart = (product: WatchProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Tema fixo no Masculino (Onyx & Gold)
  const theme = {
    bg: 'bg-[#0B0B0B]',
    text: 'text-[#F5F5F5]',
    accent: 'text-[#C6A75E]',
    accentBg: 'bg-[#C6A75E]',
    accentBorder: 'border-[#C6A75E]',
    muted: 'text-[#F5F5F5]/60',
    sectionBg: 'bg-[#1A1A1A]',
    border: 'border-[#F5F5F5]/10',
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} ${theme.text}`}>
      <Navbar 
        isScrolled={isScrolled} 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        currentCollection={collection}
        onToggleCollection={() => {}} // Desativado
        theme={theme}
      />
      
      <main className="flex-grow">
        <Hero collection={collection} theme={theme} />
        
        <CatalogSection 
          collection={collection}
          setCollection={() => {}} // Desativado
          products={watches}
          campaigns={campaigns}
          onSelectProduct={openProduct}
          theme={theme}
        />

        <AboutSection theme={theme} />
        <TrustSection theme={theme} />
      </main>

      <Footer theme={theme} />

      <MobileNav 
        currentCollection={collection}
        onToggleCollection={() => {}}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        theme={theme}
      />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeProduct}
          onAddToCart={addToCart}
          theme={theme}
        />
      )}

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        theme={theme}
      />

      {isCheckoutOpen && (
        <CheckoutForm 
          cart={cart} 
          onClose={() => setIsCheckoutOpen(false)} 
          theme={theme}
        />
      )}
    </div>
  );
};

export default App;
