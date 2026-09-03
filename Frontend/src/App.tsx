import React, { useState, useEffect, useMemo } from 'react';
import { NavPage, Currency, CartItem, FurnitureItem, Monograph } from './types';
import { FURNITURE_ITEMS } from './data/furnitureData';
import { MONOGRAPHS } from './data/journalData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { FurnitureView } from './components/FurnitureView';
import { ProductDetailView } from './components/ProductDetailView';
import { ConfiguratorView } from './components/ConfiguratorView';
import { InteriorsView } from './components/InteriorsView';
import { JournalView } from './components/JournalView';
import { AtelierCustomView } from './components/AtelierCustomView';
import { ContactUs } from './components/ContactUsView';
import { AboutUs } from './components/AboutUsView';
import { AcquisitionBagDrawer } from './components/AcquisitionBagDrawer';
import { useRouter, usePathname, useSearchParams } from './lib/navigation';
import { 
  SearchModal, 
  SwatchKitModal, 
  AppointmentModal, 
  ARModal, 
  MonographReaderModal, 
  CheckoutModal 
} from './components/Modals';

export default function App() {
  // Next.js URL Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Currency
  const [currency] = useState<Currency>('EUR');

  // Active Product for PDP
  const [activeProduct, setActiveProduct] = useState<FurnitureItem>(() => {
    const idFromParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : null;
    if (idFromParam) {
      const match = FURNITURE_ITEMS.find((item) => item.id === idFromParam);
      if (match) return match;
    }
    return FURNITURE_ITEMS[0];
  });

  // Active Monograph for Reader Modal
  const [activeMonograph, setActiveMonograph] = useState<Monograph | null>(null);

  // Compute currentPage from Next.js URL pathname
  const currentPage: NavPage = useMemo(() => {
    const cleanPath = pathname.replace(/\/$/, '') || '/';
    if (cleanPath === '/furniture') return 'furniture';
    if (cleanPath === '/interiors') return 'interiors';
    if (cleanPath === '/configurator') return 'configurator';
    if (cleanPath === '/custom' || cleanPath === '/atelier') return 'custom';
    if (cleanPath === '/journal') return 'journal';
    if (cleanPath === '/pdp') return 'pdp';
    if (cleanPath === '/contact') return 'contact';
    if (cleanPath === '/about') return 'about';
    return 'home';
  }, [pathname]);

  // Synchronize active product if URL changes with ?id=
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const match = FURNITURE_ITEMS.find((item) => item.id === idParam);
      if (match) {
        setActiveProduct(match);
      }
    }
  }, [searchParams]);

  // Next.js URL Navigation handler
  const handleNavigate = (page: NavPage, productId?: string) => {
    switch (page) {
      case 'home':
        router.push('/');
        break;
      case 'furniture':
        router.push('/furniture');
        break;
      case 'interiors':
        router.push('/interiors');
        break;
      case 'configurator':
        router.push('/configurator');
        break;
      case 'custom':
      case 'atelier':
        router.push('/custom');
        break;
      case 'journal':
        router.push('/journal');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'about':
        router.push('/about');
        break;
      case 'pdp':
        router.push(productId ? `/pdp?id=${productId}` : `/pdp?id=${activeProduct.id}`);
        break;
      default:
        router.push('/');
    }
  };

  // Cart / Acquisition Bag
  // Pre-populate with the Solstice Lounge Chair as seen in the screenshot!
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-01',
      furnitureId: 'svelto-chaise',
      name: 'Solstice Lounge Chair',
      subtitle: 'FRENCH WALNUT • BOUCLÉ ÉCRU',
      specCode: 'SPEC // OPU-8842-CW-BE',
      upholstery: 'BOUCLÉ',
      upholsteryColor: 'Écru',
      timber: 'French Walnut',
      orientation: 'Left-Arm',
      width: 2200,
      depth: 880,
      qty: 1,
      priceEUR: 4850,
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop',
    },
  ]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['svelto-chaise']);

  // Hero in-view state for header transparency
  const [isHeroInView, setIsHeroInView] = useState(true);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.furnitureId === newItem.furnitureId && item.specCode === newItem.specCode);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += newItem.qty;
        return updated;
      }
      return [newItem, ...prev];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (item: FurnitureItem) => {
    setWishlist((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1917] flex flex-col selection:bg-[#EAE4DC] selection:text-[#1A1917] md:px-8 lg:px-16 xl:px-20 2xl:px-24">
      
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isHeroInView={isHeroInView}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            currency={currency}
            onOpenARModal={() => setIsARModalOpen(true)}
            onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
            onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            onHeroInViewChange={setIsHeroInView}
          />
        )}

        {currentPage === 'furniture' && (
          <FurnitureView
            onNavigate={handleNavigate}
            currency={currency}
            onSelectProduct={(item) => {
              setActiveProduct(item);
              handleNavigate('pdp', item.id);
            }}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist}
          />
        )}

        {currentPage === 'pdp' && (
          <ProductDetailView
            product={activeProduct}
            onNavigate={handleNavigate}
            currency={currency}
            onAddToCart={handleAddToCart}
            onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
            onOpenConsultModal={() => setIsAppointmentModalOpen(true)}
          />
        )}

        {currentPage === 'configurator' && (
          <ConfiguratorView
            currency={currency}
            onAddToCart={handleAddToCart}
            onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
            onOpenARModal={() => setIsARModalOpen(true)}
          />
        )}

        {currentPage === 'interiors' && (
          <InteriorsView
            onNavigate={handleNavigate}
            currency={currency}
            onOpenShowroomModal={() => setIsARModalOpen(true)}
            onOpenMaterialBoxModal={() => setIsSwatchModalOpen(true)}
          />
        )}

        {currentPage === 'journal' && (
          <JournalView
            currency={currency}
            onOpenArticle={(article) => setActiveMonograph(article)}
            onOpenMaterialModal={() => setIsSwatchModalOpen(true)}
          />
        )}

        {(currentPage === 'atelier' || currentPage === 'custom') && (
          <AtelierCustomView
            currency={currency}
            onOpenAppointmentModal={() => setIsAppointmentModalOpen(true)}
            onOpenSwatchModal={() => setIsSwatchModalOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUs onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutUs onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Acquisition Bag Drawer (Slide-over right) */}
      <AcquisitionBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutModalOpen(true);
        }}
        onContinueBrowsing={() => setIsCartOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(item) => {
          setActiveProduct(item);
          handleNavigate('pdp', item.id);
        }}
        onSelectArticle={(article) => {
          setActiveMonograph(article);
        }}
        onNavigate={handleNavigate}
        currency={currency}
      />

      {/* Swatch Kit Modal */}
      <SwatchKitModal
        isOpen={isSwatchModalOpen}
        onClose={() => setIsSwatchModalOpen(false)}
      />

      {/* Appointment Consultation Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* AR Scale Preview Modal */}
      <ARModal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
      />

      {/* Monograph Reader Modal */}
      <MonographReaderModal
        monograph={activeMonograph}
        onClose={() => setActiveMonograph(null)}
      />

      {/* Checkout Registration Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cartItems}
        currency={currency}
        onSuccess={() => setCartItems([])}
      />

    </div>
  );
}
