import { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQSectionProps {
  lang: 'en' | 'ar';
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const textContent = {
    en: {
      title: 'Frequently Answered Secrets',
      subtitle: 'Unravel details about custom cake reservations, ingredients, local deliveries, and seasonal orders.'
    },
    ar: {
      title: 'الأسئلة الشائعة والمجابة تفصيلاً',
      subtitle: 'اكتشف المزيد عن حجز الكعكات الخاصة، المكونات العضوية، خدمة التوصيل الخاص والطلبيات الحصرية.'
    }
  };

  const t = textContent[lang];

  return (
    <section id="faq" className="py-24 bg-cream/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'COMMON CURIOSITIES' : 'تساؤلات تهم متذوقينا'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4" id="faq-accordions">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const q = lang === 'en' ? faq.qEn : faq.qAr;
            const a = lang === 'en' ? faq.aEn : faq.aAr;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gold/10 luxury-shadow overflow-hidden transition-all duration-300 hover:border-gold/25"
                id={`faq-item-${idx}`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 font-semibold text-chocolate cursor-pointer hover:bg-gold/5 transition-all text-sm sm:text-base font-sans"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className={lang === 'ar' ? 'text-right' : 'text-left'}>{q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gold flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gold/5 bg-cream/20"
                    >
                      <div className="px-6 py-5 text-xs sm:text-sm text-darkbrown/85 font-sans leading-relaxed">
                        <p className={lang === 'ar' ? 'text-right' : 'text-left'}>
                          {a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
