export const CATEGORIES = [
  { id: 'all', nameBn: 'সকল প্রোডাক্ট', nameEn: 'All Collections', icon: 'LayoutGrid' },
  { id: 'bedding', nameBn: 'বেডিং কম্বো সেট', nameEn: 'Bedding Sets', icon: 'BedDouble' },
  { id: 'couple', nameBn: 'কাপল কম্বো ড্রেস', nameEn: 'Couple Outfits', icon: 'HeartHandshake' },
  { id: 'hamper', nameBn: 'লাক্সারি গিফট হ্যাম্পার', nameEn: 'Gift Hampers', icon: 'Gift' },
  { id: 'polo', nameBn: 'প্রিমিয়াম পোলো শার্ট', nameEn: 'Polo Shirts', icon: 'Shirt' },
  { id: 'kurti', nameBn: 'শর্ট কুর্তি কালেকশন', nameEn: 'Ethnic Kurtis', icon: 'Sparkles' },
  { id: 'kashmiri', nameBn: 'কাশ্মীরি থ্রি-পিস', nameEn: 'Kashmiri 3-Piece', icon: 'Crown' },
  { id: 'lifestyle', nameBn: 'ব্যাগ ও লাইফস্টাইল', nameEn: 'Bags & Lifestyle', icon: 'ShoppingBag' },
];

export const INITIAL_PRODUCTS = [
  // 1. Bedding Combo Sets
  {
    id: 'luxury-bedding-combo-maroon',
    name: 'Luxury Floral Cotton Bedding Combo Set (Maroon & Rose)',
    nameBn: 'লাক্সারি ফ্লোরাল বেডিং কম্বো সেট (মেরুন ও রোজ প্রিন্ট)',
    model: 'ROOMBED-M101',
    price: 1350,
    regularPrice: 1850,
    discountPercent: 27,
    category: 'bedding',
    rating: 4.9,
    reviewsCount: 124,
    inStock: true,
    stockCount: 28,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'বেস্টসেলার',
    images: [
      '/assets/products/bedding-1.webp',
      '/assets/products/bedding-2.webp',
      '/assets/products/bedding-5.webp',
      '/assets/products/bedding-6.webp'
    ],
    colors: [
      { name: 'Maroon Floral', hex: '#881337', inStock: true },
      { name: 'Wine Pink', hex: '#9D174D', inStock: true },
      { name: 'Sky Blue Floral', hex: '#0284C7', inStock: true },
      { name: 'Royal Ivory', hex: '#F3F4F6', inStock: true },
    ],
    sizes: ['King Size (7.5x8.5 ft)', 'Semi-Double'],
    shortDescBn: '১০০% পিওর কটন সফট ফিনিশ, ১টি কিং সাইজ বেডশিট + ২টি বালিশের কাভার + ১টি কুশন কাভার কম্বো।',
    shortDescEn: 'Premium 100% combed cotton luxury bedding set with high thread count, fade-resistant reactive dye.',
    specs: {
      'ফেব্রিক কোয়ালিটি': '১০০% পিওর সফট কটন (রং ওঠার কোনো সুযোগ নেই)',
      'সাইজ (Size)': 'কিং সাইজ (৭.৫ ফুট বাই ৮.৫ ফুট)',
      'প্যাকেজে যা থাকছে': '১টি বেডশিট, ২টি পিলো কভার, ১টি কুশন কভার',
      'প্রিন্ট টেকনোলজি': 'রিঅ্যাক্টিভ ডিজিটাল ফ্লোরাল প্রিন্ট',
      'ডেলিভারি এরিয়া': 'নওগাঁ সদর ও সারাদেশে হোম ডেলিভারি',
      'ওয়ারেন্টি/গ্যারান্টি': 'রং উঠলে বা ডিফেক্ট থাকলে ১০০% রিপ্লেসমেন্ট'
    },
    bulletPointsBn: [
      '১০০% পাকা রং ও দীর্ঘস্থায়ী কোয়ালিটি গ্যারান্টি।',
      'কিং সাইজ যেকোনো বড় খাটে নিখুঁতভাবে ফিট হবে।',
      'ধোয়ার পরও কাপড়ের কোমলতা ও ঔজ্জ্বল্য বজায় থাকে।',
      'ক্যাশ অন ডেলিভারিতে দেখে রিসিভ করার সুবিধা।'
    ]
  },
  {
    id: 'luxury-bedding-sky-blue',
    name: 'Royal Sky Blue & Rose Floral Bedding Set',
    nameBn: 'রয়্যাল স্কাই ব্লু ফ্লোরাল কম্বো বেডিং সেট',
    model: 'ROOMBED-B202',
    price: 1350,
    regularPrice: 1850,
    discountPercent: 27,
    category: 'bedding',
    rating: 4.8,
    reviewsCount: 78,
    inStock: true,
    stockCount: 19,
    has360View: false,
    featured: true,
    isHotDeal: false,
    badgeText: 'নতুন আগমন',
    images: [
      '/assets/products/bedding-3.webp',
      '/assets/products/bedding-4.webp',
      '/assets/products/bedding-7.webp'
    ],
    colors: [
      { name: 'Sky Blue Floral', hex: '#38BDF8', inStock: true },
      { name: 'Hot Pink Rose', hex: '#F43F5E', inStock: true },
      { name: 'Classic Paisley', hex: '#B91C1C', inStock: true }
    ],
    sizes: ['King Size (7.5x8.5 ft)'],
    shortDescBn: 'রুচিশীল স্কাই ব্লু ও ফ্লোরাল ডিজাইনের প্রিমিয়াম কিং সাইজ বেড কাভার সেট।',
    shortDescEn: 'Elegant sky blue floral design made of breathable luxury cotton fabric for cool restful sleep.',
    specs: {
      'ফেব্রিক': 'সফট গ্লেস কটন ব্লেন্ড',
      'সাইজ': 'কিং সাইজ (৭.৫ ফুট x ৮.৫ ফুট)',
      'সেট কন্টেন্ট': '১টি বেডশিট + ২টি বালিশের কাভার + ১টি কুশন কাভার',
      'কালার গ্যারান্টি': '১০০% ওয়াশ ফাস্টনেস গ্যারান্টি'
    },
    bulletPointsBn: [
      'ঘরের সৌন্দর্যে এনে দেবে আভিজাত্যের ছোঁয়া।',
      'উন্নত মানের টেকসই সুতা দিয়ে বোনা।',
      'নওগাঁ সদর সহ সারাদেশে দ্রুত ডেলিভারি।'
    ]
  },
  {
    id: 'designer-paisley-bedsheet',
    name: 'Designer Paisley & White Floral Bed Sheet Set',
    nameBn: 'ডিজাইনার পেইজলি ও হোয়াইট ফ্লোরাল বেডশিট সেট',
    model: 'ROOMBED-W106',
    price: 1290,
    regularPrice: 1750,
    discountPercent: 26,
    category: 'bedding',
    rating: 4.9,
    reviewsCount: 65,
    inStock: true,
    stockCount: 15,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'হট ডিল',
    images: [
      '/assets/products/bedding-5.webp',
      '/assets/products/bedding-6.webp',
      '/assets/products/bedding-7.webp'
    ],
    colors: [
      { name: 'White Floral W-106', hex: '#FAFAFA', inStock: true },
      { name: 'Maroon Paisley Check', hex: '#991B1B', inStock: true }
    ],
    sizes: ['King Size (7.5x8.5 ft)'],
    shortDescBn: 'সাদা জমিনে রুচিশীল ফ্লোরাল ও পেইজলি আর্টওয়ার্কের ক্লাসিক বেডশিট কম্বো।',
    shortDescEn: 'Exquisite paisley and delicate floral botanical bedding combo set.',
    specs: {
      'ফেব্রিক': 'প্রিমিয়াম কটন কম্বড ফেব্রিক',
      'সাইজ': 'কিং সাইজ',
      'আইটেমস': '১টি বেডশিট + ২টি পিলো কাভার'
    },
    bulletPointsBn: [
      'ক্লাসিক হোয়াইট অ্যান্ড মেরুন কালার কম্বিনেশন।',
      'অত্যন্ত মোলায়েম ও আরামদায়ক অনুভূতি।',
      'সহজে ধোয়া যায় এবং রং নষ্ট হয় না।'
    ]
  },

  // 2. Couple Outfits
  {
    id: 'couple-combo-black-floral',
    name: 'Royal Black & Gold Floral Couple Matching Festive Combo',
    nameBn: 'রয়্যাল ব্ল্যাক ও গোল্ডেন কাপল ম্যাচিং সেট (পাঞ্জাবি + সালোয়ার কামিজ)',
    model: 'MAYA-CPL-BLK',
    price: 1950,
    regularPrice: 2650,
    discountPercent: 26,
    category: 'couple',
    rating: 5.0,
    reviewsCount: 94,
    inStock: true,
    stockCount: 22,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'কাপল স্পেশাল',
    images: [
      '/assets/products/couple-1.webp',
      '/assets/products/couple-2.webp',
      '/assets/products/couple-3.webp',
      '/assets/products/couple-4.webp'
    ],
    colors: [
      { name: 'Black Floral', hex: '#18181B', inStock: true },
      { name: 'Mustard Yellow', hex: '#D97706', inStock: true },
      { name: 'Royal Blue Mandala', hex: '#1D4ED8', inStock: true },
      { name: 'Rich Purple', hex: '#7E22CE', inStock: true },
    ],
    sizes: ['M (পাঞ্জাবি ৪০ / কামিজ ৩৮)', 'L (পাঞ্জাবি ৪২ / কামিজ ৪০)', 'XL (পাঞ্জাবি ৪৪ / কামিজ ৪২)'],
    shortDescBn: 'ঈদ, বিয়ে কিংবা যেকোনো উৎসবের জন্য পারফেক্ট ম্যাচিং লাক্সারি ব্ল্যাক অ্যান্ড গোল্ড কাপল কম্বো সেট।',
    shortDescEn: 'Exquisite matching couple combo featuring designer men’s Panjabi and gorgeous women’s Salwar Kameez set.',
    specs: {
      'পুরুষের পোশাক': 'ডিজাইনার পাঞ্জাবি (সিল্ক কটন ব্লেন্ড, বোতাম ফিনিশ)',
      'নারীর পোশাক': 'সালোয়ার কামিজ সেট ও দোপাট্টা (প্রিন্টেড ও ম্যাচিং বর্ডার)',
      'ফেব্রিক': 'প্রিমিয়াম ডল সিল্ক ও সফট কটন মিক্স',
      'পাঞ্জাবি সাইজ': '৪০, ৪২, ৪৪',
      'কামিজ সাইজ': '৩৬ থেকে ৪৪ পর্যন্ত অ্যাডজাস্টেবল (সেমি-স্টিচড/স্টিচড)',
      'উপলক্ষ': 'ঈদ, পূজা, পার্টি, গায়ে হলুদ ও বিবাহবার্ষিকী'
    },
    bulletPointsBn: [
      'একসাথে চমৎকার কাপল ম্যাচিং ফটো তোলার জন্য সেরা।',
      'গরমের দিনেও পরতে দারুণ আরামদায়ক ও হালকা।',
      'কালার ও প্রিন্টের শতভাগ দীর্ঘস্থায়িত্বের নিশ্চয়তা।'
    ]
  },
  {
    id: 'couple-combo-mustard-yellow',
    name: 'Ethnic Mustard Yellow & Paisley Couple Festive Set',
    nameBn: 'ফেস্টিভ মাস্টার্ড ইয়েলো কাপল ম্যাচিং কম্বো সেট',
    model: 'MAYA-CPL-YLW',
    price: 1950,
    regularPrice: 2650,
    discountPercent: 26,
    category: 'couple',
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    stockCount: 16,
    has360View: false,
    featured: true,
    isHotDeal: false,
    badgeText: 'ট্রেন্ডিং',
    images: [
      '/assets/products/couple-2.webp',
      '/assets/products/couple-1.webp',
      '/assets/products/couple-3.webp'
    ],
    colors: [
      { name: 'Mustard Yellow', hex: '#EAB308', inStock: true },
      { name: 'Royal Blue', hex: '#2563EB', inStock: true },
      { name: 'Rich Purple', hex: '#6B21A8', inStock: true }
    ],
    sizes: ['M (পাঞ্জাবি ৪০)', 'L (পাঞ্জাবি ৪২)', 'XL (পাঞ্জাবি ৪৪)'],
    shortDescBn: 'উজ্জ্বল হলুদ ও ঐতিহ্যবাহী মোটিফের স্পেশাল কাপল কম্বো ড্রেস। গায়ে হলুদের অনুষ্ঠানের জন্য দারুণ পছন্দ।',
    shortDescEn: 'Festive mustard yellow ethnic themed couple set tailored with comfort and elegance.',
    specs: {
      'ফেব্রিক': 'প্রিমিয়াম সফট কটন ও ভিসকস',
      'প্যাকেজ': '১টি পুরুষদের পাঞ্জাবি + ১টি লেডিস কামিজ ও দোপাট্টা',
      'কালার': 'মাস্টার্ড ইয়েলো'
    },
    bulletPointsBn: [
      'হলুদ সন্ধ্যা কিংবা যেকোনো পারিবারিক মিলনমেলার শ্রেষ্ঠ পোশাক।',
      'উচ্চমানের ফিনিশিং ও নিখুঁত সেলাই।',
      'প্রোডাক্ট হাতে পেয়ে টাকা পরিশোধ করার সুবিধা।'
    ]
  },
  {
    id: 'couple-combo-royal-blue',
    name: 'Royal Blue Mandala Couple Matching Festive Combo',
    nameBn: 'রয়্যাল ব্লু ম্যান্ডালা কাপল ম্যাচিং কম্বো সেট',
    model: 'MAYA-CPL-BLU',
    price: 1950,
    regularPrice: 2650,
    discountPercent: 26,
    category: 'couple',
    rating: 4.8,
    reviewsCount: 52,
    inStock: true,
    stockCount: 12,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'এক্সক্লুসিভ',
    images: [
      '/assets/products/couple-3.webp',
      '/assets/products/couple-4.webp',
      '/assets/products/couple-1.webp'
    ],
    colors: [
      { name: 'Royal Blue Mandala', hex: '#1E40AF', inStock: true },
      { name: 'Deep Purple', hex: '#581C87', inStock: true }
    ],
    sizes: ['M (পাঞ্জাবি ৪০)', 'L (পাঞ্জাবি ৪২)', 'XL (পাঞ্জাবি ৪৪)'],
    shortDescBn: 'আভিজাত্যপূর্ণ গাঢ় নীল ও মনকাড়া ম্যান্ডালা প্রিন্ট কাপল কম্বো।',
    shortDescEn: 'Majestic royal blue couple combo designed with traditional mandala patterns.',
    specs: {
      'ফেব্রিক': 'প্রিমিয়াম কটন সিল্ক',
      'সাইজ': 'পাঞ্জাবি ৪০, ৪২, ৪৪ | কামিজ ফ্রি সাইজ'
    },
    bulletPointsBn: [
      'রয়্যাল ভাইব ও প্রিমিয়াম লুকিং।',
      'কাপড়ের রং শতভাগ পাকা।'
    ]
  },

  // 3. Men's 7-in-1 Luxury Gift Hamper
  {
    id: 'mens-luxury-gift-hamper-7in1',
    name: '7-in-1 Exclusive Men’s Luxury Gift Hamper Box Set',
    nameBn: '৭-ইন-১ এক্সক্লুসিভ জেন্টস লাক্সারি গিফট হ্যাম্পার বক্স সেট',
    model: 'MAYA-HMP-7IN1',
    price: 1850,
    regularPrice: 2500,
    discountPercent: 26,
    category: 'hamper',
    rating: 5.0,
    reviewsCount: 183,
    inStock: true,
    stockCount: 35,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'বেস্ট গিফট চয়েস',
    images: [
      '/assets/products/hamper-1.webp',
      '/assets/products/hamper-2.webp',
      '/assets/products/hamper-3.webp',
      '/assets/products/hamper-4.webp'
    ],
    colors: [
      { name: 'Sky Blue Shirt Box', hex: '#7DD3FC', inStock: true },
      { name: 'Mustard Gold Shirt Box', hex: '#F59E0B', inStock: true },
      { name: 'Crimson Red Shirt Box', hex: '#DC2626', inStock: true }
    ],
    sizes: ['M (৩৮)', 'L (৪০)', 'XL (৪২)', 'XXL (৪৪)'],
    shortDescBn: 'প্রিয়জনকে উপহার দেওয়ার জন্য শার্ট, ওয়াচ, সানগ্লাস, ওয়ালেট, বেল্ট, ফগ বডি স্প্রে ও গিফট কার্ড সহ সম্পূর্ণ লাক্সারি কমপ্লিট বক্স।',
    shortDescEn: 'The ultimate 7-in-1 luxury men gift set: premium cotton formal shirt, quartz watch, sunglasses, wallet, belt, Fogg perfume & custom card.',
    specs: {
      'আইটেম ১ (শার্ট)': '১০০% কটন সেমি-ফরমাল প্রিমিয়াম শার্ট (সাইজ: M, L, XL, XXL)',
      'আইটেম ২ (ঘড়ি)': 'লাক্সারি কোয়ার্টজ স্টাইলিশ এনালগ রিস্টওয়াচ',
      'আইটেম ৩ (সানগ্লাস)': 'ইউভি প্রটেক্টেড ফ্যাশনেবল সানগ্লাস',
      'আইটেম ৪ (ওয়ালেট)': 'প্রিমিয়াম জেনুইন লেদার ওয়ালেট/মানিব্যাগ',
      'আইটেম ৫ (বেল্ট)': 'ম্যাচিং স্টাইলিশ লেদার বেল্ট',
      'আইটেম ৬ (পারফিউম)': '১টি অরিজিনাল FOGG বডি স্প্রে',
      'আইটেম ৭ (উপহার বক্স)': 'নকশী রিবন সহ প্রিমিয়াম হার্ডবোর্ড গিফট বক্স ও উইশ কার্ড'
    },
    bulletPointsBn: [
      'জন্মদিন, বিবাহবার্ষিকী কিংবা স্পেশাল দিনে দেওয়ার জন্য সেরা গিফট।',
      'আলাদা আলাদা কেনার চেয়ে হ্যাম্পারে পাচ্ছেন আকর্ষণীয় ছাড়।',
      'বক্সটির প্যাকেজিং এতটাই প্রিমিয়াম যে কোনো এক্সট্রা র‍্যাপিং ছাড়াই উপহার দেওয়া যায়।',
      'নওগাঁ সদর সহ সারা বাংলাদেশে হোম ডেলিভারি।'
    ]
  },

  // 4. DK Drexfish Polo Shirts
  {
    id: 'dk-drexfish-striped-polo-black',
    name: 'DK Drexfish Premium Striped Collar Polo Shirt (Jet Black)',
    nameBn: 'ডিকে ড্রেক্সফিশ প্রিমিয়াম স্ট্রাইপড পোলো শার্ট (জেট ব্ল্যাক)',
    model: 'DK-POLO-BLK',
    price: 650,
    regularPrice: 950,
    discountPercent: 32,
    category: 'polo',
    rating: 4.8,
    reviewsCount: 88,
    inStock: true,
    stockCount: 40,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'হট সেলিং',
    images: [
      '/assets/products/polo-1.webp',
      '/assets/products/polo-2.webp',
      '/assets/products/polo-3.webp',
      '/assets/products/polo-4.webp'
    ],
    colors: [
      { name: 'Jet Black', hex: '#18181B', inStock: true },
      { name: 'Crisp White', hex: '#FFFFFF', inStock: true },
      { name: 'Deep Maroon', hex: '#881337', inStock: true },
      { name: 'Chocolate Brown', hex: '#451A03', inStock: true }
    ],
    sizes: ['M (বুক ৩৮, দৈর্ঘ্য ২৭)', 'L (বুক ৪০, দৈর্ঘ্য ২৮)', 'XL (বুক ৪২, দৈর্ঘ্য ২৯)', 'XXL (বুক ৪৪, দৈর্ঘ্য ৩০)'],
    shortDescBn: '২২০+ জিএসএম ১০০% কম্বড কটন, কনট্রাস্ট স্ট্রাইপড কলার ও হাতা সহ আরামদায়ক রেগুলার ফিট পোলো।',
    shortDescEn: '220+ GSM heavy combed cotton polo shirt with contrast tipping collar and cuffs.',
    specs: {
      'ফেব্রিক': '২২০+ জিএসএম ১০০% কম্বড পিকে কটন',
      'কলার ও হাতা': 'কনট্রাস্ট স্ট্রাইপড রিব কলার',
      'ফিটিং': 'রেগুলার স্লিম ফিট',
      'ব্র্যান্ড': 'DK Drexfish Original Label',
      'সাইজ': 'M, L, XL, XXL'
    },
    bulletPointsBn: [
      'গরমে অত্যন্ত আরামদায়ক ও ঘাম শোষণকারী ফেব্রিক।',
      'ধোয়ার পর কোনো সংকোচন বা ফেব্রিক নষ্ট হবে না।',
      'ক্যাজুয়াল ও অফিসিয়াল উভয় পরিবেশেই মানানসই।'
    ]
  },
  {
    id: 'dk-drexfish-striped-polo-white',
    name: 'DK Drexfish Striped Collar Polo Shirt (Crisp White)',
    nameBn: 'ডিকে ড্রেক্সফিশ স্ট্রাইপড কলার পোলো শার্ট (হোয়াইট)',
    model: 'DK-POLO-WHT',
    price: 650,
    regularPrice: 950,
    discountPercent: 32,
    category: 'polo',
    rating: 4.8,
    reviewsCount: 56,
    inStock: true,
    stockCount: 30,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'ক্লাসিক',
    images: [
      '/assets/products/polo-2.webp',
      '/assets/products/polo-1.webp',
      '/assets/products/polo-3.webp'
    ],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF', inStock: true },
      { name: 'Deep Maroon', hex: '#881337', inStock: true }
    ],
    sizes: ['M (৩৮)', 'L (৪০)', 'XL (৪২)', 'XXL (৪৪)'],
    shortDescBn: 'স্মার্ট ও সতেজ লুকের ধবধবে সাদা পোলো শার্ট সাথে ক্লাসি নেভি-রেড স্ট্রাইপড কলার।',
    shortDescEn: 'Crisp white polo shirt designed with sophisticated collar details.',
    specs: {
      'ফেব্রিক': '১০০% পিকে কটন',
      'সাইজ': 'M, L, XL, XXL'
    },
    bulletPointsBn: [
      'স্মার্ট অ্যান্ড ক্লিন লুক।',
      'প্রিমিয়াম ব্র্যান্ডিং ও ফিনিশিং।'
    ]
  },
  {
    id: 'dk-drexfish-striped-polo-maroon',
    name: 'DK Drexfish Striped Collar Polo Shirt (Deep Maroon)',
    nameBn: 'ডিকে ড্রেক্সফিশ স্ট্রাইপড কলার পোলো শার্ট (মেরুন)',
    model: 'DK-POLO-MRN',
    price: 650,
    regularPrice: 950,
    discountPercent: 32,
    category: 'polo',
    rating: 4.9,
    reviewsCount: 49,
    inStock: true,
    stockCount: 25,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'পপুলার',
    images: [
      '/assets/products/polo-3.webp',
      '/assets/products/polo-4.webp',
      '/assets/products/polo-1.webp'
    ],
    colors: [
      { name: 'Deep Maroon', hex: '#881337', inStock: true },
      { name: 'Chocolate Brown', hex: '#451A03', inStock: true }
    ],
    sizes: ['M (৩৮)', 'L (৪০)', 'XL (৪২)', 'XXL (৪৪)'],
    shortDescBn: 'গভীর মেরুন কালারের প্রিমিয়াম পোলো শার্ট। জেন্টস ফ্যাশনে দারুণ ট্রেন্ডি।',
    shortDescEn: 'Deep maroon polo shirt with sleek accent stripes.',
    specs: {
      'ফেব্রিক': 'কম্বড পিকে কটন',
      'সাইজ': 'M, L, XL, XXL'
    },
    bulletPointsBn: [
      'আকর্ষণীয় মেরুন শেড যা সব ত্বকেই ফুটে ওঠে।',
      'হাই কোয়ালিটি বোতাম ও স্টিচিং।'
    ]
  },

  // 5. Men's Ethnic Short Kurtis
  {
    id: 'ethnic-short-kurti-cream-birds',
    name: 'Handcrafted Bird & Botanical Ethnic Short Kurti (Cream)',
    nameBn: 'হ্যান্ডক্রাফটেড বার্ড ও বোটানিক্যাল শর্ট কুর্তি (ক্রিম)',
    model: 'MAYA-KRT-CRM',
    price: 790,
    regularPrice: 1150,
    discountPercent: 31,
    category: 'kurti',
    rating: 4.9,
    reviewsCount: 71,
    inStock: true,
    stockCount: 24,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'আর্টিসান কালেকশন',
    images: [
      '/assets/products/kurti-1.webp',
      '/assets/products/kurti-2.webp',
      '/assets/products/kurti-3.webp',
      '/assets/products/kurti-4.webp'
    ],
    colors: [
      { name: 'Cream Beige Birds', hex: '#F5F5DC', inStock: true },
      { name: 'White Botanical', hex: '#FFFFFF', inStock: true },
      { name: 'Golden Tree of Life', hex: '#D97706', inStock: true },
      { name: 'Floral Vine Embroidery', hex: '#1E293B', inStock: true }
    ],
    sizes: ['M (৩৮)', 'L (৪০)', 'XL (৪২)', 'XXL (৪৪)'],
    shortDescBn: 'স্নিগ্ধ ক্রিম সুতি কাপড়ে হাতে আঁকা পাখি ও গাছের বোটানিক্যাল মোটিফ শর্ট কুর্তি। জিন্স কিংবা পায়জামার সাথে চমৎকার মানায়।',
    shortDescEn: 'Artisan hand-printed botanical bird motif short kurti on pure slub cotton fabric.',
    specs: {
      'ফেব্রিক': 'স্ল্যাব কটন ও লিনেন ব্লেন্ড (অত্যন্ত আরামদায়ক)',
      'কলার': 'চাইনিজ ম্যান্ডারিন কলার ও বোতাম প্লেট',
      'কাটিং': 'সেমি-ফিট শর্ট কুর্তি',
      'সাইজ': 'M (৩৮), L (৪০), XL (৪২), XXL (৪৪)'
    },
    bulletPointsBn: [
      'জিন্স প্যান্ট বা চিনোসের সাথে ক্যাজুয়াল আড্ডা ও উৎসবের সেরা লুক।',
      'প্রাকৃতিক রঙের প্রিন্ট যা ধোয়ার পরেও নতুনের মতো থাকে।',
      'হালকা ও বাতাস চলাচলের সুবিধাজনক কটন টেক্সচার।'
    ]
  },
  {
    id: 'ethnic-short-kurti-tree-of-life',
    name: 'Golden Tree of Life Hand-Block Print Short Kurti',
    nameBn: 'গোল্ডেন ট্রি অফ লাইফ হ্যান্ড-ব্লক প্রিন্ট শর্ট কুর্তি',
    model: 'MAYA-KRT-TREE',
    price: 790,
    regularPrice: 1150,
    discountPercent: 31,
    category: 'kurti',
    rating: 4.8,
    reviewsCount: 43,
    inStock: true,
    stockCount: 18,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'ব্লক প্রিন্ট',
    images: [
      '/assets/products/kurti-3.webp',
      '/assets/products/kurti-4.webp',
      '/assets/products/kurti-1.webp'
    ],
    colors: [
      { name: 'Golden Tree of Life', hex: '#B45309', inStock: true },
      { name: 'Floral Vine White', hex: '#F1F5F9', inStock: true }
    ],
    sizes: ['M (৩৮)', 'L (৪০)', 'XL (৪২)', 'XXL (৪৪)'],
    shortDescBn: 'ঐতিহ্যবাহী জীবনের বৃক্ষ (Tree of Life) মোটিফের এক্সক্লুসিভ খাদি কটন শর্ট কুর্তি।',
    shortDescEn: 'Traditional Tree of Life block-print short kurti for contemporary ethnic style.',
    specs: {
      'ফেব্রিক': 'খাদি পিওর কটন',
      'সাইজ': 'M, L, XL, XXL'
    },
    bulletPointsBn: [
      'অনবদ্য ট্রেডিশনাল আর্টওয়ার্ক।',
      'দিনভর পরে থাকার উপযোগী আরামদায়ক।'
    ]
  },

  // 6. Women's Kashmiri Three-Piece ("ZENA")
  {
    id: 'zena-luxury-kashmiri-three-piece',
    name: 'ZENA Luxury Kashmiri Needlework Embroidered Three-Piece Collection',
    nameBn: 'জিনা লাক্সারি কাশ্মীরি সূচিকর্ম থ্রি-পিস কালেকশন',
    model: 'ZENA-KASH-01',
    price: 1750,
    regularPrice: 2450,
    discountPercent: 29,
    category: 'kashmiri',
    rating: 5.0,
    reviewsCount: 116,
    inStock: true,
    stockCount: 20,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'প্রিমিয়াম কালেকশন',
    images: [
      '/assets/products/kashmiri-1.webp',
      '/assets/products/kashmiri-2.webp',
      '/assets/products/kashmiri-3.webp',
      '/assets/products/kashmiri-4.webp'
    ],
    colors: [
      { name: 'Teal Green Kashmiri', hex: '#0D9488', inStock: true },
      { name: 'Rich Plum', hex: '#831843', inStock: true },
      { name: 'Royal Crimson', hex: '#991B1B', inStock: true }
    ],
    sizes: ['ফ্রি সাইজ (বডি ৩৬ থেকে ৪৬ ইঞ্চি পর্যন্ত তৈরি করা যাবে)'],
    shortDescBn: 'কামিজের গলায় ও দামানে কাশ্মীরি সুতার নিপুণ এমব্রয়ডারি কাজ, সফট সিল্কি ফেব্রিক ও চওড়া ৫ হাত নজরকাড়া দোপাট্টা।',
    shortDescEn: 'Exquisite Kashmiri needlework embroidery women 3-piece suit with rich neck yoke, soft bottom and designer dupatta.',
    specs: {
      'কামিজ ফেব্রিক': 'পিওর কাশ্মীরি সিল্ক ও সফট অর্গানজা ব্লেন্ড (গলায় হেভি এমব্রয়ডারি)',
      'সালোয়ার': 'বাটার সিল্ক সফট ফেব্রিক (২.৫ গজ)',
      'দোপাট্টা': 'পুরো দোপাট্টায় আকর্ষণীয় বর্ডার ও সুতার কাজ (৫ হাত)',
      'ব্র্যান্ড': 'ZENA Luxury Collection',
      'সাইজ টাইপ': 'আনস্টিচড / সেমি-স্টিচড (বডি ৪৬ ইঞ্চি পর্যন্ত)'
    },
    bulletPointsBn: [
      'যেকোনো বিয়ে, পার্টি কিংবা পারিবারিক অনুষ্ঠানে রাজকীয় উপস্থিতি।',
      'কাশ্মীরি সূচিকর্মের প্রতিটি সুতোয় ফুটে উঠেছে সূক্ষ্ম কারুকার্য।',
      'কাপড়ের ফিনিশিং এতটাই কোমল যে গায়ে কোনো অস্বস্তি হবে না।',
      'হোম ডেলিভারিতে প্রোডাক্ট চেক করে পেমেন্ট করার নিশ্চয়তা।'
    ]
  },

  // 7. Bags & Kitchen Lifestyle
  {
    id: 'korean-chic-backpack-bigemeng',
    name: 'Korean Pastel Multi-Pocket Aesthetic School & Travel Backpack',
    nameBn: 'কোরিয়ান প্যাস্টেল মাল্টি-পকেট নান্দনিক ব্যাকপ্যাক ("Bigemeng")',
    model: 'BGM-KR-BP',
    price: 950,
    regularPrice: 1400,
    discountPercent: 32,
    category: 'lifestyle',
    rating: 4.9,
    reviewsCount: 82,
    inStock: true,
    stockCount: 26,
    has360View: false,
    featured: true,
    isHotDeal: false,
    badgeText: 'কোরিয়ান ফ্যাশন',
    images: [
      '/assets/products/bag-1.webp',
      '/assets/products/bag-2.webp'
    ],
    colors: [
      { name: 'Pastel Blue & White', hex: '#93C5FD', inStock: true },
      { name: 'Cloud White', hex: '#F8FAFC', inStock: true }
    ],
    sizes: ['Standard Backpack (১৪ ইঞ্চি ল্যাপটপ ফিট)'],
    shortDescBn: 'ওয়াটারপ্রুফ ফেব্রিক, ৫টি জিপার পকেট, ল্যাপটপ চেম্বার এবং আকর্ষণীয় ব্যাজ পিন ও টেডি বিয়ার কি-রিং সহ কমপ্লিট ব্যাগ।',
    shortDescEn: 'Aesthetic Korean style school & travel backpack made of waterproof durable nylon with multiple organizer compartments.',
    specs: {
      'ম্যাটেরিয়াল': 'ওয়াটার রেজিস্ট্যান্ট প্রিমিয়াম অক্সফোর্ড নাইলন',
      'চেম্বার সংখ্যা': '৫টি জিপার পকেট + ২টি সাইড ওয়াটার বোতল পকেট + ল্যাপটপ স্লট',
      'বোনাস এক্সেসরিজ': 'কিউট টেডি বিয়ার পুতুল কি-রিং ও ব্যাজ পিন ফ্রি',
      'ওজন বহনের ক্ষমতা': '৮-১০ কেজি'
    },
    bulletPointsBn: [
      'কলেজ, ইউনিভার্সিটি, কোচিং কিংবা ভ্রমণের জন্য দারুণ উপকারী।',
      'বৃষ্টির পানির হাত থেকে বই-খাতা ও গ্যাজেট সুরক্ষিত রাখে।',
      'নরম প্যাডেড শোল্ডার স্ট্র্যাপ তাই কাঁধে চাপ পড়ে না।'
    ]
  },
  {
    id: 'luxury-quilted-crossbody-bag',
    name: 'Luxury Quilted Crossbody Chain Shoulder Handbag',
    nameBn: 'লাক্সারি কুইল্টেড ক্রস বডি চেইন শোল্ডার ব্যাগ',
    model: 'MAYA-CB-07',
    price: 850,
    regularPrice: 1250,
    discountPercent: 32,
    category: 'lifestyle',
    rating: 4.8,
    reviewsCount: 64,
    inStock: true,
    stockCount: 18,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'লেডিস ফেভারিট',
    images: [
      '/assets/products/bag-3.webp',
      '/assets/products/bag-4.webp'
    ],
    colors: [
      { name: 'Crimson Red', hex: '#DC2626', inStock: true },
      { name: 'Classic Obsidian Black', hex: '#18181B', inStock: true }
    ],
    sizes: ['Compact Crossbody (৮ x ৫ ইঞ্চি)'],
    shortDescBn: 'হাই-গ্রেড পিইউ লেদার, টেকসই গোল্ডেন মেটাল চেইন স্ট্র্যাপ ও টার্ন-লক লক সিস্টেমের স্টাইলিশ ব্যাগ।',
    shortDescEn: 'Chic quilted crossbody shoulder bag crafted with premium PU leather and polished gold chain strap.',
    specs: {
      'ম্যাটেরিয়াল': 'হাই-গ্রেড স্ক্র্যাচ-প্রুফ পিইউ লেদার',
      'লক সিস্টেম': 'টার্ন-লক মেটাল ক্ল্যাম্প',
      'স্ট্র্যাপ': 'লং গোল্ডেন মেটাল চেইন উইথ লেদার শোল্ডার প্যাড'
    },
    bulletPointsBn: [
      'স্মার্টফোন, ওয়ালেট ও মেকআপ অনায়াসে বহনযোগ্য।',
      'ওয়েস্টার্ন ও ট্র্যাডিশনাল উভয় পোশাকের সাথেই দারুণ মানায়।'
    ]
  },
  {
    id: 'stainless-steel-chef-knife-set-6pcs',
    name: 'Professional Non-Stick 6-Piece Kitchen Chef Knife Set',
    nameBn: 'প্রফেশনাল নন-স্টিক ৬-পিস কিচেন শেফ নাইফ সেট',
    model: 'MAYA-KNIFE-6',
    price: 690,
    regularPrice: 1050,
    discountPercent: 34,
    category: 'lifestyle',
    rating: 4.9,
    reviewsCount: 105,
    inStock: true,
    stockCount: 30,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'কিচেন স্পেশাল',
    images: [
      '/assets/products/knife-1.webp',
      '/assets/products/knife-2.webp'
    ],
    colors: [
      { name: 'Matte Granite Black', hex: '#1E293B', inStock: true }
    ],
    sizes: ['6 Pieces Full Set'],
    shortDescBn: 'হাই-কার্বন স্টেইনলেস স্টিল ও নন-স্টিক অ্যান্টি-ব্যাকটেরিয়াল কোটিং সহ ক্লীভার, শেফ নাইফ, ইউটিলিটি নাইফ, কিচেন সিজার ও পিলারের সম্পূর্ণ সেট।',
    shortDescEn: 'Professional 6-piece non-stick carbon stainless steel chef knife set with ergonomic grip handles.',
    specs: {
      'মেটেরিয়াল': 'হাই-কার্বন স্টেইনলেস স্টিল উইথ অ্যান্টি-রাস্ট কোটিং',
      'সেট কন্টেন্ট': '১টি ক্লীভার, ১টি শেফ নাইফ, ১টি ব্রেড নাইফ, ১টি ফ্রুট নাইফ, ১টি কিচেন কাঁচি, ১টি সিরামিক পিলার',
      'হাতল': 'অ্যান্টি-স্লিপ এরগোনোমিক গ্রিপ'
    },
    bulletPointsBn: [
      'মাংস, মাছ, শাকসবজি ও ফলমূল কাটার জন্য সম্পূর্ণ প্যাকেজ।',
      'ব্লেডে কোনো খাদ্যবস্তু আটকে থাকে না এবং সহজে পরিষ্কার করা যায়।',
      'মরিচারোধক ও দীর্ঘদিন ধারালো থাকে।'
    ]
  },
  {
    id: 'emerald-luxury-manicure-set-3pcs',
    name: 'Emerald Gold Luxury 3-Piece Nail Clipper & Grooming Set',
    nameBn: 'এমারেল্ড গোল্ড লাক্সারি ৩-পিস নেইল ক্লিপার ও গ্রুমিং সেট',
    model: 'MAYA-NAIL-3',
    price: 390,
    regularPrice: 650,
    discountPercent: 40,
    category: 'lifestyle',
    rating: 4.8,
    reviewsCount: 58,
    inStock: true,
    stockCount: 45,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'সুপার ডিল',
    images: [
      '/assets/products/manicure-1.webp'
    ],
    colors: [
      { name: 'Emerald Green & Gold', hex: '#047857', inStock: true }
    ],
    sizes: ['Compact Pocket Box'],
    shortDescBn: 'মেডিক্যাল গ্রেড স্টেইনলেস স্টিল ও প্রিমিয়াম এমারেল্ড পুশ-ওপেন বক্স সহ ৩-পিস নেইল কেয়ার সেট।',
    shortDescEn: 'Pocket luxury 3-piece grooming manicure set with emerald push-lock travel case.',
    specs: {
      'ম্যাটেরিয়াল': 'মেডিক্যাল গ্রেড স্টেইনলেস স্টিল',
      'কেস': 'লাক্সারি পুশ-বাটন এমারেল্ড কেস'
    },
    bulletPointsBn: [
      'পকেটে বা ব্যাগে সহজে বহনযোগ্য।',
      'অত্যন্ত ধারালো ও দীর্ঘস্থায়ী।'
    ]
  }
];
