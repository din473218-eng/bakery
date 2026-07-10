import { useState, FormEvent } from 'react';
import { TESTIMONIALS } from '../data';
import { Review } from '../types';
import { Star, MessageSquare, Send, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsSectionProps {
  lang: 'en' | 'ar';
}

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(
    TESTIMONIALS.map((t) => ({
      id: t.id,
      name: t.name,
      rating: t.rating,
      comment: lang === 'en' ? t.commentEn : t.commentAr,
      date: '2026-07-08'
    }))
  );

  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const textContent = {
    en: {
      title: 'Our Customer Reflections',
      subtitle: 'Read the heartwarming feedback shared by our cherished guests who have indulged in our luxury desserts.',
      ratingLabel: 'Select Your Rating',
      namePlaceholder: 'Your prestigious name...',
      commentPlaceholder: 'Share your sweet thoughts and taste experience...',
      submitBtn: 'Submit Review',
      writeTitle: 'Share Your Feedback',
      writeSub: 'We would be honored to hear about your culinary experience with Tiramisu Sa’af & Ramal.',
      thankYou: 'Thank you! Your feedback has been published beautifully.'
    },
    ar: {
      title: 'أصداء متذوقينا وعملائنا الراقين',
      subtitle: 'اقرأ الكلمات العذبة والآراء الملهمة التي شاركها معنا ضيوفنا الكرام بعد تجربتهم حلوياتنا الملكية.',
      ratingLabel: 'حدد مستوى التقييم',
      namePlaceholder: 'اسمك الكريم...',
      commentPlaceholder: 'شاركنا انطباعك وتجربتك الحسية اللذيذة مع حلوياتنا...',
      submitBtn: 'إرسال التقييم',
      writeTitle: 'يسعدنا سماع رأيك الخاص',
      writeSub: 'يشرفنا كثيراً معرفة انطباعك ومدى رضاك عن ابتكاراتنا وصناديق التيراميسو لدينا.',
      thankYou: 'شكراً جزيلاً! لقد تم نشر تقييمك بنجاح وسعادة بالغة.'
    }
  };

  const t = textContent[lang];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newReview: Review = {
      id: `custom-review-${Date.now()}`,
      name: newName,
      comment: newComment,
      rating: newRating,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold font-sans block mb-3">
            {lang === 'en' ? 'GUEST VOICES' : 'أصداء الضيافة'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-chocolate tracking-tight font-serif mb-4">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-darkbrown/70 font-sans">
            {t.subtitle}
          </p>
        </div>

        {/* Testimonials Grid Layout + Submission side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reviews List (8 Columns on Large) */}
          <div className="lg:col-span-7 space-y-6 max-h-[620px] overflow-y-auto pr-2" id="reviews-list-container">
            <AnimatePresence initial={false}>
              {reviews.map((rev) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={rev.id}
                  className="bg-white p-6 rounded-2xl border border-gold/10 luxury-shadow relative flex flex-col space-y-4"
                  id={`review-item-${rev.id}`}
                >
                  <Quote className="w-10 h-10 text-gold/15 absolute right-6 top-4" />
                  
                  {/* Stars & Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex text-gold">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4.5 h-4.5 ${s <= rev.rating ? 'fill-gold text-gold' : 'text-gold/20'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-darkbrown/40 font-mono">
                      {rev.date}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm italic text-darkbrown/85 font-sans leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* User details */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gold/5">
                    <div className="w-9 h-9 rounded-full gold-gradient-bg text-cream flex items-center justify-center font-bold text-xs uppercase font-mono">
                      {rev.name.slice(0, 2)}
                    </div>
                    <div className="text-xs font-bold text-chocolate font-sans">
                      {rev.name}
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Share Feedback Form (5 Columns on Large) */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-gold/15 luxury-shadow" id="feedback-form-card">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-chocolate mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              {t.writeTitle}
            </h3>
            <p className="text-xs text-darkbrown/65 font-sans mb-6">
              {t.writeSub}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Stars selector */}
              <div>
                <label className="block text-xs font-bold text-chocolate mb-2 font-sans">
                  {t.ratingLabel}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewRating(s)}
                      className="p-1 text-gold hover:scale-110 transition-transform cursor-pointer"
                      id={`star-btn-${s}`}
                    >
                      <Star className={`w-6 h-6 ${s <= newRating ? 'fill-gold' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-cream/40 border border-gold/20 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold focus:bg-white font-sans"
                  id="review-form-name"
                />
              </div>

              {/* Comment */}
              <div>
                <textarea
                  required
                  rows={4}
                  placeholder={t.commentPlaceholder}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-cream/40 border border-gold/20 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold focus:bg-white font-sans resize-none"
                  id="review-form-comment"
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 bg-chocolate/10 border border-gold/30 text-chocolate text-xs rounded-xl font-medium font-sans text-center"
                    id="review-success-alert"
                  >
                    {t.thankYou}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                className="w-full gold-gradient-bg hover:opacity-95 text-cream font-bold py-3.5 px-6 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs border border-gold/20 cursor-pointer"
                id="btn-submit-review"
              >
                <Send className="w-4 h-4" />
                <span>{t.submitBtn}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
