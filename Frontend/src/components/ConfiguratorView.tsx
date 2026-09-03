import React, { useState } from 'react';
import { 
  Box, 
  Download, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Layers, 
  Maximize2, 
  RotateCw, 
  ZoomIn, 
  Check,
  ChevronDown
} from 'lucide-react';
import { Currency, CartItem } from '../types';
import { formatDualPrice, formatPrice } from '../utils/formatters';
import { SpatialViewer3D } from './SpatialViewer3D';

interface ConfiguratorViewProps {
  currency: Currency;
  onAddToCart: (item: CartItem) => void;
  onOpenSwatchModal: () => void;
  onOpenARModal: () => void;
}

export const ConfiguratorView: React.FC<ConfiguratorViewProps> = ({
  currency,
  onAddToCart,
  onOpenSwatchModal,
  onOpenARModal,
}) => {
  // Fabric Tab
  const [fabricTab, setFabricTab] = useState<'boucle' | 'linen' | 'saddle' | 'mohair'>('boucle');

  // Swatch Color
  const [selectedColor, setSelectedColor] = useState('Écru');

  // Timber / Plinth
  const [selectedPlinth, setSelectedPlinth] = useState('Canal Walnut');

  // Orientation
  const [selectedOrientation, setSelectedOrientation] = useState<'left' | 'right' | 'symmetrical'>('left');

  // Dimensions
  const [dimensionMode, setDimensionMode] = useState<'2200' | '2400' | 'bespoke'>('2200');
  const [widthMm, setWidthMm] = useState(2200);
  const [depthMm, setDepthMm] = useState(880);

  // Weave Zoom Hover Preview State
  const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);

  // Swatches list matching screenshot
  const swatches = [
    { name: 'Écru', hex: '#EBE5DA', pattern: 'dots' },
    { name: 'Sand', hex: '#D8CEBE', pattern: 'grain' },
    { name: 'Peat', hex: '#7A6855', pattern: 'solid' },
    { name: 'Oatmeal', hex: '#E3D7C5', pattern: 'grid' },
    { name: 'Slate', hex: '#5A636A', pattern: 'hatch' },
    { name: 'Cognac', hex: '#8B3E1B', pattern: 'solid' },
    { name: 'Espresso', hex: '#34261D', pattern: 'solid' },
    { name: 'Noir', hex: '#1C1B1A', pattern: 'solid' },
  ];

  // Plinth options matching screenshot
  const plinthOptions = [
    { name: 'Canal Walnut', desc: 'Oil-rubbed', hex: '#4A3728', priceDelta: 0 },
    { name: 'Périgord Oak', desc: '+€6,500', hex: '#7B6651', priceDelta: 6500 },
    { name: 'Ebonized Ash', desc: 'Charcoal matte (+€4,500)', hex: '#222120', priceDelta: 4500 },
    { name: 'Roman Travertine', desc: '+€14,000', hex: '#E0D8CC', priceDelta: 14000 },
  ];

  // Live calculation
  const basePriceEUR = 1650;
  const plinthDelta = plinthOptions.find((p) => p.name === selectedPlinth)?.priceDelta || 0;
  const dimensionDelta = dimensionMode === '2400' ? 450 : dimensionMode === 'bespoke' ? 850 : 0;
  const currentPriceEUR = basePriceEUR + plinthDelta + dimensionDelta;

  const dualPrices = formatDualPrice(currentPriceEUR);

  // Dynamic spec code: e.g. SPEC // OPU-8842-CW-BE
  const getPlinthCode = () => {
    switch (selectedPlinth) {
      case 'Canal Walnut': return 'CW';
      case 'Périgord Oak': return 'PO';
      case 'Ebonized Ash': return 'EA';
      case 'Roman Travertine': return 'RT';
      default: return 'CW';
    }
  };

  const getColorCode = () => {
    switch (selectedColor) {
      case 'Écru': return 'BE';
      case 'Sand': return 'SD';
      case 'Peat': return 'PT';
      case 'Oatmeal': return 'OM';
      case 'Slate': return 'SL';
      case 'Cognac': return 'CG';
      case 'Espresso': return 'ES';
      case 'Noir': return 'NR';
      default: return 'BE';
    }
  };

  const liveSpecCode = `SPEC // OPU-8842-${getPlinthCode()}-${getColorCode()}`;

  const handleAddConfigured = () => {
    const item: CartItem = {
      id: `spec-${Date.now()}`,
      furnitureId: 'svelto-chaise',
      name: 'The Svelto Lounge Chaise',
      subtitle: `${selectedPlinth.toUpperCase()} • ${selectedColor.toUpperCase()} BOUCLÉ`,
      specCode: liveSpecCode,
      upholstery: fabricTab.toUpperCase(),
      upholsteryColor: selectedColor,
      timber: selectedPlinth,
      orientation: selectedOrientation === 'left' ? 'Left-Facing' : selectedOrientation === 'right' ? 'Right-Facing' : 'Daybed Plan',
      width: widthMm,
      depth: depthMm,
      qty: 1,
      priceEUR: currentPriceEUR,
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
    };
    onAddToCart(item);
  };

  const handleExportPDF = () => {
    const text = `ATELIER VÉZÈRE — PRECISION SPECIFIER DOSSIER\n${liveSpecCode}\nArchitecture: The Svelto Lounge Chaise\nUpholstery: ${selectedColor} (${fabricTab})\nPlinth: ${selectedPlinth}\nDimensions: ${widthMm}mm × ${depthMm}mm\nValuation: ${dualPrices.primary} / ${dualPrices.secondary}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atelier-Vezere-${liveSpecCode.replace(/\s+/g, '')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP STATUS / SPEC BAR (Exact from screen (1).png) */}
      <div className="bg-[#FAF8F5] border-b border-[#E6E0D6] py-3 text-[11px] font-sans">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <span className="text-[9.5px] uppercase tracking-widest text-[#7E7A73]">Model Architecture:</span>
            <div className="flex items-center space-x-1 font-serif text-sm font-semibold text-[#1A1917] cursor-pointer">
              <span>The Svelto Lounge Chaise</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#1A1917]">
              LIVE SPEC CODE: <span className="font-mono text-[#8C7456]">{liveSpecCode}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-[#5C5750]">
            <span className="text-[10px] tracking-wider uppercase">Estimated Crafting Lead:</span>
            <span className="font-medium text-[#1A1917]">6–8 Weeks in Périgord</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] tracking-widest uppercase text-[#7E7A73]">Valuation:</span>
            <span className="font-serif text-base font-semibold text-[#1A1917]">
              {dualPrices.primary}
            </span>
            <span className="text-[10px] text-[#7E7A73]">/ {dualPrices.secondary}</span>
          </div>

        </div>
      </div>

      {/* 2. MAIN CONFIGURATOR WORKSPACE */}
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT 7-COL: 3D Raytraced Model & 3 Spec Cards */}
          <div className="lg:col-span-7 space-y-6">
            <SpatialViewer3D
              onOpenAR={onOpenARModal}
              timberColor={plinthOptions.find((p) => p.name === selectedPlinth)?.hex}
              upholsteryColor={swatches.find((s) => s.name === selectedColor)?.hex}
              showDimensionsDefault={true}
              aspectClass="aspect-[16/11]"
            />

            {/* Under-canvas 3 Spec Cards (Exact from screenshot!) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-2 text-xs font-sans">
                <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold block">
                  Density & Provenance
                </span>
                <h4 className="font-serif text-sm font-medium text-[#1A1917]">650g/m² Belgian Flax</h4>
                <p className="text-[11px] text-[#6B665E] leading-relaxed">
                  Spun from organically harvested Flanders flax, dyed with low-impact natural pigments.
                </p>
                <div className="pt-2 border-t border-[#DDD6CB] flex justify-between text-[9px] text-[#7E7A73]">
                  <span>Martindale: 50,000</span>
                  <span>Class 1 Fire</span>
                </div>
              </div>

              <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-2 text-xs font-sans">
                <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold block">
                  Joinery Integrity
                </span>
                <h4 className="font-serif text-sm font-medium text-[#1A1917]">Zero Chemical Adhesives</h4>
                <p className="text-[11px] text-[#6B665E] leading-relaxed">
                  Interlocking keyed through-tenons carved from 120-year aged Dordogne canal timber.
                </p>
                <div className="pt-2 border-t border-[#DDD6CB] flex justify-between text-[9px] text-[#7E7A73]">
                  <span>Moisture: 7.8%</span>
                  <span>Hand-Rubbed Wax</span>
                </div>
              </div>

              <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-2 text-xs font-sans">
                <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold block">
                  Mineral Weight
                </span>
                <h4 className="font-serif text-sm font-medium text-[#1A1917]">Honed Tivoli Stone</h4>
                <p className="text-[11px] text-[#6B665E] leading-relaxed">
                  Non-porous open-pored travertine base anchors the cantilevered daybed platform.
                </p>
                <div className="pt-2 border-t border-[#DDD6CB] flex justify-between text-[9px] text-[#7E7A73]">
                  <span>Base Load: 94 kg</span>
                  <span>Acid-Sealed</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 5-COL: Precision Specifier Engine Form (REV 4.2) */}
          <div className="lg:col-span-5 bg-[#F4EFEB] border border-[#E5DFD6] p-6 sm:p-8 rounded-xs space-y-7">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DDD6CB] pb-4">
              <div>
                <span className="text-[9.5px] uppercase tracking-[0.24em] font-semibold text-[#8C7456] font-sans block">
                  Atelier Configurator Engine
                </span>
                <h2 className="font-serif text-2xl text-[#1A1917] font-normal tracking-tight mt-0.5">
                  Precision Specifier
                </h2>
              </div>
              <span className="text-[10px] tracking-widest uppercase bg-[#EAE4DC] text-[#4A453E] px-2 py-1 rounded-xs font-mono font-semibold">
                REV 4.2
              </span>
            </div>

            {/* 1. Upholstery & Tactile Weaves */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1A1917] text-white flex items-center justify-center text-[9px] font-bold">
                    1
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                    Upholstery & Tactile Weaves
                  </span>
                </div>
                <span className="text-[10px] text-[#8C7456] tracking-wider uppercase font-medium">
                  Belgian Raw Bouclé • {selectedColor}
                </span>
              </div>

              {/* Fabric Type Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#EAE4DC] rounded-xs text-[10.5px] font-sans">
                {[
                  { id: 'boucle', label: 'Bouclé' },
                  { id: 'linen', label: 'Heavy Linen' },
                  { id: 'saddle', label: 'Saddle' },
                  { id: 'mohair', label: 'Mohair' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFabricTab(tab.id as any)}
                    className={`py-1.5 rounded-xs transition-all font-medium ${
                      fabricTab === tab.id
                        ? 'bg-[#1A1917] text-white shadow-xs'
                        : 'text-[#5C5750] hover:text-[#1A1917]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Swatches Grid (8 swatches from screenshot) */}
              <div className="grid grid-cols-4 gap-2">
                {swatches.map((swatch) => (
                  <button
                    key={swatch.name}
                    onMouseEnter={() => setHoveredSwatch(swatch.name)}
                    onMouseLeave={() => setHoveredSwatch(null)}
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`p-2 rounded-xs border text-left transition-all relative ${
                      selectedColor === swatch.name
                        ? 'border-[#1A1917] bg-white ring-1 ring-[#1A1917]'
                        : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: swatch.hex }}
                      className="w-full h-9 rounded-xs mb-1.5 border border-black/10 shadow-xs"
                    />
                    <span className="text-[10px] font-medium text-[#1A1917] block leading-tight">
                      {swatch.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Hover Weave Zoom Callout */}
              <div className="p-3 bg-[#EAE4DC] border border-[#DDD6CB] rounded-xs flex items-center justify-between text-xs text-[#5C5750] font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xs bg-white border border-[#DDD6CB] flex items-center justify-center">
                    <ZoomIn className="w-3.5 h-3.5 text-[#8C7456]" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#1A1917] text-[10.5px] block">
                      HOVER WEAVE ZOOM
                    </span>
                    <span className="text-[9.5px] text-[#7E7A73]">
                      Tactile relief visible under 100% natural gallery lighting.
                    </span>
                  </div>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold">
                  600 DPI Fiber Map
                </span>
              </div>
            </div>

            {/* 2. Timber Substructure & Plinth */}
            <div className="space-y-4 pt-2 border-t border-[#DDD6CB]">
              <div className="flex justify-between items-baseline text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1A1917] text-white flex items-center justify-center text-[9px] font-bold">
                    2
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                    Timber Substructure & Plinth
                  </span>
                </div>
                <span className="text-[10px] text-[#8C7456] tracking-wider uppercase font-medium">
                  {selectedPlinth}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {plinthOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedPlinth(opt.name)}
                    className={`p-3 rounded-xs border text-left transition-all flex items-center space-x-3 ${
                      selectedPlinth === opt.name
                        ? 'border-[#1A1917] bg-white ring-1 ring-[#1A1917]'
                        : 'border-[#DDD6CB] bg-[#FAF8F5] hover:border-[#999]'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: opt.hex }}
                      className="w-7 h-7 rounded-xs border border-black/10 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <span className="font-serif text-sm font-medium text-[#1A1917] block leading-snug truncate">
                        {opt.name}
                      </span>
                      <span className="text-[9.5px] text-[#7E7A73] block truncate font-sans">
                        {opt.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Ergonomic Orientation */}
            <div className="space-y-4 pt-2 border-t border-[#DDD6CB]">
              <div className="flex items-center gap-2 text-xs font-sans">
                <span className="w-4 h-4 rounded-full bg-[#1A1917] text-white flex items-center justify-center text-[9px] font-bold">
                  3
                </span>
                <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                  Ergonomic Orientation
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'left', label: 'Left-Facing', desc: 'Standard' },
                  { id: 'right', label: 'Right-Facing', desc: 'Standard' },
                  { id: 'symmetrical', label: 'Daybed Plan', desc: 'Symmetrical' },
                ].map((orient) => (
                  <button
                    key={orient.id}
                    onClick={() => setSelectedOrientation(orient.id as any)}
                    className={`py-3 px-2 rounded-xs border text-center transition-all ${
                      selectedOrientation === orient.id
                        ? 'border-[#1A1917] bg-[#1A1917] text-white'
                        : 'border-[#DDD6CB] bg-[#FAF8F5] text-[#1A1917] hover:border-[#999]'
                    }`}
                  >
                    <span className="font-serif text-xs font-medium block">{orient.label}</span>
                    <span className="text-[9px] opacity-70 block mt-0.5 font-sans">{orient.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Dimensional Architecture */}
            <div className="space-y-4 pt-2 border-t border-[#DDD6CB]">
              <div className="flex justify-between items-center text-xs font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1A1917] text-white flex items-center justify-center text-[9px] font-bold">
                    4
                  </span>
                  <span className="font-semibold uppercase tracking-wider text-[#1A1917]">
                    Dimensional Architecture
                  </span>
                </div>

                <div className="flex space-x-1">
                  {['2200mm', '2400mm', 'Bespoke'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        const m = mode.replace('mm', '').toLowerCase() as any;
                        setDimensionMode(m);
                        if (m === '2200') setWidthMm(2200);
                        if (m === '2400') setWidthMm(2400);
                      }}
                      className={`px-2 py-0.5 rounded-xs text-[9.5px] uppercase tracking-wider font-medium transition-all ${
                        dimensionMode === mode.replace('mm', '').toLowerCase()
                          ? 'bg-[#1A1917] text-white'
                          : 'bg-[#EAE4DC] text-[#5C5750]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Width Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#5C5750]">Architectural Width (X-Axis)</span>
                  <span className="font-mono font-semibold text-[#1A1917]">{widthMm} mm</span>
                </div>
                <input
                  type="range"
                  min={1900}
                  max={2600}
                  step={10}
                  value={widthMm}
                  onChange={(e) => {
                    setWidthMm(Number(e.target.value));
                    setDimensionMode('bespoke');
                  }}
                  className="w-full accent-[#1A1917] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#8C7456] font-mono">
                  <span>Min: 1900 mm</span>
                  <span>Max: 2600 mm</span>
                </div>
              </div>

              {/* Depth Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#5C5750]">Ergonomic Depth (Y-Axis)</span>
                  <span className="font-mono font-semibold text-[#1A1917]">{depthMm} mm</span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={1050}
                  step={5}
                  value={depthMm}
                  onChange={(e) => setDepthMm(Number(e.target.value))}
                  className="w-full accent-[#1A1917] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#8C7456] font-mono">
                  <span>Min: 800 mm</span>
                  <span>Max: 1050 mm</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9.5px] text-[#5C5750] font-sans pt-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-700" />
                  Engineering Tolerance ±1.5mm Verified
                </span>
                <span className="uppercase tracking-widest font-semibold text-[#8C7456]">
                  PÉRIGORD ATELIER GUILD
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleAddConfigured}
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
                  <span>Physical Swatch Box</span>
                </button>

                <button
                  onClick={handleExportPDF}
                  className="py-2.5 px-3 border border-[#C8C1B6] text-[#2A2825] hover:border-black transition-colors flex items-center justify-center gap-1.5 rounded-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#8C7456]" />
                  <span>Export 1:20 Spec PDF</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between text-[9.5px] text-[#7E7A73] tracking-wide font-sans border-t border-[#DDD6CB]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#8C7456]" />
                  25-Year Atelier Structural Provenance
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#8C7456]" />
                  Free Global White-Glove
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
