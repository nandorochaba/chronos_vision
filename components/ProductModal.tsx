
import React, { useState, useRef } from 'react';
import { WatchProduct } from '../types';

interface ProductModalProps {
  product: WatchProduct;
  onClose: () => void;
  onAddToCart: (product: WatchProduct) => void;
  theme: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, theme }) => {
  const allMedia = [
    { type: 'image', url: product.mainImage },
    ...product.gallery.map(url => ({ type: 'image', url }))
  ];

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'style'>('info');
  const galleryRef = useRef<HTMLDivElement>(null);

  const scrollToMedia = (index: number) => {
    setActiveMediaIndex(index);
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * index;
      galleryRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollGallery = () => {
    if (galleryRef.current) {
      const index = Math.round(galleryRef.current.scrollLeft / galleryRef.current.clientWidth);
      setActiveMediaIndex(index);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black animate-[fade-in_0.3s_ease-out] overflow-y-auto no-scrollbar">
      {/* Overlay para Desktop */}
      <div className="hidden md:block absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className={`relative w-full min-h-full md:min-h-0 md:h-[95vh] md:max-w-7xl md:mx-auto md:my-[2.5vh] ${theme.sectionBg} flex flex-col md:flex-row md:rounded-xl shadow-2xl overflow-visible md:overflow-hidden`}>
        
        {/* BOTAO FECHAR (Sticky Mobile) */}
        <button 
          onClick={onClose} 
          className="fixed top-6 right-6 z-[300] p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white shadow-2xl active:scale-90 transition-all md:absolute"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5}/></svg>
        </button>

        {/* GALERIA: No mobile ela faz parte do scroll principal, desaparecendo ao rolar */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-full relative bg-black shrink-0">
          <div 
            ref={galleryRef}
            onScroll={handleScrollGallery}
            className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {allMedia.map((media, i) => (
              <div key={i} className="min-w-full h-full snap-center relative">
                <img src={media.url} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 px-6 z-20">
            {allMedia.map((_, i) => (
              <button 
                key={i} 
                onClick={() => scrollToMedia(i)}
                className={`h-1 transition-all duration-300 rounded-full ${activeMediaIndex === i ? 'w-10 bg-[#C6A75E]' : 'w-2 bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="w-full md:w-[45%] flex flex-col bg-[#0B0B0B] min-h-screen md:min-h-0">
          
          <div className="p-8 md:p-12 pb-6 border-b border-white/5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#C6A75E] font-black">{product.category}</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">{product.name}</h2>
            <div className="flex flex-col pt-4">
               <div className="flex items-center gap-3">
                  {product.originalPriceLabel && (
                    <span className="text-sm opacity-20 line-through font-serif decoration-[#C6A75E]/40">
                      {product.originalPriceLabel}
                    </span>
                  )}
                  <span className="text-3xl font-serif text-[#C6A75E]">{product.priceLabel}</span>
               </div>
               <span className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Até {product.maxInstallments}x de R$ {(product.price / product.maxInstallments).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="flex-grow p-8 md:p-12 space-y-12 pb-44">
            
            <div className="flex justify-between md:justify-start md:gap-10 border-b border-white/5">
              {[
                { id: 'info', label: 'Conceito' },
                { id: 'specs', label: 'Ficha' },
                { id: 'style', label: 'Estilo' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`text-[10px] uppercase tracking-[0.2em] font-black pb-4 transition-all relative ${activeTab === tab.id ? 'text-white' : 'opacity-20 hover:opacity-100'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C6A75E]" />}
                </button>
              ))}
            </div>

            <div className="animate-[fade-in_0.5s_ease-out]">
              {activeTab === 'info' && (
                <div className="space-y-8">
                  <p className="text-xl md:text-2xl font-serif italic leading-relaxed opacity-90 text-[#C6A75E]">
                    "{product.shortDescription}"
                  </p>
                  <p className="text-base opacity-60 leading-relaxed font-light">
                    {product.longDescription}
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid gap-4">
                  {[
                    { label: 'Movimento', value: product.specs.movimento },
                    { label: 'Material', value: product.material },
                    { label: 'Resistência', value: product.specs.resistencia },
                    { label: 'Diâmetro', value: product.specs.diametro },
                    { label: 'Parcelamento', value: `${product.maxInstallments}x S/ Juros` }
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                      <span className="text-[10px] uppercase tracking-widest opacity-30">{s.label}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'style' && (
                <div className="space-y-8">
                  <div className="p-8 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-sm italic font-serif leading-relaxed opacity-90">
                      {product.lifestyleCopy}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-10 grid grid-cols-2 gap-8 opacity-40 border-t border-white/5">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={2}/></svg>
                  <span className="text-[9px] uppercase tracking-widest font-black">Frete Grátis</span>
               </div>
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" strokeWidth={2}/></svg>
                  <span className="text-[9px] uppercase tracking-widest font-black">Garantia VIP</span>
               </div>
            </div>
          </div>

          {/* RODAPÉ DE AÇÃO FIXO NO MOBILE COM GRADIENTE */}
          <div className="fixed md:absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent z-[100]">
            <div className="flex gap-4 max-w-4xl mx-auto items-center">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="flex-grow py-6 bg-[#C6A75E] text-black text-[10px] uppercase tracking-[0.5em] font-black shadow-[0_15px_40px_rgba(198,167,94,0.4)] hover:brightness-110 active:scale-95 transition-all rounded-xl"
              >
                Garantir o Meu
              </button>
              <button 
                onClick={() => window.open(`https://wa.me/559898465825?text=Olá! Gostaria de detalhes do ${product.name}.`, '_blank')}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-90 transition-all text-[#C6A75E]"
                aria-label="WhatsApp"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.228L6.3 18.254l3.16-.944c.885.509 1.711.865 2.571.865 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ProductModal;
