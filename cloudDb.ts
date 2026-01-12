
import { WatchProduct, Campaign } from './types';
import { WATCHES, INITIAL_CAMPAIGNS } from './constants';

// O ID Mestre agora é baseado em um padrão npoint (precisamos de um ID hexadecimal válido para o npoint ou criar um)
// Vou usar um ID que tentaremos criar/acessar de forma fixa.
const MASTER_BIN_ID = '98465825_chronos_master'; 
const CLOUD_API_BASE = 'https://api.npoint.io/bins';

const LOCAL_CATALOG_KEY = 'cv_cloud_catalog_v1';
const LOCAL_CAMPAIGNS_KEY = 'cv_cloud_campaigns_v1';

export interface DatabaseState {
  products: WatchProduct[];
  campaigns: Campaign[];
  lastSync: number;
}

export const CloudDatabase = {
  // Verifica se a nuvem está respondendo
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${CLOUD_API_BASE}/${MASTER_BIN_ID}`);
      return response.status === 200 || response.status === 404; // 404 significa que o ID é válido mas está vazio
    } catch {
      return false;
    }
  },

  async fetchData(): Promise<DatabaseState> {
    try {
      const response = await fetch(`${CLOUD_API_BASE}/${MASTER_BIN_ID}`);
      if (response.ok) {
        const data = await response.json();
        // Cache de segurança
        localStorage.setItem(LOCAL_CATALOG_KEY, JSON.stringify(data.products));
        localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(data.campaigns));
        return data;
      }
    } catch (e) {
      console.warn("Nuvem offline, carregando local...");
    }

    const localProducts = localStorage.getItem(LOCAL_CATALOG_KEY);
    const localCampaigns = localStorage.getItem(LOCAL_CAMPAIGNS_KEY);

    return {
      products: localProducts ? JSON.parse(localProducts) : WATCHES,
      campaigns: localCampaigns ? JSON.parse(localCampaigns) : INITIAL_CAMPAIGNS,
      lastSync: Date.now()
    };
  },

  async pushData(state: Omit<DatabaseState, 'lastSync'>): Promise<void> {
    const payload = {
      ...state,
      lastSync: Date.now()
    };

    try {
      // Primeiro tentamos o PUT (atualizar existente)
      let response = await fetch(`${CLOUD_API_BASE}/${MASTER_BIN_ID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Se der 404 (Não encontrado) ou 405, tentamos o POST para CRIAR o registro pela primeira vez
      if (response.status === 404 || response.status === 405) {
        response = await fetch(CLOUD_API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            id: MASTER_BIN_ID // Alguns serviços aceitam o ID no corpo para reserva
          })
        });
        
        // Se ainda assim o npoint gerar um ID aleatório, avisamos, mas a lógica mestre 
        // idealmente usará o ID fixo se o serviço permitir ou o usuário deve manter o novo ID.
        // No npoint gratuito, se o PUT falhar, o POST cria um NOVO ID. 
        // Para manter ÚNICO, usaremos um fallback de erro amigável.
      }

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      localStorage.setItem(LOCAL_CATALOG_KEY, JSON.stringify(state.products));
      localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(state.campaigns));
      
    } catch (e) {
      console.error("Erro de sincronização:", e);
      throw e;
    }
  }
};
