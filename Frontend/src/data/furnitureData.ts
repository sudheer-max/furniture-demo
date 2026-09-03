import { FurnitureItem } from '../types';

export const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 'svelto-chaise',
    name: 'The Svelto Lounge Chaise',
    category: 'seating',
    categoryLabel: 'Sculptural Seating',
    tag: 'OPUS MMXXV',
    subtext: 'French Canal Walnut • Belgian Bouclé Écru',
    dimensions: 'L 220 • W 78 • H 64 CM',
    priceEUR: 1650,
    priceINR: 148000,
    priceUSD: 1780,
    isConfigurable: true,
    edition: 'Registry No. 18 / 50 • Atelier Périgord',
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
    galleryUrls: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
    ],
    swatches: ['#4A3728', '#1F1E1D', '#8C7456']
  },
  {
    id: 'vassal-travertine',
    name: 'Vassal Travertine Monolith',
    category: 'tables',
    categoryLabel: 'Monolithic Tables',
    tag: 'SUBTRACTIVE MASS',
    subtext: 'Hollowed Roman Travertine • Chamfered Edges',
    dimensions: '140 × 80 × 32 CM',
    priceEUR: 1240,
    priceINR: 112000,
    priceUSD: 1350,
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#DFD9CE', '#B8AF9F']
  },
  {
    id: 'strata-dining',
    name: 'Strata Dining Table',
    category: 'tables',
    categoryLabel: 'Monolithic Tables',
    tag: 'SEATS 10 GUESTS',
    subtext: 'Single Billet French Oak • Monolithic Trestle',
    dimensions: '320 × 110 × 75 CM',
    priceEUR: 3160,
    priceINR: 285000,
    priceUSD: 3450,
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#8C6D4F', '#4A3222', '#2A201A']
  },
  {
    id: 'aura-luminaire',
    name: 'Aura Cast Bronze Luminaire',
    category: 'lighting',
    categoryLabel: 'Tactile Lighting',
    tag: 'NUMBERED CAST • ED. 50',
    subtext: 'Patinated Sand-Bronze • Alabaster Sphere',
    dimensions: 'H 168 • Ø 36 CM',
    priceEUR: 540,
    priceINR: 48500,
    priceUSD: 590,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#6B543E', '#2B231D']
  },
  {
    id: 'cevennes-armchair',
    name: 'Cévennes Armchair',
    category: 'seating',
    categoryLabel: 'Sculptural Seating',
    tag: 'LOW-SLUNG PROPORTIONS',
    subtext: 'Smoked Oak + Unbleached Heavy Flax Linen',
    dimensions: '88 × 82 × 68 CM',
    priceEUR: 1090,
    priceINR: 98000,
    priceUSD: 1190,
    imageUrl: 'https://images.unsplash.com/photo-1580481077156-4c489b09ba09?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#EDE6DC', '#C5BAA8']
  },
  {
    id: 'kyoto-bedstead',
    name: 'Kyoto Low Bedstead',
    category: 'seating',
    categoryLabel: 'Sanctuary Beds',
    tag: 'TATAMI REVEAL DETAIL',
    subtext: 'Ebonized Ash + Integrated Floating Ledges',
    dimensions: 'KING (210 × 220 CM)',
    priceEUR: 2550,
    priceINR: 230000,
    priceUSD: 2780,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#1C1B1A', '#3A322C']
  },
  {
    id: 'serein-rug',
    name: 'Serein Geometric Rug',
    category: 'cast',
    categoryLabel: 'Architectural Textiles',
    tag: 'HIGH-RELIEF CARVING',
    subtext: 'NZ Virgin Wool • Sculpted Architectural Pile',
    dimensions: '300 × 240 CM',
    priceEUR: 1020,
    priceINR: 92000,
    priceUSD: 1110,
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#F5EFE6', '#D6CEBE']
  },
  {
    id: 'brutalist-credenza',
    name: 'Brutalist Credenza 04',
    category: 'storage',
    categoryLabel: 'Architectural Storage',
    tag: 'MASTERWORK EDITION',
    subtext: 'Hand-Scraped Walnut • Hand-Beaten Bronze',
    dimensions: '220 × 52 × 72 CM',
    priceEUR: 3780,
    priceINR: 340000,
    priceUSD: 4120,
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop',
    swatches: ['#38291F', '#1F1B17']
  }
];

export const SALON_ENSEMBLE_ITEMS = [
  {
    id: 'vassal-pedestal',
    name: 'Vassal Travertine Pedestal',
    priceEUR: 64800,
    priceINR: 5800000,
    priceUSD: 70500,
    description: 'Monolithic hollowed roman stone table with hand-chamfered organic profile.',
    specs: 'Tivoli Travertine • 42cm Ø',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'aura-cast-lamp',
    name: 'Aura Cast Bronze Luminaire',
    priceEUR: 48500,
    priceINR: 4350000,
    priceUSD: 52800,
    description: 'Sand-cast patinated bronze reading lamp with hand-turned alabaster diffuser.',
    specs: '2700K Warm • Dimmable',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'serein-wool-rug',
    name: 'Serein Hand-Knotted Rug',
    priceEUR: 92000,
    priceINR: 8250000,
    priceUSD: 100200,
    description: 'New Zealand virgin wool with low-relief architectural carving. 300 × 240 cm.',
    specs: 'Oat & Alabaster Weave',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=800&auto=format&fit=crop'
  }
];

export const TYPOLOGIES = [
  {
    title: 'Sofas & Monolithic Lounges',
    subtitle: 'Low-profile seating sculpted with variable-density latex and solid French chestnut frames.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    tag: 'TYPOLOGY 01 // LIVING SANCTUARIES',
    span: 'Module Span: 340 CM'
  },
  {
    title: 'Dining Sculptures',
    subtitle: 'Continuous grain table tops carved from single-provenance French forests.',
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1200&auto=format&fit=crop',
    tag: 'TYPOLOGY 02 // BANQUET & GATHERING',
    span: 'Solid Billet Timber'
  },
  {
    title: 'Architectural Tables',
    subtitle: 'Balancing rough-hewn stone plinths with precision-milled timber slabs.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
    tag: 'TYPOLOGY 03 // SEASONAL MONOLITHS',
    span: 'Subtractive Mass'
  },
  {
    title: 'Sanctuary Beds',
    subtitle: 'Integrated cantilevered bedstead ledges crafted with concealed acoustic dampening.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    tag: 'TYPOLOGY 04 // REST & SLUMBER',
    span: 'King & Grand Ovoid Sizing'
  }
];
