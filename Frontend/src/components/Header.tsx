import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { NavPage } from '../types';
import { Link } from '../lib/navigation';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist?: () => void;
  onOpenConcierge?: () => void;
  isHeroInView?: boolean;
}

const NAV_ITEMS = [
  { page: 'furniture' as const, label: 'Furniture', mobileLabel: 'Furniture' },
  { page: 'interiors' as const, label: 'Interiors', mobileLabel: 'Interiors' },
  { page: 'about' as const, label: 'About Us', mobileLabel: 'About Us' },
  { page: 'contact' as const, label: 'Contact', mobileLabel: 'Contact Us' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onOpenConcierge,
  isHeroInView = false,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const transparent = isHeroInView && currentPage === 'home';

  const handleNav = (page: NavPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`w-full z-40 transition-all duration-500 border-b ${
          transparent
            ? 'absolute top-0 left-0 bg-transparent border-transparent'
            : 'sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md border-[#E6E0D6]'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-1.5 -ml-1 transition-colors focus:outline-none ${
              transparent ? 'text-white' : 'text-[#1A1917]'
            }`}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand */}
          <Link
            href="/"
            onClick={() => { onNavigate('home'); setMobileOpen(false); }}
            className="flex items-center space-x-2 sm:space-x-3 text-left group focus:outline-none"
            aria-label="Modern Furniture World Home"
          >
            <div className={`w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center border rotate-45 group-hover:rotate-0 transition-transform duration-500 ${
              transparent ? 'border-white/80' : 'border-[#1A1917]/80'
            }`}>
              <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border-t border-l ${transparent ? 'border-white' : 'border-[#1A1917]'}`}></div>
            </div>
            <div>
              <span className={`font-serif text-[15px] sm:text-[18px] tracking-[0.16em] uppercase font-medium block leading-tight transition-colors duration-500 ${
                transparent ? 'text-white' : 'text-[#1A1917]'
              }`}>
                Modern Furniture World
              </span>
              <span className={`text-[8px] sm:text-[9px] tracking-[0.24em] uppercase block font-sans transition-colors duration-500 ${
                transparent ? 'text-white/60' : 'text-[#7E7A73]'
              }`}>
                Premium Furniture & Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {NAV_ITEMS.map(({ page, label }) => {
              const isActive = currentPage === page || (page === 'custom' && currentPage === 'atelier');
              return (
                <Link
                  key={page}
                  href={`/${page}`}
                  onClick={() => onNavigate(page)}
                  className={`text-[12px] tracking-[0.22em] uppercase transition-all py-1 relative font-medium ${
                    transparent
                      ? isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                      : isActive ? 'text-[#1A1917] font-semibold' : 'text-[#5C5750] hover:text-[#1A1917]'
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-colors duration-500 ${
                      transparent ? 'bg-white' : 'bg-[#1A1917]'
                    }`}></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-5">
            <button onClick={onOpenSearch} className={`p-1.5 transition-colors focus:outline-none ${transparent ? 'text-white/70 hover:text-white' : 'text-[#403C36] hover:text-[#1A1917]'}`} aria-label="Search">
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>
            <button onClick={onOpenWishlist} className={`hidden sm:block p-1.5 transition-colors relative focus:outline-none ${transparent ? 'text-white/70 hover:text-white' : 'text-[#403C36] hover:text-[#1A1917]'}`} aria-label="Wishlist">
              <Heart className="w-4 h-4 stroke-[1.75]" />
              <span className={`absolute -top-1 -right-1.5 text-[9px] font-sans font-medium rounded-full w-4 h-4 flex items-center justify-center ${transparent ? 'bg-white text-black' : 'bg-[#2A2825] text-[#FAF8F5]'}`}>03</span>
            </button>
            <button onClick={onOpenCart} className={`p-1.5 transition-colors relative focus:outline-none group ${transparent ? 'text-white/70 hover:text-white' : 'text-[#403C36] hover:text-[#1A1917]'}`} aria-label="Cart">
              <ShoppingBag className="w-4 h-4 stroke-[1.75] group-hover:scale-105 transition-transform" />
              <span className={`absolute -top-1 -right-1.5 text-[9px] font-sans font-medium rounded-full w-4 h-4 flex items-center justify-center ${transparent ? 'bg-white text-black' : 'bg-[#1A1917] text-[#FAF8F5]'}`}>{cartCount < 10 ? `0${cartCount}` : cartCount}</span>
            </button>
            <button onClick={onOpenConcierge} className={`hidden sm:block p-1.5 transition-colors focus:outline-none ${transparent ? 'text-white/70 hover:text-white' : 'text-[#403C36] hover:text-[#1A1917]'}`} aria-label="Profile">
              <User className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 z-30 bg-[#FAF8F5] border-b border-[#E6E0D6] shadow-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col py-2">
          {NAV_ITEMS.map(({ page, mobileLabel }) => {
            const isActive = currentPage === page || (page === 'custom' && currentPage === 'atelier');
            return (
              <Link
                key={page}
                href={`/${page}`}
                onClick={() => handleNav(page)}
                className={`px-6 py-3.5 text-[13px] tracking-[0.18em] uppercase font-medium transition-colors border-b border-[#E6E0D6]/50 last:border-b-0 ${
                  isActive
                    ? 'text-[#1A1917] font-semibold bg-[#F4EFEB]'
                    : 'text-[#5C5750] hover:text-[#1A1917] hover:bg-[#F4EFEB]/50'
                }`}
              >
                {mobileLabel}
              </Link>
            );
          })}

          {/* Quick actions */}
          <div className="flex items-center gap-4 px-6 py-3.5 border-t border-[#E6E0D6] mt-1">
            <button onClick={() => { onOpenSearch(); setMobileOpen(false); }} className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#5C5750]">
              <Search className="w-3.5 h-3.5" />
              Search
            </button>
            <button onClick={() => { onOpenWishlist?.(); setMobileOpen(false); }} className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#5C5750]">
              <Heart className="w-3.5 h-3.5" />
              Wishlist
            </button>
            <button onClick={() => { onOpenConcierge?.(); setMobileOpen(false); }} className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#5C5750]">
              <User className="w-3.5 h-3.5" />
              Account
            </button>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black/30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};
