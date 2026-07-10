import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutUsProps {
  lang: 'en' | 'ar';
}

export default function AboutUs({ lang }: AboutUsProps) {
  const content = {
    en: {
      sectionTitle: 'Our Heritage',
      title: 'At تيراميسو_سعف و رمال, we believe every dessert should create a memorable experience.',
      p1: 'Every tiramisu, cake, and pastry is handcrafted using fresh ingredients, rich flavors, and elegant presentation. Our brand name reflects the poetic meeting of traditional palm groves (سعف) and the soft golden sands (رمال) of our homeland—fusing premium Italian craftsmanship with rich local hospitality.',
      p2: 'We do not compromise on taste. We import our mascarpone directly from Italy, source our cocoa beans from single-origin organic estates in South America, and bake each dessert fresh daily to maintain pristine standards of luxury.',
      pillars: [
        { title: 'Fresh Daily', desc: 'No preservatives. Prepared from scratch every single morning.' },
        { title: 'Handmade Desserts', desc: 'Crafted with passion and meticulous attention to detail.' },
        { title: 'Premium Quality', desc: 'Only the highest grade authentic ingredients are sourced globally.' },
        { title: 'Beautiful Presentation', desc: 'Wrapped in elegant gold-embossed bespoke packaging.' }
      ]
    },
    ar: {
      sectionTitle: 'حكايتنا العريقة',
      title: 'في تيراميسو_سعف و رمال، نؤمن بأن كل قطعة حلوى يجب أن تصنع ذكرى سعيدة لا تُنسى.',
      p1: 'كل كوب تيراميسو، كعكة، ومعجنات نعدها تُصنع يدوياً بحب كامل ومكونات طازجة لتمنحك مذاقاً فخماً وعرضاً فائق الأناقة. يعبر اسمنا عن الالتقاء الشاعري بين سعف النخيل الخالد (سعف) وحبات الرمال الذهبية الناعمة (رمال) لوطننا المعطاء، ممتزجين بأفخم تقاليد الطهي الإيطالية.',
      p2: 'لا نقبل بالحلول الوسط حين يتعلق الأمر بالمذاق؛ حيث نستورد جبنة الماسكاربوني الأصلية من إيطاليا، وحبوب الكاكاو الفاخرة من مزارع أمريكا الجنوبية العضوية، لنخبز لك الفخامة طازجة يومياً في مطبخنا الخاص.',
      pillars: [
        { title: 'طازج يومياً', desc: 'بدون أي مواد حافظة. نحضرها من الصفر في كل صباح باكر.' },
        { title: 'صنع يدوي بحب', desc: 'نصنعها بشغف وحرفية عالية لترتقي لذوقكم الرفيع.' },
        { title: 'جودة استثنائية', desc: 'نختار المكونات الأعلى جودة عالمياً ومحلياً بعناية بالغة.' },
        { title: 'تقديم فاخر وأنيق', desc: 'مغلفة بعناية تامة في صناديق مخملية مذهبة تليق بالإهداء.' }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Stats Left Side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2px] overflow-hidden border border-chocolate/15 p-2 bg-white">
              <img
                src="/src/assets/images/dessert_showcase_1783693746761.jpg"
                alt="Luxury Dessert Assortment of Tiramisu Sa'af and Ramal"
                className="w-full h-[450px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-chocolate/30"></div>

              {/* Float Experience Badge */}
              <div className="absolute bottom-6 right-6 left-6 glass-card p-4 rounded-[2px] border border-chocolate/10 flex items-center gap-4">
                <div className="bg-chocolate/5 text-gold p-2.5 rounded-[2px]">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-chocolate text-base font-sans">
                    {lang === 'ar' ? 'سنتان من التميز الفني' : '2 Years of Culinary Art'}
                  </h4>
                  <p className="text-xs text-darkbrown/80 font-sans mt-0.5">
                    {lang === 'ar' ? 'حائزون على تقييم نخبوي كأفضل علامة حلوى في المنطقة.' : 'Rated as the premier dessert brand for outstanding culinary presentations.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* About Text Content Right Side */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans">
              {t.sectionTitle}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-chocolate tracking-tight leading-tight font-serif">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-darkbrown/80 leading-relaxed font-sans">
              {t.p1}
            </p>

            <p className="text-sm sm:text-base text-darkbrown/70 leading-relaxed font-sans">
              {t.p2}
            </p>

            {/* Icons Grid (4 pillars) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gold/10">
              {t.pillars.map((pillar, idx) => {
                const icons = [
                  <Sparkles className="w-5 h-5" />,
                  <Heart className="w-5 h-5" />,
                  <Award className="w-5 h-5" />,
                  <ShieldCheck className="w-5 h-5" />
                ];
                return (
                  <div key={idx} className="flex gap-3">
                    <div className="bg-gold/10 text-gold p-2.5 rounded-lg h-fit flex-shrink-0">
                      {icons[idx]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-chocolate text-sm sm:text-base font-sans">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-darkbrown/60 mt-1 font-sans leading-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
