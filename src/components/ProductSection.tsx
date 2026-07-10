import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Heart, ShoppingBag, Eye, X, Star, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductSectionProps {
  lang: 'en' | 'ar';
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  searchQuery: string;
}

export default function ProductSection({
  lang,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
}: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Filter categories translated
  const categories = {
    en: [
      { id: 'all', label: 'All Creations' },
      { id: 'tiramisu', label: 'Tiramisu' },
      { id: 'cakes', label: 'Cakes' },
      { id: 'desserts', label: 'Desserts & Cheesecakes' },
      { id: 'cookies', label: 'Gourmet Cookies' },
      { id: 'combos', label: 'Coffee & Combos' }
    ],
    ar: [
      { id: 'all', label: 'جميع المبتكرات' },
      { id: 'tiramisu', label: 'التيراميسو' },
      { id: 'cakes', label: 'الكيكات' },
      { id: 'desserts', label: 'الحلويات والتشيزكيك' },
      { id: 'cookies', label: 'الكوكيز الفاخر' },
      { id: 'combos', label: 'ثنائيات القهوة' }
    ]
  };

  const textContent = {
    en: {
      title: 'Our Signature Creations',
      subtitle: 'Browse our luxurious menu of fresh, handcrafted desserts prepared daily by our pastry artisans.',
      sar: 'SAR',
      bestseller: 'Bestseller',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
      relatedTitle: 'You May Also Exquisite Pairings',
      recentlyViewedTitle: 'Recently Viewed Delights',
      emptySearch: 'No luxury desserts match your search.',
      added: 'Added!'
    },
    ar: {
      title: 'مبتكراتنا التوقيعية الفاخرة',
      subtitle: 'تصفح قائمتنا الفاخرة من الحلويات الطازجة المصنوعة يدوياً بكل دقة وحب يومياً.',
      sar: 'ر.س',
      bestseller: 'الأكثر مبيعاً',
      addToCart: 'أضف للسلة',
      viewDetails: 'عرض التفاصيل',
      relatedTitle: 'نوصيك بتجربة هذه الإضافات الفاخرة',
      recentlyViewedTitle: 'أصناف شاهدتها مؤخراً',
      emptySearch: 'لم نجد أي حلويات فاخرة تطابق بحثك الحالي.',
      added: 'تمت الإضافة!'
    }
  };

  const currentCategories = categories[lang];
  const t = textContent[lang];

  // Filtering products by search query and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAr.includes(searchQuery) ||
      product.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.descriptionAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Track recently viewed products
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 4); // Keep last 4
    });
  };

  // Trigger quick animation for "Add to Cart" feedback
  const triggerAddAnimation = (id: string) => {
    setJustAddedId(id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mb-12" id="categories-tabs">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-[2px] text-xs font-sans uppercase tracking-wider font-bold transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-chocolate text-cream border-chocolate shadow-sm'
                  : 'bg-white text-chocolate/85 border-chocolate/10 hover:border-chocolate/30 hover:bg-cream/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="products-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isJustAdded = justAddedId === product.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gold/10 luxury-shadow group hover:border-gold/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  id={`product-card-${product.id}`}
                >
                  {/* Image Holder with badges */}
                  <div className="relative aspect-square w-full overflow-hidden bg-cream/10 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={lang === 'en' ? product.nameEn : product.nameAr}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Bestseller Badge */}
                    {product.isBestseller && (
                      <span className="absolute top-4 left-4 bg-chocolate text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/20 shadow-sm">
                        {t.bestseller}
                      </span>
                    )}

                    {/* Quick Action Icons in image overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-chocolate text-gold'
                            : 'bg-white/80 hover:bg-white text-chocolate hover:text-gold'
                        }`}
                        title="Add to Wishlist"
                        id={`btn-wish-prod-${product.id}`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-gold' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="p-2.5 rounded-full bg-white/80 hover:bg-white text-chocolate hover:text-gold shadow-md backdrop-blur-md transition-all"
                        title="Quick View"
                        id={`btn-view-prod-${product.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-semibold text-chocolate text-base sm:text-lg group-hover:text-gold transition-colors font-sans line-clamp-1">
                        {lang === 'en' ? product.nameEn : product.nameAr}
                      </h3>
                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 rounded text-[10px] font-bold text-gold font-mono flex-shrink-0">
                        <Star className="w-3 h-3 fill-gold" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-darkbrown/65 font-sans mb-4 line-clamp-2 h-8 leading-relaxed flex-grow">
                      {lang === 'en' ? product.descriptionEn : product.descriptionAr}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gold/5 flex-shrink-0">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-chocolate font-mono">
                          {product.price} <span className="text-[10px] font-medium font-sans text-chocolate/70">{t.sar}</span>
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          triggerAddAnimation(product.id);
                        }}
                        className={`px-4 py-2 rounded-[2px] text-xs font-sans uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                          isJustAdded
                            ? 'bg-chocolate text-cream border-chocolate'
                            : 'bg-white hover:bg-chocolate hover:text-cream text-chocolate border-chocolate/20 shadow-sm'
                        }`}
                        id={`btn-add-prod-${product.id}`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-gold" />
                            <span>{t.added}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t.addToCart}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gold/10 max-w-md mx-auto my-8">
            <Eye className="w-12 h-12 text-gold/40 mx-auto mb-4" />
            <p className="text-darkbrown/70 font-medium font-sans">
              {t.emptySearch}
            </p>
          </div>
        )}

        {/* Recently Viewed section */}
        {recentlyViewed.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gold/10" id="recently-viewed-section">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate mb-8 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gold rounded-full"></span>
              {t.recentlyViewedTitle}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recentlyViewed.map((product) => (
                <div
                  key={`recent-${product.id}`}
                  onClick={() => handleViewDetails(product)}
                  className="bg-white p-3 rounded-xl border border-gold/10 flex items-center gap-3 hover:border-gold/40 cursor-pointer transition-all"
                  id={`recent-view-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-chocolate truncate font-sans">
                      {lang === 'en' ? product.nameEn : product.nameAr}
                    </h4>
                    <p className="text-[10px] text-gold font-bold font-mono mt-0.5">
                      {product.price} {t.sar}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Product Details Modal with Related Products */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="details-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-darkbrown/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-cream max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gold/30 z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-chocolate hover:text-gold shadow-md transition-all cursor-pointer"
                id="btn-close-details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Left Column: Image */}
                  <div className="aspect-square w-full rounded-xl overflow-hidden border border-gold/15 bg-white shadow-md">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.nameEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Right Column: Descriptions */}
                  <div className="flex flex-col h-full space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-gold/10 text-gold text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border border-gold/25">
                        {selectedProduct.category}
                      </span>
                      {selectedProduct.isBestseller && (
                        <span className="bg-chocolate text-cream text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded border border-gold/10">
                          {t.bestseller}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-chocolate font-serif leading-tight">
                      {lang === 'en' ? selectedProduct.nameEn : selectedProduct.nameAr}
                    </h2>

                    <div className="flex items-center gap-2">
                      <div className="flex text-gold">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-gold" />
                        ))}
                      </div>
                      <span className="text-xs font-bold font-mono text-chocolate/80">
                        {selectedProduct.rating.toFixed(1)} / 5.0
                      </span>
                    </div>

                    <div className="text-xl font-bold text-chocolate font-mono">
                      {selectedProduct.price} <span className="text-xs font-medium font-sans">{t.sar}</span>
                    </div>

                    {/* Bilingual description */}
                    <div className="bg-white/60 p-4 rounded-xl border border-gold/10 text-xs sm:text-sm text-darkbrown/85 leading-relaxed space-y-3 font-sans">
                      <p className="border-b border-gold/5 pb-2.5 italic">
                        {selectedProduct.descriptionEn}
                      </p>
                      <p className="pt-0.5 text-right font-medium">
                        {selectedProduct.descriptionAr}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        onClick={() => {
                          onAddToCart(selectedProduct);
                          triggerAddAnimation(selectedProduct.id);
                        }}
                        className="flex-grow bg-chocolate hover:bg-darkbrown text-cream font-bold px-6 py-3.5 rounded-[2px] transition-all flex items-center justify-center gap-2 text-sm border border-chocolate cursor-pointer font-sans uppercase tracking-wider"
                        id="btn-modal-add"
                      >
                        <ShoppingBag className="w-5 h-5 text-cream" />
                        <span>{justAddedId === selectedProduct.id ? t.added : t.addToCart}</span>
                      </button>

                      <button
                        onClick={() => onToggleWishlist(selectedProduct)}
                        className={`p-3.5 rounded-[2px] border transition-all ${
                          wishlistIds.includes(selectedProduct.id)
                            ? 'bg-chocolate border-chocolate text-gold'
                            : 'bg-white border-chocolate/10 hover:bg-chocolate/5 text-chocolate hover:text-gold'
                        }`}
                        title="Toggle Wishlist"
                        id="btn-modal-wish"
                      >
                        <Heart className={`w-5 h-5 ${wishlistIds.includes(selectedProduct.id) ? 'fill-gold' : ''}`} />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Exquisite Pairings (Related Products) */}
                <div className="mt-12 pt-8 border-t border-gold/10">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate mb-6">
                    {t.relatedTitle}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {PRODUCTS.filter(
                      (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
                    )
                      .slice(0, 3)
                      .map((relatedProd) => (
                        <div
                          key={`related-${relatedProd.id}`}
                          onClick={() => setSelectedProduct(relatedProd)}
                          className="bg-white rounded-xl overflow-hidden border border-gold/10 p-3 hover:border-gold/30 transition-all cursor-pointer group flex flex-col"
                          id={`related-card-${relatedProd.id}`}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden mb-2.5">
                            <img
                              src={relatedProd.image}
                              alt={relatedProd.nameEn}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h4 className="text-xs font-bold text-chocolate truncate group-hover:text-gold font-sans">
                            {lang === 'en' ? relatedProd.nameEn : relatedProd.nameAr}
                          </h4>
                          <span className="text-[11px] text-chocolate/80 font-bold font-mono mt-1">
                            {relatedProd.price} {t.sar}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
