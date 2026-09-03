import React, { useState } from 'react';
import { ArrowRight, Compass, Shield, Sliders, Box, Check, Sparkles } from 'lucide-react';
import { NavPage, Currency } from '../types';
import { TYPOLOGIES } from '../data/furnitureData';
import { SpatialViewer3D } from './SpatialViewer3D';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface HomeViewProps {
  onNavigate: (page: NavPage) => void;
  currency: Currency;
  onOpenARModal: () => void;
  onOpenSwatchModal: () => void;
  onOpenAppointmentModal: () => void;
  onHeroInViewChange?: (inView: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenARModal,
  onOpenSwatchModal,
  onOpenAppointmentModal,
  onHeroInViewChange,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* 1. HERO SECTION — Full 360° Background, breaks out of parent padding */}
      <section className="md:-mx-8 lg:-mx-16 xl:-mx-20 2xl:-mx-24">
        <SpatialViewer3D onInViewChange={onHeroInViewChange}>
          <div className="w-full max-w-[1540px] mx-auto space-y-4 sm:space-y-5 pb-4 px-5 sm:px-10 lg:px-16 pointer-events-none">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-white/80 font-sans">
                Modern Furniture World • Premium Collections
              </span>
            </div>

            <h1 className="font-serif text-[32px] sm:text-5xl md:text-6xl xl:text-7xl font-light text-white tracking-tight leading-[1.08] drop-shadow-lg">
              Furniture That <br />
              <span className="italic font-normal">Shapes the Room.</span>
            </h1>

            <p className="text-[15px] sm:text-[16px] text-white/85 leading-relaxed max-w-xl font-sans font-light drop-shadow-md">
              Crafted with intention. Designed for spaces that last. Monolithic timber geometry converges with hand-loomed textiles in architectural repose.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 pointer-events-auto">
              <button
                onClick={() => onNavigate('furniture')}
                className="px-6 py-3.5 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('custom')}
                className="px-6 py-3.5 border border-white text-white text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-white hover:text-[#1A1917] transition-all"
              >
                Discover Our Craft
              </button>

              <button
                onClick={() => onNavigate('interiors')}
                className="text-[11px] tracking-[0.2em] uppercase font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5 ml-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                Launch 3D Room
              </button>
            </div>

            <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-white pointer-events-auto">
              <div>
                <span className="text-[9.5px] uppercase tracking-widest text-[#D4AF37] block font-sans">Masterpiece</span>
                <span className="font-serif text-base font-normal drop-shadow-md">The Svelto Chaise</span>
              </div>
              <div>
                <span className="text-[9.5px] uppercase tracking-widest text-[#D4AF37] block font-sans">Origin</span>
                <span className="font-serif text-base font-normal drop-shadow-md">Périgord Atelier</span>
              </div>
              <div>
                <span className="text-[9.5px] uppercase tracking-widest text-[#D4AF37] block font-sans">Edition</span>
                <span className="font-serif text-base font-normal drop-shadow-md">Limited 24 / Yr</span>
              </div>
            </div>
          </div>
        </SpatialViewer3D>
      </section>

      {/* 2. FOUR LUXURY COMMITMENT CARDS */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#EAE4DC] flex items-center justify-center text-[#1A1917] mb-4">
              <Box className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">White-Glove Placement</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed font-sans">
              Delivered uncrated, leveled, and conditioned by our specialized French cabinetmakers worldwide.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#EAE4DC] flex items-center justify-center text-[#1A1917] mb-4">
              <Shield className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">25-Year Guarantee</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed font-sans">
              Every joinery joint and structural timber element carries lifetime recorded provenance credentials.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#EAE4DC] flex items-center justify-center text-[#1A1917] mb-4">
              <Sliders className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">Bespoke Millimeter Scaling</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed font-sans">
              Custom proportions scaled specifically to your architectural blueprints without structural compromise.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-3">
            <div className="w-9 h-9 rounded-full bg-[#EAE4DC] flex items-center justify-center text-[#1A1917] mb-4">
              <Sparkles className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1A1917]">Architectural Material Kit</h3>
            <p className="text-xs text-[#6B665E] leading-relaxed font-sans">
              Boxed tactile samples of French Walnut, honed travertines, and hand-woven bouclé shipped to your studio.
            </p>
          </div>

        </div>
      </section>

      {/* 2.5 BEFORE & AFTER: Interior Transformation */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6E0D6] pb-6 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
              Spatial Transformation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Before & After.
            </h2>
          </div>
          <p className="text-xs text-[#7E7A73] max-w-md font-sans leading-relaxed">
            Drag the slider to reveal how Modern Furniture World pieces transform architectural spaces from empty volumes into curated interiors.
          </p>
        </div>

        <BeforeAfterSlider
          beforeSrc="/before-interior.png"
          afterSrc="/after-interior.png"
          beforeLabel="Before"
          afterLabel="After"
        />
      </section>

      {/* 3. SPATIAL TYPOLOGIES: DESIGNED FOR LIVING */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E6E0D6] pb-6 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
              Spatial Typologies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Designed for Living.
            </h2>
          </div>
          <p className="text-xs text-[#7E7A73] max-w-md font-sans leading-relaxed">
            Objects created to anchor open-plan living, framed by substantial proportions, organic finishes, and acoustic warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TYPOLOGIES.map((typ, idx) => (
            <div 
              key={idx}
              onClick={() => onNavigate('furniture')}
              className="group cursor-pointer bg-[#F4EFEB] border border-[#E5DFD6] overflow-hidden rounded-xs transition-all hover:border-[#C8C1B6] hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4DC]">
                <img
                  src={typ.imageUrl}
                  alt={typ.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-xs">
                  {typ.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-[#1A1917] text-[9.5px] uppercase tracking-wider px-2.5 py-1 rounded-xs">
                  {typ.span}
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1A1917] group-hover:text-[#8C7456] transition-colors">
                    {typ.title}
                  </h3>
                  <p className="text-xs text-[#6B665E] font-sans mt-1.5 max-w-sm">
                    {typ.subtitle}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border border-[#D5CEC4] flex items-center justify-center text-[#1A1917] group-hover:bg-[#1A1917] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE ÉBÉNISTERIE METHOD: THE ART OF SLOW JOINERY */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F0ECE6] border border-[#E2DDD4] p-8 sm:p-12 lg:p-16 rounded-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visuals column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xs border border-[#DDD6CB]">
                  <img
                    src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=800&auto=format&fit=crop"
                    alt="Timber mortise and tenon joint"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white p-2 text-[9px] uppercase tracking-wider">
                    <span className="text-[#D4AF37] block font-semibold">Sourcing Origin</span>
                    Tronçais & Vézère Basin
                  </div>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-xs border border-[#DDD6CB]">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
                    alt="Pierre Perrin hand planing timber"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/85 backdrop-blur-xs text-[#1A1917] p-2 text-[9px] uppercase tracking-wider">
                    <span className="text-[#8C7456] block font-semibold">Master Ébéniste</span>
                    Pierre Perrin Hand-Finishing
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#EAE4DC] border border-[#DDD6CB] flex items-center justify-between text-[11px] font-sans">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8C7456] block font-semibold">Tolerance Metric</span>
                  <span className="font-serif text-lg text-[#1A1917]">±0.25 Millimeters</span>
                </div>
                <p className="text-xs text-[#6B665E] max-w-xs text-right">
                  Fitted entirely by hand without metallic mechanical fasteners.
                </p>
              </div>
            </div>

            {/* Story & Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
                The Ébénisterie Method
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light leading-tight">
                The Art of Slow Joinery.
              </h2>

              <p className="text-[14px] text-[#5C5750] leading-relaxed font-sans">
                In our Dordogne workshop, we reject synthetic glues and high-speed laminate presses. Every timber billet is seasoned through three full French winters before being planed, respecting natural tensions and moisture balance.
              </p>

              <p className="text-[14px] text-[#5C5750] leading-relaxed font-sans">
                Our craftsmen employ through-tenon and sliding dovetail joints perfected over three centuries. These allow the wood to breathe with changing humidity over decades without warping, cracking, or yielding its structural geometry.
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#DDD6CB]">
                <div>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#7E7A73] block font-sans">Curing Season</span>
                  <span className="font-serif text-base text-[#1A1917]">36 Months Natural Air</span>
                </div>
                <div>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#7E7A73] block font-sans">Finish Application</span>
                  <span className="font-serif text-base text-[#1A1917]">Cold Organic Wax</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('journal')}
                className="text-[11px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] hover:text-[#8C7456] transition-colors flex items-center gap-2"
              >
                <span>Read the Full Fabrication Monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SPATIAL BLUEPRINT: WALK THROUGH THE MILANO RESIDENCE */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-1 font-sans">
              Spatial Blueprint Simulation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Walk Through the Milano Residence.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#7E7A73]">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>Interactive Hotspot Tour</span>
          </div>
        </div>

        {/* Milano Room Canvas */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xs overflow-hidden border border-[#DDD6CB] bg-[#1A1917]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Palazzo Brera Milano Salon with Modern Furniture World pieces"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Top Canvas Bar */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white text-xs pointer-events-none">
            <span className="font-serif text-sm tracking-wider bg-black/60 backdrop-blur-xs px-3 py-1 rounded-xs">
              Modern Furniture World
            </span>
            <span className="text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-xs px-3 py-1 rounded-xs">
              Location: Milan
            </span>
          </div>

          {/* Hotspot 01: Svelto Chaise */}
          <div className="absolute top-[68%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
              className="relative w-8 h-8 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform"
            >
              <span className="absolute inset-0 rounded-full border border-white animate-ping"></span>
              01
            </button>

            {activeHotspot === 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-30 animate-in fade-in">
                <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">01 • Seating</span>
                <p className="font-serif text-sm font-medium text-[#1A1917]">The Svelto Chaise</p>
                <p className="text-[10px] text-[#7E7A73] mt-0.5">₹1,48,000 / €1,650</p>
                <button
                  onClick={() => onNavigate('pdp')}
                  className="mt-2 text-[9px] uppercase tracking-widest font-semibold text-black underline block"
                >
                  Configure Piece →
                </button>
              </div>
            )}
          </div>

          {/* Hotspot 02: Cévennes Bronze Totem */}
          <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
              className="relative w-8 h-8 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform"
            >
              <span className="absolute inset-0 rounded-full border border-white animate-ping"></span>
              02
            </button>

            {activeHotspot === 2 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-30 animate-in fade-in">
                <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">02 • Lighting</span>
                <p className="font-serif text-sm font-medium text-[#1A1917]">Cévennes Bronze Totem</p>
                <p className="text-[10px] text-[#7E7A73] mt-0.5">€4,900</p>
              </div>
            )}
          </div>

          {/* Hotspot 03: Stria Travertine Table */}
          <div className="absolute top-[75%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={() => setActiveHotspot(activeHotspot === 3 ? null : 3)}
              className="relative w-8 h-8 rounded-full bg-white/90 text-[#1A1917] shadow-lg flex items-center justify-center font-serif text-xs font-semibold hover:scale-110 transition-transform"
            >
              <span className="absolute inset-0 rounded-full border border-white animate-ping"></span>
              03
            </button>

            {activeHotspot === 3 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-[#E6E0D6] rounded-xs shadow-xl text-left z-30 animate-in fade-in">
                <span className="text-[8.5px] uppercase tracking-widest text-[#8C7456] block font-semibold">03 • Monolith</span>
                <p className="font-serif text-sm font-medium text-[#1A1917]">Stria Travertine Table</p>
                <p className="text-[10px] text-[#7E7A73] mt-0.5">€9,400</p>
              </div>
            )}
          </div>

          {/* Bottom Bar inside Canvas */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white/90 text-[10px] tracking-wider uppercase bg-black/60 backdrop-blur-md p-3 rounded-xs">
            <div className="flex items-center space-x-4">
              <span>Spatial Perspective: Salon Principale</span>
              <span className="hidden sm:inline-block text-[#8C7456]">45.4719° N, 9.1879° E</span>
            </div>
            <button
              onClick={() => onNavigate('interiors')}
              className="text-white hover:text-[#8C7456] transition-colors underline font-medium"
            >
              Configure Room Layout ⊞
            </button>
          </div>
        </div>
      </section>

      {/* 6. CALLOUT: YOUR SPACE AWAITS ITS DEFINING MONOLITH */}
      <section className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-y border-[#E6E0D6] py-16 text-center space-y-6">
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
            Architectural Commissions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1917] font-light max-w-2xl mx-auto">
            Your Space Awaits Its Defining Monolith.
          </h2>
          <p className="text-sm text-[#6B665E] max-w-xl mx-auto font-sans leading-relaxed">
            Consult directly with our studio directors in Paris, Milan, or via encrypted video link. We prepare custom material portfolios and digital scale models for residential and hospitality architects.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenAppointmentModal}
              className="px-6 py-3.5 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors"
            >
              Reserve Private Appointment
            </button>
            <button
              onClick={onOpenSwatchModal}
              className="px-6 py-3.5 border border-[#1A1917] text-[#1A1917] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-[#1A1917] hover:text-[#FAF8F5] transition-colors"
            >
              Request Material Swatch Portfolio
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
