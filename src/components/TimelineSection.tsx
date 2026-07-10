import { Coffee, ClipboardList, Flame, Gift, Truck } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineSectionProps {
  lang: 'en' | 'ar';
}

export default function TimelineSection({ lang }: TimelineSectionProps) {
  const content = {
    en: {
      title: 'Our Exquisite Order Journey',
      subtitle: 'From a delicate master recipe to a luxurious display at your doorstep, follow our handcrafted process.',
      steps: [
        { title: 'Choose Dessert', desc: 'Browse our signature menu or consult Chef Samaan to curate your dream combination.' },
        { title: 'Place Your Order', desc: 'Confirm your cart seamlessly with secure, premium checkout or WhatsApp Quick Order.' },
        { title: 'Fresh Preparation', desc: 'Our culinary artists handcraft your pastries from scratch using premium Italian mascarpone.' },
        { title: 'Careful Packaging', desc: 'Placed in signature gold-embossed, double-insulated boxes for temperature preservation.' },
        { title: 'Fast Delivery', desc: 'Delivered directly to your residence in temperature-controlled fleet vehicles.' }
      ]
    },
    ar: {
      title: 'رحلة طلبك الاستثنائية معنا',
      subtitle: 'من وصفتنا السرية المتقنة حتى تزيين طاولة ضيافتك، إليك تفاصيل مسار التحضير الفاخر والآمن لدينا.',
      steps: [
        { title: 'اختر حلوياتك', desc: 'تصفح قائمتنا الغنية أو استشر الشيف سمعان الذكي لاختيار تشكيلتك المثالية المفضلة.' },
        { title: 'قدّم طلبك الفخم', desc: 'أكد خياراتك عبر حجز آمن ومشفر بالكامل، أو بضغطة زر عبر طلب واتساب السريع والآمن.' },
        { title: 'إعداد طازج فوري', desc: 'يصنع خبراؤنا طلبك الخاص فوراً من الصفر باستخدام جبنة الماسكاربوني الأصلية وكاكاو النخبة.' },
        { title: 'تغليف ملكي فاخر', desc: 'نحمي طلبك في علب حرارية عازلة مطرزة بنقوش الذهب لتحتفظ بحالتها الباردة الطازجة.' },
        { title: 'توصيل مبرد سريع', desc: 'تنطلق سياراتنا المبردة الخاصة لتسليم طلبك إلى باب قصرك أو منزلك بكل رقي ودقة.' }
      ]
    }
  };

  const t = content[lang];

  const icons = [
    <Coffee className="w-6 h-6" />,
    <ClipboardList className="w-6 h-6" />,
    <Flame className="w-6 h-6 animate-pulse" />,
    <Gift className="w-6 h-6" />,
    <Truck className="w-6 h-6" />
  ];

  return (
    <section id="order-process" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'THE ROAD TO SWEETNESS' : 'مسار الضيافة الملكية'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative mt-12" id="timeline-flow-container">
          
          {/* Connecting Line (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="absolute top-[34px] left-[5%] right-[5%] h-0.5 bg-gold/15 hidden md:block z-0" id="desktop-timeline-line"></div>
          <div className="absolute left-[34px] top-4 bottom-4 w-0.5 bg-gold/15 md:hidden z-0" id="mobile-timeline-line"></div>

          {/* Steps wrapper */}
          <div className={`grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            {t.steps.map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                key={idx}
                className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-6"
                id={`timeline-step-${idx}`}
              >
                
                {/* Step Circle & Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-[70px] h-[70px] rounded-full gold-gradient-bg text-cream flex items-center justify-center shadow-lg border-4 border-white transition-all transform hover:scale-115">
                    {icons[idx]}
                  </div>
                  {/* Step counter */}
                  <span className="absolute -top-1.5 -right-1.5 bg-chocolate text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white font-mono">
                    {idx + 1}
                  </span>
                </div>

                {/* Step Details */}
                <div className="space-y-1.5 pt-1 md:pt-0">
                  <h3 className="font-bold text-chocolate text-base sm:text-lg font-sans">
                    {step.title}
                  </h3>
                  <p className="text-xs text-darkbrown/70 leading-relaxed font-sans max-w-xs">
                    {step.desc}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
