export const CATEGORIES = [
  { id: 'all', nameBn: 'সকল প্রোডাক্ট', nameEn: 'All Products', icon: 'LayoutGrid' },
  { id: 'audio', nameBn: 'হেডফোন ও ইয়ারবাডস', nameEn: 'Audio & Earbuds', icon: 'Headphones' },
  { id: 'powerbank', nameBn: 'পাওয়ার ব্যাংক', nameEn: 'Power Banks', icon: 'BatteryCharging' },
  { id: 'speakers', nameBn: 'ব্লুটুথ স্পিকার', nameEn: 'Bluetooth Speakers', icon: 'Volume2' },
  { id: 'drones', nameBn: 'স্মার্ট ড্রোন', nameEn: 'Smart Drones', icon: 'Navigation' },
  { id: 'camera', nameBn: 'মিনি ডিজিটাল ক্যামেরা', nameEn: 'Digital Cameras', icon: 'Camera' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'airpods-pro-2',
    name: 'Apple AirPods Pro (2nd Generation) - Master Copy (B Grade)',
    nameBn: 'অ্যাপল এয়ারপডস প্রো ২য় জেনারেশন (বি গ্রেড)',
    model: 'AirPods Pro 2nd Gen',
    price: 899,
    regularPrice: 1450,
    discountPercent: 38,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 45,
    has360View: true,
    featured: true,
    isHotDeal: true,
    badgeText: 'বেস্টসেলার',
    images: [
      '/assets/products/airpods_pro_2_open_case.webp',
      '/assets/products/airpods_pro_2_usbc_port.webp',
      '/assets/products/airpods_pro_2_box_front.webp',
      '/assets/products/airpods_pro_2_box_back.webp',
      '/assets/products/airpods_pro_2_box_barcode.webp',
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', inStock: true },
    ],
    shortDescBn: '100% অ্যাক্টিভ নয়েজ ক্যান্সেলেশন গোল্ড সিল সহ দুবাই ভ্যারিয়েন্ট টাইপ-সি এয়ারপডস প্রো ২।',
    shortDescEn: 'Premium master copy featuring H2 chip, Type-C charging case with speaker & lanyard loop.',
    specs: {
      'চিপসেট (Chipset)': 'Upgraded H2 High Performance Chip',
      'কানেক্টিভিটি (Bluetooth)': 'Bluetooth v5.3 (iOS Pop-up & Android)',
      'চার্জিং পোর্ট': 'Type-C Fast Charging Port',
      'কেস স্পিকার': 'Built-in Case Speaker & Lanyard Loop',
      'ব্যাটারি ব্যাকআপ': 'কেসসহ ২৪+ ঘণ্টা প্লেব্যাক ব্যাকআপ',
      'নয়েজ কন্ট্রোল': 'Active Noise Cancellation Simulation',
      'প্যাকেজ কন্টেন্ট': 'AirPods, Charging Case, Type-C Cable, Extra Ear-tips, Manual',
      'ওয়ারেন্টি': '৩ দিনের চেক ও রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      'অরিজিনাল দুবাই সিরিয়াল বক্স ও গোল্ড সিল প্যাক।',
      'আইফোন ও অ্যান্ড্রয়েড উভয় ফোনেই ইনস্ট্যান্ট কানেক্ট।',
      'টাইপ-সি ফাস্ট চার্জিং সুবিধা ও সাউন্ড স্পিকার কেস।',
      'ডিপ বেস ও ক্রিস্টাল ক্লিয়ার কলিং মাইক।'
    ]
  },
  {
    id: 'mini-flip-camera-lk027',
    name: 'Mini Flip Digital Camera - 180° Rotatable Selfie Screen (LK-027)',
    nameBn: 'মিনি ফ্লিপ ডিজিটাল সেলফি ক্যামেরা (LK-027)',
    model: 'LK-027',
    price: 2199,
    regularPrice: 2850,
    discountPercent: 23,
    category: 'camera',
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    stockCount: 20,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'রেট্রো ভাইরাল',
    images: [
      '/assets/products/mini_flip_digital_camera_lk027.webp',
    ],
    colors: [
      { name: 'Silver Gray', hex: '#94A3B8', inStock: true },
      { name: 'Matte Black', hex: '#0F172A', inStock: true },
      { name: 'Sakura Pink', hex: '#F472B6', inStock: true },
    ],
    shortDescBn: '১৮০ ডিগ্রি রোটেটেবল ফ্লিপ স্ক্রিনসহ রেট্রো স্টাইল মিনি সেলফি ডিজিটাল ক্যামেরা।',
    shortDescEn: 'Compact vintage-style mini digital camera with 180-degree flip screen & 720p HD capture.',
    specs: {
      'মডেল': 'LK-027 Mini Flip Camera',
      'স্ক্রিন': '180° Rotatable Flip Selfie Display',
      'ভিডিও রেজোলিউশন': 'HD 1280x720 Pixel Video & Photo',
      'মেমরি স্লট': 'TF Card Support (Up to 32GB/64GB)',
      'চার্জিং': 'Type-C Fast Rechargeable',
      'ফ্ল্যাশ লাইট': 'Built-in Fill Flash for Night Photography',
      'এক্সেসরিজ': 'Keyring Chain, Type-C Cable, Strap',
      'ওয়ারেন্টি': '৭ দিনের ফুল রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      '১৮০ ডিগ্রি ফ্লিপ স্ক্রিনের মাধ্যমে সহজে সুন্দর সেলফি ও ভ্লগিং করা যায়।',
      'পকেটে বা ব্যাগে কি-রিংয়ের মতো ঝুলিয়ে নেওয়ার সুপার কমপ্যাক্ট সাইজ।',
      'টাইপ-সি রিচার্জেবল ব্যাটারি ও মেমোরি কার্ড স্লট।',
      '৭ দিনের অফিসিয়াল রিপ্লেসমেন্ট গ্যারান্টি।'
    ]
  },
  {
    id: 'zokd-45w-powerbank',
    name: 'ZOKD 45W Super Fast Charging Power Bank (10000mAh)',
    nameBn: 'ZOKD ৪৫ ওয়াট সুপার ফাস্ট চার্জিং পাওয়ার ব্যাংক (১০০০০ এমএএইচ)',
    model: 'ZOKD-45W-10K',
    price: 3999,
    regularPrice: 4800,
    discountPercent: 17,
    category: 'powerbank',
    rating: 5.0,
    reviewsCount: 64,
    inStock: true,
    stockCount: 15,
    has360View: false,
    featured: true,
    isHotDeal: false,
    badgeText: '৪৫W সুপার ফাস্ট',
    images: [
      '/assets/products/zokd_45w_10000mah_powerbank.webp',
    ],
    colors: [
      { name: 'Mint Green', hex: '#34D399', inStock: true },
      { name: 'Carbon Black', hex: '#1E293B', inStock: true },
    ],
    shortDescBn: '৪৫ ওয়াট আল্ট্রা ফাস্ট চার্জিং ও ইন-বিল্ট ৩টি কেবলসহ প্রিমিয়াম ১০,০০০ এমএএইচ পাওয়ার ব্যাংক।',
    shortDescEn: '45W high-speed PD fast charging 10000mAh power bank with built-in multi cables.',
    specs: {
      'আউটপুট পাওয়ার': '45W Super Fast Charge (PD / QC)',
      'ক্যাপাসিটি': '10,000 mAh High Density Lithium Polymer',
      'বিল্ট-ইন কেবল': 'Type-C, iPhone Lightning, Micro-USB',
      'ক্যারিং স্ট্র্যাপ': 'Integrated Heavy-duty Carrying Strap',
      'ডিজাইন': 'Mint Green Luxury Finish',
      'সুরক্ষা': 'Over-charging & Short-circuit Auto Protection',
      'ওয়ারেন্টি': '৭ দিনের চেক ও রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      '৪৫ ওয়াট সুপার ফাস্ট আউটপুট দিয়ে ফোন ও গ্যাজেট দ্রুত চার্জ হয়।',
      'আলাদা কোনো কেবল নেওয়ার প্রয়োজন নেই, ৩টি কেবল ভেতরেই সংযুক্ত।',
      'মডার্ন মিন্ট গ্রিন কালার ও মজবুত ফ্যাব্রিক হ্যান্ডেল স্ট্র্যাপ।',
      'আইফোন ও অ্যান্ড্রয়েড ফ্ল্যাগশিপ ফোনের জন্য আদর্শ।'
    ]
  },
  {
    id: 'hoco-w35-max',
    name: 'HOCO W35 MAX Wireless Bluetooth Headphones (90 Hours Playback)',
    nameBn: 'HOCO W35 MAX ওয়্যারলেস ব্লুটুথ হেডফোন (৯০ ঘণ্টা ব্যাকআপ)',
    model: 'W35 Max',
    price: 1650,
    regularPrice: 2200,
    discountPercent: 25,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 118,
    inStock: true,
    stockCount: 32,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: '৯০ ঘণ্টা ব্যাকআপ',
    images: [
      '/assets/products/hoco_w35_max_headphone_silver.webp',
      '/assets/products/hoco_w35_max_cushions.webp',
      '/assets/products/hoco_w35_max_box_front.webp',
      '/assets/products/hoco_w35_max_box_back.webp',
    ],
    colors: [
      { name: 'Metallic Silver', hex: '#CBD5E1', inStock: true },
      { name: 'Space Gray', hex: '#334155', inStock: true },
    ],
    shortDescBn: 'এক চার্জে একটানা ৯০ ঘণ্টা প্লেব্যাক ব্যাকআপ ও ৪০ মিমি স্পিকারসহ অ্যাপল হেডফোন স্টাইল।',
    shortDescEn: 'Premium metallic over-ear headphones with 90-hour battery life and Bluetooth 5.3.',
    specs: {
      'মডেল': 'HOCO W35 Max Wireless Headphones',
      'ব্যাটারি ব্যাকআপ': 'Unbelievable 90 Hours Playtime on Single Charge',
      'ড্রাইভার সাইজ': '40mm Hi-Fi Large Dynamic Stereo Unit',
      'ব্লুটুথ ভার্সন': 'Bluetooth 5.3 (Low Latency / Gaming)',
      'কানেকশন মোড': 'Bluetooth, 3.5mm AUX Cable, Micro SD / TF Card',
      'চার্জিং পোর্ট': 'Type-C Fast Charging Port',
      'ইয়ার কুশন': 'Ultra Soft Breathable Memory Foam Cushions',
      'ওয়ারেন্টি': '৭ দিনের অফিসিয়াল রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      'এক চার্জেই পুরো মাস চলে যায় (৯০ ঘণ্টার দুর্দান্ত ব্যাকআপ)।',
      'AirPods Max এর মতো মেটালিক প্রিমিয়াম লুক ও সফট কুশন।',
      'ব্লুটুথ ছাড়াও অক্স কেবল বা মেমোরি কার্ড দিয়ে গান শোনার সুবিধা।',
      'কলিং ও গেমিংয়ের জন্য লো-ল্যাটেন্সি হাই-ক্লিয়ার অডিও।'
    ]
  },
  {
    id: 'e88-pro-drone',
    name: 'E88 PRO Dual Camera Foldable Drone with Brushless Motor & 2 Batteries',
    nameBn: 'E88 PRO ডুয়াল ক্যামেরা ফোল্ডিং ড্রোন (ব্রাশলেস মোটর ও ২টি ব্যাটারি)',
    model: 'E88 Pro Brushless',
    price: 5299,
    regularPrice: 6500,
    discountPercent: 18,
    category: 'drones',
    rating: 4.8,
    reviewsCount: 76,
    inStock: true,
    stockCount: 12,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'ডুয়াল ক্যামেরা',
    images: [
      '/assets/products/e88_pro_drone_unfolded_batteries.webp',
      '/assets/products/e88_pro_drone_case_packed.webp',
      '/assets/products/e88_pro_drone_bottom_sensor.webp',
      '/assets/products/e88_pro_drone_box_front.webp',
      '/assets/products/e88_pro_drone_box_side.webp',
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0F172A', inStock: true },
      { name: 'Storm Gray', hex: '#64748B', inStock: true },
    ],
    shortDescBn: 'ব্রাশলেস পাওয়ারফুল মোটর, অপটিক্যাল ফ্লো সেন্সর ও ২টি ব্যাটারিসহ ডুয়াল ক্যামেরা ড্রোন।',
    shortDescEn: 'Foldable dual HD camera drone with brushless motors, optical flow sensor & travel carry case.',
    specs: {
      'মডেল': 'E88 Pro (Brushless Motor Edition)',
      'ক্যামেরা': 'Dual HD Cameras with Bottom Optical Flow Stabilization',
      'মোটর টাইপ': 'High Power Wind-Resistant Brushless Motors',
      'ব্যাটারি': '2 Modular High-Capacity Rechargeable Batteries Included',
      'রিমোট কন্ট্রোল': '2.4GHz Smart Controller with Phone Holder Mount',
      'প্যাকেজ এক্সেসরিজ': 'Hard Zipper Carrying Case, Extra Propellers, Prop Guards, Screwdriver',
      'স্টান্টস': '360-degree Aerial Flips, One-Key Takeoff & Landing',
      'ওয়ারেন্টি': '৭ দিনের চেক ও রিপ্লেসমেন্ট ওয়ারেন্টি'
    },
    bulletPointsBn: [
      'ব্রাশলেস মোটরের কারণে সহজে নষ্ট হয় না এবং বাতাসে স্ট্যাবল ওড়ে।',
      'সামনে ও নিচে ডুয়াল ক্যামেরা দিয়ে উপর থেকে নিচের নিখুঁত ভিউ দেখা যায়।',
      'প্যাকেজে ২টি ব্যাটারি ও ট্রাভেল হার্ড কেস ফ্রি দেওয়া হচ্ছে।',
      'মোবাইল অ্যাপে লাইভ ভিডিও দেখার এফপিভি (FPV) সুবিধা।'
    ]
  },
  {
    id: 'good-cool-d301-powerbank',
    name: 'Good Cool 10000mAh 10W Power Bank with 4 Built-in Cables & Dual LED Torch (D301)',
    nameBn: 'গুড কুল ১০০০০ এমএএইচ পাওয়ার ব্যাংক (৪টি কেবল ও টুইন LED লাইট)',
    model: 'Good Cool D301',
    price: 999,
    regularPrice: 1350,
    discountPercent: 26,
    category: 'powerbank',
    rating: 4.9,
    reviewsCount: 95,
    inStock: true,
    stockCount: 40,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'টুইন টর্চলাইট',
    images: [
      '/assets/products/good_cool_d301_box_front.webp',
      '/assets/products/good_cool_d301_unit_front.webp',
      '/assets/products/good_cool_d301_cables_back.webp',
      '/assets/products/good_cool_d301_led_torch.webp',
    ],
    colors: [
      { name: 'Midnight Black', hex: '#111827', inStock: true },
      { name: 'Deep Purple', hex: '#581C87', inStock: true },
    ],
    shortDescBn: '১০,০০০ এমএএইচ ক্যাপাসিটি, ৪টি ইন-বিল্ট কেবল, ডিজিটাল ডিসপ্লে ও ইমার্জেন্সি টুইন LED টর্চ।',
    shortDescEn: '10000mAh 10W power bank featuring 4 attached charging cables and twin emergency LED flashlights.',
    specs: {
      'মডেল': 'Good Cool D301 Power Bank',
      'ক্যাপাসিটি': '10,000 mAh Li-Polymer Battery',
      'আউটপুট ওয়াট': '10W Smart Fast Output',
      'বিল্ট-ইন কেবলস (৪টি)': 'Type-C, iPhone Lightning, Micro-USB, USB-A',
      'ইমার্জেন্সি লাইট': 'Twin Ultra Bright LED Emergency Flashlights',
      'ডিসপ্লে': 'Digital LED Battery Percentage Indicator',
      'হ্যান্ডেল': 'Attached Premium Yellow Lanyard Strap',
      'ওয়ারেন্টি': '৭ দিনের চেক ও রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      '৪টি ভিন্ন কেবল পাওয়ার ব্যাংকের পেছনেই ফোল্ড করা থাকে, আলাদা কেবল নেওয়ার দরকার নেই।',
      'সামনে পাওয়ারফুল টুইন LED টর্চলাইট, যা লোডশেডিং বা রাতে অত্যন্ত কাজে দেয়।',
      'কত শতাংশ চার্জ বাকি আছে তা স্ক্রিনে স্পষ্টভাবে দেখা যায়।',
      'মাত্র ৯৯৯ টাকায় ১০০০০ এমএএইচ প্রিমিয়াম ভ্যালু ফর মানি গ্যাজেট।'
    ]
  },
  {
    id: 'armour-v8-dual-speaker',
    name: 'Armour Dual Speaker - Loudly Sound Control RGB (Model: V8)',
    nameBn: 'আর্মার ডুয়াল স্পিকার - সাউন্ড কন্ট্রোল আরজিবি (মডেল: V8)',
    model: 'Armour V8',
    price: 1370,
    regularPrice: 1850,
    discountPercent: 26,
    category: 'speakers',
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    stockCount: 25,
    has360View: false,
    featured: true,
    isHotDeal: false,
    badgeText: 'সাইবারপাঙ্ক RGB',
    images: [
      '/assets/products/armour_v8_dual_speaker.webp',
    ],
    colors: [
      { name: 'Mecha White', hex: '#F1F5F9', inStock: true },
      { name: 'Mecha Black', hex: '#1E293B', inStock: true },
    ],
    shortDescBn: '১৩.৬ ওয়াট ডুয়াল স্পিকার, সাইবারপাঙ্ক ট্রান্সপারেন্ট ডিজাইন ও সাউন্ড সেনসিটিভ RGB লাইট।',
    shortDescEn: '13.6W output power dual speaker with sound-reactive RGB rhythm control and transparent mecha chassis.',
    specs: {
      'মডেল': 'Armour V8 Mecha Dual Speaker',
      'আউটপুট সাউন্ড': '13.6W Powerful Dual Speakers with Heavy Bass',
      'আরজিবি লাইটিং': 'Loudly Sound Control Dynamic RGB Rhythm Lights',
      'ব্লুটুথ ভার্সন': 'Bluetooth v5.3 Stable Low-Latency Connection',
      'ব্যাটারি ক্যাপাসিটি': '1800 mAh Rechargeable Li-ion Battery',
      'পাওয়ার ইনপুট': 'DC 5V / 1A Type-C Port',
      'ডিজাইন': 'Transparent Cyberpunk Mecha Aesthetic with Mechanical Gears',
      'ওয়ারেন্টি': '৭ দিনের চেক ও রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      'গানের বিটের সাথে সাথে আরজিবি লাইট নাচে (সাউন্ড কন্ট্রোল্ড)।',
      'ট্রান্সপারেন্ট বডি দিয়ে ভেতরের মেকানিকাল গিয়ার দেখা যায়—অসাধারণ ডেস্ক সেটআপ লুক।',
      '১৩.৬ ওয়াটের লাউড ও ক্রিস্প ডুয়াল স্পিকার স্টেরিও সাউন্ড।',
      '১৮০০ এমএএইচ রিচার্জেবল ব্যাটারিতে দীর্ঘক্ষণ গান শোনার সুবিধা।'
    ]
  },
  {
    id: 'jbl-m3-mini-speaker',
    name: 'JBL M3 Mini Portable Wireless Speaker (Metallic Body)',
    nameBn: 'জেবিএল এম৩ মিনি পোর্টেবল ব্লুটুথ স্পিকার (মেটালিক বডি)',
    model: 'JBL M3',
    price: 435,
    regularPrice: 650,
    discountPercent: 33,
    category: 'speakers',
    rating: 4.7,
    reviewsCount: 184,
    inStock: true,
    stockCount: 60,
    has360View: false,
    featured: false,
    isHotDeal: true,
    badgeText: 'হট বাজেট ডিল',
    images: [
      '/assets/products/jbl_m3_mini_speaker.webp',
    ],
    colors: [
      { name: 'Ocean Blue', hex: '#0284C7', inStock: true },
      { name: 'Flame Red', hex: '#DC2626', inStock: true },
      { name: 'Jet Black', hex: '#0F172A', inStock: true },
      { name: 'Chrome Silver', hex: '#CBD5E1', inStock: true },
    ],
    shortDescBn: 'সলিড মেটালিক অ্যালয় বডি, পকেট-ফ্রেন্ডলি সাইজ ও ক্রিস্প লাউড অডিও সহ মিনি ব্লুটুথ স্পিকার।',
    shortDescEn: 'Ultra-compact metallic pocket Bluetooth speaker with 3-4 hours playtime and 3W/4W output.',
    specs: {
      'মডেল': 'JBL M3 Mini Portable',
      'আউটপুট পাওয়ার': '3W / 4W Super Crisp Sound',
      'ব্যাটারি ক্যাপাসিটি': '450 mAh Built-in Rechargeable Battery',
      'প্লে-টাইম': 'Up to 3 - 4 Hours Continuous Playtime',
      'ব্লুটুথ ভার্সন': 'Bluetooth Compliance v5.0 (10 Meter Range)',
      'বডি ম্যাটেরিয়াল': 'Strong Heavy Metallic Alloy Body',
      'সাইজ ও ওজন': 'Pocket-Friendly, Ultra Lightweight',
      'ওয়ারেন্টি': '৩ দিনের চেক ও রিপ্লেসমেন্ট গ্যারান্টি'
    },
    bulletPointsBn: [
      'হাতের তালুর সমান ছোট সাইজ হলেও আশ্চর্যজনক লাউড ও ক্লিয়ার সাউন্ড।',
      'মজবুত মেটালিক বডি—সহজে নষ্ট হয় না।',
      'ব্লু, রেড, ব্ল্যাক ও সিলভার ৪টি আকর্ষণীয় রঙে পাওয়া যাচ্ছে।',
      'মাত্র ৪৩৫ টাকায় সেরা পকেট স্পিকার।'
    ]
  },
  // Additional 8 Catalog Variations to achieve 16+ Products
  {
    id: 'airpods-pro-2-gold-seal',
    name: 'Apple AirPods Pro 2nd Gen (Active Noise Cancellation Edition)',
    nameBn: 'অ্যাপল এয়ারপডস প্রো ২য় জেন - এএনসি স্পেশাল সিল প্যাক',
    model: 'AirPods Pro ANC Gold',
    price: 999,
    regularPrice: 1650,
    discountPercent: 39,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 160,
    inStock: true,
    stockCount: 30,
    has360View: true,
    featured: true,
    isHotDeal: true,
    badgeText: 'প্রিমিয়াম সাউন্ড',
    images: [
      '/assets/products/airpods_pro_2_box_front.webp',
      '/assets/products/airpods_pro_2_open_case.webp',
      '/assets/products/airpods_pro_2_usbc_port.webp',
      '/assets/products/airpods_pro_2_box_back.webp',
      '/assets/products/airpods_pro_2_box_barcode.webp',
    ],
    colors: [
      { name: 'Pure White', hex: '#FFFFFF', inStock: true }
    ],
    shortDescBn: 'দুবাই ভার্সন গোল্ড সিল প্যাক, H2 চিপ ও টাইপ-সি ফাস্ট চার্জিং সুবিধা।',
    shortDescEn: 'Enhanced master copy with golden ANC seal, H2 audio fidelity and Type-C cable.',
    specs: {
      'চিপসেট': 'H2 High Fidelity Chip',
      'চার্জিং পোর্ট': 'Type-C',
      'ব্যাটারি লাইফ': '২৪+ ঘণ্টা ব্যাকআপ'
    },
    bulletPointsBn: [
      'গোল্ড সিল প্রটেকশন প্যাক।',
      'আইফোন ও অ্যান্ড্রয়েড সম্পূর্ণ সাপোর্টেড।'
    ]
  },
  {
    id: 'e88-pro-combo-drone',
    name: 'E88 PRO Foldable Drone (Triple Battery Mega Combo Pack)',
    nameBn: 'E88 PRO ফোল্ডেবল ড্রোন (৩টি ব্যাটারি মেগা কম্বো প্যাক)',
    model: 'E88 Pro Combo',
    price: 5699,
    regularPrice: 7200,
    discountPercent: 21,
    category: 'drones',
    rating: 4.9,
    reviewsCount: 48,
    inStock: true,
    stockCount: 8,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: 'মেগা কম্বো',
    images: [
      '/assets/products/e88_pro_drone_case_packed.webp',
      '/assets/products/e88_pro_drone_unfolded_batteries.webp',
      '/assets/products/e88_pro_drone_bottom_sensor.webp',
      '/assets/products/e88_pro_drone_box_front.webp',
    ],
    colors: [
      { name: 'Stealth Black', hex: '#0F172A', inStock: true },
      { name: 'Storm Gray', hex: '#64748B', inStock: true }
    ],
    shortDescBn: 'হার্ড ট্রাভেল কেস, এক্সট্রা প্রপেলার ও অতিরিক্ত ব্যাটারিসহ ফুল কম্বো প্যাক।',
    shortDescEn: 'Full package with travel case, extra blades, and maximum flight duration batteries.',
    specs: {
      'ক্যামেরা': 'Dual HD Cameras with Optical Flow',
      'মোটর': 'Brushless Wind-Resistant Motors'
    },
    bulletPointsBn: [
      '৩টি ব্যাটারিতে দীর্ঘক্ষণ ওড়ানো যায়।',
      'ট্রাভেল কেসে সহজে বহনযোগ্য।'
    ]
  },
  {
    id: 'hoco-w35-max-spacegray',
    name: 'HOCO W35 MAX Studio Edition (Space Gray Matte)',
    nameBn: 'HOCO W35 MAX স্টুডিও হেডফোন (স্পেস গ্রে ম্যাট ফিনিশ)',
    model: 'W35 Max Gray',
    price: 1650,
    regularPrice: 2200,
    discountPercent: 25,
    category: 'audio',
    rating: 4.8,
    reviewsCount: 72,
    inStock: true,
    stockCount: 25,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'স্টুডিও সাউন্ড',
    images: [
      '/assets/products/hoco_w35_max_cushions.webp',
      '/assets/products/hoco_w35_max_headphone_silver.webp',
      '/assets/products/hoco_w35_max_box_front.webp',
    ],
    colors: [
      { name: 'Space Gray', hex: '#334155', inStock: true },
      { name: 'Metallic Silver', hex: '#CBD5E1', inStock: true }
    ],
    shortDescBn: 'ম্যাট স্পেস গ্রে কালার ও ৯০ ঘণ্টার ব্যাটারি ব্যাকআপসহ মেটালিক হেডফোন।',
    shortDescEn: 'Matte space gray edition featuring 90h battery life and 40mm Hi-Fi sound drivers.',
    specs: {
      'ব্যাটারি': '90 Hours Long Playtime',
      'ড্রাইভার': '40mm Dynamic Hi-Fi Speaker'
    },
    bulletPointsBn: [
      'সুপার সফট মেমোরি ফোম কুশন।',
      'এক চার্জেই মাসব্যাপী গান শোনা।'
    ]
  },
  {
    id: 'good-cool-d301-purple',
    name: 'Good Cool 10000mAh Power Bank (Deep Royal Purple Edition)',
    nameBn: 'গুড কুল ১০০০০ এমএএইচ পাওয়ার ব্যাংক (রয়্যাল পার্পল এডিশন)',
    model: 'D301-Purple',
    price: 999,
    regularPrice: 1350,
    discountPercent: 26,
    category: 'powerbank',
    rating: 4.8,
    reviewsCount: 63,
    inStock: true,
    stockCount: 35,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'রয়্যাল কালার',
    images: [
      '/assets/products/good_cool_d301_unit_front.webp',
      '/assets/products/good_cool_d301_led_torch.webp',
      '/assets/products/good_cool_d301_cables_back.webp',
    ],
    colors: [
      { name: 'Royal Purple', hex: '#581C87', inStock: true },
      { name: 'Midnight Black', hex: '#111827', inStock: true }
    ],
    shortDescBn: 'রয়্যাল পার্পল ফিনিশ, ৪টি কেবল ভেতরেই সংযুক্ত ও পাওয়ারফুল টুইন টর্চলাইট।',
    shortDescEn: 'Royal purple compact 10000mAh power bank with 4 integrated cables and twin flashlights.',
    specs: {
      'ক্যাপাসিটি': '10,000 mAh',
      'কেবলস': 'Type-C, Lightning, Micro, USB-A'
    },
    bulletPointsBn: [
      'কোনো আলাদা কেবল নেওয়ার ঝামেলা নেই।',
      'ডিজিটাল ডিসপ্লেতে অবশিষ্ট চার্জ দেখা যায়।'
    ]
  },
  {
    id: 'jbl-m3-duo-pack',
    name: 'JBL M3 Mini Portable Speaker (Stereo Twin Duo Pack)',
    nameBn: 'জেবিএল এম৩ মিনি পোর্টেবল স্পিকার (ডুও টুইন প্যাক)',
    model: 'JBL M3 Duo',
    price: 820,
    regularPrice: 1300,
    discountPercent: 37,
    category: 'speakers',
    rating: 4.9,
    reviewsCount: 94,
    inStock: true,
    stockCount: 40,
    has360View: false,
    featured: true,
    isHotDeal: true,
    badgeText: '২টি স্পিকার কম্বো',
    images: [
      '/assets/products/jbl_m3_mini_speaker.webp',
    ],
    colors: [
      { name: 'Flame Red', hex: '#DC2626', inStock: true },
      { name: 'Ocean Blue', hex: '#0284C7', inStock: true },
      { name: 'Jet Black', hex: '#0F172A', inStock: true }
    ],
    shortDescBn: 'একসাথে ২টি মেটালিক মিনি স্পিকার কম্বো প্যাক। দুর্দান্ত স্টেরিও মিউজিক অভিজ্ঞতা।',
    shortDescEn: 'Twin pack compact metallic bluetooth speakers for immersive stereo sound.',
    specs: {
      'বডি': 'Heavy Metal Alloy Body',
      'আউটপুট': '3W + 3W Stereo Output'
    },
    bulletPointsBn: [
      '২টি স্পিকার একসাথে সেরা সাউন্ড দেয়।',
      'পকেটে নিয়ে ঘোরার মতো কমপ্যাক্ট।'
    ]
  },
  {
    id: 'armour-v8-white-mecha',
    name: 'Armour Dual Speaker V8 (Cyberpunk Mecha White Edition)',
    nameBn: 'আর্মার ডুয়াল স্পিকার V8 (সাইবারপাঙ্ক মেচা হোয়াইট)',
    model: 'Armour V8 White',
    price: 1370,
    regularPrice: 1850,
    discountPercent: 26,
    category: 'speakers',
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 18,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'মেচা হোয়াইট',
    images: [
      '/assets/products/armour_v8_dual_speaker.webp',
    ],
    colors: [
      { name: 'Mecha White', hex: '#F1F5F9', inStock: true },
      { name: 'Mecha Black', hex: '#1E293B', inStock: true }
    ],
    shortDescBn: 'সাদা সাইবারপাঙ্ক মেচা ফ্রেম ও ডায়নামিক আরজিবি রিদম লাইটিং সাউন্ড কন্ট্রোল।',
    shortDescEn: 'Futuristic mecha white dual speaker with sound-reactive RGB equalizer lighting.',
    specs: {
      'আউটপুট': '13.6W Dual Speakers',
      'ব্যাটারি': '1800 mAh Li-ion'
    },
    bulletPointsBn: [
      'ডেস্কটপ ও গেমিং সেটআপের জন্য পারফেক্ট।',
      'সাউন্ড কন্ট্রোল্ড আরজিবি লাইট শো।'
    ]
  },
  {
    id: 'mini-flip-camera-silver',
    name: 'Mini Flip Digital Camera (Vintage Classic Silver Gray Edition)',
    nameBn: 'মিনি ফ্লিপ ডিজিটাল সেলফি ক্যামেরা (ক্লাসিক সিলভার এডিশন)',
    model: 'LK-027-Silver',
    price: 2199,
    regularPrice: 2850,
    discountPercent: 23,
    category: 'camera',
    rating: 4.8,
    reviewsCount: 42,
    inStock: true,
    stockCount: 15,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'ক্লাসিক সিলভার',
    images: [
      '/assets/products/mini_flip_digital_camera_lk027.webp',
    ],
    colors: [
      { name: 'Classic Silver', hex: '#94A3B8', inStock: true }
    ],
    shortDescBn: 'ক্লাসিক সিলভার ফিনিশ ও ১৮০ ডিগ্রি রোটেটিং সেলফি স্ক্রিনসহ রেট্রো ক্যামেরা।',
    shortDescEn: 'Classic silver vintage flip camera with 720p HD sensor and keychain strap.',
    specs: {
      'স্ক্রিন': '180° Flip Screen',
      'মেমরি': 'TF Card Support'
    },
    bulletPointsBn: [
      '১৮০ ডিগ্রি ফ্লিপ সেলফি স্ক্রিন।',
      '৭ দিনের ফুল রিপ্লেসমেন্ট গ্যারান্টি।'
    ]
  },
  {
    id: 'zokd-45w-carbon-black',
    name: 'ZOKD 45W Fast Charging Power Bank (Carbon Matte Black)',
    nameBn: 'ZOKD ৪৫ ওয়াট সুপার ফাস্ট পাওয়ার ব্যাংক (কার্বন ম্যাট ব্ল্যাক)',
    model: 'ZOKD-45W-Black',
    price: 3999,
    regularPrice: 4800,
    discountPercent: 17,
    category: 'powerbank',
    rating: 5.0,
    reviewsCount: 29,
    inStock: true,
    stockCount: 14,
    has360View: false,
    featured: false,
    isHotDeal: false,
    badgeText: 'কার্বন ব্ল্যাক',
    images: [
      '/assets/products/zokd_45w_10000mah_powerbank.webp',
    ],
    colors: [
      { name: 'Carbon Black', hex: '#1E293B', inStock: true },
      { name: 'Mint Green', hex: '#34D399', inStock: true }
    ],
    shortDescBn: 'স্লিক কার্বন ব্ল্যাক ফিনিশ, ৪৫ ওয়াট আউটপুট ও ইন-বিল্ট ৩টি কেবলসহ পাওয়ার ব্যাংক।',
    shortDescEn: 'Stealth carbon black 45W fast power bank with multi-charging cables built-in.',
    specs: {
      'পাওয়ার': '45W Fast PD/QC',
      'ক্যাপাসিটি': '10,000 mAh'
    },
    bulletPointsBn: [
      '৪৫ ওয়াট আল্ট্রা ফাস্ট চার্জিং।',
      '৩টি কেবল বডির ভেতরেই সংযুক্ত।'
    ]
  }
];
