
import React, { useState, useRef, useEffect } from 'react';
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

  const handleScroll = () => {
    if (galleryRef.current) {
      const index = Math.round(galleryRef.current.scrollLeft / galleryRef.current.clientWidth);
      setActiveMediaIndex(index);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black animate-[fade-in_0.3s_ease-out] overflow-y-auto no-scrollbar">
      {/* Background Overlay for Desktop */}
      <div className="hidden md:block absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      {/* Container Principal */}
      <div className={`relative w-full min-h-full md:min-h-0 md:h-[95vh] md:max-w-7xl md:mx-auto md:my-[2.5vh] ${theme.sectionBg} flex flex-col md:flex-row md:rounded-xl shadow-2xl overflow-visible md:overflow-hidden`}>
        
        {/* BOTAO FECHAR FIXO NO TOPO MOBILE */}
        <button 
          onClick={onClose} 
          className="fixed top-5 right-5 z-[300] p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white shadow-xl hover:scale-110 active:scale-90 transition-all"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2.5}/></svg>
        </button>

        {/* LADO ESQUERDO: GALERIA (No mobile ela sobe com o scroll da página) */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-full relative bg-black shrink-0">
          <div 
            ref={galleryRef}
            onScroll={handleScroll}
            className="flex h-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {allMedia.map((media, i) => (
              <div key={i} className="min-w-full h-full snap-center relative">
                <img src={media.url} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* INDICADORES */}
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

        {/* LADO DIREITO: CONTEÚDO */}
        <div className="w-full md:w-[45%] flex flex-col bg-[#0B0B0B] min-h-screen md:min-h-0">
          
          {/* HEADER INFORMATIVO */}
          <div className="p-8 md:p-12 pb-6 border-b border-white/5 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[#C6A75E] font-black">{product.category}</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-none">{product.name}</h2>
            <div className="flex items-baseline gap-4 pt-4">
               <span className="text-3xl font-serif text-[#C6A75E]">{product.priceLabel}</span>
               <span className="text-[10px] opacity-40 uppercase tracking-widest">Em até 12x</span>
            </div>
          </div>

          {/* ÁREA DE TABS E TEXTO */}
          <div className="flex-grow p-8 md:p-12 space-y-12 pb-40">
            
            {/* SELETOR DE ABAS ERGONÔMICO */}
            <div className="flex justify-between md:justify-start md:gap-10 border-b border-white/5">
              {[
                { id: 'info', label: 'Essência' },
                { id: 'specs', label: 'Técnico' },
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

            {/* CONTEÚDO DA ABA */}
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
                    { label: 'Mostrador', value: product.specs.vidro },
                    { label: 'Diâmetro', value: product.specs.diametro },
                    { label: 'Resistência', value: product.specs.resistencia }
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

            {/* COMPRA SEGURA BADGES */}
            <div className="pt-10 grid grid-cols-2 gap-8 opacity-40 border-t border-white/5">
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth={2}/></svg>
                  <span className="text-[9px] uppercase tracking-widest font-black">Frete Prioritário</span>
               </div>
               <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" strokeWidth={2}/></svg>
                  <span className="text-[9px] uppercase tracking-widest font-black">Garantia 1 Ano</span>
               </div>
            </div>
          </div>

          {/* BOTÃO DE AÇÃO FIXO NO MOBILE */}
          <div className="fixed md:absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent z-[100] md:z-50">
            <div className="flex gap-4 max-w-4xl mx-auto">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="flex-grow py-6 bg-[#C6A75E] text-black text-xs uppercase tracking-[0.5em] font-black shadow-[0_15px_40px_rgba(198,167,94,0.4)] hover:brightness-110 active:scale-95 transition-all rounded-lg"
              >
                Garantir o Meu
              </button>
              <button 
                onClick={() => window.open(`https://wa.me/559898465825?text=Olá! Quero saber mais sobre o ${product.name}.`, '_blank')}
                className="p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.228L6.3 18.254l3.16-.944c.885.509 1.711.865 2.571.865 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default ProductModal;
