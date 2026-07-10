import { Product } from './types';

// Let's use the actual generated images for key items
// hero_tiramisu_coffee -> Classic Tiramisu & Coffee Combo
// dessert_showcase -> Dessert Box & Mini Cupcakes
// celebration_cake -> Birthday Cake & Red Velvet Cake
// coffee_combo -> Coffee Combo & Pistachio Tiramisu

export const PRODUCTS: Product[] = [
  {
    id: 'classic-tiramisu',
    nameEn: 'Classic Venetian Tiramisu',
    nameAr: 'تيراميسو البندقية الكلاسيكي',
    descriptionEn: 'Savor our signature dessert layered with premium Italian mascarpone, espresso-soaked ladyfingers, and a dusting of finest single-origin Venezuelan cocoa.',
    descriptionAr: 'تيراميسو تقليدي فاخر مُعد بطبقات من جبنة الماسكاربوني الإيطالية الغنية، بسكويت ليدي فينجرز مغموس بالإسبريسو، ولمسة من كاكاو فنزويلا الأصيل.',
    price: 48,
    category: 'tiramisu',
    image: '/src/assets/images/hero_tiramisu_coffee_1783693734173.jpg',
    rating: 5.0,
    isBestseller: true
  },
  {
    id: 'pistachio-tiramisu',
    nameEn: 'Pistachio & Cardamom Tiramisu',
    nameAr: 'تيراميسو الفستق والهل',
    descriptionEn: 'An artisanal fusion of roasted Sicilian pistachio cream, touch of aromatic cardamom, creamy mascarpone layers, and caramelized crunch.',
    descriptionAr: 'مزيج فاخر يجمع بين كريمة الفستق الصقلي المحمص، لمسة من الهيل العطري، طبقات الماسكاربوني المخملية وحبيبات مقرمشة مكرملة.',
    price: 54,
    category: 'tiramisu',
    image: '/src/assets/images/coffee_combo_1783693771212.jpg',
    rating: 4.9,
    isBestseller: true
  },
  {
    id: 'lotus-tiramisu',
    nameEn: 'Lotus Speculoos Tiramisu',
    nameAr: 'تيراميسو لوتس سبيكولوس',
    descriptionEn: 'Mascarpone indulgence combined with Belgian Lotus Biscoff spread, crushed spiced cookies, and caramelized biscuit butter layers.',
    descriptionAr: 'تجربة دلال لا تُقاوم تجمع بين جبنة الماسكاربوني الفاخرة وزبدة لوتس البلجيكية الشهيرة مع فتات البسكويت المتبل اللذيذ.',
    price: 48,
    category: 'tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isBestseller: false
  },
  {
    id: 'chocolate-tiramisu',
    nameEn: 'Dark Chocolate Ganache Tiramisu',
    nameAr: 'تيراميسو غاناش الشوكولاتة الداكنة',
    descriptionEn: 'Decadent layer of 72% dark Belgian chocolate ganache, espresso infusion, creamy mascarpone, and roasted hazelnut crown.',
    descriptionAr: 'تيراميسو مكثف يفيض بغاناش الشوكولاتة البلجيكية الداكنة بتركيز 72٪، غمر الإسبريسو المركز، ماسكاربوني، وتتويج من البندق المحمص.',
    price: 52,
    category: 'tiramisu',
    image: 'https://images.unsplash.com/photo-1608471556396-0164627d2c3e?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isBestseller: true
  },
  {
    id: 'birthday-cake',
    nameEn: 'Custom Celebration Imperial Cake',
    nameAr: 'كيكة المناسبات الملكية الفاخرة',
    descriptionEn: 'A magnificent masterpiece custom-crafted with soft vanilla sponge, Swiss meringue buttercream, gold leaf accents, and fresh seasonal berries.',
    descriptionAr: 'تحفة فنية مخصصة للاحتفالات، مُعدة من كيك الإسفنج الفانيليا الهش، كريمة الزبدة السويسرية، لمسات من ورق الذهب الخالص والفواكه الطازجة.',
    price: 240,
    category: 'cakes',
    image: '/src/assets/images/celebration_cake_1783693759846.jpg',
    rating: 5.0,
    isBestseller: true
  },
  {
    id: 'red-velvet-cake',
    nameEn: 'Red Velvet Majestic Cake',
    nameAr: 'كيكة المخمل الأحمر الماجستيك',
    descriptionEn: 'Layers of moist, velvety cocoa sponge paired perfectly with smooth white chocolate cream cheese frosting and sweet raspberry accents.',
    descriptionAr: 'طبقات مخملية من كيك الكاكاو الفاخر المنسجم بامتياز مع كريمة الجبن والشوكولاتة البيضاء الناعمة ولمسات التوت البري الحلوة.',
    price: 180,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    isBestseller: false
  },
  {
    id: 'strawberry-cheesecake',
    nameEn: 'White Chocolate Strawberry Cheesecake',
    nameAr: 'تشيزكيك الفراولة والشوكولاتة البيضاء',
    descriptionEn: 'Silky baked cream cheese infused with Madagascar vanilla on a buttery Graham cracker crust, smothered with fresh strawberry glaze.',
    descriptionAr: 'تشيز كيك حريري مخبوز ببطء مع فانيليا مدغشقر، على قاعدة بسكويت غراهام المقرمشة بالزبدة، مغطى بصلصة الفراولة الطازجة الفاخرة.',
    price: 160,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isBestseller: true
  },
  {
    id: 'chocolate-brownies',
    nameEn: 'Fudge Sea-Salt Brownies (Box of 6)',
    nameAr: 'براونيز فدج بالملح البحري (علبة من 6 قطع)',
    descriptionEn: 'Ultra-moist, dense fudge brownies loaded with dark chocolate chunks and topped with a light sprinkle of Maldon sea salt flakes.',
    descriptionAr: 'براونيز فدج غنية ورطبة ممتلئة بقطع الشوكولاتة الداكنة الكثيفة ومزينة برشة رقيقة من رقائق ملح مالدون البحري الفاخر.',
    price: 65,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isBestseller: false
  },
  {
    id: 'mini-cupcakes',
    nameEn: 'Petite Cupcakes Harmony Box (12 Pieces)',
    nameAr: 'علبة كب كيك "هارموني" الصغيرة (12 حبة)',
    descriptionEn: 'An exquisite selection of miniature cupcakes in red velvet, salted caramel, pistachio, and dark chocolate ganache flavors.',
    descriptionAr: 'مجموعة منتقاة بعناية فائقة من الكب كيك الصغير بنكهات: المخمل الأحمر، الكراميل المملح، الفستق، وغاناش الشوكولاتة الداكنة.',
    price: 95,
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    isBestseller: false
  },
  {
    id: 'cookies-box',
    nameEn: 'Gourmet Double Chocolate Cookies Box',
    nameAr: 'علبة كوكيز الشوكولاتة المزدوجة الفاخرة',
    descriptionEn: 'Freshly baked artisanal cookies, crispy on the edges, chewy inside, featuring melted Belgian chocolate and roasted pecans.',
    descriptionAr: 'كوكيز مخبوز يدويًا يوميًا؛ مقرمش من الأطراف، طري وغني من الداخل، محشو بالشوكولاتة البلجيكية الذائبة ومكسرات البيكان المحمصة.',
    price: 55,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    isBestseller: true
  },
  {
    id: 'dessert-box',
    nameEn: 'The Sa’af & Ramal Signature Gift Box',
    nameAr: 'صندوق هدايا "سعف و رمال" الفاخر التوقيعي',
    descriptionEn: 'The ultimate luxury gift assortment including classic tiramisu cups, gourmet cookies, brownies, and mini dessert jars.',
    descriptionAr: 'أرقى صناديق الهدايا الفاخرة التي تحمل توقيعنا، تضم أكواب التيراميسو الكلاسيكية، كوكيز متميزة، قطع براونيز، وجرار الحلويات الصغيرة.',
    price: 150,
    category: 'desserts',
    image: '/src/assets/images/dessert_showcase_1783693746761.jpg',
    rating: 5.0,
    isBestseller: true
  },
  {
    id: 'coffee-combo',
    nameEn: 'Signature Tiramisu & Pour-over Combo',
    nameAr: 'ثنائية التيراميسو المميزة والقهوة المختصة',
    descriptionEn: 'A cup of our classic Venetian tiramisu served with a fresh cup of Ethiopian single-origin specialty V60 coffee.',
    descriptionAr: 'كوب من تيراميسو البندقية الكلاسيكي الفاخر يُقدّم متناغمًا مع فنجان من القهوة المختصة V60 المحضّرة من حبوب إثيوبية فاخرة.',
    price: 60,
    category: 'combos',
    image: '/src/assets/images/coffee_combo_1783693771212.jpg',
    rating: 4.9,
    isBestseller: true
  }
];

export const GALLERY_ITEMS = [
  { id: '1', title: 'Tiramisu Art', image: '/src/assets/images/hero_tiramisu_coffee_1783693734173.jpg' },
  { id: '2', title: 'Luxury Display', image: '/src/assets/images/dessert_showcase_1783693746761.jpg' },
  { id: '3', title: 'Custom Cake Detail', image: '/src/assets/images/celebration_cake_1783693759846.jpg' },
  { id: '4', title: 'Brewing Coffee Combo', image: '/src/assets/images/coffee_combo_1783693771212.jpg' },
  { id: '5', title: 'Gourmet Cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600' },
  { id: '6', title: 'Elegantly Boxed Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600' },
  { id: '7', title: 'Rich Cocoa Dusting', image: 'https://images.unsplash.com/photo-1608471556396-0164627d2c3e?auto=format&fit=crop&q=80&w=600' },
  { id: '8', title: 'Gilded Pastries', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600' }
];

export const FAQS = [
  {
    qEn: 'Do you make custom celebration cakes?',
    qAr: 'هل تقومون بتجهيز كيكات مخصصة للمناسبات؟',
    aEn: 'Yes! We specialize in crafting stunning, luxurious, custom-designed celebration cakes for birthdays, weddings, and premium corporate events. Please place custom orders at least 3-5 days in advance.',
    aAr: 'نعم بالتأكيد! نحن متميزون في تصميم وتجهيز كيكات المناسبات الملكية الفاخرة المبتكرة لأعياد الميلاد، حفلات الزفاف والمؤتمرات الكبرى. نرجو التكرم بالطلب قبل 3-5 أيام على الأقل.'
  },
  {
    qEn: 'Can I order in advance for specific dates?',
    qAr: 'هل يمكنني جدولة الطلبات مسبقًا لتواريخ محددة؟',
    aEn: 'Absolutely. You can schedule your dessert delivery or pick-up up to 30 days in advance during our checkout process to guarantee freshness on your special day.',
    aAr: 'بكل تأكيد. يمكنك حجز وجدولة تسليم الحلويات أو استلامها من المعرض قبل ما يصل إلى 30 يومًا، لضمان أعلى مستوى من الجودة والجاهزية في يومك المميز.'
  },
  {
    qEn: 'Do you offer direct delivery?',
    qAr: 'هل توفرون خدمة التوصيل المباشر؟',
    aEn: 'Yes, we provide careful and temperature-controlled delivery service across the city to ensure your delicate tiramisu and cakes arrive in perfect, pristine condition.',
    aAr: 'نعم، نوفر خدمة التوصيل الخاص والآمن بسيارات مبردة ومجهزة بدقة لضمان وصول كيكاتك وتحف التيراميسو إليك في حالة مثالية فائقة الرقي.'
  },
  {
    qEn: 'Are your desserts prepared daily?',
    qAr: 'هل يتم إعداد الحلويات بشكل يومي طازج؟',
    aEn: 'Every single dessert we serve is handcrafted from scratch daily in our boutique kitchen using only the freshest, premium ingredients without any artificial preservatives.',
    aAr: 'كل قطعة حلوى نقدمها تُحضّر يدويًا من الصفر وبشكل يومي طازج في مطبخ البوتيك الخاص بنا، باستخدام مكونات طبيعية بالكامل خالية تمامًا من المواد الحافظة.'
  },
  {
    qEn: 'Can you cater large private events?',
    qAr: 'هل يمكنكم تلبية طلبات الضيافة والجمعيات الكبيرة؟',
    aEn: 'Yes, we provide full luxury dessert table setups, custom catering packages, and customized premium boxes tailored beautifully to elevate any luxury wedding or gathering.',
    aAr: 'نعم، نقوم بتقديم خدمة متكاملة لتجهيز بوفيهات الحلويات الفاخرة، مع صناديق ضيافة فاخرة مخصصة تزيد من رقي مناسباتكم وحفلاتكم الاستثنائية.'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Al-Maktoum',
    rating: 5,
    commentEn: 'The best tiramisu I’ve ever tasted. The balance of high-end espresso and the delicate, fluffy mascarpone cream is absolutely heavenly. Truly luxury in a box.',
    commentAr: 'أفخم وألذ تيراميسو تذوقته بحياتي! توازن مذهل ومثالي بين قهوة الإسبريسو الفاخرة وكريمة الماسكاربوني الخفيفة. ترف حقيقي يستحق الاقتناء.'
  },
  {
    id: '2',
    name: 'Khalid Fahad',
    rating: 5,
    commentEn: 'Incredible flavor and stunning luxury presentation. The Custom Celebration Cake we ordered was the absolute highlight of our family celebration. Exquisite taste.',
    commentAr: 'طعم مذهل وفائق النضارة وتغليف أنيق للغاية! كعكة الاحتفالات المخصصة التي طلبناها كانت حديث الجميع في مناسبتنا العائلية.'
  },
  {
    id: '3',
    name: 'Dina Mansour',
    rating: 5,
    commentEn: 'Perfect desserts for high-end events. The Sa’af & Ramal Gift Box is beautiful, packed with absolute culinary art. The pistachio tiramisu is out of this world.',
    commentAr: 'الحلويات المثالية للاحتفالات الراقية. علبة الهدايا مميزة للغاية وتجسد الفن الحقيقي للحلويات الفخمة. تيراميسو الفستق خيالي.'
  },
  {
    id: '4',
    name: 'Yousef Otaibi',
    rating: 5,
    commentEn: 'Fresh, extremely delicious, and premium ingredients. Worth every single riyal. Highly recommend the coffee and dessert combos for premium hosting.',
    commentAr: 'مكونات فاخرة وطازجة لأبعد الحدود، تستحق كل ريال يُدفع فيها! أنصح بشدة بثنائية القهوة والحلويات لضيافة استثنائية مميزة.'
  }
];
