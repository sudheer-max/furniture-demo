import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ShieldCheck, 
  Box, 
  MessageSquare, 
  FileText, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { FurnitureItem, NavPage, Currency, CartItem } from '../types';
import { SALON_ENSEMBLE_ITEMS } from '../data/furnitureData';
import { formatDualPrice, formatPrice } from '../utils/formatters';
import { ImageZoom } from './ImageZoom';

interface ProductDetailViewProps {
  product?: FurnitureItem;
  onNavigate: (page: NavPage) => void;
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  onOpenSwatchModal: () => void;
  onOpenConsultModal: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  currency,
  onAddToCart,
  onOpenSwatchModal,
  onOpenConsultModal,
}) => {
  // Step 1: Upholstery
  const [selectedUpholstery, setSelectedUpholstery] = useState('Raw Bouclé');
  const [selectedUpholsteryColor, setSelectedUpholsteryColor] = useState('Écru');

  // Step 2: Timber / Base
  const [selectedTimber, setSelectedTimber] = useState('French Canal Walnut');

  // Step 3: Orientation
  const [selectedOrientation, setSelectedOrientation] = useState('Left-Arm');

  // Step 4: Dimensions
  const [selectedDimension, setSelectedDimension] = useState<'standard' | 'bespoke'>('standard');

  // Gallery Thumbnail Active View
  const [activeThumb, setActiveThumb] = useState(0);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    '01': true,
    '02': false,
    '03': false,
    '04': false,
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const upholsteryOptions = [
    { name: 'Raw Bouclé', color: 'Écru', hex: '#EDE6DC', priceDelta: 0 },
    { name: 'Heavy Linen', color: 'Sand', hex: '#D6CEBE', priceDelta: 0 },
    { name: 'Saddle Leather', color: 'Cognac', hex: '#8B4513', priceDelta: 200 },
    { name: 'Mohair Velvet', color: 'Slate', hex: '#2A2A2A', priceDelta: 270 },
  ];

  const timberOptions = [
    { name: 'French Canal Walnut', desc: 'Hand-waxed', hex: '#4A3728', priceDelta: 0 },
    { name: 'Smoked Oak', desc: 'Matte Finish', hex: '#3B322C', priceDelta: 0 },
    { name: 'Ebonized Ash', desc: 'Charcoal Matte', hex: '#1C1B1A', priceDelta: 90 },
    { name: 'Roman Travertine', desc: 'Honed Plinth', hex: '#DFD9CE', priceDelta: 160 },
  ];

  const basePriceEUR = 1650;
  const currentPriceEUR = basePriceEUR + 
    (selectedDimension === 'bespoke' ? 250 : 0) +
    (timberOptions.find((t) => t.name === selectedTimber)?.priceDelta || 0) +
    (upholsteryOptions.find((u) => u.name === selectedUpholstery)?.priceDelta || 0);

  const prices = formatDualPrice(currentPriceEUR);

  const handleAddPiece = () => {
    const cartItem: CartItem = {
      id: `configured-${Date.now()}`,
      furnitureId: product?.id || 'svelto-chaise',
      name: 'The Svelto Lounge Chaise',
      subtitle: `${selectedTimber.toUpperCase()} • ${selectedUpholstery.toUpperCase()} ${selectedUpholsteryColor.toUpperCase()}`,
      specCode: 'SPEC // OPU-8842-CW-BE',
      upholstery: selectedUpholstery,
      upholsteryColor: selectedUpholsteryColor,
      timber: selectedTimber,
      orientation: selectedOrientation,
      width: selectedDimension === 'standard' ? 2200 : 2400,
      depth: 880,
      qty: 1,
      priceEUR: currentPriceEUR,
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
    };
    onAddToCart(cartItem);
  };

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-16">
      
      {/* 1. Breadcrumbs & Provenance Meta */}
      <div className="flex flex-wrap items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3 gap-2">
        <div className="flex items-center space-x-2">
          <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors">Living</button>
          <span>/</span>
          <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors">Lounges & Chaises</button>
          <span>/</span>
          <span className="text-[#1A1917] font-semibold">The Svelto Chaise</span>
        </div>

        <div className="flex items-center space-x-3 text-[#8C7456]">
          <span>● Premium Edition</span>
          <span>•</span>
          <span>Registry No. 18 / 50</span>
          <span>•</span>
          <span>Atelier Périgord, France</span>
        </div>
      </div>

      {/* 2. Main Product Grid (Left Gallery / 3D - Right Customizer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Product Image with Zoom & Thumbnails */}
        <div className="lg:col-span-7 space-y-6">
          <ImageZoom
            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop"
            alt="The Svelto Lounge Chaise"
            className="aspect-[16/11]"
          />

          {/* 4 Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 0, label: '01 / 3D Studio', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=300&auto=format&fit=crop' },
              { id: 1, label: '02 / Paris Salon', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=300&auto=format&fit=crop' },
              { id: 2, label: '03 / Ébénisterie', img: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=300&auto=format&fit=crop' },
              { id: 3, label: '04 / Fabric Weave', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop' }
            ].map((thumb) => (
              <button
                key={thumb.id}
                onClick={() => setActiveThumb(thumb.id)}
                className={`relative aspect-[4/3] rounded-xs overflow-hidden border transition-all text-left group ${
                  activeThumb === thumb.id
                    ? 'border-[#1A1917] ring-1 ring-[#1A1917]'
                    : 'border-[#DDD6CB] hover:border-[#999]'
                }`}
              >
                <img
                  src={thumb.img}
                  alt={thumb.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[8px] uppercase tracking-wider p-1">
                  {thumb.label}
                </div>
              </button>
            ))}
          </div>

          {/* Sourcing Guarantee Box */}
          <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs flex items-start space-x-3 text-xs text-[#5C5750] font-sans">
            <ShieldCheck className="w-5 h-5 text-[#8C7456] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1A1917] block">
                PEFC-Certified Périgord Canal Walnut
              </span>
              <p className="mt-0.5 leading-relaxed">
                Felled from sustainably governed French estates, aged for 36 months, and hand-finished with organic bee propolis wax.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer & Steps */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header & Pricing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#8C7456] font-sans font-semibold">
              <span>Architectural Seating No. 04</span>
              <span className="bg-[#EAE4DC] px-2 py-0.5 rounded-xs text-[#1A1917]">
                Exclusive Commission
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light tracking-tight">
              The Svelto Lounge Chaise
            </h1>

            <p className="text-xs text-[#6B665E] leading-relaxed font-sans">
              Designed by Studio Vézère in collaboration with architect Marcelle Guérin. A monolithic daybed reconciling sculpted Roman travertine with feather-down bouclé upholstery.
            </p>

            <div className="pt-2 flex items-baseline justify-between border-b border-[#E6E0D6] pb-4">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-normal text-[#1A1917]">
                  {prices.primary}
                </span>
                <span className="text-sm text-[#7E7A73] font-sans">
                  / {prices.secondary}
                </span>
              </div>
              <button className="text-[10px] tracking-wider uppercase underline text-[#8C7456]">
                Tax & Freight Breakdown
              </button>
            </div>
          </div>

          {/* STEP 01 — UPHOLSTERY SELECTION */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-sans">
              <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                Step 01 — Upholstery Selection
              </span>
              <span className="text-[#8C7456] tracking-wider uppercase text-[10px]">
                {selectedUpholstery} • {selectedUpholsteryColor}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {upholsteryOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => {
                    setSelectedUpholstery(opt.name);
                    setSelectedUpholsteryColor(opt.color);
                  }}
                  className={`p-2.5 rounded-xs border text-left transition-all relative ${
                    selectedUpholstery === opt.name
                      ? 'border-[#1A1917] bg-[#EAE4DC]'
                      : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                  }`}
                >
                  <div
                    style={{ backgroundColor: opt.hex }}
                    className="w-full h-8 rounded-xs mb-2 border border-black/10 shadow-inner"
                  />
                  <span className="text-[10px] font-medium text-[#1A1917] block leading-tight truncate">
                    {opt.name}
                  </span>
                  <span className="text-[9px] text-[#7E7A73] block">
                    {opt.color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 02 — TIMBER BASE & PLINTH */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-sans">
              <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                Step 02 — Timber Base & Plinth
              </span>
              <span className="text-[#8C7456] tracking-wider uppercase text-[10px]">
                {selectedTimber}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {timberOptions.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setSelectedTimber(opt.name)}
                  className={`p-2.5 rounded-xs border text-left transition-all ${
                    selectedTimber === opt.name
                      ? 'border-[#1A1917] bg-[#EAE4DC]'
                      : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                  }`}
                >
                  <div
                    style={{ backgroundColor: opt.hex }}
                    className="w-full h-8 rounded-xs mb-2 border border-black/10 shadow-inner"
                  />
                  <span className="text-[10px] font-medium text-[#1A1917] block leading-tight truncate">
                    {opt.name}
                  </span>
                  <span className="text-[9px] text-[#7E7A73] block truncate">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 03 — ORIENTATION & COMFORT CORE */}
          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-[#1A1917] text-[11px] block font-sans">
              Step 03 — Orientation & Comfort Core
            </span>

            <div className="grid grid-cols-3 gap-2">
              {['Left-Arm', 'Right-Arm', 'Symmetrical'].map((orient) => (
                <button
                  key={orient}
                  onClick={() => setSelectedOrientation(orient)}
                  className={`py-3 px-2 rounded-xs border text-center text-xs transition-all ${
                    selectedOrientation === orient
                      ? 'border-[#1A1917] bg-[#1A1917] text-white'
                      : 'border-[#DDD6CB] bg-[#FAF8F5] text-[#1A1917] hover:border-[#999]'
                  }`}
                >
                  <span className="block font-medium">{orient}</span>
                  <span className="text-[9px] opacity-70 block mt-0.5">
                    {orient === 'Symmetrical' ? 'Daybed Mode' : 'Facing Chaise'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 04 — DIMENSION ARCHITECTURE */}
          <div className="space-y-3">
            <span className="font-semibold uppercase tracking-wider text-[#1A1917] text-[11px] block font-sans">
              Step 04 — Dimension Architecture
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedDimension('standard')}
                className={`p-3 rounded-xs border text-left transition-all ${
                  selectedDimension === 'standard'
                    ? 'border-[#1A1917] bg-[#EAE4DC]'
                    : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                }`}
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-[#1A1917]">
                    Standard 2200 mm
                  </span>
                  <span className="text-[9.5px] uppercase text-[#7E7A73]">Included</span>
                </div>
                <span className="text-[10px] text-[#6B665E] block mt-1">
                  220 L × 95 W × 74 H cm
                </span>
              </button>

              <button
                onClick={() => setSelectedDimension('bespoke')}
                className={`p-3 rounded-xs border text-left transition-all ${
                  selectedDimension === 'bespoke'
                    ? 'border-[#1A1917] bg-[#EAE4DC]'
                    : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                }`}
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-sm font-semibold text-[#1A1917]">
                    Bespoke Cut
                  </span>
                  <span className="text-[9.5px] uppercase text-[#8C7456]">+₹22,000</span>
                </div>
                <span className="text-[10px] text-[#6B665E] block mt-1">
                  Custom length 1800–2600 mm
                </span>
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddPiece}
              className="w-full py-4 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Box className="w-4 h-4" />
              <span>Add Configured Piece to Acquisition Bag</span>
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <button
                onClick={onOpenSwatchModal}
                className="py-2.5 px-3 border border-[#C8C1B6] text-[#2A2825] hover:border-black transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <Box className="w-3.5 h-3.5 text-[#8C7456]" />
                <span>Complimentary Swatch Kit</span>
              </button>

              <button
                onClick={onOpenConsultModal}
                className="py-2.5 px-3 border border-[#C8C1B6] text-[#2A2825] hover:border-black transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#8C7456]" />
                <span>Consult with Ébéniste</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-[#7E7A73] tracking-wide pt-1 font-sans">
              ✓ Crafted to order in Périgord • Estimated delivery in 6–8 weeks
            </p>
          </div>

          {/* Collapsible Accordions (01 to 04) */}
          <div className="border-t border-[#E6E0D6] pt-4 divide-y divide-[#E6E0D6] text-xs font-sans">
            
            {/* 01 */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('01')}
                className="w-full flex items-center justify-between text-left font-medium text-[#1A1917] hover:text-[#8C7456] transition-colors"
              >
                <span className="tracking-wide">01 // Architectural Intent & Ergonomics</span>
                {openAccordions['01'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions['01'] && (
                <div className="pt-2.5 text-[#5C5750] leading-relaxed text-[11.5px] space-y-2">
                  <p>
                    Reconciles high-contrast spatial tensions: the cold solidity of hollowed Roman travertine versus the organic yield of layered wool bouclé. The 18-degree back rake accommodates both upright reception and extended reading postures without requiring mechanical articulation.
                  </p>
                </div>
              )}
            </div>

            {/* 02 */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('02')}
                className="w-full flex items-center justify-between text-left font-medium text-[#1A1917] hover:text-[#8C7456] transition-colors"
              >
                <span className="tracking-wide">02 // Provenance, Sustainability & Materials</span>
                {openAccordions['02'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions['02'] && (
                <div className="pt-2.5 text-[#5C5750] leading-relaxed text-[11.5px]">
                  All timbers are selectively harvested under PEFC guidelines from Périgord estate plots. Natural beeswax finishes contain zero VOCs, ensuring optimal residential indoor air quality.
                </div>
              )}
            </div>

            {/* 03 */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('03')}
                className="w-full flex items-center justify-between text-left font-medium text-[#1A1917] hover:text-[#8C7456] transition-colors"
              >
                <span className="tracking-wide">03 // Spatial Blueprint & CAD / 3D Assets</span>
                {openAccordions['03'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions['03'] && (
                <div className="pt-2.5 text-[#5C5750] leading-relaxed text-[11.5px]">
                  Complete Revit, Rhino 3DM, and SketchUp assets available for download by licensed architects upon dossier registration.
                </div>
              )}
            </div>

            {/* 04 */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('04')}
                className="w-full flex items-center justify-between text-left font-medium text-[#1A1917] hover:text-[#8C7456] transition-colors"
              >
                <span className="tracking-wide">04 // White-Glove Installation & 25-Yr Guarantee</span>
                {openAccordions['04'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {openAccordions['04'] && (
                <div className="pt-2.5 text-[#5C5750] leading-relaxed text-[11.5px]">
                  Each piece includes insured international freight, room-of-choice placement, uncrating, and leveling by master cabinetmakers. Covered by a 25-year structural warranty.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* 3. SPATIAL HARMONY: The Salon Curation Ensemble */}
      <div className="space-y-8 pt-12 border-t border-[#E6E0D6]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-1 font-sans">
              Spatial Harmony
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              The Salon Curation Ensemble
            </h2>
          </div>
          <p className="text-xs text-[#7E7A73] max-w-md font-sans leading-relaxed">
            Architecturally aligned pieces calibrated to complement the proportions, shadow lines, and materiality of The Svelto Chaise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SALON_ENSEMBLE_ITEMS.map((ensemble) => (
            <div
              key={ensemble.id}
              className="group bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs overflow-hidden transition-all hover:border-[#C8C1B6] hover:shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden">
                <img
                  src={ensemble.imageUrl}
                  alt={ensemble.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg font-medium text-[#1A1917] group-hover:text-[#8C7456] transition-colors">
                    {ensemble.name}
                  </h3>
                  <span className="font-serif text-sm font-semibold text-[#1A1917]">
                    {formatPrice(ensemble.priceEUR, currency)}
                  </span>
                </div>

                <p className="text-xs text-[#6B665E] font-sans leading-relaxed">
                  {ensemble.description}
                </p>

                <div className="pt-2 flex justify-between items-center text-[10px] tracking-wider uppercase text-[#8C7456] font-sans border-t border-[#E5DFD6]">
                  <span>{ensemble.specs}</span>
                  <button 
                    onClick={() => onNavigate('furniture')}
                    className="font-semibold text-black hover:text-[#8C7456] transition-colors flex items-center gap-1"
                  >
                    Inspect →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SPATIAL PROOF: Living with Premium Furniture */}
      <div className="space-y-6 pt-12 border-t border-[#E6E0D6]">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-1 font-sans">
              Spatial Proof
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Living with Premium Furniture
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('interiors')}
            className="text-[11px] tracking-[0.22em] uppercase font-semibold text-[#1A1917] hover:text-[#8C7456] transition-colors"
          >
            Explore Architectural Monograph Archive →
          </button>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xs overflow-hidden border border-[#DDD6CB]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Villa Cadenabbia, Lake Como with Svelto chaise"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Floating Testimonial Card */}
          <div className="absolute bottom-6 right-6 max-w-md p-6 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl space-y-3">
            <span className="text-[9px] uppercase tracking-widest text-[#8C7456] block font-semibold">
              📍 Villa Cadenabbia, Lake Como
            </span>
            <p className="font-serif text-base sm:text-lg text-[#1A1917] font-normal leading-snug">
              “The Svelto chaise holds the large glass gallery effortlessly. It does not compete with the alpine landscape; it anchors the space with profound quietude.”
            </p>
            <span className="text-[10px] tracking-wider uppercase text-[#7E7A73] block font-sans">
              Matteo & Clara Brizzi • Private Collectors • Commissioned August 2024
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
