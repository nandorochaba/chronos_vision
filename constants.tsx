
import { WatchProduct, Campaign } from './types';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-main',
    collection: 'masculine',
    title: "Presença que se Nota",
    subtitle: "Upgrade instantâneo no seu visual.",
    description: "Nossa curadoria foca em relógios que transmitem autoridade e bom gosto. Peças selecionadas para o homem que entende que o estilo é um investimento em si mesmo. Aproveite o frete grátis para todo o Maranhão.",
    badge: "Destaque da Semana",
    region: "Estoque em São Luís",
    imageUrl: "https://images.unsplash.com/photo-1548171916-c0ea983ceabd?q=80&w=1200&auto=format&fit=crop"
  }
];

export const WATCHES: WatchProduct[] = [
  {
    id: 'stellaris-gold-pro',
    collection: 'masculine',
    category: 'Casual Luxo',
    name: 'Stellaris Gold Executive',
    shortDescription: 'O design dos clássicos suíços ao alcance do seu pulso.',
    longDescription: 'O Stellaris Gold foi desenvolvido para ser o protagonista do seu visual. Com um banho de alta durabilidade e acabamento polido, este modelo reflete a luz de forma sofisticada, ideal para quem busca um acessório que imponha respeito sem custar uma fortuna.',
    lifestyleCopy: 'Este relógio é a escolha definitiva para o homem moderno. Fica impecável com uma camisa polo para um final de semana, ou com um terno completo para ocasiões formais.',
    material: 'Aço Inoxidável com Banho PVD Premium',
    originalPrice: 489.90,
    originalPriceLabel: 'R$ 489,90',
    price: 389.90,
    priceLabel: 'R$ 389,90',
    maxInstallments: 12,
    mainImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a1b?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-775b0af3976d?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Seiko PC21 (Japão)',
      caixa: 'Aço Reforçado 43mm',
      pulseira: 'Aço com Fecho Deployant',
      resistencia: 'Resistente à água (3 ATM)',
      diametro: '43mm',
      vidro: 'Cristal Mineral Hardlex Antirreflexo'
    }
  },
  {
    id: 'vanguard-noir-elite',
    collection: 'masculine',
    category: 'Minimalista',
    name: 'Vanguard All Noir',
    shortDescription: 'Poder e discrição em um design futurista totalmente preto.',
    longDescription: 'O Vanguard Noir é para o homem que entende que a verdadeira elegância não grita. Com acabamento fosco "Matte Stealth", ele absorve a luz, criando um visual misterioso e imponente.',
    lifestyleCopy: 'Combine com tons escuros para um visual "All Black" matador. Perfeito para eventos noturnos ou para o dia a dia criativo.',
    material: 'Liga Metálica de Alta Densidade',
    originalPrice: 349.90,
    originalPriceLabel: 'R$ 349,90',
    price: 269.90,
    priceLabel: 'R$ 269,90',
    maxInstallments: 10,
    mainImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539533318581-7061f0ce7a5a?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Quartzo Analógico High-End',
      caixa: 'Metal Nobre 44mm',
      pulseira: 'Silicone Soft Touch Confort',
      resistencia: 'Resistente a Respingos',
      diametro: '44mm',
      vidro: 'Vidro Temperado com Safira'
    }
  },
  {
    id: 'heritage-silver-master',
    collection: 'masculine',
    category: 'Executivo',
    name: 'Heritage Classic Silver',
    shortDescription: 'O visual dos ícones de luxo com o preço que você pode pagar.',
    longDescription: 'Inspirado nos designs mais vendidos de marcas de alto luxo, o Heritage Silver é o equilíbrio entre tradição e modernidade. Seu aço escovado e polido valoriza qualquer look social.',
    lifestyleCopy: 'O parceiro ideal para o ambiente corporativo. Transmite seriedade, pontualidade e organização.',
    material: 'Aço Inoxidável Polido',
    originalPrice: 399.90,
    originalPriceLabel: 'R$ 399,90',
    price: 329.90,
    priceLabel: 'R$ 329,90',
    maxInstallments: 12,
    mainImage: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622434641008-99285fd97c88?q=80&w=1000&auto=format&fit=crop'
    ],
    specs: {
      movimento: 'Miyota Precision',
      caixa: 'Aço Prateado 41mm',
      pulseira: 'Couro Genuíno Marrom Cafe',
      resistencia: '3 ATM',
      diametro: '41mm',
      vidro: 'Cristal Mineral de Alta Resiliência'
    }
  }
];
