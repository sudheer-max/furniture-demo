import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Check, 
  Box, 
  Calendar, 
  Smartphone, 
  Play, 
  Pause, 
  Volume2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { FurnitureItem, Monograph, CartItem, Currency, NavPage } from '../types';
import { FURNITURE_ITEMS } from '../data/furnitureData';
import { MONOGRAPHS } from '../data/journalData';
import { formatPrice } from '../utils/formatters';

// 1. SEARCH MODAL
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (item: FurnitureItem) => void;
  onSelectArticle: (article: Monograph) => void;
  onNavigate: (page: NavPage) => void;
  currency: Currency;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectArticle,
  onNavigate,
  currency,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedItems = query.trim() === '' 
    ? FURNITURE_ITEMS.slice(0, 4) 
    : FURNITURE_ITEMS.filter((item) => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtext.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const matchedArticles = query.trim() === ''
    ? MONOGRAPHS.slice(0, 2)
    : MONOGRAPHS.filter((art) =>
        art.title.toLowerCase().includes(query.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Search input bar */}
        <div className="p-4 border-b border-[#E6E0D6] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C7456]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search furniture, monoliths, materials, or monographs..."
            className="flex-1 bg-transparent text-sm text-[#1A1917] placeholder:text-[#9E988E] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#7E7A73] hover:text-black rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto font-sans">
          {/* Furniture results */}
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7456] block mb-3">
              Furniture Editions ({matchedItems.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onNavigate('pdp');
                    onClose();
                  }}
                  className="p-3 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs hover:border-[#1A1917] cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-sm font-medium text-[#1A1917] truncate">{item.name}</h4>
                    <p className="text-[10px] text-[#7E7A73] truncate">{item.subtext}</p>
                    <span className="text-[11px] font-serif font-semibold text-[#1A1917]">
                      {formatPrice(item.priceEUR, currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monographs results */}
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7456] block mb-3">
              Curatorial Monographs ({matchedArticles.length})
            </span>
            <div className="space-y-2">
              {matchedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="p-3 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs hover:border-[#1A1917] cursor-pointer flex justify-between items-center transition-colors"
                >
                  <div>
                    <h5 className="font-serif text-sm font-medium text-[#1A1917]">{art.title}</h5>
                    <span className="text-[10px] text-[#7E7A73]">{art.issue} • {art.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7456]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search footer */}
        <div className="p-3 bg-[#F2EDE7] border-t border-[#E6E0D6] flex justify-between text-[10px] text-[#7E7A73] font-sans">
          <span>Press ESC to close</span>
          <span>Modern Furniture World Index</span>
        </div>

      </div>
    </div>
  );
};


// 2. SWATCH KIT MODAL
interface SwatchKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SwatchKitModal: React.FC<SwatchKitModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [swatchAddress, setSwatchAddress] = useState({ name: '', practice: '', address: '', city: '', postal: '', country: 'France' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#7E7A73] hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase font-semibold text-[#8C7456]">
            <Box className="w-4 h-4" />
            <span>Complimentary Architectural Material Box</span>
          </div>

          <h3 className="font-serif text-2xl text-[#1A1917] font-normal">
            Request Tactile Swatch Portfolio
          </h3>

          <p className="text-xs text-[#5C5750] leading-relaxed font-sans">
            Shipped in an unlacquered walnut box containing 4 timber blocks (Canal Walnut, White Oak, Ebonized Ash), 2 honed travertine tiles, and 6 unbleached bouclé swatches.
          </p>

          {submitted ? (
            <div className="py-8 text-center space-y-3 font-sans">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-serif text-lg text-[#1A1917]">Dispatch Registered</p>
              <p className="text-xs text-[#6B665E]">
                Your material box will be assembled in our Périgord atelier and dispatched via DHL Express with tracking.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#1A1917] text-white text-[11px] uppercase tracking-wider font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Architect / Name</label>
                  <input
                    required
                    type="text"
                    value={swatchAddress.name}
                    onChange={(e) => setSwatchAddress({ ...swatchAddress, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                    placeholder="Marcelle Guérin"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Studio / Firm</label>
                  <input
                    type="text"
                    value={swatchAddress.practice}
                    onChange={(e) => setSwatchAddress({ ...swatchAddress, practice: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                    placeholder="Studio Guérin"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Studio Delivery Address</label>
                <input
                  required
                  type="text"
                  value={swatchAddress.address}
                  onChange={(e) => setSwatchAddress({ ...swatchAddress, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                  placeholder="14 Rue de Tournon"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">City</label>
                  <input
                    required
                    type="text"
                    value={swatchAddress.city}
                    onChange={(e) => setSwatchAddress({ ...swatchAddress, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                    placeholder="Paris"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Postal Code</label>
                  <input
                    required
                    type="text"
                    value={swatchAddress.postal}
                    onChange={(e) => setSwatchAddress({ ...swatchAddress, postal: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                    placeholder="75006"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Country</label>
                  <input
                    required
                    type="text"
                    value={swatchAddress.country}
                    onChange={(e) => setSwatchAddress({ ...swatchAddress, country: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                    placeholder="France"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A1917] text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors rounded-xs mt-2"
              >
                Dispatch Material Swatch Box
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};


// 3. APPOINTMENT MODAL
interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [reserved, setReserved] = useState(false);
  const [loc, setLoc] = useState('Paris Salon (Place des Vosges)');
  const [date, setDate] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#7E7A73] hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase font-semibold text-[#8C7456]">
            <Calendar className="w-4 h-4" />
            <span>Private Salon Consultation</span>
          </div>

          <h3 className="font-serif text-2xl text-[#1A1917] font-normal">
            Reserve Private Consultation
          </h3>

          <p className="text-xs text-[#5C5750] leading-relaxed font-sans">
            Schedule a dedicated 60-minute spatial blueprint review with our studio directors at our private salons or via encrypted video link.
          </p>

          {reserved ? (
            <div className="py-8 text-center space-y-3 font-sans">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-serif text-lg text-[#1A1917]">Consultation Reserved</p>
              <p className="text-xs text-[#6B665E]">
                Confirmation details and digital calendar pass have been transmitted to your studio.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-[#1A1917] text-white text-[11px] uppercase tracking-wider font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReserved(true); }} className="space-y-3 text-xs font-sans">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Location / Format</label>
                <select
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                >
                  <option>Paris Salon (Place des Vosges)</option>
                  <option>Milan Studio (Palazzo Brera)</option>
                  <option>Dordogne Atelier (Les Eyzies)</option>
                  <option>Encrypted Video Link (Worldwide)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Preferred Date</label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7E7A73] block mb-1">Direct Contact Email</label>
                <input
                  required
                  type="email"
                  placeholder="architect@domain.com"
                  className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1A1917] text-white text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-black transition-colors rounded-xs mt-2"
              >
                Confirm Appointment Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};


// 4. AR SCALE PREVIEW MODAL
interface ARModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ARModal: React.FC<ARModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl p-6 sm:p-8 relative text-center animate-in fade-in zoom-in-95 font-sans">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#7E7A73] hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7456] block mb-2">
          Apple AR QuickLook & WebXR
        </span>

        <h3 className="font-serif text-2xl text-[#1A1917]">
          View In Your Room (AR)
        </h3>

        <p className="text-xs text-[#5C5750] max-w-xs mx-auto mt-2 leading-relaxed">
          Scan this QR code with your iPhone, iPad, or Android camera to project The Svelto Chaise at true 1:1 architectural scale.
        </p>

        {/* QR Code graphic */}
        <div className="p-6 bg-white border border-[#DDD6CB] inline-block rounded-xs my-6 shadow-xs">
          <div className="w-40 h-40 bg-contain bg-center bg-no-repeat mx-auto flex items-center justify-center bg-[#F4EFEB]">
            {/* Minimalist vector QR aesthetic */}
            <div className="grid grid-cols-6 gap-1 p-2 w-full h-full">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    (i % 2 === 0 && i % 3 !== 1) || i < 7 || i % 6 === 0
                      ? 'bg-[#1A1917]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-[9px] text-[#7E7A73] uppercase tracking-wider block mt-3 font-mono">
            USDZ // GLTF 2.0 • 1:1 Scale
          </span>
        </div>

        <p className="text-[11px] text-[#7E7A73]">
          Works with Safari on iOS 15+ and Chrome on Android with ARCore.
        </p>
      </div>
    </div>
  );
};


// 5. MONOGRAPH READER MODAL
interface MonographReaderModalProps {
  monograph: Monograph | null;
  onClose: () => void;
}

export const MonographReaderModal: React.FC<MonographReaderModalProps> = ({ monograph, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!monograph) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center pt-10 sm:pt-16 pb-16 px-4">
      <div className="w-full max-w-3xl bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
        
        {/* Sticky Header */}
        <div className="p-4 sm:p-6 bg-[#F4EFEB] border-b border-[#E6E0D6] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center space-x-3 text-xs font-sans">
            <span className="text-[9.5px] uppercase tracking-widest text-[#8C7456] font-semibold">
              {monograph.issue}
            </span>
            <span>•</span>
            <span className="text-[#7E7A73]">{monograph.readTime}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xs bg-[#1A1917] text-white text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5 hover:bg-black"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? 'Pause Audio' : 'Listen'}</span>
            </button>

            <button onClick={onClose} className="p-1.5 text-[#7E7A73] hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-12 space-y-8 font-sans">
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1917] font-normal leading-tight">
              {monograph.title}
            </h1>

            <div className="flex justify-between items-center text-xs text-[#7E7A73] pt-2 border-b border-[#E6E0D6] pb-4">
              <span>By {monograph.author}</span>
              <span>Published {monograph.date}</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-xs overflow-hidden border border-[#DDD6CB]">
            <img
              src={monograph.imageUrl}
              alt={monograph.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-stone max-w-none text-[#333] text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-serif text-xl sm:text-2xl text-[#1A1917] italic leading-relaxed">
              “{monograph.excerpt}”
            </p>

            <p>
              In our Périgord atelier, time is treated not as an expenditure of overhead, but as an indispensable raw material. A French walnut trunk cannot be accelerated through industrial kiln chambers without tearing the vascular grain boundaries that give the wood its organic sheen.
            </p>

            <p>
              When a slab spends three winters exposed to river breezes and gentle Dordogne frosts, the natural starches transform. The internal moisture drops evenly across every cubic centimeter, settling into a permanent equilibrium with European residential atmospheres.
            </p>

            <div className="p-6 bg-[#F4EFEB] border-l-2 border-[#8C7456] my-6 font-serif text-lg text-[#1A1917]">
              “A piece of furniture should not chatter. It should anchor the room with the silence of ancient stone.”
            </div>

            <p>
              Each mortise and tenon joint is fitted with hand scrapers to a tolerance of 0.25 millimeters. The craftsmen coat the mating surfaces in hot hide glue or cold bee propolis wax—substances that have preserved Gothic cathedral choir stalls for over five centuries.
            </p>
          </div>

          <div className="pt-8 border-t border-[#E6E0D6] flex justify-between items-center text-xs text-[#7E7A73]">
            <span>Modern Furniture World Archival Register</span>
            <button
              onClick={onClose}
              className="text-black uppercase tracking-widest font-semibold underline"
            >
              Return to Journal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};


// 6. CHECKOUT MODAL
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onSuccess,
}) => {
  const [step, setStep] = useState<'address' | 'confirmation'>('address');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.priceEUR * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#FAF8F5] border border-[#E6E0D6] rounded-xs shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in-95 font-sans">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-[#7E7A73] hover:text-black">
          <X className="w-5 h-5" />
        </button>

        {step === 'address' ? (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7456] block">
                Acquisition Protocol
              </span>
              <h3 className="font-serif text-2xl text-[#1A1917] mt-1">
                White-Glove Delivery Registration
              </h3>
            </div>

            <div className="p-4 bg-[#F4EFEB] border border-[#E5DFD6] rounded-xs space-y-2 text-xs">
              <div className="flex justify-between font-medium text-[#1A1917]">
                <span>Commission Total ({items.length} pieces)</span>
                <span className="font-serif text-base">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-[#7E7A73]">
                <span>Insured White-Glove Installation</span>
                <span className="text-emerald-800 font-medium">Complimentary</span>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep('confirmation'); }} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">Full Name</label>
                  <input required placeholder="Marcelle Guérin" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">Direct Phone</label>
                  <input required placeholder="+33 6 12 34 56 78" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">Residence / Delivery Address</label>
                <input required placeholder="Palazzo Brera, Via Fiori Chiari 12" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">City</label>
                  <input required placeholder="Milano" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">Postal Code</label>
                  <input required placeholder="20121" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-[#7E7A73] block mb-1">Country</label>
                  <input required placeholder="Italy" className="w-full px-3 py-2 bg-white border border-[#DDD6CB] rounded-xs" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1A1917] text-white text-[11px] tracking-[0.24em] uppercase font-semibold hover:bg-black transition-colors rounded-xs mt-2"
              >
                Confirm White-Glove Commission
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-3xl text-[#1A1917]">
              Provenance Registered
            </h3>

            <p className="text-xs text-[#6B665E] max-w-sm mx-auto leading-relaxed">
              Your bespoke commission has been registered with the Périgord atelier. A certified ébéniste has been assigned to log your timber billets and verify joinery calibrations.
            </p>

            <div className="p-3 bg-[#F4EFEB] border border-[#DDD6CB] rounded-xs text-[11px] font-mono text-[#8C7456] max-w-xs mx-auto">
              CERTIFICATE // AV-2025-0842-REG
            </div>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="mt-4 px-8 py-3 bg-[#1A1917] text-white text-[11px] uppercase tracking-[0.2em] font-semibold"
            >
              Return to Atelier
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
