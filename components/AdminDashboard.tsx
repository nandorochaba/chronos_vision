
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
  const [activeTab, setActiveTab] = useState<'products' | 'campaigns' | 'setup'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<WatchProduct> | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const check = async () => {
      const isUp = await CloudDatabase.checkConnection();
      setCloudStatus(isUp ? 'online' : 'offline');
    };
    check();
  }, []);

  const handleGlobalPublish = async () => {
    setIsSyncing(true);
    try {
      await CloudDatabase.pushData({ products, campaigns });
      setCloudStatus('online');
      alert('🌟 SUCESSO ABSOLUTO!\n\nAs alterações foram propagadas para a nuvem global. Todos os dispositivos que acessarem o site agora verão as novas informações instantaneamente.');
    } catch (error) {
      alert('⚠️ FALHA NA SINCRONIZAÇÃO:\n\n1. Verifique se você está conectado à internet.\n2. O servidor de banco de dados pode estar temporariamente instável.\n3. Tente novamente em alguns segundos.');
      setCloudStatus('offline');
    } finally {
      setIsSyncing(false);
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
      
      {/* Admin Mastery Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
             <h1 className="text-3xl font-serif tracking-widest uppercase">Chronos<span className="text-[#C6A75E]">&</span>Vision</h1>
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  cloudStatus === 'online' ? 'bg-[#C6A75E] shadow-[0_0_10px_#C6A75E]' : 
                  cloudStatus === 'checking' ? 'bg-blue-400' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                }`}></div>
                <span className="text-[9px] uppercase tracking-widest font-black">
                  {cloudStatus === 'online' ? 'Sincronização Ativa' : 
                   cloudStatus === 'checking' ? 'Verificando Link...' : 'Erro de Conexão'}
                </span>
             </div>
          </div>
          <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">Painel de Curadoria Central (Master Admin)</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav className="flex bg-white/5 p-1 rounded-sm border border-white/10">
            {[
              { id: 'products', label: 'Estoque' },
              { id: 'campaigns', label: 'Editoriais' },
              { id: 'setup', label: 'Ajuda' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-2.5 text-[9px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#C6A75E] text-black font-black' : 'opacity-40 hover:opacity-100'}`}
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
            {isSyncing ? 'CONECTANDO...' : 'PUBLICAR MUDANÇAS'}
          </button>

          <button onClick={onExit} className="text-[9px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity">Sair</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'products' && (
          <div className="space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-serif italic">Gerenciar Catálogo</h2>
                <p className="text-xs opacity-40 mt-1 uppercase tracking-widest">Edite aqui para atualizar em todo o mundo</p>
              </div>
              <button 
                onClick={() => setEditingProduct({
                  name: '', collection: 'masculine', category: 'Clássico', 
                  price: 0, material: '', shortDescription: '', longDescription: '',
                  mainImage: '', gallery: [], specs: { movimento: '', caixa: '', pulseira: '', resistencia: '', diametro: '' }
                })}
                className="bg-white text-black px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#C6A75E] transition-all"
              >
                Nova Peça +
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-[#141414] border border-white/5 p-6 space-y-4 group hover:border-[#C6A75E]/30 transition-all">
                  <div className="aspect-[3/4] bg-black overflow-hidden border border-white/5 relative">
                    <img src={product.mainImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg leading-tight truncate">{product.name}</h3>
                    <p className="text-[#C6A75E] font-serif text-lg">{product.priceLabel}</p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button onClick={() => setEditingProduct(product)} className="flex-1 py-3 text-[9px] uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-colors">Editar</button>
                    <button onClick={() => { if(confirm('Remover?')) onSaveProducts(products.filter(p => p.id !== product.id)); }} className="px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                       Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'setup' && (
          <div className="max-w-2xl mx-auto py-20 text-center space-y-10 animate-[fade-in_0.5s_ease-out]">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif">Como funciona a Sincronização?</h2>
              <div className={`h-px w-20 bg-[#C6A75E] mx-auto`}></div>
            </div>
            
            <div className="grid gap-6 text-left">
              <div className="bg-white/5 p-8 border border-white/5">
                <h3 className="text-[#C6A75E] text-[10px] uppercase font-black tracking-widest mb-4">1. Edição Local</h3>
                <p className="text-sm opacity-60 leading-relaxed italic">Ao clicar em "Editar" ou "Adicionar", você está mudando os dados apenas neste navegador por enquanto. Isso permite que você revise tudo antes de enviar para os clientes.</p>
              </div>
              <div className="bg-white/5 p-8 border border-white/5">
                <h3 className="text-[#C6A75E] text-[10px] uppercase font-black tracking-widest mb-4">2. Publicação Global</h3>
                <p className="text-sm opacity-60 leading-relaxed italic">Quando você clica no botão dourado <strong>"PUBLICAR MUDANÇAS"</strong>, o app envia todo o seu estoque para o nosso servidor master na nuvem.</p>
              </div>
              <div className="bg-white/5 p-8 border border-white/5">
                <h3 className="text-[#C6A75E] text-[10px] uppercase font-black tracking-widest mb-4">3. Atualização nos Celulares</h3>
                <p className="text-sm opacity-60 leading-relaxed italic">Assim que o cliente abre o site no celular dele, o app faz uma busca rápida na nuvem e baixa as fotos e preços que você acabou de publicar.</p>
              </div>
            </div>

            <div className="p-10 border border-[#C6A75E]/20 bg-[#C6A75E]/5">
              <p className="text-xs uppercase tracking-[0.2em] leading-relaxed">
                Se aparecer "Erro de Conexão", verifique se o seu Wi-Fi está ativo. <br/>
                O sistema é feito para ser usado por <strong>um único administrador</strong> (você) para evitar conflitos de dados.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
           <div className="grid md:grid-cols-2 gap-10">
            {campaigns.map(camp => (
              <div key={camp.id} className="bg-[#141414] border border-white/5 p-10 space-y-8 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[9px] uppercase tracking-widest text-[#C6A75E] font-black">{camp.collection === 'masculine' ? 'Heritage' : 'Ethereal'}</h3>
                    <h2 className="text-3xl font-serif mt-1">{camp.title}</h2>
                  </div>
                  <button onClick={() => setEditingCampaign(camp)} className="px-6 py-2 border border-white/10 text-[9px] uppercase tracking-widest hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all">Editar</button>
                </div>
                <div className="aspect-video overflow-hidden bg-black border border-white/5">
                  <img src={camp.imageUrl} className="w-full h-full object-cover opacity-60" />
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
            <h2 className="text-4xl font-serif mb-12">Refinar Peça</h2>
            <form onSubmit={handleSaveProduct} className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest opacity-40">Nome</label>
                  <input required className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-2xl outline-none focus:border-[#C6A75E]" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Preço (Ex: 12500)</label>
                    <input type="number" required className="w-full bg-transparent border-b border-white/10 py-4 text-xl outline-none focus:border-[#C6A75E]" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Material</label>
                    <input required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C6A75E]" value={editingProduct.material} onChange={e => setEditingProduct({...editingProduct, material: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest opacity-40">Link da Imagem (Unsplash ou Outro)</label>
                  <input required className="w-full bg-transparent border-b border-white/10 py-4 text-xs font-mono outline-none focus:border-[#C6A75E]" value={editingProduct.mainImage} onChange={e => setEditingProduct({...editingProduct, mainImage: e.target.value})} />
                </div>
              </div>
              <div className="space-y-8">
                 <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Descrição Curta</label>
                    <textarea className="w-full bg-white/5 border border-white/10 p-5 h-40 outline-none focus:border-[#C6A75E] text-sm italic font-light resize-none leading-relaxed" value={editingProduct.shortDescription} onChange={e => setEditingProduct({...editingProduct, shortDescription: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Coleção</label>
                    <select className="w-full bg-black border-b border-white/10 py-4 outline-none text-[10px] uppercase font-bold tracking-widest" value={editingProduct.collection} onChange={e => setEditingProduct({...editingProduct, collection: e.target.value as CollectionType})}>
                      <option value="masculine">Masculino</option>
                      <option value="feminine">Feminino</option>
                    </select>
                   </div>
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Tipo</label>
                    <input className="w-full bg-transparent border-b border-white/10 py-4 outline-none" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} />
                   </div>
                 </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-10 pt-16 border-t border-white/5">
                <button type="button" onClick={() => setEditingProduct(null)} className="text-[10px] uppercase opacity-30">Cancelar</button>
                <button type="submit" className="bg-[#C6A75E] text-black px-20 py-5 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Salvar Localmente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Campanha */}
      {editingCampaign && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#0B0B0B] w-full max-w-3xl p-16 border border-white/10 shadow-2xl">
            <h2 className="text-4xl font-serif mb-10">Editorial</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSaveCampaigns(campaigns.map(c => c.id === editingCampaign.id ? editingCampaign : c)); setEditingCampaign(null); }} className="space-y-8">
              <input required className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-3xl outline-none focus:border-[#C6A75E]" value={editingCampaign.title} onChange={e => setEditingCampaign({...editingCampaign, title: e.target.value})} />
              <textarea className="w-full bg-white/5 p-6 h-32 outline-none text-sm focus:border-[#C6A75E] resize-none" value={editingCampaign.description} onChange={e => setEditingCampaign({...editingCampaign, description: e.target.value})} />
              <input required className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#C6A75E] text-xs font-mono" value={editingCampaign.imageUrl} onChange={e => setEditingCampaign({...editingCampaign, imageUrl: e.target.value})} />
              <div className="flex justify-end gap-8 pt-10">
                <button type="button" onClick={() => setEditingCampaign(null)} className="text-[10px] uppercase opacity-30">Cancelar</button>
                <button type="submit" className="bg-[#C6A75E] text-black px-16 py-4 text-[10px] font-black uppercase tracking-widest">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
