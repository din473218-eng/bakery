import { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  lang: 'en' | 'ar';
}

export default function GallerySection({ lang }: GallerySectionProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const textContent = {
    en: {
      title: 'Our Visual Gallery',
      subtitle: 'A sensory feast. Take a glimpse of our freshly layered tiramisu, custom baked cakes, and bespoke presentation boxes.',
      close: 'Close Lightbox'
    },
    ar: {
      title: 'معرض الإلهام الحسي',
      subtitle: 'لقطات تأسر الحواس؛ ألقِ نظرة على أكواب التيراميسو الغنية، الكعكات المذهبة وصناديق الهدايا المخملية التوقيعية.',
      close: 'إغلاق المعرض'
    }
  };

  const t = textContent[lang];

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev! + 1));
    }
  };

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev! - 1));
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'THE CRAFT IN PHOTOS' : 'شغفنا في صور'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[250px]" id="gallery-masonry">
          {GALLERY_ITEMS.map((item, idx) => {
            // Apply different spans to create beautiful masonry rhythm
            const spanClass = 
              idx === 0 ? 'col-span-2 row-span-2' : 
              idx === 3 ? 'col-span-1 row-span-2' : 
              idx === 5 ? 'col-span-2 row-span-1' : 
              'col-span-1 row-span-1';

            return (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setActivePhotoIndex(idx)}
                key={item.id}
                className={`${spanClass} relative rounded-2xl overflow-hidden cursor-pointer group border border-gold/10 luxury-shadow bg-cream/30`}
                id={`gallery-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-darkbrown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full text-chocolate shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-5 h-5 text-chocolate hover:text-gold" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbrown/95 backdrop-blur-md" id="gallery-lightbox">
            
            {/* Close trigger on backdrop */}
            <div className="absolute inset-0" onClick={() => setActivePhotoIndex(null)}></div>

            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-chocolate transition-all z-20 cursor-pointer"
              title={t.close}
              id="btn-close-lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-chocolate transition-all z-20 cursor-pointer"
              id="btn-lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Holder */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] aspect-video w-full rounded-2xl overflow-hidden z-10 border border-gold/20 shadow-2xl bg-black"
            >
              <img
                src={GALLERY_ITEMS[activePhotoIndex].image}
                alt={GALLERY_ITEMS[activePhotoIndex].title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                <h4 className="text-cream text-lg font-bold font-serif uppercase tracking-wide">
                  {GALLERY_ITEMS[activePhotoIndex].title}
                </h4>
              </div>
            </motion.div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-chocolate transition-all z-20 cursor-pointer"
              id="btn-lightbox-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
