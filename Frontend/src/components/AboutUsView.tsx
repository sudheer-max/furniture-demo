import React from 'react';
import { ArrowRight, Award, Users, Globe, Leaf } from 'lucide-react';
import { NavPage } from '../types';

interface AboutUsProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-20">

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[10px] tracking-[0.24em] uppercase text-[#7E7A73] font-sans border-b border-[#E6E0D6] pb-3">
        <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Home</button>
        <span>/</span>
        <span className="text-[#1A1917] font-semibold">About Us</span>
      </div>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block font-sans">
            Our Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1917] font-light leading-tight">
            Crafting Furniture <br />
            <span className="italic font-normal">That Lasts Generations.</span>
          </h1>
          <p className="text-[15px] text-[#5C5750] leading-relaxed font-sans font-light">
            Modern Furniture World was founded with a singular vision: to create architectural furniture that transcends trends and becomes part of a home's legacy. Every piece is designed to anchor rooms with presence, warmth, and quiet confidence.
          </p>
          <p className="text-[15px] text-[#5C5750] leading-relaxed font-sans font-light">
            We work with master craftspeople across France, Italy, and Japan — combining centuries-old joinery techniques with contemporary spatial design to produce furniture of extraordinary longevity.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-[#DDD6CB]">
          <img
            src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=1200&auto=format&fit=crop"
            alt="Modern Furniture World workshop"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white p-3 text-[10px] uppercase tracking-wider">
            <span className="text-[#D4AF37] block font-semibold">Master Craftsman</span>
            Hand-finishing French Walnut, Périgord Atelier
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Award, label: 'Years of Craft', value: '18+' },
          { icon: Users, label: 'Master Artisans', value: '45' },
          { icon: Globe, label: 'Countries Served', value: '30+' },
          { icon: Leaf, label: 'Sustainable Materials', value: '100%' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs text-center space-y-2">
            <stat.icon className="w-5 h-5 text-[#8C7456] mx-auto" />
            <span className="font-serif text-3xl text-[#1A1917] block">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#7E7A73] font-sans">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="space-y-8">
        <div className="border-b border-[#E6E0D6] pb-6">
          <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#8C7456] block mb-2 font-sans">
            Our Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
            Built on Principles.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Material Integrity',
              desc: 'Every timber billet is seasoned through three full winters before being worked. We reject synthetic glues and high-speed laminate presses in favor of hand-cut through-tenon and sliding dovetail joints.',
            },
            {
              title: 'Spatial Intelligence',
              desc: 'Our pieces are designed to work within architectural volumes — not merely fill them. Proportions, shadow lines, and materiality are calibrated to complement the spaces they inhabit.',
            },
            {
              title: 'Generational Quality',
              desc: 'Each piece carries a 25-year structural warranty and lifetime provenance credentials. We build furniture that becomes more beautiful with age, not less.',
            },
          ].map((value, i) => (
            <div key={i} className="p-6 bg-[#F0ECE6] border border-[#E2DDD4] rounded-xs space-y-3">
              <h3 className="font-serif text-lg font-medium text-[#1A1917]">{value.title}</h3>
              <p className="text-xs text-[#6B665E] leading-relaxed font-sans">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-[#E6E0D6] py-16 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] font-light">
          Visit Our Showrooms
        </h2>
        <p className="text-sm text-[#6B665E] max-w-xl mx-auto font-sans leading-relaxed">
          Experience our furniture in person. Walk through curated spatial compositions in Paris, Milano, or New York.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors flex items-center gap-2"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('furniture')}
            className="px-6 py-3.5 border border-[#1A1917] text-[#1A1917] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-[#1A1917] hover:text-[#FAF8F5] transition-all"
          >
            View Collection
          </button>
        </div>
      </section>

    </div>
  );
};
