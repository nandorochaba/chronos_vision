
export type CollectionType = 'masculine' | 'feminine';

export interface WatchProduct {
  id: string;
  name: string;
  collection: CollectionType;
  category: string;
  shortDescription: string;
  longDescription: string;
  material: string;
  price: number;
  priceLabel: string;
  mainImage: string;
  videoUrl?: string; // Campo para vídeo de apresentação
  gallery: string[];
  specs: {
    movimento: string;
    caixa: string;
    pulseira: string;
    resistencia: string;
    diametro: string;
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
