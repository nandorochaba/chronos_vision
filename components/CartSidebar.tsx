
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
  theme: any;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onCheckout, theme }) => {
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className={`fixed inset-0 z-[150] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md ${theme.sectionBg} ${theme.text} shadow-2xl transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`p-8 border-b ${theme.border} flex justify-between items-center`}>
          <h2 className="text-xl font-serif">Seu Carrinho</h2>
          <button onClick={onClose} className="opacity-50 hover:opacity-100">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-xs uppercase tracking-widest">Seu carrinho está vazio</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex space-x-4">
                <div className={`w-20 h-24 ${theme.bg}`}>
                  <img src={item.product.mainImage} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-serif">{item.product.name}</h3>
                    <span className={`text-xs ${theme.accent}`}>{item.product.priceLabel}</span>
                  </div>
                  <p className={`text-[10px] opacity-40 uppercase tracking-widest`}>{item.product.material}</p>
                  <div className="flex items-center space-x-4 pt-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, -1)} className={`w-6 h-6 border ${theme.border} flex items-center justify-center hover:${theme.accentBorder} transition-colors`}>-</button>
                    <span className="text-xs">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, 1)} className={`w-6 h-6 border ${theme.border} flex items-center justify-center hover:${theme.accentBorder} transition-colors`}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={`p-8 border-t ${theme.border} ${theme.bg} space-y-6`}>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest opacity-50">Total Estimado</span>
              <span className="text-2xl font-serif">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <button 
              onClick={onCheckout}
              className={`w-full py-5 ${theme.accentBg} text-white md:text-black text-xs uppercase tracking-[0.2em] font-black hover:opacity-90 transition-all`}
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
