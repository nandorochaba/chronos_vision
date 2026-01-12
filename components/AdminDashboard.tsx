
import React, { useState, useEffect } from 'react';
import { WatchProduct, Campaign, CollectionType } from '../types';
import { CloudDatabase } from '../cloudDb';

interface AdminDashboardProps {
  products: WatchProduct[];
  campaigns: Campaign[];
  onSaveProducts: (products: WatchProduct[]) => void;
  onSaveCampaigns: (campaigns: Campaign[]) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  campaigns, 
  onSaveProducts, 
  onSaveCampaigns, 
  onExit 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'campaigns'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<WatchProduct> | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleGlobalPublish = async () => {
    setIsSyncing(true);
    try {
      await CloudDatabase.pushData({ products, campaigns });
      alert('✅ PUBLICADO COM SUCESSO!\n\nSeu catálogo foi atualizado em todos os dispositivos conectados. Todos os clientes agora verão os novos preços e produtos.');
    } catch (error) {
      alert('❌ ERRO NA PUBLICAÇÃO: Verifique sua conexão com a internet.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Deseja realmente remover esta peça do catálogo global?')) {
      onSaveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const newProduct = {
      ...editingProduct,
      id: editingProduct.id || `watch-${Date.now()}`,
      priceLabel: `R$ ${Number(editingProduct.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    } as WatchProduct;

    const exists = products.find(p => p.id === newProduct.id);
    if (exists) {
      onSaveProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    } else {
      onSaveProducts([...products, newProduct]);
    }
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] font-sans p-6 md:p-12 selection:bg-[#C6A75E] selection:text-black">
      
      {/* Header Admin Modernizado */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-serif tracking-widest uppercase">Chronos<span className="text-[#C6A75E]">&</span>Vision</h1>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#C6A75E] shadow-[0_0_10px_#C6A75E]"></div>
                <span className="text-[8px] uppercase tracking-widest opacity-60">Servidor Master Online</span>
             </div>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">Gerenciador de Experiência do Cliente</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav className="flex bg-white/5 p-1 rounded-sm border border-white/10">
            {[
              { id: 'products', label: 'Estoque' },
              { id: 'campaigns', label: 'Editoriais' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-2.5 text-[9px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#C6A75E] text-black font-black shadow-lg' : 'opacity-40 hover:opacity-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={handleGlobalPublish}
            disabled={isSyncing}
            className={`px-10 py-3 bg-[#C6A75E] text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(198,167,94,0.3)] ${isSyncing ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isSyncing ? 'ATUALIZANDO NUVEM...' : 'PUBLICAR NO SITE'}
          </button>

          <button onClick={onExit} className="text-[9px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Sair</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'products' && (
          <div className="space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-serif italic">Acervo Digital</h2>
                <p className="text-xs opacity-40 mt-1 uppercase tracking-widest">Total: {products.length} peças</p>
              </div>
              <button 
                onClick={() => setEditingProduct({
                  name: '', collection: 'masculine', category: 'Clássico', 
                  price: 0, material: '', shortDescription: '', longDescription: '',
                  mainImage: '', gallery: [], specs: { movimento: '', caixa: '', pulseira: '', resistencia: '', diametro: '' }
                })}
                className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#C6A75E] transition-all"
              >
                Adicionar Peça +
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-[#141414] border border-white/5 p-6 space-y-4 group hover:border-[#C6A75E]/30 transition-all">
                  <div className="aspect-[3/4] bg-black overflow-hidden border border-white/5 relative">
                    <img src={product.mainImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 text-[8px] uppercase tracking-widest font-black text-[#C6A75E]">
                      {product.collection === 'masculine' ? 'H' : 'E'}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg leading-tight truncate">{product.name}</h3>
                    <p className="text-[9px] uppercase tracking-widest opacity-40 mb-3">{product.category}</p>
                    <p className="text-[#C6A75E] font-serif text-lg">{product.priceLabel}</p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button onClick={() => setEditingProduct(product)} className="flex-1 py-3 text-[9px] uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-colors">Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
           <div className="grid md:grid-cols-2 gap-10">
            {campaigns.map(camp => (
              <div key={camp.id} className="bg-[#141414] border border-white/5 p-10 space-y-8 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[9px] uppercase tracking-widest text-[#C6A75E] font-black">{camp.collection === 'masculine' ? 'Editorial Heritage' : 'Editorial Ethereal'}</h3>
                    <h2 className="text-3xl font-serif mt-1">{camp.title}</h2>
                  </div>
                  <button onClick={() => setEditingCampaign(camp)} className="px-6 py-2 border border-white/10 text-[9px] uppercase tracking-widest hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all">Editar Design</button>
                </div>
                <div className="aspect-video overflow-hidden bg-black border border-white/5">
                  <img src={camp.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
                <div className="space-y-2 opacity-60">
                  <p className="text-xs italic leading-relaxed">"{camp.description}"</p>
                  <p className="text-[10px] uppercase tracking-widest font-black">{camp.region}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Edição Produto */}
      {editingProduct && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl">
          <div className="bg-[#0B0B0B] w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-start mb-12">
               <h2 className="text-4xl font-serif">{editingProduct.id ? 'Refinar Peça' : 'Nova Obra Prima'}</h2>
               <p className="text-[9px] uppercase tracking-[0.4em] opacity-30">Especificações de Luxo</p>
            </div>

            <form onSubmit={handleSaveProduct} className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest opacity-40">Nome de Exibição</label>
                  <input required className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-2xl outline-none focus:border-[#C6A75E] transition-colors" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Preço Venda (R$)</label>
                    <input type="number" required className="w-full bg-transparent border-b border-white/10 py-4 text-xl outline-none focus:border-[#C6A75E]" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Material Base</label>
                    <input required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C6A75E]" value={editingProduct.material} onChange={e => setEditingProduct({...editingProduct, material: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest opacity-40">URL da Imagem de Capa</label>
                  <input required className="w-full bg-transparent border-b border-white/10 py-4 text-xs font-mono outline-none focus:border-[#C6A75E]" value={editingProduct.mainImage} onChange={e => setEditingProduct({...editingProduct, mainImage: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-8">
                 <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Storytelling / Descrição Curta</label>
                    <textarea className="w-full bg-white/5 border border-white/10 p-5 h-40 outline-none focus:border-[#C6A75E] text-sm italic font-light resize-none leading-relaxed" value={editingProduct.shortDescription} onChange={e => setEditingProduct({...editingProduct, shortDescription: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Linha Editorial</label>
                    <select className="w-full bg-black border-b border-white/10 py-4 outline-none text-[10px] uppercase font-bold tracking-widest" value={editingProduct.collection} onChange={e => setEditingProduct({...editingProduct, collection: e.target.value as CollectionType})}>
                      <option value="masculine">Heritage (Masculino)</option>
                      <option value="feminine">Ethereal (Feminino)</option>
                    </select>
                   </div>
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Tipo/Categoria</label>
                    <input className="w-full bg-transparent border-b border-white/10 py-4 outline-none" placeholder="Ex: Cronógrafo, Slim..." value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} />
                   </div>
                 </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-10 pt-16 border-t border-white/5">
                <button type="button" onClick={() => setEditingProduct(null)} className="text-[10px] uppercase opacity-30 hover:opacity-100 transition-opacity">Descartar Mudanças</button>
                <button type="submit" className="bg-[#C6A75E] text-black px-20 py-5 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(198,167,94,0.2)]">Confirmar e Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Campanha */}
      {editingCampaign && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#0B0B0B] w-full max-w-3xl p-16 border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-serif mb-10">Editorial de Campanha</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSaveCampaigns(campaigns.map(c => c.id === editingCampaign.id ? editingCampaign : c)); setEditingCampaign(null); }} className="space-y-8">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest opacity-40">Título da Campanha</label>
                <input required className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-3xl outline-none focus:border-[#C6A75E]" value={editingCampaign.title} onChange={e => setEditingCampaign({...editingCampaign, title: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest opacity-40">Descrição de Apoio</label>
                <textarea className="w-full bg-white/5 p-6 h-32 outline-none text-sm focus:border-[#C6A75E] resize-none leading-relaxed opacity-80" value={editingCampaign.description} onChange={e => setEditingCampaign({...editingCampaign, description: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest opacity-40">URL da Imagem de Fundo (Editorial)</label>
                <input required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C6A75E] text-xs font-mono" value={editingCampaign.imageUrl} onChange={e => setEditingCampaign({...editingCampaign, imageUrl: e.target.value})} />
              </div>
              <div className="flex justify-end gap-8 pt-10">
                <button type="button" onClick={() => setEditingCampaign(null)} className="text-[10px] uppercase opacity-30">Cancelar</button>
                <button type="submit" className="bg-[#C6A75E] text-black px-16 py-4 text-[10px] font-black uppercase tracking-widest">Salvar Editorial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
