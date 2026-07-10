import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Sparkles, X, Star, ShoppingBag, Coffee, ArrowRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIRecommenderProps {
  lang: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

interface RecommendationResponse {
  personalizedGreetingEn: string;
  personalizedGreetingAr: string;
  recommendedProducts: {
    productId: string;
    reasonEn: string;
    reasonAr: string;
  }[];
  bakerTipEn: string;
  bakerTipAr: string;
}

export default function AIRecommender({ lang, isOpen, onClose, onAddToCart }: AIRecommenderProps) {
  const [sweetLevel, setSweetLevel] = useState<'light' | 'balanced' | 'sweet'>('balanced');
  const [flavorProfile, setFlavorProfile] = useState<'fruity' | 'chocolatey' | 'coffee' | 'nutty'>('coffee');
  const [eventType, setEventType] = useState<'gift' | 'personal' | 'celebration'>('personal');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const textContent = {
    en: {
      title: 'Chef Samaan’s AI Selection',
      subtitle: 'Tell Chef Samaan your preferences, and he will select the perfect dessert creations for you.',
      sweetQ: '1. Preferred Sweetness level:',
      flavorQ: '2. Your favorite flavor notes:',
      eventQ: '3. What is the sweet occasion?',
      getBtn: 'Curate My Desserts',
      loadingText: 'Chef Samaan is layering your recommendations...',
      bakerTip: 'Master Baker’s Advice:',
      reset: 'Ask Chef Again',
      addToCart: 'Add to Cart',
      added: 'Added!',
      sar: 'SAR',
      sweetOptions: { light: 'Delicate / Low-sweet', balanced: 'Perfectly Balanced', sweet: 'Richly Decadent' },
      flavorOptions: { coffee: 'Deep Coffee & Cocoa', chocolatey: 'Creamy Belgian Chocolate', fruity: 'Fresh Berry & Zest', nutty: 'Roasted Sicilian Pistachio' },
      eventOptions: { personal: 'Self Indulgence', gift: 'Prestigious Gifting', celebration: 'Royal Gathering' }
    },
    ar: {
      title: 'تنسيق الشيف سمعان الذكي',
      subtitle: 'أخبر الشيف سمعان عن ذوقك، وسيقوم فوراً بتنسيق ثنائية الحلويات الملكية المثالية لك.',
      sweetQ: '1. مستوى الحلاوة المفضل لديك:',
      flavorQ: '2. إيحاءات النكهة التي تثير شغفك:',
      eventQ: '3. ما هي طبيعة مناسبتك الكريمة؟',
      getBtn: 'ابدأ التنسيق الفاخر',
      loadingText: 'يقوم الشيف سمعان الآن بإعداد وتنسيق خياراتك الملكية...',
      bakerTip: 'نصيحة المعلم الخبير:',
      reset: 'أعد الاستشارة والطلب',
      addToCart: 'أضف للسلة',
      added: 'تمت الإضافة!',
      sar: 'ر.س',
      sweetOptions: { light: 'خفيف / حلاوة هادئة', balanced: 'متوازن ومثالي', sweet: 'غني ومكثف الدلال' },
      flavorOptions: { coffee: 'القهوة العميقة والكاكاو', chocolatey: 'الشوكولاتة البلجيكية الغنية', fruity: 'التوت البري الطازج والتشيزكيك', nutty: 'الفستق الصقلي المحمص' },
      eventOptions: { personal: 'دلال شخصي وهدوء', gift: 'إهداء فاخر وسخي', celebration: 'اجتماع ومناسبات ملكية' }
    }
  };

  const t = textContent[lang];

  const handleFetchRecommendations = async () => {
    setLoading(true);
    setRecommendations(null);

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sweetLevel, flavorProfile, eventType })
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
      // Fail-safe mock simulation
      setRecommendations({
        personalizedGreetingEn: "Welcome to our boutique! Based on your delicate selection, I have handpicked a masterpiece that emphasizes rich tones.",
        personalizedGreetingAr: "مرحباً بك في عالمنا الفخم! بناءً على اختياراتك الراقية والمميزة، قمت شخصياً بانتقاء هذه الثنائية الاستثنائية تلبية لذوقك.",
        recommendedProducts: [
          { productId: "classic-tiramisu", reasonEn: "Our legendary Venetian tiramisu is perfect for deep espresso and cocoa notes.", reasonAr: "التيراميسو الكلاسيكي يمثل الخيار الأمثل لعشاق نكهات الإسبريسو والكاكاو العميقة." },
          { productId: "dessert-box", reasonEn: "An exquisite package to share with beloved ones or experience a sensory journey.", reasonAr: "صندوق ضيافة النخبة الفاخر يجمع تشكيلة مميزة لتشاركها وتستمتع بها في مناسبتك الكريمة." }
        ],
        bakerTipEn: "Always serve these pastries cold. Pair them with our fresh specialty coffee V60 to unlock the rich cocoa flavor notes.",
        bakerTipAr: "ينصحك الشيف بتقديم هذه المبتكرات باردة وتناولها برفقة كوب دافئ من القهوة المقطرة V60 لإبراز النطاق الكامل لإيحاءات الشوكولاتة والكاكاو."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbrown/70 backdrop-blur-md" id="ai-recommender-overlay">
      {/* Backdrop close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cream border border-gold/30 rounded-2xl overflow-hidden shadow-2xl z-10 w-full max-w-3xl flex flex-col max-h-[90vh]"
        id="ai-recommender-card"
      >
        {/* Header bar */}
        <div className="bg-chocolate text-cream px-6 py-5 border-b border-gold/20 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-cream/80 hover:text-gold p-1 cursor-pointer transition-colors"
            id="btn-close-ai-recommender"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-8">
          
          <p className="text-xs sm:text-sm text-darkbrown/75 leading-relaxed text-center font-sans max-w-xl mx-auto">
            {t.subtitle}
          </p>

          <AnimatePresence mode="wait">
            
            {/* Phase 1: Inputs Questionnaire */}
            {!loading && !recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
                id="ai-recommender-questions"
              >
                {/* 1. Sweetness Q */}
                <div className="space-y-3">
                  <h4 className="font-bold text-chocolate text-xs sm:text-sm font-sans">{t.sweetQ}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['light', 'balanced', 'sweet'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSweetLevel(level)}
                        className={`px-3 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          sweetLevel === level
                            ? 'gold-gradient-bg text-cream border-gold shadow-sm'
                            : 'bg-white text-chocolate/80 border-gold/15 hover:border-gold/45'
                        }`}
                      >
                        {t.sweetOptions[level]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Flavor Notes Q */}
                <div className="space-y-3">
                  <h4 className="font-bold text-chocolate text-xs sm:text-sm font-sans">{t.flavorQ}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(['coffee', 'chocolatey', 'fruity', 'nutty'] as const).map((note) => (
                      <button
                        key={note}
                        type="button"
                        onClick={() => setFlavorProfile(note)}
                        className={`px-3 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          flavorProfile === note
                            ? 'gold-gradient-bg text-cream border-gold shadow-sm'
                            : 'bg-white text-chocolate/80 border-gold/15 hover:border-gold/45'
                        }`}
                      >
                        {t.flavorOptions[note]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Occasion Q */}
                <div className="space-y-3">
                  <h4 className="font-bold text-chocolate text-xs sm:text-sm font-sans">{t.eventQ}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['personal', 'gift', 'celebration'] as const).map((evt) => (
                      <button
                        key={evt}
                        type="button"
                        onClick={() => setEventType(evt)}
                        className={`px-3 py-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          eventType === evt
                            ? 'gold-gradient-bg text-cream border-gold shadow-sm'
                            : 'bg-white text-chocolate/80 border-gold/15 hover:border-gold/45'
                        }`}
                      >
                        {t.eventOptions[evt]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleFetchRecommendations}
                  className="w-full gold-gradient-bg hover:opacity-95 text-cream font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-gold/30 cursor-pointer"
                  id="btn-get-ai-curate"
                >
                  <Sparkles className="w-5 h-5 text-cream" />
                  <span>{t.getBtn}</span>
                </button>
              </motion.div>
            )}

            {/* Phase 2: Loading State */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-4"
                id="ai-recommender-loading"
              >
                <Loader className="w-10 h-10 text-gold animate-spin mx-auto" />
                <p className="text-chocolate font-bold text-sm sm:text-base font-sans animate-pulse">
                  {t.loadingText}
                </p>
              </motion.div>
            )}

            {/* Phase 3: Results Display */}
            {recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                id="ai-recommender-results"
              >
                {/* Greeting */}
                <div className="p-4 bg-chocolate/5 border-l-4 border-gold rounded-r-xl">
                  <p className="text-xs sm:text-sm italic text-darkbrown font-medium leading-relaxed">
                    "{lang === 'en' ? recommendations.personalizedGreetingEn : recommendations.personalizedGreetingAr}"
                  </p>
                </div>

                {/* Recommended Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendations.recommendedProducts.map((recItem) => {
                    // Match productId with our actual dataset
                    const productObj = PRODUCTS.find((p) => p.id === recItem.productId) || PRODUCTS[0];
                    const isJustAdded = justAddedId === productObj.id;

                    return (
                      <div
                        key={recItem.productId}
                        className="bg-white rounded-xl overflow-hidden border border-gold/15 p-4 flex flex-col luxury-shadow hover:border-gold/30 transition-all"
                        id={`rec-item-card-${recItem.productId}`}
                      >
                        {/* Image banner */}
                        <div className="aspect-[16/10] w-full rounded-lg overflow-hidden mb-3">
                          <img
                            src={productObj.image}
                            alt={productObj.nameEn}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow flex flex-col space-y-2">
                          <h4 className="font-bold text-chocolate text-sm sm:text-base font-serif line-clamp-1">
                            {lang === 'en' ? productObj.nameEn : productObj.nameAr}
                          </h4>
                          
                          <p className="text-[11px] text-darkbrown/70 leading-relaxed font-sans line-clamp-3">
                            {lang === 'en' ? recItem.reasonEn : recItem.reasonAr}
                          </p>
                        </div>

                        {/* Bottom row */}
                        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gold/5">
                          <span className="text-xs font-bold text-chocolate font-mono">
                            {productObj.price} {t.sar}
                          </span>
                          
                          <button
                            onClick={() => handleAddToCart(productObj)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isJustAdded
                                ? 'bg-chocolate text-gold border border-gold'
                                : 'bg-gold/15 hover:bg-gold hover:text-cream text-gold transition-all'
                            }`}
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>{isJustAdded ? t.added : t.addToCart}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Baker Tip block */}
                <div className="p-4 bg-gold/10 border border-gold/30 rounded-xl space-y-1">
                  <h5 className="text-xs font-bold text-gold uppercase tracking-wide flex items-center gap-1 font-sans">
                    <Coffee className="w-3.5 h-3.5" />
                    {t.bakerTip}
                  </h5>
                  <p className="text-xs text-chocolate leading-relaxed font-medium font-sans">
                    {lang === 'en' ? recommendations.bakerTipEn : recommendations.bakerTipAr}
                  </p>
                </div>

                {/* Reset button */}
                <button
                  onClick={() => setRecommendations(null)}
                  className="w-full bg-transparent hover:bg-chocolate/5 text-chocolate border-2 border-chocolate/40 font-bold py-3 rounded-xl transition-all text-xs cursor-pointer"
                  id="btn-recommender-reset"
                >
                  {t.reset}
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
