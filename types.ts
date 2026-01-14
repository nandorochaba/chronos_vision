
export type CollectionType = 'masculine' | 'feminine';

export interface WatchProduct {
  id: string;
  name: string;
  collection: CollectionType;
  category: string;
  shortDescription: string;
  longDescription: string;
  lifestyleCopy: string;
  material: string;
  price: number;
  priceLabel: string;
  originalPrice?: number; // Preço original para ancoragem
  originalPriceLabel?: string; // Label do preço original
  maxInstallments: number;
  mainImage: string;
  videoUrl?: string;
  gallery: string[];
  specs: {
    movimento: string;
    caixa: string;
    pulseira: string;
    resistencia: string;
    diametro: string;
    vidro: string;
  };
}

export interface Campaign {
  id: string;
  collection: CollectionType;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  region: string;
  imageUrl: string;
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
}

export interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  reference: string;
  city: string;
  cep: string;
}
