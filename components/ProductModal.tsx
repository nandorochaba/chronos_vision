
import React, { useState, useRef, useEffect } from 'react';
import { WatchProduct } from '../types';

interface ProductModalProps {
  product: WatchProduct;
  onClose: () => void;
  onAddToCart: (product: WatchProduct) => void;
  theme: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, theme }) => {
  const mediaItems = [
    ...(product.videoUrl ? [{ type: 'video', url: product.videoUrl }] : []),
    { type: 'image', url: product.mainImage },
    ...product.gallery.filter(url => url.length > 0).map(url => ({ type: 'image', url }))
  ];

  const [activeMedia, setActiveMedia] = useState(mediaItems[0]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12 lg:p-24 animate-[fade-in_0.6s_ease-out]">
      <div 
        className={`absolute inset-0 bg-[#0B0B0B]/95 backdrop-blur-3xl`}
        onClick={onClose}
      />
      
      <div className={`relative w-full h-full md:h-auto md:max-w-7xl md:max-h-[85vh] ${theme.sectionBg} md:border ${theme.border} overflow-y-auto overflow-x-hidden md:rounded-sm flex flex-col md:flex-row shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)]`}>
        
        {/* Close Button - Integrated */}
        <button 
          onClick={onClose}
          className="fixed md:absolute top-8 right-8 z-[250] p-4 bg-white/5 backdrop-blur-3xl rounded-full hover:bg-white/10 transition-all active:scale-90"
        >
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Experience Showcase */}
        <div className={`w-full md:w-[55%] ${theme.bg} relative flex flex-col bg-black`}>
          <div className="flex-grow relative overflow-hidden h-[60vh] md:h-auto flex items-center justify-center">
            {activeMedia.type === 'video' ? (
              <video 
                ref={videoRef}
                key={activeMedia.url}
                src={activeMedia.url}
                autoPlay muted={isMuted} loop playsInline
                className="w-full h-full object-cover animate-[reveal-zoom_1.5s_cubic-bezier(0.22,1,0.36,1)]"
              />
            ) : (
              <img 
                src={activeMedia.url} 
                alt={product.name} 
                className="w-full h-full object-cover animate-[reveal-zoom_1.5s_cubic-bezier(0.22,1,0.36,1)]"
              />
            )}
            
            <div className="absolute top-10 left-10 z-20">
              <div className="px-5 py-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-3">
                <span className={`w-1 h-1 ${activeMedia.type === 'video' ? 'bg-[#C6A75E] shadow-[0_0_8px_#C6A75E]' : 'bg-white/50'} rounded-full`}></span>
                <span className="text-[8px] text-white/80 font-black uppercase tracking-[0.6em]">Heritage Still</span>
              </div>
            </div>
          </div>
          
          <div className={`flex gap-px bg-white/5 p-4 overflow-x-auto no-scrollbar`}>
            {mediaItems.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveMedia(item)}
                className={`flex-shrink-0 w-20 h-20 relative overflow-hidden transition-all duration-700 ${activeMedia.url === item.url ? 'ring-1 ring-white/20' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
              >
                <img src={item.type === 'video' ? product.mainImage : item.url} className="w-full h-full object-cover" />
                {item.type === 'video' && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Details */}
        <div className="w-full md:w-[45%] p-10 md:p-16 lg:p-24 space-y-16 relative pb-40 md:pb-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-6 opacity-40">
               <span className={`w-12 h-px ${theme.accentBg}`}></span>
               <span className="text-[10px] uppercase tracking-[0.8em] font-black">{product.category}</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-tight">{product.name}</h2>
            <p className="text-3xl font-serif text-[#C6A75E] tracking-tight">{product.priceLabel}</p>
          </div>

          <div className="space-y-10">
            <p className={`text-xl md:text-2xl ${theme.muted} leading-relaxed font-light italic opacity-90 border-l-2 ${theme.accentBorder} pl-10`}>
              "{product.shortDescription}"
            </p>
            <p className={`${theme.muted} leading-relaxed text-sm md:text-base font-light opacity-60`}>
              {product.longDescription}
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-y-10 border-t ${theme.border} pt-12`}>
            {[
              { label: 'Movimento', value: product.specs.movimento },
              { label: 'Caixa', value: product.specs.caixa },
              { label: 'Pulseira', value: product.specs.pulseira },
              { label: 'Resistência', value: product.specs.resistencia }
            ].map((spec, idx) => (
              <div key={idx} className="space-y-2">
                <span className={`text-[8px] ${theme.accent} uppercase tracking-[0.4em] font-black opacity-60`}>{spec.label}</span>
                <p className="text-[11px] font-medium opacity-90 uppercase tracking-widest">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Floating Purchase Request */}
          <div className="fixed md:absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black via-black/90 to-transparent md:bg-none z-[100] pb-safe">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className={`w-full py-6 ${theme.accentBg} text-white md:text-black text-[10px] uppercase tracking-[0.6em] font-black hover:opacity-95 active:scale-[0.98] transition-all rounded-full md:rounded-sm shadow-2xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              <span className="relative z-10">Solicitar Reserva</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes reveal-zoom {
          0% { opacity: 0; transform: scale(1.1); filter: blur(20px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ProductModal;
