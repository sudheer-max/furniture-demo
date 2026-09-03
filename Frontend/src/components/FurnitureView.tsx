import React, { useState } from 'react';
import { Heart, SlidersHorizontal, ArrowRight, Grid3X3, LayoutGrid, Check } from 'lucide-react';
import { FurnitureItem, NavPage, Currency } from '../types';
import { FURNITURE_ITEMS } from '../data/furnitureData';
import { formatDualPrice, formatPrice } from '../utils/formatters';

interface FurnitureViewProps {
  onNavigate: (page: NavPage) => void;
  currency: Currency;
  onSelectProduct: (item: FurnitureItem) => void;
  onToggleWishlist: (item: FurnitureItem) => void;
  wishlistIds: string[];
}

export const FurnitureView: React.FC<FurnitureViewProps> = ({
  onNavigate,
  currency,
  onSelectProduct,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seating' | 'tables' | 'storage' | 'lighting' | 'cast'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [madeToOrderOnly, setMadeToOrderOnly] = useState(true);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);

  const categories = [
    { id: 'all', label: 'All Pieces', count: 24 },
    { id: 'seating', label: 'Seating & Lounges', count: 8 },
    { id: 'tables', label: 'Monolithic Tables', count: 6 },
    { id: 'storage', label: 'Architectural Storage', count: 4 },
    { id: 'lighting', label: 'Tactile Lighting', count: 4 },
    { id: 'cast', label: 'Cast Objects', count: 2 },
  ];

  const filteredItems = FURNITURE_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const firstBatch = filteredItems.slice(0, 4);
  const secondBatch = filteredItems.slice(4, 8);

  const renderProductCard = (item: FurnitureItem) => {
    const prices = formatDualPrice(item.priceEUR);
    const isSaved = wishlistIds.includes(item.id);

    return (
      <div 
        key={item.id}
        className="group relative flex flex-col justify-between bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs overflow-hidden transition-all hover:border-[#C8C1B6] hover:shadow-md"
      >
        {/* Image Area */}
        <div 
          onClick={() => {
            onSelectProduct(item);
            onNavigate('pdp');
          }}
          className="relative aspect-square sm:aspect-[4/3] bg-[#EAE4DC] overflow-hidden cursor-pointer"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Tag Pills */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {item.tag && (
              <span className="text-[8.5px] uppercase tracking-widest font-semibold bg-black/75 backdrop-blur-xs text-[#FAF8F5] px-2 py-0.5 rounded-xs">
                {item.tag}
              </span>
            )}
            {item.isConfigurable && (
              <span className="text-[8px] uppercase tracking-widest font-semibold bg-[#8C7456] text-white px-2 py-0.5 rounded-xs">
                3D Configurable
              </span>
            )}
          </div>

          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(item);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs hover:bg-white text-[#1A1917] flex items-center justify-center transition-all z-10"
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.5] ${isSaved ? 'fill-red-600 text-red-600' : ''}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 
              onClick={() => {
                onSelectProduct(item);
                onNavigate('pdp');
              }}
              className="font-serif text-xl text-[#1A1917] font-normal hover:text-[#8C7456] transition-colors cursor-pointer leading-snug"
            >
              {item.name}
            </h3>

            <p className="text-[11px] text-[#7E7A73] font-sans mt-1">
              {item.subtext}
            </p>

            {/* Material Swatch Dots */}
            {item.swatches && (
              <div className="flex items-center space-x-1.5 mt-3">
                {item.swatches.map((color, sIdx) => (
                  <span
                    key={sIdx}
                    style={{ backgroundColor: color }}
                    className="w-3 h-3 rounded-full border border-black/10 inline-block"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Dimensions & Dual Price */}
          <div className="pt-3 border-t border-[#E5DFD6] flex items-end justify-between">
            <span className="text-[9.5px] uppercase tracking-wider text-[#8C7456] font-sans font-medium">
              {item.dimensions}
            </span>

            <div className="text-right">
              <span className="font-serif text-base font-medium text-[#1A1917] block">
                {prices.primary}
              </span>
              <span className="text-[10px] text-[#7E7A73] font-sans block">
                / {prices.secondary}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
      
      {/* 1. Header & Curatorial Intro */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3">
          <span>Atelier Index / Furniture Editions / Vol. IX</span>
          <span>Salon des Beaux-Arts • Paris • 2025</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline pt-4">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
              Architectural Editions
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1917] tracking-tight">
              Furniture Collection — <span className="italic font-normal">Premium Selection</span>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              Monolithic seating, sculptural tables, and architectural forms crafted from sustainably harvested French walnut, Roman travertine, and unbleached Belgian bouclé.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filter & Utility Bar */}
      <div className="space-y-4 pt-4 border-t border-[#E6E0D6]">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xs text-[11px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1917] text-[#FAF8F5]'
                  : 'bg-[#F4EFEB] text-[#5C5750] hover:bg-[#EAE4DC] hover:text-[#1A1917]'
              }`}
            >
              {cat.label} <span className="text-[9px] opacity-70 ml-1">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Secondary controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#5C5750] pt-2">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase text-[#8C7456]">Material:</span>
              <select 
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-transparent border-b border-[#C8C1B6] pb-0.5 text-xs text-[#1A1917] focus:outline-none"
              >
                <option value="all">Canal Walnut</option>
                <option value="travertine">Roman Travertine</option>
                <option value="oak">French White Oak</option>
                <option value="bronze">Cast Sand Bronze</option>
              </select>
            </div>

            <button
              onClick={() => setMadeToOrderOnly(!madeToOrderOnly)}
              className="flex items-center gap-2 hover:text-black transition-colors"
            >
              <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${madeToOrderOnly ? 'bg-[#1A1917] border-[#1A1917] text-white' : 'border-[#C8C1B6]'}`}>
                {madeToOrderOnly && <Check className="w-2.5 h-2.5" />}
              </span>
              <span className="text-[11px] tracking-wider uppercase">Made to Order</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase text-[#8C7456]">Sort by:</span>
              <select className="bg-transparent border-b border-[#C8C1B6] pb-0.5 text-xs text-[#1A1917] focus:outline-none">
                <option>Curated / Opus Order</option>
                <option>Scale & Volumetric Mass</option>
                <option>Price: High to Modest</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center space-x-1 border border-[#DDD6CB] p-0.5 rounded-xs bg-[#F4EFEB]">
              <button 
                onClick={() => setGridColumns(3)}
                className={`p-1 rounded-xs ${gridColumns === 3 ? 'bg-[#1A1917] text-white' : 'text-[#7E7A73]'}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setGridColumns(4)}
                className={`p-1 rounded-xs ${gridColumns === 4 ? 'bg-[#1A1917] text-white' : 'text-[#7E7A73]'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. First Product Grid (Items 1-4) */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridColumns} gap-6`}>
        {firstBatch.map((item) => renderProductCard(item))}
      </div>

      {/* 4. Middle Architectural Commission Service Banner (Exact match to screenshot!) */}
      <div className="bg-[#F0ECE6] border border-[#E2DDD4] p-8 sm:p-12 rounded-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
              Architectural Commission Service
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Bespoke Millimeter Scaling
            </h2>

            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans max-w-xl">
              Tailored directly to architectural blueprints for private residences, diplomatic salons, and museum institutions worldwide. Every timber block is sourced with full botanical provenance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('custom')}
                className="px-6 py-3 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.22em] uppercase font-semibold hover:bg-black transition-colors flex items-center gap-2"
              >
                <span>Request Blueprint Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] tracking-widest uppercase text-[#7E7A73] font-sans">
                Standard Lead: 8–12 Weeks
              </span>
            </div>
          </div>

          {/* Tolerance Metric Box */}
          <div className="lg:col-span-5 bg-[#EAE4DC] border border-[#DDD6CB] p-6 rounded-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD6CB] pb-2">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7456] font-sans">
                Tolerance Metric
              </span>
              <span className="font-serif text-lg font-medium text-[#1A1917]">± 0.5 mm</span>
            </div>

            <div className="space-y-2 text-xs text-[#5C5750] font-sans">
              <div className="flex justify-between">
                <span>Timber Moisture Equilibrium</span>
                <span className="font-medium text-[#1A1917]">8.4% RH</span>
              </div>
              <div className="flex justify-between">
                <span>Mortise & Tenon Joinery</span>
                <span className="font-medium text-[#1A1917]">Hand-Planed Blind</span>
              </div>
              <div className="flex justify-between">
                <span>Stone Core Relief</span>
                <span className="font-medium text-[#1A1917]">Weight Optimized -42%</span>
              </div>
            </div>

            {/* Caliper Line Diagram */}
            <div className="pt-2 flex items-center justify-center">
              <div className="w-full flex items-center justify-between text-[#8C7456]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8C7456]"></div>
                <div className="flex-1 h-[1px] bg-dashed border-b border-[#8C7456]/40 mx-2"></div>
                <div className="w-2 h-2 rounded-full border border-[#8C7456] bg-white"></div>
                <div className="flex-1 h-[1px] bg-dashed border-b border-[#8C7456]/40 mx-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#8C7456]"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Second Product Grid (Items 5-8) */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridColumns} gap-6`}>
        {secondBatch.map((item) => renderProductCard(item))}
      </div>

      {/* 6. Pagination & Compendium Loader */}
      <div className="pt-8 pb-4 text-center space-y-3 border-t border-[#E6E0D6]">
        <span className="text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] block font-sans">
          Showing 8 of 24 Masterpieces
        </span>
        <button
          onClick={() => {}}
          className="text-xs uppercase tracking-[0.24em] font-semibold text-[#1A1917] hover:text-[#8C7456] transition-colors border-b border-[#1A1917] pb-1 inline-flex items-center gap-1.5"
        >
          <span>Load Next Monograph Folio</span>
          <span>↓</span>
        </button>
      </div>

    </div>
  );
};
