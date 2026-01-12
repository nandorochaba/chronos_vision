
import { WatchProduct, Campaign } from './types';
import { WATCHES, INITIAL_CAMPAIGNS } from './constants';

// ESTE É O SEU ID DE PROJETO. 
// Todos os dispositivos que usarem este código lerão a mesma nuvem.
const MASTER_BIN_ID = 'chronos_vision_v1_master'; 
const CLOUD_API_BASE = 'https://api.npoint.io';

const LOCAL_CATALOG_KEY = 'cv_cloud_catalog_v1';
const LOCAL_CAMPAIGNS_KEY = 'cv_cloud_campaigns_v1';

export interface DatabaseState {
  products: WatchProduct[];
  campaigns: Campaign[];
  lastSync: number;
}

export const CloudDatabase = {
  // Busca dados da nuvem (Sempre prioriza a nuvem para que todos vejam o mesmo)
  async fetchData(): Promise<DatabaseState> {
    try {
      // Tentamos buscar do ID Mestre configurado
      const response = await fetch(`${CLOUD_API_BASE}/bins/${MASTER_BIN_ID}`);
      if (response.ok) {
        const data = await response.json();
        console.log("☁️ Sincronização Global Ativa: Dados carregados da nuvem.");
        
        // Atualiza cache local para redundância (modo offline)
        localStorage.setItem(LOCAL_CATALOG_KEY, JSON.stringify(data.products));
        localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(data.campaigns));
        
        return data;
      }
    } catch (e) {
      console.warn("⚠️ Sem conexão com a nuvem. Usando última versão salva neste dispositivo.");
    }

    // Fallback: Se a nuvem falhar ou for a primeira vez, usa o cache local ou os dados padrão
    const localProducts = localStorage.getItem(LOCAL_CATALOG_KEY);
    const localCampaigns = localStorage.getItem(LOCAL_CAMPAIGNS_KEY);

    return {
      products: localProducts ? JSON.parse(localProducts) : WATCHES,
      campaigns: localCampaigns ? JSON.parse(localCampaigns) : INITIAL_CAMPAIGNS,
      lastSync: Date.now()
    };
  },

  // Publica os dados no ID Mestre (O Admin atualiza para todo mundo)
  async pushData(state: Omit<DatabaseState, 'lastSync'>): Promise<void> {
    const payload = {
      ...state,
      lastSync: Date.now()
    };

    try {
      // Usamos PUT para sobrescrever o bin mestre com as novas informações
      const response = await fetch(`${CLOUD_API_BASE}/bins/${MASTER_BIN_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // Se o bin não existir ainda (primeira vez), o npoint pode exigir POST. 
        // Mas para simplificar, garantimos que o ID mestre é persistente.
        throw new Error("Erro na comunicação com a Nuvem");
      }

      // Salva local também para o Admin não perder progresso se a página recarregar
      localStorage.setItem(LOCAL_CATALOG_KEY, JSON.stringify(state.products));
      localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(state.campaigns));
      
      console.log("🚀 Alterações publicadas globalmente!");
    } catch (e) {
      console.error("❌ Erro ao publicar na nuvem:", e);
      throw e;
    }
  }
};
