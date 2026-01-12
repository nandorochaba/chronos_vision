
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
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [activeMedia]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 animate-[fade-in_0.4s_ease-out]">
      <div 
        className={`absolute inset-0 ${theme.bg}/98 backdrop-blur-2xl`}
        onClick={onClose}
      />
      
      <div className={`relative w-full h-full md:h-auto md:max-w-6xl md:max-h-[90vh] ${theme.sectionBg} md:border ${theme.border} overflow-y-auto overflow-x-hidden md:rounded-sm flex flex-col md:flex-row shadow-2xl`}>
        
        {/* Close Button - More ergonomic and visible */}
        <button 
          onClick={onClose}
          className="fixed md:absolute top-6 right-6 z-[250] opacity-80 hover:opacity-100 transition-opacity p-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full active:scale-90"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gallery / Media Container */}
        <div className={`w-full md:w-1/2 ${theme.bg} relative flex flex-col group/media perspective-1000`}>
          <div className="flex-grow relative overflow-hidden h-[55vh] md:h-auto md:min-h-[450px] flex items-center justify-center bg-[#050505]">
            <div className="absolute inset-0 z-0 bg-black/40"></div>
            
            {activeMedia.type === 'video' ? (
              <div className="relative w-full h-full animate-[atelier-reveal_1.2s_cubic-bezier(0.22,1,0.36,1)]">
                <video 
                  ref={videoRef}
                  key={activeMedia.url}
                  src={activeMedia.url}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-700 pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden z-20">
                  <div 
                    className={`h-full ${theme.accentBg} transition-all duration-150 ease-linear shadow-[0_0_10px_#C6A75E]`}
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <button 
                  onClick={toggleMute}
                  className="absolute bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-700 active:scale-90"
                >
                  {isMuted ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              <img 
                key={activeMedia.url}
                src={activeMedia.url} 
                alt={product.name} 
                className="w-full h-full object-cover animate-[atelier-reveal_1.2s_cubic-bezier(0.22,1,0.36,1)]"
              />
            )}
            
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="px-4 py-1.5 bg-black/40 backdrop-blur-3xl border border-white/10 text-[8px] text-white font-black uppercase tracking-[0.5em] rounded-full flex items-center gap-2.5">
                <span className={`w-1.5 h-1.5 ${activeMedia.type === 'video' ? 'bg-[#C6A75E] animate-pulse shadow-[0_0_8px_#C6A75E]' : 'bg-white/40'} rounded-full`}></span>
                {activeMedia.type === 'video' ? 'Atelier Cinema' : 'Archive Still'}
              </div>
            </div>
          </div>
          
          {/* Enhanced Mobile Thumbs Navigation */}
          <div className={`flex md:grid md:grid-cols-5 gap-px ${theme.border} bg-current/5 p-2 pb-6 md:pb-2 overflow-x-auto no-scrollbar`}>
            {mediaItems.map((item, i) => (
              <button 
                key={i} 
                onClick={() => setActiveMedia(item)}
                className={`flex-shrink-0 w-16 h-16 md:w-auto md:h-auto md:aspect-square relative overflow-hidden focus:outline-none bg-[#0a0a0a] transition-all duration-500 active:scale-95 ${activeMedia.url === item.url ? 'ring-1 ring-inset ring-white/20' : ''}`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center opacity-40">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                ) : (
                  <img src={item.url} className={`w-full h-full object-cover transition-all duration-1000 ${activeMedia.url === item.url ? 'opacity-100' : 'opacity-20 grayscale'}`} />
                )}
                {activeMedia.url === item.url && <div className={`absolute bottom-0 left-0 right-0 h-[4px] ${theme.accentBg} z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.5)]`} />}
              </button>
            ))}
          </div>
        </div>

        {/* Info Area */}
        <div className="w-full md:w-1/2 p-8 md:p-14 lg:p-20 space-y-12 flex flex-col justify-center relative bg-gradient-to-br from-transparent to-black/[0.04] pb-40 md:pb-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-5">
               <span className={`w-14 h-px ${theme.accentBg}`}></span>
               <span className={`text-[10px] ${theme.accent} tracking-[0.6em] uppercase font-black`}>Coleção {product.collection === 'masculine' ? 'Masculina' : 'Feminina'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-8xl font-serif leading-[1.1] tracking-tighter">{product.name}</h2>
            <div className="flex items-center justify-between pt-6">
              <p className={`${theme.muted} tracking-[0.4em] uppercase text-[10px] font-black opacity-50`}>{product.material}</p>
              <div className="flex flex-col items-end">
                <p className="text-3xl font-serif tracking-tight">{product.priceLabel}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className={`text-xl md:text-2xl ${theme.muted} leading-relaxed font-light italic border-l-2 ${theme.accentBorder} pl-10 opacity-95`}>
              "{product.shortDescription}"
            </p>
            <p className={`${theme.muted} leading-relaxed text-base font-light opacity-60 max-w-lg`}>
              {product.longDescription}
            </p>
          </div>

          <div className={`space-y-10 pt-12 border-t ${theme.border}`}>
            <h4 className="text-[10px] tracking-[0.6em] uppercase font-black opacity-30">Especificações do Atelier</h4>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-8 text-[11px]">
              {[
                { label: 'Movimento', value: product.specs.movimento },
                { label: 'Caixa', value: product.specs.caixa },
                { label: 'Pulseira', value: product.specs.pulseira },
                { label: 'Resistência', value: product.specs.resistencia }
              ].map((spec, idx) => (
                <li key={idx} className="flex flex-col border-b border-white/5 pb-3">
                  <span className={`text-[9px] ${theme.accent} uppercase mb-2 opacity-60 tracking-widest`}>{spec.label}</span>
                  <span className="font-semibold opacity-90 truncate tracking-wide">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Floating Mobile CTA Dock - Refined and Sized Down */}
          <div className="fixed md:relative bottom-0 left-0 right-0 p-6 md:p-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-none z-[100] pb-safe flex justify-center">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`w-full md:w-auto md:min-w-[320px] py-4 md:py-5 ${theme.accentBg} text-white md:text-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center space-x-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] group relative overflow-hidden rounded-full md:rounded-sm`}
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="relative z-10">Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes atelier-reveal {
          0% { opacity: 0; transform: scale(1.08); filter: blur(30px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
