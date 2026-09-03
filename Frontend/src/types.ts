export type Currency = 'EUR' | 'INR' | 'USD';

export type NavPage = 
  | 'home'
  | 'furniture'
  | 'interiors'
  | 'configurator'
  | 'custom'
  | 'atelier'
  | 'journal'
  | 'pdp'
  | 'contact'
  | 'about';

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'seating' | 'tables' | 'storage' | 'lighting' | 'cast';
  categoryLabel: string;
  tag?: string;
  subtext: string;
  dimensions: string;
  priceEUR: number;
  priceINR: number;
  priceUSD: number;
  imageUrl: string;
  galleryUrls?: string[];
  swatches?: string[];
  isConfigurable?: boolean;
  edition?: string;
}

export interface CartItem {
  id: string;
  furnitureId: string;
  name: string;
  subtitle: string;
  specCode: string;
  upholstery: string;
  upholsteryColor: string;
  timber: string;
  orientation: string;
  width: number;
  depth: number;
  qty: number;
  priceEUR: number;
  imageUrl: string;
}

export interface Monograph {
  id: string;
  number: string;
  tag: string;
  category: string;
  title: string;
  author: string;
  readTime: string;
  plates?: number;
  excerpt: string;
  fullText?: string;
  imageUrl: string;
  date?: string;
  location?: string;
  issue?: string;
}

export interface Residence {
  id: string;
  number: string;
  name: string;
  location: string;
  coordinates: string;
  area: string;
  year: string;
  description: string;
  curatorialQuote: string;
  quoteAuthor: string;
  imageUrl: string;
  category: 'alpine' | 'haussmann' | 'villa' | 'penthouse';
  hotspots?: {
    id: number;
    title: string;
    description: string;
    top: string;
    left: string;
    productLink?: string;
  }[];
}
