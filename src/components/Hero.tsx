import { motion } from 'motion/react';
import { ArrowRight, Coffee, Sparkles, ChefHat } from 'lucide-react';

interface HeroProps {
  lang: 'en' | 'ar';
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export default function Hero({ lang, onOrderNow, onViewMenu }: HeroProps) {
  const content = {
    en: {
      headline: 'Luxury Tiramisu Crafted With Passion',
      subheading: 'Freshly prepared desserts using premium ingredients for every celebration and every sweet moment.',
      orderBtn: 'Order Now',
      menuBtn: 'View Menu',
      experience: 'Michelin-grade Handcrafted Quality',
      tag: 'Handcrafted Daily'
    },
    ar: {
      headline: 'تيراميسو فاخر يُحضّر بحب وشغف',
      subheading: 'حلويات طازجة ومعدة من مكونات طبيعية فاخرة لتثري كل مناسبة سعيدة وتضفي حلاوة على كل لحظة من حياتك.',
      orderBtn: 'اطلب الآن',
      menuBtn: 'عرض القائمة',
      experience: 'جودة متميزة ومصنوعة يدوياً بحرفية تامة',
      tag: 'تُخبز طازجة يومياً'
    }
  };

  const t = content[lang];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-cream overflow-hidden py-16 md:py-24">
      {/* Decorative Floating Dessert Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-[12%] left-[8%] animate-float text-gold opacity-40">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-[20%] left-[12%] animate-float-delayed text-chocolate opacity-25">
          <Coffee className="w-10 h-10" />
        </div>
        <div className="absolute top-[25%] right-[10%] animate-float-fast text-gold opacity-30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-[50%] left-[45%] animate-float-delayed text-gold opacity-20">
          <ChefHat className="w-12 h-12" />
        </div>
        {/* Soft elegant ambient blobs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-chocolate/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        {/* Responsive layout: Grid which handles RTL nicely depending on language */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${lang === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
          
          {/* Text content (Grid span 7) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-chocolate/5 self-center lg:self-start px-4 py-2 rounded-full border border-gold/25"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
              <span className="text-xs uppercase tracking-widest font-semibold text-chocolate">
                {t.tag}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-chocolate tracking-tight leading-tight font-serif"
            >
              {lang === 'ar' ? (
                <span>
                  تيراميسو <span className="gold-gradient-text">فاخر</span> يُحضّر بحب وشغف
                </span>
              ) : (
                <span>
                  Luxury <span className="gold-gradient-text">Tiramisu</span> Crafted With Passion
                </span>
              )}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-darkbrown/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              {t.subheading}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onOrderNow}
                className="bg-chocolate hover:bg-darkbrown text-cream px-8 py-4 rounded-[2px] transition-all flex items-center justify-center gap-2 text-sm font-sans font-bold uppercase tracking-widest cursor-pointer"
                id="btn-hero-order"
              >
                <span>{t.orderBtn}</span>
                <ArrowRight className={`w-5 h-5 text-cream ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              
              <button
                onClick={onViewMenu}
                className="bg-transparent hover:bg-chocolate/5 text-chocolate border border-chocolate px-8 py-4 rounded-[2px] transition-all text-sm font-sans font-bold uppercase tracking-widest cursor-pointer"
                id="btn-hero-menu"
              >
                {t.menuBtn}
              </button>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-5 h-5 text-gold fill-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-chocolate font-mono">
                5.0/5.0
              </span>
              <span className="text-xs text-darkbrown/60">
                {t.experience}
              </span>
            </motion.div>

          </div>

          {/* Premium Image Frame (Grid span 5) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-square rounded-[2px] overflow-hidden border border-chocolate/20 p-2 bg-white transition-all group"
            >
              <img
                src="/src/assets/images/hero_tiramisu_coffee_1783693734173.jpg"
                alt="Luxury Tiramisu and Cappuccino Coffee on Marble"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              
              {/* Premium overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-[2px] text-center border border-chocolate/10">
                <p className="text-xs font-bold text-chocolate uppercase tracking-wider mb-1 font-sans">
                  {lang === 'ar' ? 'الإسبريسو الإيطالي الأصيل' : 'AUTHENTIC ITALIAN ESPRESSO'}
                </p>
                <p className="text-[10px] text-darkbrown/70 leading-normal font-sans">
                  {lang === 'ar' ? 'نستخدم أجود حبوب البن المحمصة محلياً مع جبنة الماسكاربوني الفاخرة' : 'Imported premium Italian mascarpone combined with freshly roasted specialty coffee beans.'}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
