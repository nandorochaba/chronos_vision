
import { WatchProduct, Campaign } from './types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-masculine',
    collection: 'masculine',
    title: "Engenharia e Poder",
    subtitle: "A celebração da mecânica pura.",
    description: "Uma seleção rigorosa de calibres automáticos e cronógrafos de alta performance. Disponível para entrega imediata com logística dedicada em Santa Luzia e Santa Inês. Onde a tradição encontra a força.",
    badge: "Edição de Colecionador",
    region: "Logística Premium Maranhão",
    imageUrl: "https://images.unsplash.com/photo-1548171916-c0ea983ceabd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 'camp-feminine',
    collection: 'feminine',
    title: "Luz e Sofisticação",
    subtitle: "Onde a delicadeza encontra a eternidade.",
    description: "Curadoria exclusiva de peças em metais nobres, madrepérola e acabamentos joalheiros. Serviço de Concierge personalizado para garantir que a sua escolha seja tão brilhante quanto o seu tempo.",
    badge: "Exclusividade Atelier",
    region: "Entrega Expressa Regional",
    imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=1200&auto=format&fit=crop"
  }
];

export const WATCHES: WatchProduct[] = [
  // --- COLEÇÃO MASCULINA ---
  {
    id: 'stellaris-gmt',
    collection: 'masculine',
    category: 'Viajante',
    name: 'Stellaris GMT',
    shortDescription: 'O horizonte em seu pulso.',
    longDescription: 'Projetado para quem navega entre fusos horários com naturalidade. O Stellaris GMT possui bezel em cerâmica bidirecional e o calibre CV-900 com reserva de marcha de 72 horas.',
    material: 'Aço 904L & Safira Antirreflexo',
    price: 12500,
    priceLabel: 'R$ 12.500',
    mainImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a1b?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2021/04/12/70851-536966141_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Automático Calibre CV-900',
      caixa: 'Aço Escovado Premium 42mm',
      pulseira: 'Oyster de 3 elos com ajuste rápido',
      resistencia: '100m (10 ATM)',
      diametro: '42mm'
    }
  },
  {
    id: 'vanguard-chrono',
    collection: 'masculine',
    category: 'Esportivo',
    name: 'Vanguard Chrono',
    shortDescription: 'Precisão em milésimos de segundo.',
    longDescription: 'Inspirado nas pistas de alta performance, o Vanguard une a robustez do titânio com a precisão de um cronógrafo flyback. Uma peça para quem domina o próprio ritmo.',
    material: 'Titânio Grau 5 & Carbono',
    price: 18900,
    priceLabel: 'R$ 18.900',
    mainImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-775b0af3976d?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Cronógrafo Mecânico Automático',
      caixa: 'Titânio Aeroespacial',
      pulseira: 'Borracha FKM com fecho deployant',
      resistencia: '50m (5 ATM)',
      diametro: '44mm'
    }
  },
  {
    id: 'nocturne-onyx',
    collection: 'masculine',
    category: 'Minimalista',
    name: 'Nocturne Onyx',
    shortDescription: 'A elegância da escuridão profunda.',
    longDescription: 'Minimalismo impenetrável. Com acabamento em DLC (Diamond-Like Carbon), esta peça desaparece sob o punho da camisa, revelando-se apenas para quem entende de verdadeira sofisticação.',
    material: 'Aço DLC Negro & Onyx',
    price: 9800,
    priceLabel: 'R$ 9.800',
    mainImage: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2016/08/17/4514-179248443_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Suíço High-Precision',
      caixa: 'Aço com revestimento DLC',
      pulseira: 'Couro de Bezerro Italiano',
      resistencia: '30m (3 ATM)',
      diametro: '40mm'
    }
  },
  {
    id: 'deep-sea-heritage',
    collection: 'masculine',
    category: 'Diver',
    name: 'Deep Sea Heritage',
    shortDescription: 'Domine as profundezas.',
    longDescription: 'Uma homenagem aos exploradores submarinos. O Deep Sea une o charme vintage dos anos 60 com a tecnologia de vedação tripla moderna.',
    material: 'Aço Escovado & Bisel Cerâmico',
    price: 14500,
    priceLabel: 'R$ 14.500',
    mainImage: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000&auto=format&fit=crop',
    gallery: [],
    specs: {
      movimento: 'Automático Calibre CV-Diver',
      caixa: 'Aço Inoxidável 316L',
      pulseira: 'Malha de Aço (Shark Mesh)',
      resistencia: '300m (30 ATM)',
      diametro: '41mm'
    }
  },

  // --- COLEÇÃO FEMININA ---
  {
    id: 'aurora-pearl',
    collection: 'feminine',
    category: 'Joalheria',
    name: 'Aurora Pearl',
    shortDescription: 'A poesia da madrepérola.',
    longDescription: 'Cada mostrador é único, esculpido em madrepérola natural das águas do pacífico. O Aurora Pearl não marca apenas as horas; ele captura a luz do sol.',
    material: 'Ouro Rose 18k & Madrepérola',
    price: 16200,
    priceLabel: 'R$ 16.200',
    mainImage: 'https://images.unsplash.com/photo-1539533397341-a0d451ac423f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5443-183492576_large.mp4',
    gallery: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Suíço Slim-Line',
      caixa: 'Aço PVD Rose Gold',
      pulseira: 'Elos Jubileu delicados',
      resistencia: '30m (3 ATM)',
      diametro: '32mm'
    }
  },
  {
    id: 'lumina-diamond',
    collection: 'feminine',
    category: 'Clássico',
    name: 'Lumina Diamond',
    shortDescription: 'O brilho eterno no seu pulso.',
    longDescription: 'Com 12 marcadores em diamantes simulados de lapidação brilhante, o Lumina é a definição de luxo discreto para o dia a dia da mulher moderna.',
    material: 'Aço Polido & Cristais de Safira',
    price: 11900,
    priceLabel: 'R$ 11.900',
    mainImage: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=1000&auto=format&fit=crop',
    gallery: [],
    specs: {
      movimento: 'Automático Lady-Calibre',
      caixa: 'Aço Inoxidável Polido',
      pulseira: 'Couro Branco com Textura Croco',
      resistencia: '30m (3 ATM)',
      diametro: '34mm'
    }
  },
  {
    id: 'celestial-rose',
    collection: 'feminine',
    category: 'Minimalista',
    name: 'Celestial Rose',
    shortDescription: 'Simplicidade em ouro rosa.',
    longDescription: 'Design arquitetônico com foco na pureza das formas. O Celestial Rose é uma declaração de estilo que transcende tendências passageiras.',
    material: 'Aço PVD Rose Gold & Prata',
    price: 8500,
    priceLabel: 'R$ 8.500',
    mainImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
    gallery: [],
    specs: {
      movimento: 'Quartzo Suíço Ultra-Thin',
      caixa: 'Design Slim 6mm',
      pulseira: 'Couro Nude Premium',
      resistencia: 'Não resistente',
      diametro: '36mm'
    }
  }
];
