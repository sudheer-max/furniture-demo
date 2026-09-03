import React, { useState } from 'react';
import { 
  Compass, 
  Play, 
  Pause, 
  Download, 
  Eye, 
  Layers, 
  Maximize2, 
  Volume2, 
  FileCode, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NavPage, Currency } from '../types';
import { RESIDENCES } from '../data/interiorsData';

interface InteriorsViewProps {
  onNavigate: (page: NavPage) => void;
  currency: Currency;
  onOpenShowroomModal: () => void;
  onOpenMaterialBoxModal: () => void;
}

export const InteriorsView: React.FC<InteriorsViewProps> = ({
  onNavigate,
  currency,
  onOpenShowroomModal,
  onOpenMaterialBoxModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'alpine' | 'haussmann' | 'villa' | 'penthouse'>('all');
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hdriPreset, setHdriPreset] = useState<'5400k' | 'golden' | 'twilight'>('5400k');

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20">
      
      {/* 1. Header & Spatial Stats */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3">
          <span>Architectural Provenance & Spatial Commissions</span>
          <span>Vol. IV — MMXXV</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-3">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1917] tracking-tight">
              Spatial Blueprints & <br />
              <span className="italic font-normal">Curated Residences.</span>
            </h1>
            <p className="text-xs sm:text-[14px] text-[#5C5750] leading-relaxed font-sans max-w-xl">
              Explore real-world architectural commissions where Modern Furniture World pieces anchor spatial quietude across Milan, Paris, the Swiss Alps, and Hudson Valley.
            </p>
          </div>

          {/* Right Stats Box (Exact match to screenshot!) */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-2 bg-[#F4EFEB] border border-[#E5DFD6] p-4 rounded-xs text-center font-sans">
            <div className="border-r border-[#DDD6CB] pr-2">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1917] block">14</span>
              <span className="text-[8.5px] uppercase tracking-wider text-[#7E7A73]">Active Sanctuaries</span>
            </div>
            <div className="border-r border-[#DDD6CB] px-2">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1917] block">60fps</span>
              <span className="text-[8.5px] uppercase tracking-wider text-[#7E7A73]">WebGL BIM Engine</span>
            </div>
            <div className="pl-2">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1917] block">0.02mm</span>
              <span className="text-[8.5px] uppercase tracking-wider text-[#7E7A73]">Joinery Tolerance</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-[#E6E0D6] pt-4 scrollbar-none">
          {[
            { id: 'all', label: 'All Residences' },
            { id: 'alpine', label: 'Alpine Chalets' },
            { id: 'haussmann', label: 'Haussmannian Salons' },
            { id: 'villa', label: 'Minimalist Villas' },
            { id: 'penthouse', label: 'Penthouse Galleries' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedFilter(pill.id as any)}
              className={`px-4 py-2 rounded-xs text-[11px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all ${
                selectedFilter === pill.id
                  ? 'bg-[#1A1917] text-[#FAF8F5]'
                  : 'bg-[#F4EFEB] text-[#5C5750] hover:bg-[#EAE4DC] hover:text-[#1A1917]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. COMMISSION NO. 01 — THE MILANO RESIDENCE (Palazzo Brera) */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E6E0D6] pb-3">
          <div>
            <span className="text-[9.5px] uppercase tracking-widest text-[#8C7456] block font-sans font-semibold">
              Commission No. 01 • Milan, Italy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1917] font-normal">
              The Milano Residence — Palazzo Brera
            </h2>
          </div>
          <span className="text-[10px] tracking-wider uppercase text-[#7E7A73] font-sans">
            Coordinates: 45.4719° N, 9.1879° E • Spatial Area: 340 m² • Year: 2024
          </span>
        </div>

        {/* Live Interactive Spatial Canvas */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xs overflow-hidden border border-[#DDD6CB] bg-[#1A1917]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Palazzo Brera Grand Salon"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Top Canvas Bar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white text-xs z-20">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-black/60 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Live Interactive Spatial Canvas
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHotspots(!showHotspots)}
                className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase bg-black/60 backdrop-blur-md hover:bg-black transition-colors"
              >
                {showHotspots ? 'Hide Hotspots' : 'Show Hotspots'}
              </button>
              <button 
                onClick={onOpenShowroomModal}
                className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hotspots */}
          {showHotspots && (
            <>
              {/* Hotspot 01: Svelto Chaise */}
              <div className="absolute top-[68%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                  className="w-7 h-7 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform ring-2 ring-white/50"
                >
                  01
                </button>
                {activeHotspot === 1 && (
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-40 animate-in fade-in">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">In Situ 01</span>
                    <p className="font-serif text-sm font-medium text-[#1A1917]">The Svelto Chaise</p>
                    <button
                      onClick={() => onNavigate('pdp')}
                      className="mt-1.5 text-[9px] uppercase tracking-widest font-semibold text-black underline block"
                    >
                      View Piece Specs →
                    </button>
                  </div>
                )}
              </div>

              {/* Hotspot 02: Vassal Travertine */}
              <div className="absolute top-[72%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                  className="w-7 h-7 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform ring-2 ring-white/50"
                >
                  02
                </button>
                {activeHotspot === 2 && (
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-40 animate-in fade-in">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">In Situ 02</span>
                    <p className="font-serif text-sm font-medium text-[#1A1917]">Vassal Travertine</p>
                    <p className="text-[10px] text-[#7E7A73]">Hollowed Stone Monolith</p>
                  </div>
                )}
              </div>

              {/* Hotspot 03: Aura Luminaire */}
              <div className="absolute top-[65%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
                  className="w-7 h-7 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform ring-2 ring-white/50"
                >
                  03
                </button>
                {activeHotspot === 3 && (
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-40 animate-in fade-in">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">In Situ 03</span>
                    <p className="font-serif text-sm font-medium text-[#1A1917]">Aura Luminaire</p>
                    <p className="text-[10px] text-[#7E7A73]">Patinated Bronze & Alabaster</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Bottom Bar */}
          <div className="absolute bottom-3 inset-x-3 flex flex-wrap items-center justify-between text-white/90 text-[10px] tracking-wider uppercase bg-black/60 backdrop-blur-md p-2.5 rounded-xs gap-2">
            <div className="flex items-center space-x-3">
              <span>IN SITU PIECES: 01 SVELTO CHAISE • 02 VASSAL TRAVERTINE • 03 AURA LUMINAIRE</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-[#DDD]">Lighting: 11:45 AM Milanese Sun</span>
              <button 
                onClick={onOpenShowroomModal}
                className="text-white font-semibold underline hover:text-[#D4AF37] transition-colors"
              >
                Full Spatial Dossier
              </button>
            </div>
          </div>
        </div>

        {/* Below Milano Canvas: Architectural Notation Card */}
        <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-9 space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold block font-sans">
              Architectural Notation — Matteo Brizzi Studio
            </span>
            <p className="font-serif text-lg text-[#1A1917] italic leading-snug">
              “We allowed natural light from the 4-meter arched windows to cast longitudinal shadows across the fluted travertine base. The goal was unhurried monumentality—a room where one simply breathes.”
            </p>
          </div>

          <div className="md:col-span-3 border-l md:border-[#DDD6CB] md:pl-6 space-y-2 text-xs font-sans text-[#7E7A73]">
            <div>
              <span className="text-[9px] uppercase tracking-wider block">Ceiling Vault</span>
              <span className="font-medium text-[#1A1917]">4.8m Plaster Fresco</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider block">Commission Date</span>
              <span className="font-medium text-[#1A1917]">November 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. RESIDENCE 02 — ALPINE SANCTUARY (St. Moritz) */}
      <div className="space-y-6 pt-8 border-t border-[#E6E0D6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[9.5px] uppercase tracking-widest text-[#8C7456] block font-sans font-semibold">
                Residence 02 • Engadin Valley, Switzerland
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light mt-1">
                Alpine Sanctuary — <br />
                <span className="italic font-normal">St. Moritz</span>
              </h2>
            </div>

            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              Anchored against the jagged granite elevations of the Bernina Range, this monolithic timber and poured-board-formed concrete refuge reinterprets the Swiss mountain refuge through quiet modernism.
            </p>

            {/* Curatorial Dispatch Audio Player */}
            <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold">
                  Curatorial Dispatch: St. Moritz
                </span>
                <span className="text-[10px] text-[#7E7A73]">02:14 • Narrated by Lead Ébéniste</span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-[#1A1917] text-white flex items-center justify-center hover:bg-black transition-colors shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                {/* Animated sound wave bars */}
                <div className="flex-1 flex items-center space-x-1 h-6 px-2 bg-[#EAE4DC] rounded-xs overflow-hidden">
                  {[40, 70, 25, 90, 60, 80, 30, 95, 45, 65, 85, 35, 75, 50, 90, 40, 60, 80].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: isPlayingAudio ? `${h}%` : '25%' }}
                      className={`w-1 bg-[#1A1917] rounded-full transition-all duration-300 ${
                        isPlayingAudio ? 'opacity-90' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-2 text-xs font-sans text-[#5C5750] border-y border-[#E6E0D6] py-3">
              <div className="flex justify-between">
                <span>Core Materials</span>
                <span className="font-medium text-[#1A1917]">Larch Timber, Swiss Valais Quartzite</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Furnishings</span>
                <span className="font-medium text-[#1A1917]">Kyoto Platform Bed, Cévennes Lounges</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Integration</span>
                <span className="font-medium text-[#1A1917]">Underfloor Geothermal Hydronics</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-1 font-sans">
              <button
                onClick={onOpenShowroomModal}
                className="w-full py-3 bg-[#1A1917] text-white text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 rounded-xs"
              >
                <span>View Architectural Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {}}
                className="w-full py-2.5 border border-[#C8C1B6] text-[#2A2825] text-[10px] tracking-[0.2em] uppercase font-semibold hover:border-black transition-colors flex items-center justify-center gap-1.5 rounded-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#8C7456]" />
                <span>BIM & DWG Package (142 MB)</span>
              </button>
            </div>
          </div>

          {/* Right Visuals Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] bg-[#EAE4DC] rounded-xs overflow-hidden border border-[#DDD6CB]">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop"
                  alt="Primary Bedstead: Kyoto Low-Slung"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider px-2 py-1 rounded-xs">
                  Primary Bedstead: Kyoto Low-Slung
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative aspect-[4/3] bg-[#EAE4DC] rounded-xs overflow-hidden border border-[#DDD6CB]">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
                    alt="Cévennes Seating by Fireplace"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider px-2 py-1 rounded-xs">
                    Cévennes Seating
                  </div>
                </div>

                <div className="p-5 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-2 text-xs font-sans">
                  <span className="text-[9px] uppercase tracking-widest text-[#8C7456] font-semibold block">
                    Provenance Cert.
                  </span>
                  <h4 className="font-serif text-base font-medium text-[#1A1917]">Alpine Lot 088</h4>
                  <p className="text-[11px] text-[#6B665E] leading-relaxed">
                    Commissioned for the Engadin Triennale. Fully weather-sealed oiled finishes built to withstand sub-zero humidity shifts.
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[9.5px] text-emerald-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Install • Bernina Region
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. COMMISSION NO. 03 — RIVE GAUCHE PRIVATE SALON */}
      <div className="space-y-6 pt-8 border-t border-[#E6E0D6]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DDD6CB]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
              alt="Rive Gauche Private Salon with Canal Walnut"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 max-w-xs p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs text-xs font-sans space-y-0.5">
              <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] font-semibold block">
                Historical Harmonization
              </span>
              <h5 className="font-serif text-sm font-medium text-[#1A1917]">Canal Walnut & Raw Bouclé</h5>
              <p className="text-[10px] text-[#7E7A73]">Paired directly with 1860s Porte de Bourgogne mantelpiece stonework.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[9.5px] uppercase tracking-widest text-[#8C7456] block font-sans font-semibold">
                Commission No. 03 • Boulevard Saint-Germain, Paris VII
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light mt-1">
                Rive Gauche Private Salon
              </h2>
            </div>

            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              In a grand apartment built under Baron Haussmann's second municipal campaign, the atelier introduced contemporary monolithic restraint to balance original gilded trumeau mirrors and chevron oak marquetry.
            </p>

            <div className="grid grid-cols-2 gap-3 font-sans text-xs">
              <div className="p-3 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs">
                <span className="text-[9px] uppercase tracking-wider text-[#8C7456] block font-semibold">Piece 01</span>
                <span className="font-serif text-sm font-medium text-[#1A1917] block">Vélizy Credenza</span>
                <span className="text-[10px] text-[#7E7A73] block mt-0.5">Canal Walnut with hidden brass touch-latches.</span>
                <span className="text-xs font-serif font-semibold text-[#1A1917] block mt-2">€16,400</span>
              </div>

              <div className="p-3 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs">
                <span className="text-[9px] uppercase tracking-wider text-[#8C7456] block font-semibold">Piece 02</span>
                <span className="font-serif text-sm font-medium text-[#1A1917] block">Odéon Low Armchair</span>
                <span className="text-[10px] text-[#7E7A73] block mt-0.5">Sculpted solid bronze in patinated bronze.</span>
                <span className="text-xs font-serif font-semibold text-[#1A1917] block mt-2">€8,900</span>
              </div>
            </div>

            <p className="font-serif text-base italic text-[#4A453E] border-l-2 border-[#8C7456] pl-4">
              “The dialogue between the 166-year-old French parquet and our razor-straight walnut edges provides an unexpected spatial tension.”
              <span className="block text-[10px] font-sans uppercase tracking-widest text-[#7E7A73] not-italic mt-1">
                Camille Laurent • Parisian Studio Lead
              </span>
            </p>

            <button
              onClick={() => onNavigate('furniture')}
              className="text-[11px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] hover:text-[#8C7456] transition-colors flex items-center gap-1.5"
            >
              <span>View Paris Salon Edition Pieces</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </div>

      {/* 5. DARK SECTION: ENTER THE VIRTUAL SPATIAL SHOWROOM */}
      <div className="bg-[#1A1917] text-[#FAF8F5] p-8 sm:p-12 lg:p-16 rounded-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#D4AF37] block font-sans">
              ● WebGL 60FPS • Raymarched Spatial Pipeline
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Enter the Virtual Spatial Showroom.
            </h2>

            <p className="text-xs sm:text-[13px] text-[#AAA] leading-relaxed font-sans max-w-lg">
              Walk through real-scale digital twins of our Milanese and Parisian installations. Inspect joinery tolerances, toggle astronomical solar conditions, and test custom finishes in real-time.
            </p>

            {/* HDRI Environment Presets */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] tracking-widest uppercase text-[#888] block font-sans">
                HDRI Environment Presets
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-sans">
                <button
                  onClick={() => setHdriPreset('5400k')}
                  className={`px-3 py-1.5 rounded-xs border transition-all ${
                    hdriPreset === '5400k'
                      ? 'bg-white text-black border-white font-medium'
                      : 'border-white/20 text-[#AAA] hover:text-white'
                  }`}
                >
                  Daylight 5400K
                </button>
                <button
                  onClick={() => setHdriPreset('golden')}
                  className={`px-3 py-1.5 rounded-xs border transition-all ${
                    hdriPreset === 'golden'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-medium'
                      : 'border-white/20 text-[#AAA] hover:text-white'
                  }`}
                >
                  Golden Hour
                </button>
                <button
                  onClick={() => setHdriPreset('twilight')}
                  className={`px-3 py-1.5 rounded-xs border transition-all ${
                    hdriPreset === 'twilight'
                      ? 'bg-indigo-400 text-black border-indigo-400 font-medium'
                      : 'border-white/20 text-[#AAA] hover:text-white'
                  }`}
                >
                  Twilight Solstice
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap gap-4 font-sans text-xs">
              <button
                onClick={onOpenShowroomModal}
                className="px-6 py-3.5 bg-white text-black font-semibold uppercase tracking-[0.2em] text-[11px] hover:bg-[#EAE4DC] transition-colors flex items-center gap-2 rounded-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Launch 3D WebGL Showroom</span>
              </button>

              <button
                onClick={() => onNavigate('custom')}
                className="px-6 py-3.5 border border-white/30 text-white font-semibold uppercase tracking-[0.2em] text-[11px] hover:border-white transition-colors flex items-center gap-2 rounded-xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Consult Interior Architecture Studio</span>
              </button>
            </div>
          </div>

          {/* Render preview frame */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-white/15 bg-black">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                alt="Brera Studio Vol. II 3D Render"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-radial from-transparent to-black/60 pointer-events-none"></div>

              <div className="absolute bottom-4 inset-x-4 flex justify-between items-center bg-black/70 backdrop-blur-md p-3 rounded-xs text-xs font-sans">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block">Render Engine</span>
                  <span className="font-serif text-sm text-white">Brera Studio Vol. II</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={onOpenShowroomModal}
                    className="p-1.5 rounded-xs bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. TRADE PORTFOLIO DOWNLOAD BOX */}
      <div className="p-8 sm:p-12 bg-[#F0ECE6] border border-[#E2DDD4] rounded-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
              Trade & Architecture Division
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917] font-normal">
              Download the 2025 Spatial Specifier Portfolio
            </h3>
            <p className="text-xs text-[#5C5750] leading-relaxed font-sans">
              Comprehensive compendium featuring 48 residential installations, complete high-fidelity material swatches, AutoCAD/Revit BIM families, and white-glove logistics schedules.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 font-sans text-xs">
            <button
              onClick={() => {}}
              className="px-5 py-3.5 bg-[#1A1917] text-white text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors rounded-xs flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Trade Portfolio (PDF + BIM)</span>
            </button>

            <button
              onClick={onOpenMaterialBoxModal}
              className="px-5 py-3.5 border border-[#C8C1B6] text-[#1A1917] text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:border-black transition-colors rounded-xs"
            >
              Request Physical Material Box
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
