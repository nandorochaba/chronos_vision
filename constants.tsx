
import { WatchProduct, Campaign } from './types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-masculine',
    collection: 'masculine',
    title: "Heritage Masterpieces",
    subtitle: "A celebração da engenharia mecânica pura.",
    description: "Uma seleção rigorosa de calibres automáticos disponível para entrega imediata em Santa Luzia e Santa Inês. Onde a tradição encontra a agilidade regional.",
    badge: "Edição Limitada",
    region: "Logística Dedicada Santa Luzia & Santa Inês",
    imageUrl: "https://images.unsplash.com/photo-1548171916-c0ea983ceabd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'camp-feminine',
    collection: 'feminine',
    title: "The Ethereal Glow",
    subtitle: "Onde a madrepérola encontra a luz eterna.",
    description: "Curadoria exclusiva de metais nobres com serviço de Concierge personalizado no Maranhão. Elegância rara ao alcance de um toque.",
    badge: "Exclusividade",
    region: "Entrega Expressa Regional",
    imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=800&auto=format&fit=crop"
  }
];

export const WATCHES: WatchProduct[] = [
  {
    id: 'stellaris-gmt',
    collection: 'masculine',
    category: 'Viajante',
    name: 'Stellaris GMT',
    shortDescription: 'O companheiro definitivo para o viajante moderno.',
    longDescription: 'O Stellaris GMT transcende as fronteiras do tempo. Projetado para quem navega entre fusos horários, sua precisão mecânica é envolvida por um design que evoca a imensidão do céu noturno.',
    material: 'Aço Inoxidável 316L & Vidro Safira',
    price: 12500,
    priceLabel: 'R$ 12.500,00',
    mainImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a1b?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70851-536966141_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Automático Calibre CV-900',
      caixa: 'Aço Escovado Premium',
      pulseira: 'Oyster de 3 elos com ajuste rápido',
      resistencia: '100m (10 ATM)',
      diametro: '42mm'
    }
  },
  {
    id: 'nocturne-onyx',
    collection: 'masculine',
    category: 'Minimalista',
    name: 'Nocturne Onyx',
    shortDescription: 'Minimalismo profundo. Elegância impenetrável.',
    longDescription: 'Uma peça que não grita, mas impõe presença. O Nocturne Onyx celebra a beleza da escuridão com acabamentos em preto fosco e detalhes em grafite polido.',
    material: 'Titânio com Revestimento DLC',
    price: 8900,
    priceLabel: 'R$ 8.900,00',
    mainImage: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2016/08/17/4514-179248443_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Suíço High-Precision',
      caixa: 'Titânio Aeroespacial',
      pulseira: 'Couro de Bezerro Italiano Genuíno',
      resistencia: '50m (5 ATM)',
      diametro: '40mm'
    }
  },
  {
    id: 'aurora-pearl',
    collection: 'feminine',
    category: 'Joalheria',
    name: 'Aurora Pearl',
    shortDescription: 'A luminosidade da madrepérola em seu pulso.',
    longDescription: 'O Aurora Pearl é uma obra de arte em miniatura. Seu mostrador em madrepérola natural reflete cores etéreas.',
    material: 'Aço Rose Gold & Madrepérola',
    price: 14200,
    priceLabel: 'R$ 14.200,00',
    mainImage: 'https://images.unsplash.com/photo-1539533397341-a0d451ac423f?q=80&w=800&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5443-183492576_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Suíço Slim-Line',
      caixa: 'Aço PVD Rose Gold',
      pulseira: 'Elos Jubileu delicados',
      resistencia: '30m',
      diametro: '32mm'
    }
  }
];
