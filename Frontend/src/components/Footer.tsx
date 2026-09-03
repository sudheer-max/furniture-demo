import React, { useState } from 'react';
import { NavPage } from '../types';
import { Link } from '../lib/navigation';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E6E0D6] pt-20 pb-12 mt-20 text-[#1A1917]">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Philosophy & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E6E0D6]">
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#8C7456] block mb-3 font-sans">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1917] tracking-tight leading-[1.15]">
              Furniture crafted for spaces that endure.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#7E7A73] mb-3 block font-sans">
              Receive our private monographs & material studies
            </span>

            {subscribed ? (
              <div className="p-3 bg-[#F0ECE6] border border-[#DDD6CC] text-[12px] tracking-wider text-[#2A2825]">
                ✓ Your correspondence address has been enrolled in our seasonal dispatch registry.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex border-b border-[#1A1917] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email"
                  required
                  className="bg-transparent text-[13px] tracking-wide placeholder:text-[#A09A8F] text-[#1A1917] w-full focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  className="text-[11px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] hover:text-[#8C7456] transition-colors whitespace-nowrap focus:outline-none"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-[#E6E0D6] text-[12px]">
          <div>
            <h4 className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] mb-5 font-sans">
              Architecture & Interiors
            </h4>
            <ul className="space-y-3 text-[#6B665E]">
              <li>
                <button onClick={() => onNavigate('interiors')} className="hover:text-black transition-colors text-left">
                  Residential Sanctuaries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interiors')} className="hover:text-black transition-colors text-left">
                  Private Salons & Galleries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interiors')} className="hover:text-black transition-colors text-left">
                  Hospitality Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interiors')} className="hover:text-black transition-colors text-left">
                  Spatial Blueprint Archive
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] mb-5 font-sans">
              Collections
            </h4>
            <ul className="space-y-3 text-[#6B665E]">
              <li>
                <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors text-left">
                  Sculptural Seating
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors text-left">
                  Monolithic Tables
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors text-left">
                  Architectural Storage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors text-left">
                  Tactile Lighting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('furniture')} className="hover:text-black transition-colors text-left">
                  Cast Objects & Bronze
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] mb-5 font-sans">
              Atelier Services
            </h4>
            <ul className="space-y-3 text-[#6B665E]">
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-black transition-colors text-left">
                  Bespoke Dimensions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-black transition-colors text-left">
                  Stone & Walnut Samples
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('custom')} className="hover:text-black transition-colors text-left">
                  Trade & Hospitality Division
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('configurator')} className="hover:text-black transition-colors text-left">
                  AR Spatial Planning
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#1A1917] mb-5 font-sans">
              Company
            </h4>
            <ul className="space-y-3 text-[#6B665E]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-black transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-black transition-colors text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('interiors')} className="hover:text-black transition-colors text-left">
                  Showrooms
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-black transition-colors text-left">
                  Journal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Ateliers and Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] tracking-widest uppercase text-[#8A847B] gap-4 font-sans">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center md:text-left">
            <span>
              <strong className="text-[#1A1917] font-medium">Paris</strong> — 28 Rue du Faubourg Saint-Honoré
            </span>
            <span>
              <strong className="text-[#1A1917] font-medium">Milano</strong> — Via Montenapoleone 14
            </span>
            <span>
              <strong className="text-[#1A1917] font-medium">New York</strong> — 740 Madison Avenue
            </span>
          </div>

          <div className="text-right">
            <span>© 2025 Modern Furniture World • Premium Furniture & Interiors</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
