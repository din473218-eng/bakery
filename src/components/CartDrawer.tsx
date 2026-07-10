import { useState, useEffect, FormEvent } from 'react';
import { CartItem, Product } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, Check, ArrowLeft, Truck, Package, Flame, Clock, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  lang: 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  lang,
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  
  // Checkout Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Active tracking state
  const [trackingStep, setTrackingStep] = useState(0);

  const textContent = {
    en: {
      title: 'Your Premium Selection',
      empty: 'Your luxury shopping bag is currently empty.',
      subtotal: 'Subtotal Price',
      delivery: 'Direct Hand-Delivery',
      free: 'FREE (Exclusive)',
      discount: 'Luxury Discount (20%)',
      total: 'Grand Total',
      couponLabel: 'Coupon Code',
      apply: 'Apply',
      couponSuccess: 'Coupon code GOLDEN20 applied beautifully! 20% off.',
      couponFail: 'Invalid luxury code. Try "GOLDEN20".',
      checkoutTitle: 'Secure Checkout Coordinates',
      fullName: 'Your prestigious name...',
      phone: 'Your phone number...',
      address: 'Deliver to address...',
      placeOrder: 'Confirm Royal Order',
      sar: 'SAR',
      orderSuccess: 'Your royal order has been confirmed successfully!',
      trackingTitle: 'Order Tracking System',
      trackingStep0: 'Order Received',
      trackingStep1: 'Preparing Desserts',
      trackingStep2: 'Carefully Packaging',
      trackingStep3: 'Fleet Hand-Delivery',
      trackingStep4: 'Delivered Elegantly',
      trackingDesc0: 'Your order details have been verified by our boutique master.',
      trackingDesc1: 'Our pastry chefs are handcrafting your desserts from scratch.',
      trackingDesc2: 'Placing your creations inside gold-embossed insulated boxes.',
      trackingDesc3: 'Your chilled order is in transit with our temperature-controlled fleet.',
      trackingDesc4: 'Enjoy your sweet and luxurious moments! Thank you for choosing us.'
    },
    ar: {
      title: 'حقيبتك الانتقائية الفاخرة',
      empty: 'حقيبة التسوق الفاخرة الخاصة بك فارغة حالياً.',
      subtotal: 'المجموع الفرعي',
      delivery: 'التوصيل المبرد الخاص',
      free: 'مجاني (حصري)',
      discount: 'خصم النخبة (20٪)',
      total: 'المجموع الإجمالي الكلي',
      couponLabel: 'كود الخصم الحصري',
      apply: 'تطبيق',
      couponSuccess: 'تم تطبيق الكود GOLDEN20 بنجاح وتألق! خصم 20٪.',
      couponFail: 'كود خصم غير صحيح. جرب "GOLDEN20".',
      checkoutTitle: 'تأكيد إحداثيات التوصيل والطلب',
      fullName: 'اسمك الكريم والموقر...',
      phone: 'رقم جوالك المعتمد...',
      address: 'عنوان التوصيل بالكامل...',
      placeOrder: 'تأكيد حجز الطلب الملكي',
      sar: 'ر.س',
      orderSuccess: 'تم تأكيد طلبك الاستثنائي وجاري تحضيره الآن بكل حب!',
      trackingTitle: 'نظام تتبع حالة الطلبات',
      trackingStep0: 'تم استقبال الطلب',
      trackingStep1: 'جاري تحضير الحلويات',
      trackingStep2: 'التغليف الفاخر والآمن',
      trackingStep3: 'التوصيل الخاص المبرد',
      trackingStep4: 'تم التسليم برقي',
      trackingDesc0: 'تم تأكيد ومراجعة تفاصيل طلبك الفاخر من قبل مدير البوتيك.',
      trackingDesc1: 'يقوم كبار طهاتنا بإعداد وصنع حلوياتك يدوياً وبشكل طازج الآن.',
      trackingDesc2: 'نضع إبداعاتك بعناية داخل علبنا المعزولة المذهبة الحافظة للبرودة.',
      trackingDesc3: 'طلبك في الطريق إليك الآن بسيارتنا الخاصة والمجهزة والمبردة بدقة.',
      trackingDesc4: 'نتمنى لك لحظات سعيدة ومذاقاً رائعاً! شكراً لثقتك الغالية بنا.'
    }
  };

  const t = textContent[lang];

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = subtotal * (discountPercent / 100);
  const grandTotal = subtotal - discount;

  // Track order tracking timer simulated
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderId && trackingStep < 4) {
      interval = setInterval(() => {
        setTrackingStep((prev) => prev + 1);
      }, 5000); // Progress every 5 seconds for simulated experience
    }
    return () => clearInterval(interval);
  }, [orderId, trackingStep]);

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'GOLDEN20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId(`SR-${Math.floor(100000 + Math.random() * 900000)}`);
      setTrackingStep(0);
    }, 1500);
  };

  const handleResetCartAndTracking = () => {
    onClearCart();
    setOrderId(null);
    setTrackingStep(0);
    setCouponApplied(false);
    setDiscountPercent(0);
    setCouponCode('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-darkbrown/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-cream border-l border-gold/20 luxury-shadow flex flex-col h-full relative"
          id="cart-drawer-panel"
        >
          
          {/* Header */}
          <div className="bg-chocolate text-cream px-6 py-5 border-b border-gold/15 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                {t.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-cream/85 hover:text-gold p-1 cursor-pointer transition-colors"
              id="btn-close-cart-drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8" id="cart-drawer-body">
            
            <AnimatePresence mode="wait">
              
              {/* Order Tracking view if order has been placed */}
              {orderId ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                  id="order-tracking-view"
                >
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full gold-gradient-bg text-cream flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-6 h-6 text-cream" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-chocolate">
                      {t.orderSuccess}
                    </h4>
                    <p className="text-xs text-darkbrown/60 font-mono">
                      Order ID: <span className="font-bold text-gold">{orderId}</span>
                    </p>
                  </div>

                  {/* Active Step Indicator with vertical timeline */}
                  <div className="p-5 bg-white rounded-2xl border border-gold/15 luxury-shadow space-y-6">
                    <h5 className="font-bold text-chocolate text-xs sm:text-sm border-b border-gold/5 pb-2.5 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gold animate-bounce" />
                      {t.trackingTitle}
                    </h5>

                    {/* Step items */}
                    <div className="relative space-y-6">
                      {/* Line */}
                      <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-gold/10 z-0"></div>

                      {[0, 1, 2, 3, 4].map((step) => {
                        const isCurrent = trackingStep === step;
                        const isDone = trackingStep > step;
                        
                        const stepIcons = [
                          <Clock className="w-4 h-4" />,
                          <Flame className="w-4 h-4" />,
                          <Package className="w-4 h-4" />,
                          <Truck className="w-4 h-4" />,
                          <Check className="w-4 h-4" />
                        ];

                        const stepTitles = [
                          t.trackingStep0,
                          t.trackingStep1,
                          t.trackingStep2,
                          t.trackingStep3,
                          t.trackingStep4
                        ];

                        const stepDescs = [
                          t.trackingDesc0,
                          t.trackingDesc1,
                          t.trackingDesc2,
                          t.trackingDesc3,
                          t.trackingDesc4
                        ];

                        return (
                          <div key={step} className="flex gap-4 items-start relative z-10">
                            {/* Circle icon */}
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
                              isCurrent ? 'bg-gold border-gold text-cream shadow' :
                              isDone ? 'bg-chocolate border-chocolate text-gold' :
                              'bg-cream border-gold/15 text-gold/30'
                            }`}>
                              {stepIcons[step]}
                            </div>
                            
                            {/* Text desc */}
                            <div className="min-w-0 pt-0.5">
                              <h6 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-gold' : isDone ? 'text-chocolate/60' : 'text-darkbrown/30'}`}>
                                {stepTitles[step]}
                              </h6>
                              {isCurrent && (
                                <p className="text-[11px] text-darkbrown/70 leading-relaxed font-sans mt-0.5">
                                  {stepDescs[step]}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleResetCartAndTracking}
                    className="w-full bg-chocolate hover:bg-chocolate/95 text-cream font-bold py-3 px-5 rounded-xl transition-all text-xs cursor-pointer text-center"
                    id="btn-return-to-boutique"
                  >
                    {lang === 'en' ? 'Return to Boutique' : 'العودة للبوتيك والتسوق'}
                  </button>
                </motion.div>
              ) : (
                /* Standard Cart details and form */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                  id="standard-cart-view"
                >
                  {/* Cart Items List */}
                  {cartItems.length > 0 ? (
                    <div className="space-y-4" id="cart-items-list">
                      {cartItems.map((item) => (
                        <div
                          key={`cart-item-${item.product.id}`}
                          className="bg-white p-4 rounded-xl border border-gold/10 luxury-shadow flex gap-4 items-center"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.nameEn}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gold/10"
                            referrerPolicy="no-referrer"
                          />

                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-chocolate truncate font-sans">
                              {lang === 'en' ? item.product.nameEn : item.product.nameAr}
                            </h4>
                            <p className="text-xs text-gold font-bold font-mono mt-0.5">
                              {item.product.price} {t.sar}
                            </p>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 rounded bg-cream/60 hover:bg-gold/10 border border-gold/15 text-chocolate cursor-pointer"
                                id={`btn-dec-qty-${item.product.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold font-mono px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded bg-cream/60 hover:bg-gold/10 border border-gold/15 text-chocolate cursor-pointer"
                                id={`btn-inc-qty-${item.product.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-chocolate/40 hover:text-gold p-2 cursor-pointer"
                            id={`btn-remove-item-${item.product.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty Cart Fallback */
                    <div className="text-center py-16 bg-white rounded-2xl border border-gold/10 my-4 space-y-4">
                      <ShoppingBag className="w-12 h-12 text-gold/30 mx-auto" />
                      <p className="text-xs sm:text-sm text-darkbrown/60 font-sans">
                        {t.empty}
                      </p>
                    </div>
                  )}

                  {/* Calculations & Checkout Form (Only if cart is not empty) */}
                  {cartItems.length > 0 && (
                    <div className="space-y-6">
                      
                      {/* Coupon input */}
                      <form onSubmit={handleApplyCoupon} className="p-4 bg-white rounded-xl border border-gold/10 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gold flex-shrink-0" />
                        <input
                          type="text"
                          placeholder={t.couponLabel}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-grow bg-cream/40 border border-gold/15 rounded-lg px-3 py-2 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                          id="coupon-input"
                        />
                        <button
                          type="submit"
                          className="bg-chocolate text-cream hover:text-gold text-[10px] font-bold px-3 py-2 rounded-lg transition-all"
                          id="btn-apply-coupon"
                        >
                          {t.apply}
                        </button>
                      </form>

                      {/* Coupon outcome notices */}
                      {couponApplied && (
                        <p className="text-[10px] text-chocolate font-bold bg-chocolate/10 p-2.5 rounded-lg border border-gold/25" id="coupon-applied-alert">
                          {t.couponSuccess}
                        </p>
                      )}
                      {couponError && (
                        <p className="text-[10px] text-red-500 font-bold bg-red-500/10 p-2.5 rounded-lg border border-red-500/20" id="coupon-error-alert">
                          {t.couponFail}
                        </p>
                      )}

                      {/* Pricing Summary */}
                      <div className="bg-white p-5 rounded-2xl border border-gold/15 luxury-shadow space-y-3 font-sans text-xs sm:text-sm">
                        <div className="flex justify-between items-center text-darkbrown/70">
                          <span>{t.subtotal}</span>
                          <span className="font-mono font-bold">{subtotal} {t.sar}</span>
                        </div>
                        <div className="flex justify-between items-center text-darkbrown/70">
                          <span>{t.delivery}</span>
                          <span className="text-gold font-bold">{t.free}</span>
                        </div>
                        {couponApplied && (
                          <div className="flex justify-between items-center text-chocolate font-bold">
                            <span>{t.discount}</span>
                            <span className="font-mono text-gold">-{discount} {t.sar}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center text-chocolate font-bold text-base border-t border-gold/5 pt-3">
                          <span>{t.total}</span>
                          <span className="font-mono text-gold text-lg font-extrabold">{grandTotal} {t.sar}</span>
                        </div>
                      </div>

                      {/* Checkout Information Form */}
                      <div className="bg-white p-5 rounded-2xl border border-gold/15 luxury-shadow space-y-4">
                        <h4 className="font-bold text-chocolate text-xs sm:text-sm border-b border-gold/5 pb-2.5 flex items-center gap-1.5 font-sans">
                          {t.checkoutTitle}
                        </h4>

                        <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                          <input
                            type="text"
                            required
                            placeholder={t.fullName}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-cream/30 border border-gold/15 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans"
                            id="checkout-name"
                          />

                          <input
                            type="tel"
                            required
                            placeholder={t.phone}
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-cream/30 border border-gold/15 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans font-mono"
                            id="checkout-phone"
                          />

                          <textarea
                            required
                            rows={3}
                            placeholder={t.address}
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full bg-cream/30 border border-gold/15 rounded-xl px-4 py-3 text-xs text-darkbrown focus:outline-none focus:border-gold font-sans resize-none"
                            id="checkout-address"
                          />

                          {/* Submit button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full gold-gradient-bg hover:opacity-95 text-cream font-bold py-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-xs border border-gold/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            id="btn-confirm-checkout"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <span>{t.placeOrder}</span>
                            )}
                          </button>
                        </form>
                      </div>

                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
