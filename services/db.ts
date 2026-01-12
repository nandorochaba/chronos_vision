
import { WatchProduct, Campaign } from '../types';
import { WATCHES, INITIAL_CAMPAIGNS } from '../constants';

const CATALOG_KEY = 'cv_cloud_catalog_v1';
const CAMPAIGNS_KEY = 'cv_cloud_campaigns_v1';
const LAST_SYNC_KEY = 'cv_last_sync';

export interface DatabaseState {
  products: WatchProduct[];
  campaigns: Campaign[];
  lastSync: number;
}

export const CloudDatabase = {
  // Simula uma chamada de API para buscar os dados
  async fetchData(): Promise<DatabaseState> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = localStorage.getItem(CATALOG_KEY);
        const campaigns = localStorage.getItem(CAMPAIGNS_KEY);
        const lastSync = localStorage.getItem(LAST_SYNC_KEY);

        resolve({
          products: products ? JSON.parse(products) : WATCHES,
          campaigns: campaigns ? JSON.parse(campaigns) : INITIAL_CAMPAIGNS,
          lastSync: lastSync ? parseInt(lastSync) : Date.now()
        });
      }, 800); // Latência de luxo (simulada)
    });
  },

  // Simula o salvamento na nuvem (Global Sync)
  async pushData(state: Omit<DatabaseState, 'lastSync'>): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = Date.now();
        localStorage.setItem(CATALOG_KEY, JSON.stringify(state.products));
        localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(state.campaigns));
        localStorage.setItem(LAST_SYNC_KEY, timestamp.toString());
        resolve(timestamp);
      }, 1500); // Tempo de propagação simulado
    });
  },

  // Gera um "Token de Nuvem" (JSON) para exportação manual entre plataformas
  generateCloudToken(): string {
    const data = {
      p: JSON.parse(localStorage.getItem(CATALOG_KEY) || '[]'),
      c: JSON.parse(localStorage.getItem(CAMPAIGNS_KEY) || '[]'),
      t: localStorage.getItem(LAST_SYNC_KEY)
    };
    return btoa(JSON.stringify(data));
  },

  // Importa dados de outro dispositivo via Token
  importFromToken(token: string): boolean {
    try {
      const data = JSON.parse(atob(token));
      if (data.p && data.c) {
        localStorage.setItem(CATALOG_KEY, JSON.stringify(data.p));
        localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(data.c));
        localStorage.setItem(LAST_SYNC_KEY, data.t || Date.now().toString());
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
};
