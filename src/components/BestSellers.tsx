import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BestSellersProps {
  lang: 'en' | 'ar';
  onAddToCart: (product: Product) => void;
}

export default function BestSellers({ lang, onAddToCart }: BestSellersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const bestSellers = PRODUCTS.filter((p) => p.isBestseller);

  const textContent = {
    en: {
      title: 'Our Best Sellers',
      subtitle: 'The ultimate culinary triumphs voted most delicious by our prestigious guest community.',
      badge: 'Bestseller',
      sar: 'SAR',
      order: 'Quick Add',
      added: 'Added!'
    },
    ar: {
      title: 'الأكثر مبيعاً ورواجاً',
      subtitle: 'الإبداعات الأكثر تميزاً وطلباً وتفضيلاً لدى عائلتنا ومجتمع متذوقينا الراقين.',
      badge: 'الأكثر مبيعاً',
      sar: 'ر.س',
      order: 'إضافة سريعة',
      added: 'تمت الإضافة!'
    }
  };

  const t = textContent[lang];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bestSellers.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bestSellers.length - 1 : prev - 1));
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="best-sellers" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[radial-gradient(circle_at_center,rgba(200,169,106,0.06)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Arrows */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div className="text-center md:text-left max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
              {lang === 'en' ? 'FAVORITES OF THE HOUSE' : 'مفضلات القصر'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-darkbrown/75 font-sans mt-3">
              {t.subtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-3 font-sans">
            <button
              onClick={handlePrev}
              className="p-3 rounded-[2px] bg-white border border-chocolate/15 text-chocolate hover:bg-chocolate hover:text-cream transition-all cursor-pointer"
              aria-label="Previous bestseller"
              id="btn-bestseller-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-[2px] bg-white border border-chocolate/15 text-chocolate hover:bg-chocolate hover:text-cream transition-all cursor-pointer"
              aria-label="Next bestseller"
              id="btn-bestseller-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative overflow-visible" id="bestsellers-carousel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* We'll show a sliding slice of 3 items on desktop, 1 on mobile */}
            {bestSellers.map((product, idx) => {
              // Calculate offset index relative to currentIndex to make it feel like a slider
              const isVisibleOnDesktop = (idx >= currentIndex && idx < currentIndex + 3) || 
                                         (currentIndex + 3 > bestSellers.length && idx < (currentIndex + 3) % bestSellers.length);
              
              const isFirstInSlide = idx === currentIndex;

              return (
                <div
                  key={`bestseller-slide-${product.id}`}
                  className={`transition-all duration-500 transform ${
                    isVisibleOnDesktop ? 'opacity-100 scale-100 block' : 'hidden md:hidden'
                  } ${!isFirstInSlide && 'hidden md:block'}`}
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-gold/15 luxury-shadow flex flex-col h-full hover:border-gold/45 group transition-all duration-300">
                    
                    {/* Bestseller Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.nameEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Bestseller gold flag */}
                      <div className="absolute top-4 left-4 bg-chocolate text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[2px] border border-chocolate/10">
                        {t.badge}
                      </div>

                      {/* Floating rating */}
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md border border-gold/10">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="text-xs font-bold text-chocolate font-mono">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Bestseller Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate mb-2">
                        {lang === 'en' ? product.nameEn : product.nameAr}
                      </h3>
                      
                      <p className="text-xs text-darkbrown/70 font-sans line-clamp-2 leading-relaxed mb-6 flex-grow">
                        {lang === 'en' ? product.descriptionEn : product.descriptionAr}
                      </p>

                      <div className="flex justify-between items-center pt-4 border-t border-gold/10 mt-auto">
                        <div className="text-lg font-extrabold text-chocolate font-mono">
                          {product.price} <span className="text-xs font-medium font-sans">{t.sar}</span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            justAddedId === product.id
                              ? 'bg-chocolate text-gold border border-gold'
                              : 'gold-gradient-bg hover:opacity-95 text-cream shadow-sm'
                          }`}
                          id={`btn-order-best-${product.id}`}
                        >
                          {justAddedId === product.id ? (
                            <>
                              <Check className="w-4 h-4 text-gold" />
                              <span>{t.added}</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>{t.order}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
