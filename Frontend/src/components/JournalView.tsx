import React, { useState } from 'react';
import { Play, BookOpen, Volume2, ArrowRight, Sparkles, Check, Download } from 'lucide-react';
import { Monograph, Currency } from '../types';
import { MONOGRAPHS, MATERIALS_ATLAS } from '../data/journalData';

interface JournalViewProps {
  currency: Currency;
  onOpenArticle: (monograph: Monograph) => void;
  onOpenMaterialModal: (material: any) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  currency,
  onOpenArticle,
  onOpenMaterialModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'craft' | 'geology' | 'architecture' | 'materials'>('all');
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const featured = MONOGRAPHS[0];
  const gridMonographs = MONOGRAPHS.slice(1);

  const filteredMonographs = selectedCategory === 'all' 
    ? gridMonographs 
    : gridMonographs.filter((m) => m.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20">
      
      {/* 1. Header & Curatorial Intro */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3">
          <span>Archives of Material Culture • Essays, Blueprints & Monographs</span>
          <span>Dordogne & Paris Atelier</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline pt-4">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
              Monographs & Curatorial Archive
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1917] tracking-tight">
              The Atelier Journal.
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              Curatorial reflections on slow ébénisterie, geological provenance, unhurried craft philosophies, and contemporary architectural space.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-[#E6E0D6] pt-4 scrollbar-none">
          {[
            { id: 'all', label: 'All Monographs (18)' },
            { id: 'craft', label: 'Joinery & Craft (6)' },
            { id: 'geology', label: 'Geological Provenance (4)' },
            { id: 'architecture', label: 'Spatial Architecture (5)' },
            { id: 'materials', label: 'Material Essays (3)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xs text-[11px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1917] text-[#FAF8F5]'
                  : 'bg-[#F4EFEB] text-[#5C5750] hover:bg-[#EAE4DC] hover:text-[#1A1917]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. FEATURED MONOGRAPH (The Geometry of Stillness) */}
      <div className="bg-[#F0ECE6] border border-[#E2DDD4] rounded-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 relative aspect-[16/10] bg-[#EAE4DC] overflow-hidden">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-xs">
              {featured.issue}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 lg:pr-12 space-y-6">
            <div className="flex items-center space-x-3 text-[10px] tracking-widest uppercase text-[#8C7456] font-sans font-semibold">
              <span>Featured Monograph</span>
              <span>•</span>
              <span>{featured.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Audio
              </span>
            </div>

            <h2 
              onClick={() => onOpenArticle(featured)}
              className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-normal leading-tight hover:text-[#8C7456] cursor-pointer transition-colors"
            >
              {featured.title}
            </h2>

            <p className="text-xs sm:text-[13px] text-[#5C5750] leading-relaxed font-sans">
              {featured.excerpt}
            </p>

            <div className="pt-2 border-t border-[#DDD6CB] flex items-center justify-between text-xs font-sans">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7E7A73] block">Author</span>
                <span className="font-serif text-sm font-medium text-[#1A1917]">{featured.author}</span>
              </div>
              <span className="text-[10px] text-[#7E7A73]">{featured.date}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-sans text-xs">
              <button
                onClick={() => onOpenArticle(featured)}
                className="px-6 py-3 bg-[#1A1917] text-[#FAF8F5] text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors flex items-center gap-2 rounded-xs"
              >
                <span>Read the Complete Monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenArticle(featured)}
                className="px-4 py-3 border border-[#C8C1B6] text-[#1A1917] text-[10.5px] tracking-[0.2em] uppercase font-semibold hover:border-black transition-colors flex items-center gap-2 rounded-xs"
              >
                <Play className="w-3 h-3" />
                <span>Listen to Essay (24:15)</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. 3-COLUMN ESSAYS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredMonographs.map((mono) => (
          <div
            key={mono.id}
            onClick={() => onOpenArticle(mono)}
            className="group cursor-pointer bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs overflow-hidden transition-all hover:border-[#C8C1B6] hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-[#EAE4DC] overflow-hidden">
                <img
                  src={mono.imageUrl}
                  alt={mono.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs">
                  {mono.issue}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-[#8C7456] font-sans">
                  <span>{mono.readTime}</span>
                  <span>{mono.date}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#1A1917] group-hover:text-[#8C7456] transition-colors leading-snug">
                  {mono.title}
                </h3>

                <p className="text-xs text-[#6B665E] font-sans leading-relaxed">
                  {mono.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#E5DFD6] mt-4 flex items-center justify-between text-xs font-sans">
              <span className="text-[11px] text-[#7E7A73]">{mono.author}</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-black group-hover:text-[#8C7456] transition-colors flex items-center gap-1">
                Read →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. GEOLOGICAL & BOTANICAL PROVENANCE ATLAS */}
      <div className="space-y-8 pt-12 border-t border-[#E6E0D6]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-1 font-sans">
              Material Culture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
              Geological & Botanical Provenance Atlas
            </h2>
          </div>
          <p className="text-xs text-[#7E7A73] max-w-md font-sans leading-relaxed">
            Detailed specifications of our sustainably logged timbers, quarried mineral travertines, and organic loomed yarns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS_ATLAS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onOpenMaterialModal(mat)}
              className="group cursor-pointer bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs p-6 space-y-4 transition-all hover:border-[#C8C1B6] hover:shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DDD6CB] pb-3">
                <span className="text-[9px] uppercase tracking-widest font-semibold text-[#8C7456] font-sans">
                  {mat.origin}
                </span>
                <span className="text-xs font-serif text-[#7E7A73]">{mat.seasoning}</span>
              </div>

              <h3 className="font-serif text-xl font-medium text-[#1A1917] group-hover:text-[#8C7456] transition-colors">
                {mat.name}
              </h3>

              <p className="text-xs text-[#6B665E] font-sans leading-relaxed">
                {mat.description}
              </p>

              <div className="pt-2 border-t border-[#DDD6CB] space-y-1.5 text-[11px] font-sans text-[#5C5750]">
                {Object.entries(mat.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="capitalize text-[#7E7A73]">{k}:</span>
                    <span className="font-medium text-[#1A1917]">{v}</span>
                  </div>
                ))}
              </div>

              <button className="pt-2 text-[10px] tracking-wider uppercase font-semibold text-black underline block group-hover:text-[#8C7456]">
                Inspect Provenance Archive →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CURATORIAL GAZETTE SUBSCRIPTION */}
      <div className="bg-[#FAF8F5] border border-[#E2DDD4] p-8 sm:p-12 rounded-xs text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
          Curatorial Print Edition
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
          The Atelier Monograph Gazette
        </h3>

        <p className="text-xs sm:text-[13px] text-[#6B665E] leading-relaxed font-sans max-w-xl mx-auto">
          Receive quarterly hand-bound print monographs on Japanese joinery, French timber heritage, and brutalist residential architecture directly to your studio.
        </p>

        {subscribed ? (
          <div className="p-4 bg-[#EAE4DC] border border-[#DDD6CB] rounded-xs inline-flex items-center gap-2 text-xs text-[#1A1917] font-sans">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Thank you. Your dispatch address has been registered in the Périgord atelier archive.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter studio or private email..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#F4EFEB] border border-[#C8C1B6] rounded-xs text-xs text-[#1A1917] placeholder:text-[#999] focus:outline-none focus:border-black font-sans"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1917] text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors rounded-xs whitespace-nowrap"
            >
              Subscribe to Print Archive
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
