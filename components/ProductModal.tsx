
import React, { useState } from 'react';
import { WatchProduct } from '../types';

interface ProductModalProps {
  product: WatchProduct;
  onClose: () => void;
  onAddToCart: (product: WatchProduct) => void;
  theme: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, theme }) => {
  // Integramos o vídeo no fluxo de mídia como o primeiro item se existir
  const mediaItems = [
    ...(product.videoUrl ? [{ type: 'video', url: product.videoUrl }] : []),
    { type: 'image', url: product.mainImage },
    ...product.gallery.filter(url => url.length > 0).map(url => ({ type: 'image', url }))
  ];

  const [activeMedia, setActiveMedia] = useState(mediaItems[0]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-[fade-in_0.3s_ease-out]">
      <div 
        className={`absolute inset-0 ${theme.bg}/95 backdrop-blur-xl`}
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-6xl max-h-[90vh] ${theme.sectionBg} border ${theme.border} overflow-y-auto overflow-x-hidden rounded-sm flex flex-col md:flex-row shadow-2xl`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 opacity-50 hover:opacity-100 transition-opacity p-2 bg-black/5 rounded-full"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gallery / Media Container */}
        <div className={`w-full md:w-1/2 ${theme.bg} relative flex flex-col`}>
          <div className="flex-grow relative overflow-hidden h-[45vh] md:h-auto min-h-[400px] flex items-center justify-center bg-black">
            {activeMedia.type === 'video' ? (
              <video 
                key={activeMedia.url}
                src={activeMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover animate-[image-swap_0.8s_cubic-bezier(0.19,1,0.22,1)]"
              />
            ) : (
              <img 
                key={activeMedia.url}
                src={activeMedia.url} 
                alt={product.name} 
                className="w-full h-full object-cover animate-[image-swap_0.8s_cubic-bezier(0.19,1,0.22,1)]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {activeMedia.type === 'video' && (
              <div className="absolute top-6 left-6 px-3 py-1 bg-[#C6A75E] text-black text-[7px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2">
                <span className="w-1 h-1 bg-black rounded-full animate-pulse"></span>
                Apresentação Digital
              </div>
            )}
          </div>
          
          {/* Thumbnails Grid with Video Indicator */}
          <div className={`grid grid-cols-4 gap-px ${theme.border} bg-current/10 p-1`}>
            {mediaItems.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveMedia(item)}
                className="relative aspect-square overflow-hidden group focus:outline-none bg-black"
              >
                {item.type === 'video' ? (
                  <>
                    <video src={item.url} className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <svg className="w-3 h-3 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.url} 
                    alt={`${product.name} thumbnail ${i}`} 
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      activeMedia.url === item.url ? 'opacity-100 grayscale-0 scale-110' : 'opacity-40 grayscale group-hover:opacity-70'
                    }`} 
                  />
                )}
                {activeMedia.url === item.url && (
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme.accentBg} animate-[slide-up_0.5s_ease-out]`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info Area */}
        <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-16 space-y-10 flex flex-col justify-center">
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
               <span className={`w-10 h-px ${theme.accentBg}`}></span>
               <span className={`text-[9px] ${theme.accent} tracking-[0.4em] uppercase font-black`}>Mestria {product.collection === 'masculine' ? 'Heritage' : 'Ethereal'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">{product.name}</h2>
            <div className="flex items-center justify-between pt-2">
              <p className={`${theme.muted} tracking-[0.3em] uppercase text-[9px] font-black`}>{product.material}</p>
              <p className="text-2xl font-serif opacity-90">{product.priceLabel}</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className={`text-lg lg:text-xl ${theme.muted} leading-relaxed font-light italic border-l-2 ${theme.accentBorder} pl-8 opacity-90`}>
              "{product.shortDescription}"
            </p>
            <p className={`${theme.muted} leading-relaxed text-sm font-light opacity-75`}>
              {product.longDescription}
            </p>
          </div>

          <div className={`space-y-6 pt-10 border-t ${theme.border}`}>
            <h4 className="text-[9px] tracking-[0.4em] uppercase font-black opacity-30">Especificações de Curadoria</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-[11px]">
              {[
                { label: 'Movimento', value: product.specs.movimento },
                { label: 'Caixa', value: product.specs.caixa },
                { label: 'Pulseira', value: product.specs.pulseira },
                { label: 'Resistência', value: product.specs.resistencia },
                { label: 'Diâmetro', value: product.specs.diametro }
              ].map((spec, idx) => (
                <li key={idx} className={`flex flex-col border-b ${theme.border} pb-2 group hover:border-current/40 transition-colors`}>
                  <span className={`text-[8px] ${theme.accent} uppercase mb-1.5 opacity-60 tracking-widest`}>{spec.label}</span>
                  <span className="font-semibold tracking-wide">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`w-full py-6 ${theme.accentBg} text-white md:text-black text-[10px] uppercase tracking-[0.3em] font-black hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center space-x-4 shadow-2xl overflow-hidden relative group`}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="relative z-10">Adicionar à Coleção</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes image-swap {
          0% { opacity: 0; transform: scale(1.05); filter: blur(5px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
