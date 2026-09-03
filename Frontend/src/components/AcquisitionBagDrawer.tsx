import React from 'react';
import { X, Trash2, Sofa, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface AcquisitionBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  currency: Currency;
  onCheckout: () => void;
  onContinueBrowsing: () => void;
}

export const AcquisitionBagDrawer: React.FC<AcquisitionBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  currency,
  onCheckout,
  onContinueBrowsing,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.priceEUR * item.qty, 0);
  const totalCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[420px] bg-[#FAF8F5] border-l border-[#E6E0D6] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E6E0D6] flex items-center justify-between bg-[#F7F4EF]">
            <div className="flex items-center space-x-3">
              <h2 className="font-serif text-[22px] font-normal text-[#1A1917] tracking-tight">
                Acquisition Bag
              </h2>
              <span className="text-[10px] tracking-widest uppercase font-semibold bg-[#EAE4DC] text-[#4A453E] px-2 py-0.5 rounded-full font-sans">
                {totalCount < 10 ? `0${totalCount}` : totalCount} {totalCount === 1 ? 'Item' : 'Items'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#5C5750] hover:text-[#1A1917] transition-colors rounded-full hover:bg-[#EAE4DC]"
              aria-label="Close Acquisition Bag"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <Sofa className="w-12 h-12 text-[#C8C1B6] mx-auto mb-4 stroke-[1]" />
                <p className="font-serif text-xl text-[#5C5750] mb-2">Your acquisition bag is empty.</p>
                <p className="text-xs text-[#8A847B] max-w-xs mx-auto">
                  Select a bespoke monolithic commission or specify custom proportions in our configurator.
                </p>
                <button
                  onClick={onContinueBrowsing}
                  className="mt-6 text-xs uppercase tracking-[0.2em] font-semibold text-[#1A1917] border-b border-[#1A1917] pb-1 hover:text-[#8C7456] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 bg-[#F2EDE7] border border-[#E5DFD6] rounded-sm transition-all hover:border-[#D0C8BD]"
                >
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Thumbnail representation */}
                    <div className="w-16 h-16 bg-[#E8E2D9] rounded-sm border border-[#DDD6CB] flex items-center justify-center shrink-0 overflow-hidden">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Sofa className="w-8 h-8 text-[#8C7456] stroke-[1.2]" />
                      )}
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[16px] text-[#1A1917] font-medium leading-snug truncate">
                        {item.name}
                      </h3>
                      
                      <p className="text-[10px] tracking-wider uppercase text-[#7E7A73] font-sans mt-0.5">
                        {item.subtitle || `${item.timber} • ${item.upholsteryColor || 'BOUCLÉ ÉCRU'}`}
                      </p>

                      <div className="flex items-center justify-between mt-3 text-[11px] text-[#5C5750]">
                        <span className="font-sans">Qty: {item.qty < 10 ? `0${item.qty}` : item.qty}</span>
                        <span className="font-serif text-[15px] font-semibold text-[#1A1917]">
                          {formatPrice(item.priceEUR * item.qty, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#9E988E] hover:text-[#B33927] p-1 transition-colors"
                      title="Remove Piece"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Calculations */}
          <div className="p-6 border-t border-[#E6E0D6] bg-[#FAF8F5] space-y-4">
            <div className="flex items-center justify-between text-[11px] text-[#7E7A73] font-sans tracking-wide">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8C7456]" />
                Estimated White Glove Delivery
              </span>
              <span className="text-[#1A1917] font-medium">Complimentary</span>
            </div>

            <div className="flex items-center justify-between border-t border-[#E6E0D6] pt-3 text-[#1A1917]">
              <span className="text-xs uppercase tracking-widest font-sans">Subtotal</span>
              <span className="font-serif text-2xl font-normal tracking-tight">
                {formatPrice(subtotal, currency)}
              </span>
            </div>

            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="w-full py-4 bg-[#1A1917] text-[#FAF8F5] text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onContinueBrowsing}
              className="w-full py-2 text-center text-[10px] tracking-[0.2em] uppercase text-[#7E7A73] hover:text-[#1A1917] transition-colors focus:outline-none"
            >
              Continue Browsing
            </button>

            <div className="pt-2 flex items-center justify-center gap-1 text-[9.5px] text-[#A09A8F] tracking-wide font-sans">
              <ShieldCheck className="w-3 h-3 text-[#8C7456]" />
              <span>50-Year Recorded Dordogne Provenance Register</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
