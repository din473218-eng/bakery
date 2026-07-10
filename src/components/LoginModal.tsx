import { useState, FormEvent } from 'react';
import { X, User, Lock, Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  lang: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export default function LoginModal({ lang, isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const textContent = {
    en: {
      titleLogin: 'Sign In to Your Sanctuary',
      titleSignup: 'Create Your Prestigious Profile',
      desc: 'Join Tiramisu Sa’af & Ramal to track your delicate orders, save exquisite favorites, and receive exclusive recipes.',
      emailLabel: 'Email Address',
      passLabel: 'Password',
      nameLabel: 'Full Name',
      loginBtn: 'Sign In',
      signupBtn: 'Register Profile',
      switchSignup: 'New to our boutique? Register',
      switchLogin: 'Already have a profile? Sign In',
      successLogin: 'Welcome back beautifully!',
      successSignup: 'Profile created with elegance!'
    },
    ar: {
      titleLogin: 'تسجيل الدخول لمساحتك الخاصة',
      titleSignup: 'إنشاء حسابك الملكي الخاص',
      desc: 'انضم إلى عائلة تيراميسو_سعف و رمال لتتبع طلبياتك الفاخرة، وحفظ حلوياتك المفضلة وتلقي عروضنا الخاصة.',
      emailLabel: 'البريد الإلكتروني المعتمد',
      passLabel: 'كلمة المرور السرية',
      nameLabel: 'الاسم الكريم بالكامل',
      loginBtn: 'تسجيل الدخول',
      signupBtn: 'إنشاء الحساب الفاخر',
      switchSignup: 'جديد في البوتيك الخاص بنا؟ سجل الآن',
      switchLogin: 'لديك حساب مفعل بالفعل؟ سجل دخولك',
      successLogin: 'أهلاً بك مجدداً بكل رقي وجمال!',
      successSignup: 'تم إنشاء حسابك الموقر بكل نجاح وتأكيد!'
    }
  };

  const t = textContent[lang];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentic delay
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        const loggedUsername = isLoginTab ? (email.split('@')[0] || 'Guest') : (name || 'Guest');
        onLoginSuccess(loggedUsername);
        setShowSuccess(false);
        onClose();
        // Clear forms
        setEmail('');
        setPassword('');
        setName('');
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-darkbrown/70 backdrop-blur-md" id="login-modal-overlay">
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-cream border border-gold/25 rounded-2xl overflow-hidden shadow-2xl z-10 w-full max-w-md flex flex-col relative"
        id="login-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-chocolate hover:text-gold shadow transition-all cursor-pointer"
          id="btn-close-login"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Description */}
          <div className="text-center space-y-2 pt-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate">
              {isLoginTab ? t.titleLogin : t.titleSignup}
            </h3>
            <p className="text-xs text-darkbrown/70 leading-relaxed font-sans max-w-xs mx-auto">
              {t.desc}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (for signup only) */}
            {!isLoginTab && (
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-chocolate font-sans">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-gold/15 rounded-xl pl-11 pr-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                    placeholder="E.g., Sarah Al-Saud"
                    id="login-form-name"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-chocolate font-sans">
                {t.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gold/15 rounded-xl pl-11 pr-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                  placeholder="name@exclusive.com"
                  id="login-form-email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-chocolate font-sans">
                {t.passLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gold/15 rounded-xl pl-11 pr-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                  placeholder="••••••••"
                  id="login-form-password"
                />
              </div>
            </div>

            {/* Success Alert */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3.5 bg-chocolate/10 border border-gold/20 text-chocolate text-xs rounded-xl font-medium font-sans flex items-center justify-center gap-1.5"
                  id="login-success-alert"
                >
                  <Check className="w-4 h-4 text-gold" />
                  <span>{isLoginTab ? t.successLogin : t.successSignup}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Submit */}
            <button
              type="submit"
              disabled={loading || showSuccess}
              className="w-full gold-gradient-bg hover:opacity-95 text-cream font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs border border-gold/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              id="btn-login-submit"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{isLoginTab ? t.loginBtn : t.signupBtn}</span>
              )}
            </button>
          </form>

          {/* Toggle Tab Footer */}
          <div className="text-center pt-2">
            <button
              onClick={() => setIsLoginTab(!isLoginTab)}
              className="text-xs text-gold font-semibold hover:underline cursor-pointer"
              id="btn-toggle-login-tab"
            >
              {isLoginTab ? t.switchSignup : t.switchLogin}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
