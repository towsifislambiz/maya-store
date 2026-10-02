import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  bn: {
    // Header & Announcement
    cod_announcement: 'সারা বাংলাদেশে ফাস্ট ক্যাশ অন ডেলিভারি',
    replacement_guarantee: '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি',
    admin_panel: 'অ্যাডমিন প্যানেল',
    store_tagline: 'প্রিমিয়াম গ্যাজেট ও ইলেকট্রনিক্স স্টোর',
    search_placeholder: 'প্রডাক্টের নাম, মডেল বা স্পেসিফিকেশন দিয়ে খুঁজুন...',
    search_results_title: 'অনুসন্ধান ফলাফল',
    search_results_count: 'টি প্রডাক্ট পাওয়া গেছে',
    click_for_details: 'ক্লিক করে ডিটেইলস দেখুন',
    search_no_results: 'কোনো প্রডাক্ট পাওয়া যায়নি',
    search_not_found_desc: 'দয়া করে সঠিক নাম বা মডেল লিখে আবার চেষ্টা করুন।',
    shop_link: 'শপিং',
    wishlist_title: 'উইশলিস্ট',
    cart_title: 'শপিং ব্যাগ',
    cart_btn: 'কার্ট',

    // Trust Badges & Benefits
    trust_cod_title: 'সারা দেশে ক্যাশ অন ডেলিভারি',
    trust_cod_desc: 'পণ্য হাতে পেয়ে টাকা দিন',
    trust_original_title: '১০০% অরিজিনাল গ্যাজেট',
    trust_original_desc: 'যাচাইকৃত প্রিমিয়াম কোয়ালিটি',
    trust_replacement_title: '৭ দিনের রিপ্লেসমেন্ট',
    trust_replacement_desc: 'কোনো ত্রুটিতে সহজ এক্সচেঞ্জ',
    trust_support_title: '২৪/৭ লাইভ সাপোর্ট',
    trust_support_desc: 'হোয়াটসঅ্যাপে সরাসরি চ্যাট',

    // Buttons & Actions
    order_now: 'সরাসরি অর্ডার করুন',
    buy_now: 'অর্ডার করুন',
    add_to_cart: 'কার্টে যোগ করুন',
    proceed_to_checkout: 'চেকআউট করুন',
    view_details: 'বিস্তারিত',
    in_stock: 'ইন স্টক',
    stock_out: 'স্টক আউট',
    items_left: 'টি বাকি',
    special_discount: 'ছাড়',
    bestseller: 'বেস্টসেলার',
    top_rated: 'টপ রেটেড',
    offer_price: 'বর্তমান অফার মূল্য',
    regular_price: 'রেগুলার মূল্য',
    you_save: 'আপনার সাশ্রয়',
    save_short: 'সাশ্রয়',
    quantity: 'পরিমাণ',
    color_variant: 'কালার ভ্যারিয়েন্ট সিলেক্ট করুন',
    selected_color: 'নির্বাচিত',
    hot_deal: 'হট ডিল',
    flagship_offer: 'ফ্ল্যাগশিপ অফার',
    stock_limited_order_fast: 'স্টক সীমিত • দ্রুত অর্ডার করুন',
    colors_count: 'কালার',

    // Product Details Tabs & Bullets
    key_features: 'প্রধান বৈশিষ্ট্যসমূহ:',
    specifications: 'টেকনিক্যাল স্পেসিফিকেশন (Specifications)',
    customer_reviews: 'কাস্টমার রিভিউ',
    verified_reviews: 'টি ভেরিফাইড রিভিউ',
    verified_reviews_title: '১০০% ভেরিফাইড কাস্টমার রিভিউ',
    verified_reviews_subtitle: 'Galaxy Gadgets থেকে কেনা আসল কাস্টমারদের মতামত',
    model: 'মডেল',
    no_specs_available: 'এই প্রোডাক্টের জন্য কোনো অতিরিক্ত স্পেসিফিকেশন যুক্ত করা হয়নি।',
    related_products: 'সম্পর্কিত অন্যান্য গ্যাজেট',
    product_not_found: 'প্রডাক্ট খুঁজে পাওয়া যায়নি',
    back_to_home: 'হোমপেজে ফিরে যান',
    back_to_shop: 'শপিংয়ে ফিরে যান',
    fast_home_delivery: 'ফাস্ট হোম ডেলিভারি',
    nationwide_delivery: 'সারা বাংলাদেশে',
    if_any_issue: 'কোনো সমস্যা হলে',
    pay_after_checking: 'পণ্য দেখে পেমেন্ট',

    // Home Page Sections
    categories_title: 'ক্যাটাগরি সমূহ',
    categories_subtitle: 'আপনার প্রয়োজনীয় গ্যাজেট বেছে নিন',
    total_categories_prefix: 'মোট',
    total_categories_suffix: 'টি ক্যাটাগরি',
    premium_gadget_collection: 'প্রিমিয়াম গ্যাজেট কালেকশন',
    all_trending_gadgets: 'সকল ট্রেন্ডিং গ্যাজেট',
    category_products: 'ক্যাটাগরি প্রডাক্টসমূহ',
    showing_prefix: 'প্রদর্শিত হচ্ছে',
    of_total_prefix: '/ মোট',
    products_unit: 'টি প্রডাক্ট',
    view_all: 'সব দেখুন',
    see_more: 'See More (+৪টি প্রডাক্ট)',
    less_product: 'Less Product (-৪টি প্রডাক্ট)',

    // Direct Helpline CTA
    help_tag: 'সহায়তা বা অর্ডার করতে সমস্যা হচ্ছে?',
    help_title: 'আমাদের টিম আপনাকে সরাসরি সাহায্য করতে প্রস্তুত!',
    help_desc: 'সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে আপনার নাম, ঠিকানা ও পছন্দের পণ্যের নাম লিখে মেসেজ দিন।',
    whatsapp_chat_btn: 'হোয়াটসঅ্যাপে মেসেজ',

    // Cart Drawer
    your_cart: 'আপনার শপিং কার্ট',
    cart_empty: 'আপনার কার্ট খালি!',
    cart_empty_sub: 'পছন্দের গ্যাজেট কার্টে যোগ করুন।',
    continue_shopping: 'শপিং চালিয়ে যান',
    delivery_area: 'ডেলিভারি এরিয়া:',
    inside_dhaka_opt: 'ঢাকা সিটির ভিতরে',
    outside_dhaka_opt: 'ঢাকার বাইরে',
    cart_subtotal: 'সাবটোটাল:',
    delivery_charge: 'ডেলিভারি চার্জ:',
    grand_total: 'সর্বমোট:',
    safe_checkout_text: 'ক্যাশ অন ডেলিভারি | ১০০% নিরাপদ চেকআউট',

    // Checkout Page
    checkout_tag: 'সহজ ১-পেজ চেকআউট',
    checkout_heading: 'ডেলিভারি তথ্য ও পেমেন্ট',
    full_name: 'আপনার নাম *',
    full_name_placeholder: 'যেমন: তানভীর আহমেদ',
    phone_number: 'মোবাইল নাম্বার *',
    phone_number_placeholder: 'যেমন: 017XXXXXXXX',
    full_address: 'সম্পূর্ণ ঠিকানা *',
    full_address_placeholder: 'বাসা নং, রোড নং, এলাকা ও জেলার নাম',
    delivery_zone_label: 'ডেলিভারি এলাকা *',
    dhaka_city_inside: 'ঢাকা সিটি (ভিতরে)',
    dhaka_delivery_time: '২৪-৪৮ ঘণ্টার মধ্যে',
    outside_dhaka_title: 'ঢাকার বাইরে (সমগ্র বাংলাদেশ)',
    outside_delivery_time: '২-৩ কার্যদিবসের মধ্যে',
    confirm_order_btn: 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)',

    // Mobile Dock
    dock_home: 'হোম',
    dock_shop: 'শপিং',
    dock_wishlist: 'পছন্দ',
    dock_whatsapp: 'হোয়াটসঅ্যাপ',
    dock_cart: 'কার্ট',
    dock_admin: 'অ্যাডমিন',

    // Footer
    footer_about: 'Galaxy Gadgets – আপনার বিশ্বস্ত গ্যাজেট ডেস্টিনেশন। ১০০% প্রিমিয়াম কোয়ালিটি গ্যাজেট, দ্রুত ক্যাশ অন ডেলিভারি এবং নির্ভরযোগ্য আফটার সেলস সাপোর্ট।',
    verified_shop: '✓ ভেরিফাইড শপ',
    quick_links: 'প্রয়োজনীয় লিংক',
    customer_care: 'গ্রাহক সেবা ও নীতি',
    contact_support: 'যোগাযোগ ও সাপোর্ট',
    emergency_hotline: 'জরুরি হটলাইন',
    all_rights_reserved: 'সর্বস্বত্ব সংরক্ষিত।',
  },
  en: {
    // Header & Announcement
    cod_announcement: 'Fast Cash on Delivery Across Bangladesh',
    replacement_guarantee: '7-Day Replacement Guarantee',
    admin_panel: 'Admin Panel',
    store_tagline: 'Premium Gadgets & Electronics Store',
    search_placeholder: 'Search products by name, model or specs...',
    search_results_title: 'Search Results',
    search_results_count: 'products found',
    click_for_details: 'Click to view product details',
    search_no_results: 'No products found',
    search_not_found_desc: 'Please check your spelling or search by model name.',
    shop_link: 'Shop',
    wishlist_title: 'Wishlist',
    cart_title: 'Shopping Bag',
    cart_btn: 'Cart',

    // Trust Badges & Benefits
    trust_cod_title: 'Nationwide Cash on Delivery',
    trust_cod_desc: 'Pay after receiving product',
    trust_original_title: '100% Genuine Gadgets',
    trust_original_desc: 'Verified premium quality',
    trust_replacement_title: '7-Day Replacement',
    trust_replacement_desc: 'Easy return & exchange',
    trust_support_title: '24/7 Live Support',
    trust_support_desc: 'Instant WhatsApp chat',

    // Buttons & Actions
    order_now: 'Direct Order Now',
    buy_now: 'Order Now',
    add_to_cart: 'Add to Cart',
    proceed_to_checkout: 'Proceed to Checkout',
    view_details: 'View Details',
    in_stock: 'In Stock',
    stock_out: 'Out of Stock',
    items_left: 'left in stock',
    special_discount: 'OFF',
    bestseller: 'Bestseller',
    top_rated: 'Top Rated',
    offer_price: 'Special Offer Price',
    regular_price: 'Regular Price',
    you_save: 'You Save',
    save_short: 'Save',
    quantity: 'Quantity',
    color_variant: 'Select Color Variant',
    selected_color: 'Selected',
    hot_deal: 'Hot Deal',
    flagship_offer: 'Flagship Offer',
    stock_limited_order_fast: 'Limited Stock • Order Fast',
    colors_count: 'Colors',

    // Product Details Tabs & Bullets
    key_features: 'Key Features:',
    specifications: 'Technical Specifications',
    customer_reviews: 'Customer Reviews',
    verified_reviews: 'Verified Reviews',
    verified_reviews_title: '100% Verified Customer Reviews',
    verified_reviews_subtitle: 'Authentic reviews from verified Galaxy Gadgets customers',
    model: 'Model',
    no_specs_available: 'No additional specifications listed for this product.',
    related_products: 'Related Gadgets You May Like',
    product_not_found: 'Product Not Found',
    back_to_home: 'Return to Home',
    back_to_shop: 'Back to Shop',
    fast_home_delivery: 'Fast Home Delivery',
    nationwide_delivery: 'Across Bangladesh',
    if_any_issue: 'On Any Defect',
    pay_after_checking: 'Pay After Checking',

    // Home Page Sections
    categories_title: 'Categories',
    categories_subtitle: 'Choose your desired gadgets',
    total_categories_prefix: 'Total',
    total_categories_suffix: 'Categories',
    premium_gadget_collection: 'Premium Gadget Collection',
    all_trending_gadgets: 'All Trending Gadgets',
    category_products: 'Category Products',
    showing_prefix: 'Showing',
    of_total_prefix: '/ Total',
    products_unit: 'products',
    view_all: 'View All',
    see_more: 'See More (+4 Products)',
    less_product: 'Less Products (-4 Products)',

    // Direct Helpline CTA
    help_tag: 'Need assistance or having trouble ordering?',
    help_title: 'Our dedicated team is ready to help you!',
    help_desc: 'Call us directly or message on WhatsApp with your name, address, and product name.',
    whatsapp_chat_btn: 'Chat on WhatsApp',

    // Cart Drawer
    your_cart: 'Your Shopping Cart',
    cart_empty: 'Your cart is empty!',
    cart_empty_sub: 'Add your favorite gadgets to cart.',
    continue_shopping: 'Continue Shopping',
    delivery_area: 'Delivery Area:',
    inside_dhaka_opt: 'Inside Dhaka City',
    outside_dhaka_opt: 'Outside Dhaka',
    cart_subtotal: 'Subtotal:',
    delivery_charge: 'Delivery Fee:',
    grand_total: 'Grand Total:',
    safe_checkout_text: 'Cash on Delivery | 100% Secure Checkout',

    // Checkout Page
    checkout_tag: 'Easy 1-Page Checkout',
    checkout_heading: 'Delivery Information & Payment',
    full_name: 'Full Name *',
    full_name_placeholder: 'e.g. Tanvir Ahmed',
    phone_number: 'Phone Number *',
    phone_number_placeholder: 'e.g. 017XXXXXXXX',
    full_address: 'Full Delivery Address *',
    full_address_placeholder: 'House no, Road no, Area and District',
    delivery_zone_label: 'Delivery Zone *',
    dhaka_city_inside: 'Dhaka City (Inside)',
    dhaka_delivery_time: 'Within 24-48 hours',
    outside_dhaka_title: 'Outside Dhaka (All Bangladesh)',
    outside_delivery_time: 'Within 2-3 working days',
    confirm_order_btn: 'Confirm Order (Cash on Delivery)',

    // Mobile Dock
    dock_home: 'Home',
    dock_shop: 'Shop',
    dock_wishlist: 'Wishlist',
    dock_whatsapp: 'WhatsApp',
    dock_cart: 'Cart',
    dock_admin: 'Admin',

    // Footer
    footer_about: 'Galaxy Gadgets – Your trusted gadget destination. 100% premium quality gadgets, fast nationwide cash on delivery, and dedicated customer support.',
    verified_shop: '✓ Verified Shop',
    quick_links: 'Quick Links',
    customer_care: 'Customer Care & Policy',
    contact_support: 'Contact & Support',
    emergency_hotline: 'Emergency Hotline',
    all_rights_reserved: 'All rights reserved.',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('galaxy_lang');
      if (saved === 'en' || saved === 'bn') return saved;
    } catch {}
    return 'bn'; // Default to Bengali
  });

  useEffect(() => {
    try {
      localStorage.setItem('galaxy_lang', lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.bn[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
