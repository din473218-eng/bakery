import { useState, useEffect } from 'react';
import PromotionsBanner from './components/PromotionsBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ProductSection from './components/ProductSection';
import WhyChooseUs from './components/WhyChooseUs';
import BestSellers from './components/BestSellers';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import TimelineSection from './components/TimelineSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIRecommender from './components/AIRecommender';
import LiveChat from './components/LiveChat';
import LoginModal from './components/LoginModal';
import CartDrawer from './components/CartDrawer';
import { CartItem, Product } from './types';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('ar'); // Default to Arabic-first as requested
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Modals visibility toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);

  // Set page direction class based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync user state with local storage (optional luxury touch)
  useEffect(() => {
    const storedUser = localStorage.getItem('luxury_user_session');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem('luxury_user_session', username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('luxury_user_session');
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  return (
    <div className="min-h-screen bg-cream text-darkbrown font-serif flex flex-col selection:bg-gold/30 selection:text-chocolate">
      
      {/* Top Discount Promotion Bar */}
      <PromotionsBanner lang={lang} />

      {/* Main Luxury Navigation Bar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        onOpenAIRecommender={() => setIsRecommenderOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isLoggedIn={!!currentUser}
        username={currentUser || ''}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Welcome Presentation */}
      <Hero
        lang={lang}
        onOrderNow={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
        onViewMenu={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* About Us / Heritage Storyteller */}
      <AboutUs lang={lang} />

      {/* Best Sellers sliding carousel showcase */}
      <BestSellers lang={lang} onAddToCart={handleAddToCart} />

      {/* Menu / Product Grid with filtration and details modals */}
      <ProductSection
        lang={lang}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlist}
        searchQuery={searchQuery}
      />

      {/* Why Choose Us: 8 brand quality features */}
      <WhyChooseUs lang={lang} />

      {/* Sensory Masonry Gallery with high res lightboxes */}
      <GallerySection lang={lang} />

      {/* Our Exquisite Order Timeline Journey */}
      <TimelineSection lang={lang} />

      {/* Customer Testimonials & active feedback collection */}
      <ReviewsSection lang={lang} />

      {/* FAQ Accordions for booking queries */}
      <FAQSection lang={lang} />

      {/* Contact Coordinates, Instagram grid, and Direct Inquiry Mailbox */}
      <ContactSection lang={lang} />

      {/* Royal footer with quicklinks and private news dispatch subscriptions */}
      <Footer lang={lang} />

      {/* Floating Interactive Chef Samaan AI Live Chatbot */}
      <LiveChat lang={lang} />

      {/* Modals & Slide-out Drawers */}
      
      {/* Shopping Bag Drawer with promo coupons and active tracking timeline */}
      <CartDrawer
        lang={lang}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Account credentials login & register drawer */}
      <LoginModal
        lang={lang}
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Chef Samaan’s AI curation questionnaire selector */}
      <AIRecommender
        lang={lang}
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
