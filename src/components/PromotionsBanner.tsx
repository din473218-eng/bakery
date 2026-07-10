import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromotionsBannerProps {
  lang: 'en' | 'ar';
}

export default function PromotionsBanner({ lang }: PromotionsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const content = {
    en: {
      text: "✨ Grand Opening Offer: Use code ",
      code: "GOLDEN20",
      suffix: " for 20% off your first luxury dessert box! ☕",
      close: "Dismiss"
    },
    ar: {
      text: "✨ عرض الافتتاح الكبير: استخدم الكود ",
      code: "GOLDEN20",
      suffix: " للحصول على خصم 20٪ على أول صندوق حلويات فاخر! ☕",
      close: "إغلاق"
    }
  };

  const t = content[lang];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-chocolate text-cream text-xs md:text-sm py-2.5 px-4 text-center font-medium relative border-b border-gold/20 flex items-center justify-center gap-2 overflow-hidden z-50"
        id="promotions-banner"
      >
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <Sparkles className="w-4 h-4 text-gold animate-pulse" />
          <span>
            {t.text}
            <span className="bg-gold/20 text-gold px-2 py-0.5 rounded border border-gold/30 font-mono font-bold mx-1 select-all">
              {t.code}
            </span>
            {t.suffix}
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-gold transition-colors p-1"
          aria-label={t.close}
          id="btn-close-promo"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
