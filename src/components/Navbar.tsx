import { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Globe, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIRecommender: () => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  username: string;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({
  lang,
  setLang,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIRecommender,
  onOpenLogin,
  isLoggedIn,
  username,
  onLogout,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navLinks = {
    en: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Menu', href: '#menu' },
      { label: 'Why Us', href: '#why-choose-us' },
      { label: 'Best Sellers', href: '#best-sellers' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Contact', href: '#contact' },
    ],
    ar: [
      { label: 'الرئيسية', href: '#home' },
      { label: 'من نحن', href: '#about' },
      { label: 'القائمة', href: '#menu' },
      { label: 'تميزنا', href: '#why-choose-us' },
      { label: 'الأكثر مبيعاً', href: '#best-sellers' },
      { label: 'المعرض', href: '#gallery' },
      { label: 'الآراء', href: '#reviews' },
      { label: 'اتصل بنا', href: '#contact' },
    ]
  };

  const navContent = {
    en: {
      tagline: 'Luxury Bakery',
      searchPlaceholder: 'Search luxury desserts...',
      recommenderBtn: 'AI Pastry Chef Selection',
      welcome: 'Welcome, ',
      loginBtn: 'Login / Sign Up',
      logout: 'Logout'
    },
    ar: {
      tagline: 'مخبز الحلويات الفاخرة',
      searchPlaceholder: 'ابحث عن حلوياتنا الفاخرة...',
      recommenderBtn: 'تنسيق الشيف بالذكاء الاصطناعي',
      welcome: 'مرحباً، ',
      loginBtn: 'تسجيل الدخول / الاشتراك',
      logout: 'تسجيل الخروج'
    }
  };

  const currentLinks = navLinks[lang];
  const t = navContent[lang];

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-chocolate/10 luxury-shadow transition-all duration-300" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            <a href="#home" className="flex flex-col items-start leading-tight" id="nav-logo-link">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-chocolate flex items-center gap-1">
                تيراميسو <span className="text-gold text-sm sm:text-base font-normal">سعف و رمال</span>
              </span>
              <span className="font-sans text-[10px] text-gold uppercase tracking-[0.2em] font-medium hidden sm:inline">
                {t.tagline}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-1 xl:space-x-4 items-center">
            {/* Set RTL/LTR flex arrangement for menu depending on lang */}
            <div className={`flex items-center gap-4 xl:gap-6 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-chocolate/90 hover:text-gold font-sans text-xs uppercase tracking-widest font-semibold transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full font-sans"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons & Helpers */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Toggle */}
            <div className="relative">
              <AnimatePresence>
                {isSearchVisible && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-2 top-1/2 -translate-y-1/2 hidden sm:block"
                  >
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-gold/30 rounded-full px-4 py-1.5 text-xs text-darkbrown focus:outline-none focus:border-gold"
                      id="desktop-search-input"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="p-2.5 rounded-full text-chocolate hover:bg-gold/10 hover:text-gold transition-all"
                aria-label="Search"
                id="btn-search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* AI Recommender Button */}
            <button
              onClick={onOpenAIRecommender}
              className="hidden md:flex items-center gap-1.5 bg-cream hover:bg-gold/10 border border-chocolate/20 text-chocolate px-3.5 py-1.5 rounded-[2px] text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm"
              id="btn-ai-recommender-nav"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{t.recommenderBtn}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-2.5 rounded-full text-chocolate hover:bg-gold/10 hover:text-gold transition-all flex items-center gap-1"
              title={lang === 'en' ? 'العربية' : 'English'}
              id="btn-lang-toggle"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-bold font-mono">{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Favorites Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-chocolate hover:bg-gold/10 hover:text-gold transition-all relative"
              aria-label="Favorites"
              id="btn-wishlist-nav"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-gold text-cream text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-mono">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={onOpenCart}
              className="p-2.5 rounded-full text-chocolate hover:bg-gold/10 hover:text-gold transition-all relative"
              aria-label="Shopping Cart"
              id="btn-cart-nav"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-chocolate text-cream text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Login Status */}
            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 border-l border-gold/20 pl-2">
                <span className="text-xs font-medium text-darkbrown truncate max-w-[80px]">
                  {t.welcome}{username}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] bg-chocolate/10 text-chocolate hover:bg-chocolate hover:text-cream px-2 py-1 rounded transition-colors"
                  id="btn-logout"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="p-2.5 rounded-full text-chocolate hover:bg-gold/10 hover:text-gold transition-all"
                title={t.loginBtn}
                id="btn-login-modal-open"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-chocolate hover:bg-gold/10 transition-all"
              id="btn-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-b border-gold/10 overflow-hidden"
            id="mobile-menu"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {/* Search input in mobile */}
              <div className="pb-3 border-b border-gold/5">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gold/30 rounded-full px-4 py-2 text-xs text-darkbrown focus:outline-none focus:border-gold"
                  id="mobile-search-input"
                />
              </div>

              {/* Navigation links */}
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-darkbrown hover:bg-gold/10 hover:text-gold transition-all"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile AI recommendation button */}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAIRecommender();
                  }}
                  className="flex items-center justify-center gap-1.5 bg-gold hover:bg-gold/90 text-cream px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md w-full"
                  id="btn-ai-recommender-mobile"
                >
                  <Sparkles className="w-4 h-4 text-cream" />
                  <span>{t.recommenderBtn}</span>
                </button>

                {isLoggedIn ? (
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gold/10 mt-2">
                    <span className="text-sm font-medium text-darkbrown">
                      {t.welcome} {username}
                    </span>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="text-xs bg-chocolate text-cream px-3 py-1.5 rounded"
                      id="btn-mobile-logout"
                    >
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="flex items-center justify-center gap-1.5 bg-chocolate text-cream px-4 py-2.5 rounded-lg text-sm font-medium transition-all w-full mt-2"
                    id="btn-mobile-login"
                  >
                    <User className="w-4 h-4" />
                    <span>{t.loginBtn}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
