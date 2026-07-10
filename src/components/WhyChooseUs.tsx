import { Sparkles, Utensils, ChefHat, Gift, Truck, Cake, Lock, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  lang: 'en' | 'ar';
}

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const content = {
    en: {
      title: 'Why Choose Us',
      subtitle: 'The hallmark of Tiramisu Sa’af & Ramal lies in our devotion to pristine culinary luxury.',
      cards: [
        { title: 'Fresh Daily', desc: 'No preservatives. Prepared from scratch every morning to guarantee premium texture.' },
        { title: 'Premium Ingredients', desc: 'We source true Italian mascarpone, Belgian chocolate, and organic farm berries.' },
        { title: 'Handmade Desserts', desc: 'Handcrafted with absolute precision and culinary care by skilled pastry masters.' },
        { title: 'Elegant Packaging', desc: 'Presented in bespoke, gold-embossed textured boxes designed for high-end gifting.' },
        { title: 'Fast Delivery', desc: 'Direct, temperature-controlled delivery ensures pristine shape and optimal coldness.' },
        { title: 'Custom Cakes', desc: 'Custom celebration showstoppers tailored perfectly to your themes and guest sizes.' },
        { title: 'Secure Ordering', desc: 'Encrypted and fast online checkout with multiple payment confirmation safeguards.' },
        { title: 'Excellent Service', desc: 'Highly dedicated, prompt customer care to guide all your reservation inquiries.' }
      ]
    },
    ar: {
      title: 'لماذا تختار تيراميسو_سعف و رمال؟',
      subtitle: 'يكمن سر تميزنا في تفانينا الكامل والتزامنا بتقديم تجربة حلويات استثنائية فائقة الفخامة.',
      cards: [
        { title: 'طازج يومياً', desc: 'خالٍ من المواد الحافظة. نعد حلوياتنا من الصفر صباح كل يوم لنضمن لك تماسكاً ومذاقاً طازجاً.' },
        { title: 'مكونات فاخرة', desc: 'نستورد جبن الماسكاربوني الإيطالي الأصيل، الشوكولاتة البلجيكية، والتوت البري العضوي.' },
        { title: 'صنع يدوي بالكامل', desc: 'تُحضر حلوياتنا بحرفية فائقة ودقة متناهية بأيدي أمهر خبراء الطهي والحلويات.' },
        { title: 'تغليف ملكي أنيق', desc: 'تُقدم المبتكرات في صناديق مخملية مذهبة ومصممة خصيصاً لتناسب أرقى الإهداءات والضيافات.' },
        { title: 'توصيل مبرد وسريع', desc: 'نحن نضمن توصيل سياراتنا المجهزة مبردة لتصلك حلوياتك في حالة مثالية وباردة.' },
        { title: 'كيكات مخصصة', desc: 'كعكات احتفال استثنائية مصممة خصيصاً لتلائم طابع مناسبتك السعيدة وعدد ضيوفك.' },
        { title: 'طلب آمن وسهل', desc: 'نظام دفع وحجز إلكتروني مشفر وسريع مع تأكيد فوري لراحتك التامة وأمانك المالي.' },
        { title: 'خدمة عملاء راقية', desc: 'فريق خدمة عملاء متميز ومستعد لخدمتك وتوجيه طلباتك وحجوزاتك بكل رحابة صدر.' }
      ]
    }
  };

  const t = content[lang];

  const icons = [
    <Sparkles className="w-6 h-6" />,
    <Utensils className="w-6 h-6" />,
    <ChefHat className="w-6 h-6" />,
    <Gift className="w-6 h-6" />,
    <Truck className="w-6 h-6" />,
    <Cake className="w-6 h-6" />,
    <Lock className="w-6 h-6" />,
    <Headphones className="w-6 h-6" />
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'OUR STANDARD' : 'معايير النخبة'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="why-us-grid">
          {t.cards.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="bg-cream/40 p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:bg-white transition-all duration-300 luxury-shadow flex flex-col items-start space-y-4"
              id={`why-card-${idx}`}
            >
              <div className="bg-chocolate/10 text-gold p-3 rounded-xl">
                {icons[idx]}
              </div>
              <h3 className="text-lg font-bold text-chocolate font-sans">
                {card.title}
              </h3>
              <p className="text-xs text-darkbrown/75 leading-relaxed font-sans">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
