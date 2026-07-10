import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface ContactSectionProps {
  lang: 'en' | 'ar';
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [formName, setFormName] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const textContent = {
    en: {
      title: 'Coordinate with Us',
      subtitle: 'Visit our dessert boutique or connect with our master bakers for special requests and private hosting reservation services.',
      businessName: 'تيراميسو_سعف و رمال (Tiramisu Sa’af & Ramal)',
      phone: 'Phone & Concierge',
      whatsapp: 'WhatsApp Quick Reservation',
      email: 'Corporate & Inquiry Email',
      location: 'Exclusive Boutique Location',
      hours: 'Operating Hours',
      hoursDesc: 'Daily: 11:00 AM – 11:30 PM (Friday: 1:30 PM – Midnight)',
      mapPlaceholder: 'Premium Boutique Map View (Riyadh Boulevard, Saudi Arabia)',
      sendMessage: 'Secure Inquiry Form',
      namePl: 'Your prestigious name...',
      msgPl: 'Describe your custom celebration cake or hosting query...',
      sendBtn: 'Deliver Inquiry',
      thankYou: 'Thank you! Our boutique manager will call you within 2 hours.',
      instagramTitle: 'Indulge in Our Instagram Feed'
    },
    ar: {
      title: 'اتصل بنا وحلّق في عالمنا',
      subtitle: 'تفضل بزيارة البوتيك الفاخر الخاص بنا أو تواصل مع كبار طهاتنا لحجوزات بوفيهات المناسبات وطلبيات الاحتفالات الحصرية.',
      businessName: 'تيراميسو_سعف و رمال',
      phone: 'رقم الهاتف والكونسيرج',
      whatsapp: 'خدمة حجز الواتساب السريعة',
      email: 'البريد الإلكتروني المعتمد للطلبات',
      location: 'موقع البوتيك الحصري',
      hours: 'أوقات العمل واستقبال الزوار',
      hoursDesc: 'يومياً: 11:00 صباحاً – 11:30 مساءً (الجمعة: 1:30 ظهراً – منتصف الليل)',
      mapPlaceholder: 'عرض خريطة البوتيك الفاخر (البوليفارد، الرياض، المملكة العربية السعودية)',
      sendMessage: 'نموذج التواصل السري الخاص',
      namePl: 'اسمك الكريم والموقر...',
      msgPl: 'اكتب لنا تفاصيل حفل تفضل أو كعكتك الخاصة المطلوبة...',
      sendBtn: 'إرسال الرسالة الفاخرة',
      thankYou: 'شكراً جزيلاً! سيتواصل معك مدير المعرض الخاص بنا في غضون ساعتين.',
      instagramTitle: 'استمتع بمشاهدة حسابنا على إنستغرام'
    }
  };

  const t = textContent[lang];

  // Curated Luxury Instagram images
  const instagramFeed = [
    '/src/assets/images/hero_tiramisu_coffee_1783693734173.jpg',
    '/src/assets/images/dessert_showcase_1783693746761.jpg',
    '/src/assets/images/celebration_cake_1783693759846.jpg',
    '/src/assets/images/coffee_combo_1783693771212.jpg',
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=150'
  ];

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formMsg.trim()) return;

    setIsSent(true);
    setFormName('');
    setFormMsg('');
    setTimeout(() => {
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'REACH OUT' : 'تواصل مع النخبة'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Contact Coordinates Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-coordinates">
          
          {/* Coordinates Info & Instagram (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-5 bg-cream/30 rounded-xl border border-gold/10 flex gap-4 items-start">
                <div className="bg-gold/15 text-gold p-2.5 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-chocolate text-sm font-sans mb-1">{t.location}</h4>
                  <p className="text-xs text-darkbrown/85 font-sans leading-relaxed">
                    {lang === 'en' ? 'Boulevard District, Tower B, Ground Floor' : 'حي البوليفارد، برج النخبة، الدور الأرضي'}
                  </p>
                  <p className="text-[11px] text-gold font-bold font-sans mt-0.5">Riyadh, KSA</p>
                </div>
              </div>

              <div className="p-5 bg-cream/30 rounded-xl border border-gold/10 flex gap-4 items-start">
                <div className="bg-gold/15 text-gold p-2.5 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-chocolate text-sm font-sans mb-1">{t.phone}</h4>
                  <p className="text-xs text-darkbrown/85 font-sans font-mono leading-relaxed">
                    +966 11 405 8890
                  </p>
                  <a
                    href="https://wa.me/966500000000"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-gold font-bold hover:underline font-sans block mt-1"
                  >
                    {t.whatsapp}
                  </a>
                </div>
              </div>

              <div className="p-5 bg-cream/30 rounded-xl border border-gold/10 flex gap-4 items-start">
                <div className="bg-gold/15 text-gold p-2.5 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-chocolate text-sm font-sans mb-1">{t.email}</h4>
                  <p className="text-xs text-darkbrown/85 font-sans font-mono leading-relaxed">
                    concierge@tiramisusaaf.com
                  </p>
                </div>
              </div>

              <div className="p-5 bg-cream/30 rounded-xl border border-gold/10 flex gap-4 items-start">
                <div className="bg-gold/15 text-gold p-2.5 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-chocolate text-sm font-sans mb-1">{t.hours}</h4>
                  <p className="text-xs text-darkbrown/85 font-sans leading-relaxed">
                    {t.hoursDesc}
                  </p>
                </div>
              </div>

            </div>

            {/* Instagram Visual Section */}
            <div className="p-6 bg-cream/15 rounded-2xl border border-gold/10">
              <h4 className="font-bold text-chocolate text-sm font-serif mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-gold rounded-full"></span>
                {t.instagramTitle}
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {instagramFeed.map((img, idx) => (
                  <a
                    key={idx}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="aspect-square rounded-xl overflow-hidden border border-gold/10 block group shadow-sm hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={img}
                      alt="Instagram luxury post"
                      className="w-full h-full object-cover group-hover:brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Map Placeholder & Message Form (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Google Maps Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gold/15 luxury-shadow relative h-[250px] bg-cream/45 flex items-center justify-center text-center p-6 group" id="map-holder">
              {/* Elegant CSS Grid resembling a golden cartography map */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8A96A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/10 to-transparent"></div>
              
              <div className="relative z-10 space-y-3">
                <MapPin className="w-10 h-10 text-gold mx-auto animate-bounce" />
                <h4 className="font-serif text-sm font-bold text-chocolate tracking-wide uppercase">
                  {t.businessName}
                </h4>
                <p className="text-[10px] text-darkbrown/60 max-w-xs mx-auto">
                  {t.mapPlaceholder}
                </p>
                <div className="inline-block bg-chocolate text-cream font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  24.7136° N, 46.6753° E
                </div>
              </div>
            </div>

            {/* Custom Private Message Form */}
            <div className="bg-cream/40 p-6 rounded-2xl border border-gold/10 luxury-shadow">
              <h4 className="font-bold text-chocolate text-sm font-sans mb-4">{t.sendMessage}</h4>
              
              <form onSubmit={handleSend} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder={t.namePl}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white border border-gold/15 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                  id="contact-form-name"
                />

                <textarea
                  required
                  rows={3}
                  placeholder={t.msgPl}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full bg-white border border-gold/15 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans resize-none"
                  id="contact-form-msg"
                />

                {isSent && (
                  <div className="p-3 bg-chocolate/10 text-chocolate border border-gold/20 text-[11px] rounded-xl font-medium font-sans text-center flex items-center justify-center gap-1.5 animate-pulse" id="contact-success-alert">
                    <Check className="w-4 h-4 text-gold" />
                    <span>{t.thankYou}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full gold-gradient-bg hover:opacity-95 text-cream font-bold py-3 px-5 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs border border-gold/20 cursor-pointer"
                  id="btn-deliver-inquiry"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.sendBtn}</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
