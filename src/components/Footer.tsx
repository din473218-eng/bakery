import { Coffee, Send, Instagram, Facebook, Twitter, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface FooterProps {
  lang: 'en' | 'ar';
}

export default function Footer({ lang }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const textContent = {
    en: {
      brandDesc: 'Tiramisu Sa’af & Ramal is an elite Saudi dessert boutique. Combining ancient culinary traditions with modern gourmet luxury to elevate your sweet occasions.',
      quickLinks: 'Exclusive Directory',
      contactTitle: 'Direct Inquiries',
      newsletterTitle: 'Bespoke Dispatch',
      newsletterDesc: 'Subscribe to receive private invitations, early announcements of seasonal recipe releases, and private hosting promotions.',
      subscribeBtn: 'Join Private List',
      copyright: '© 2026 Tiramisu Sa’af & Ramal. Crafted with absolute elegance for prestigious guests.',
      success: 'Subscribed in luxury!',
      menu: 'Boutique Menu',
      story: 'Our Heritage',
      faq: 'Familiar Queries',
      why: 'Our Standard'
    },
    ar: {
      brandDesc: 'بوتيك تيراميسو_سعف و رمال هو عنوان الفخامة في الحلويات السعودية. ندمج شغف الطهي العريق بالفخامة العصرية لنصنع لك لحظات تذوق استثنائية.',
      quickLinks: 'دليل البوتيك الفاخر',
      contactTitle: 'تواصل مباشر',
      newsletterTitle: 'النشرة الحصرية للنخبة',
      newsletterDesc: 'اشترك في قائمتنا البريدية الخاصة لتلقي دعوات تذوق حصرية، وإعلانات مبكرة للوصفات الموسمية الجديدة والعروض الحصرية.',
      subscribeBtn: 'انضم للقائمة الخاصة',
      copyright: '© ٢٠٢٦ تيراميسو_سعف و رمال. صُنع بكل فخر ورقي لمتذوقينا الكرام.',
      success: 'تم الاشتراك بنجاح وتقدير!',
      menu: 'قائمة المبتكرات',
      story: 'إرثنا وقصتنا',
      faq: 'تساؤلات تهمك',
      why: 'لماذا نحن؟'
    }
  };

  const t = textContent[lang];

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-chocolate border-t border-gold/20 text-cream pt-20 pb-10 relative overflow-hidden" id="boutique-footer">
      {/* Golden accent wave border */}
      <div className="absolute top-0 inset-x-0 h-1 gold-gradient-bg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info (5 columns) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[2px] bg-gold flex items-center justify-center border border-gold/20">
                <Coffee className="w-5.5 h-5.5 text-cream" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-black text-cream tracking-tight uppercase">
                {lang === 'en' ? 'Sa’af & Ramal' : 'سعف و رمال'}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-sans max-w-sm">
              {t.brandDesc}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[2px] bg-white/5 hover:bg-gold text-cream hover:text-chocolate transition-all duration-300"
                aria-label="Instagram link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[2px] bg-white/5 hover:bg-gold text-cream hover:text-chocolate transition-all duration-300"
                aria-label="Twitter link"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-[2px] bg-white/5 hover:bg-gold text-cream hover:text-chocolate transition-all duration-300"
                aria-label="Facebook link"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Directory Links (3 columns) */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-cream/70">
              <li>
                <a href="#menu" className="hover:text-gold transition-colors">{t.menu}</a>
              </li>
              <li>
                <a href="#about-heritage" className="hover:text-gold transition-colors">{t.story}</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-gold transition-colors">{t.why}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold transition-colors">{t.faq}</a>
              </li>
            </ul>
          </div>

          {/* Private Newsletter Dispatch (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider">
              {t.newsletterTitle}
            </h4>
            <p className="text-xs text-cream/70 leading-relaxed font-sans">
              {t.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@royalmail.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/5 border border-gold/30 rounded-[2px] px-4 py-3.5 pr-12 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-gold focus:bg-white/10 font-sans"
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gold hover:opacity-90 p-2 rounded-[2px] text-chocolate transition-all cursor-pointer"
                  aria-label="Subscribe"
                  id="btn-subscribe-newsletter"
                >
                  <Send className="w-4 h-4 text-chocolate" />
                </button>
              </div>

              {isSubscribed && (
                <div className="p-3 bg-gold/10 border border-gold/30 text-gold text-xs rounded-[2px] font-medium font-sans flex items-center justify-center gap-1.5 animate-pulse" id="newsletter-success-alert">
                  <Check className="w-4 h-4 text-gold" />
                  <span>{t.success}</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-gold/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-cream/45 font-sans">
          <p>{t.copyright}</p>
          <div className="flex gap-4">
            <a href="#menu" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#menu" className="hover:text-gold transition-colors">Terms of Elegance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
