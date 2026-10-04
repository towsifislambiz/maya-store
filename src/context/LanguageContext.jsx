import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  bn: {
    // Header & Announcement
    cod_announcement: 'নওগাঁ সদর ও সারা বাংলাদেশে ফাস্ট ক্যাশ অন ডেলিভারি',
    replacement_guarantee: '১০০% কোয়ালিটি গ্যারান্টি ও সহজ রিটার্ন',
    admin_panel: 'অ্যাডমিন প্যানেল',
    store_tagline: 'নওগাঁর বিশ্বস্ত লাইফস্টাইল ও এক্সক্লুসিভ ফ্যাশন শপ',
    search_placeholder: 'বেডিং সেট, কাপল ড্রেস, হ্যাম্পার বা পণ্যের নাম দিয়ে খুঁজুন...',
    search_results_title: 'অনুসন্ধান ফলাফল',
    search_results_count: 'টি পণ্য পাওয়া গেছে',
    click_for_details: 'ক্লিক করে ডিটেইলস দেখুন',
    search_no_results: 'কোনো পণ্য পাওয়া যায়নি',
    search_not_found_desc: 'দয়া করে সঠিক নাম বা ক্যাটাগরি লিখে আবার চেষ্টা করুন।',
    shop_link: 'শপ কালেকশন',
    wishlist_title: 'উইশলিস্ট',
    cart_title: 'শপিং ব্যাগ',
    cart_btn: 'কার্ট',

    // Trust Badges & Benefits
    trust_cod_title: 'সারা দেশে ক্যাশ অন ডেলিভারি',
    trust_cod_desc: 'পণ্য হাতে পেয়ে টাকা দিন',
    trust_original_title: '১০০% কোয়ালিটি গ্যারান্টি',
    trust_original_desc: 'যাচাইকৃত প্রিমিয়াম ফেব্রিক ও ম্যাটেরিয়াল',
    trust_replacement_title: 'সহজ রিটার্ন সুবিধা',
    trust_replacement_desc: 'কোনো ত্রুটিতে সহজ এক্সচেঞ্জ',
    trust_return_easy: 'সহজ রিটার্ন ও পরিবর্তন',
    trust_authentic_title: '১০০% জেনুইন কালেকশন',
    trust_checked_delivery: 'চেক করে ডেলিভারি',
    trust_support_title: '২৪/৭ লাইভ সাপোর্ট',
    trust_support_desc: 'হোয়াটসঅ্যাপে সরাসরি চ্যাট (01814741111)',

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
    color_variant: 'কালার বা সাইজ ভ্যারিয়েন্ট সিলেক্ট করুন',
    selected_color: 'নির্বাচিত',
    hot_deal: 'হট ডিল',
    flagship_offer: 'এক্সক্লুসিভ অফার',
    stock_limited_order_fast: 'স্টক সীমিত • দ্রুত অর্ডার করুন',
    colors_count: 'কালার',

    // Product Details Tabs & Bullets
    key_features: 'প্রধান বৈশিষ্ট্যসমূহ:',
    specifications: 'পণ্যের বিবরণ ও স্পেসিফিকেশন',
    customer_reviews: 'কাস্টমার রিভিউ',
    verified_reviews: 'টি ভেরিফাইড রিভিউ',
    verified_reviews_title: '১০০% ভেরিফাইড কাস্টমার রিভিউ',
    verified_reviews_subtitle: 'Maya Shopping Mall থেকে কেনা সন্তুষ্ট গ্রাহকদের মতামত',
    model: 'কোড',
    no_specs_available: 'এই প্রোডাক্টের জন্য কোনো অতিরিক্ত স্পেসিফিকেশন যুক্ত করা হয়নি।',
    related_products: 'সম্পর্কিত অন্যান্য কালেকশন',
    product_not_found: 'পণ্যটি খুঁজে পাওয়া যায়নি',
    back_to_home: 'হোমপেজে ফিরে যান',
    back_to_shop: 'শপিংয়ে ফিরে যান',
    fast_home_delivery: 'ফাস্ট হোম ডেলিভারি',
    nationwide_delivery: 'নওগাঁ ও সারাদেশে',
    if_any_issue: 'কোনো সমস্যা হলে',
    pay_after_checking: 'পণ্য দেখে পেমেন্ট',

    // Home Page Sections
    categories_title: 'ক্যাটাগরি সমূহ',
    categories_subtitle: 'আপনার পছন্দের ফ্যাশন ও লাইফস্টাইল কালেকশন বেছে নিন',
    total_categories_prefix: 'মোট',
    total_categories_suffix: 'টি ক্যাটাগরি',
    premium_lifestyle_collection: 'এক্সক্লুসিভ লাইফস্টাইল কালেকশন',
    all_trending_products: 'সকল ট্রেন্ডিং কালেকশন',
    category_products: 'ক্যাটাগরি পণ্যসমূহ',
    showing_prefix: 'প্রদর্শিত হচ্ছে',
    of_total_prefix: '/ মোট',
    products_unit: 'টি পণ্য',
    view_all: 'সব দেখুন',
    see_more: 'See More (+৪টি পণ্য)',
    less_product: 'Less Product (-৪টি পণ্য)',

    // Direct Helpline CTA
    help_tag: 'সহায়তা বা অর্ডার করতে সমস্যা হচ্ছে?',
    help_title: 'আমাদের টিম আপনাকে সরাসরি সাহায্য করতে প্রস্তুত!',
    help_desc: 'সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে আপনার নাম, ঠিকানা ও পছন্দের পণ্যের ছবি/নাম লিখে মেসেজ দিন।',
    whatsapp_chat_btn: 'হোয়াটসঅ্যাপে মেসেজ (01814741111)',

    // Cart Drawer
    your_cart: 'আপনার শপিং কার্ট',
    cart_empty: 'আপনার কার্ট খালি!',
    cart_empty_sub: 'পছন্দের পণ্য কার্টে যোগ করুন।',
    continue_shopping: 'শপিং চালিয়ে যান',
    delivery_area: 'ডেলিভারি এরিয়া:',
    inside_dhaka_opt: 'নওগাঁ সদর (ভিতরে)',
    outside_dhaka_opt: 'নওগাঁর বাইরে (সমগ্র বাংলাদেশ)',
    cart_subtotal: 'সাবটোটাল:',
    delivery_charge: 'ডেলিভারি চার্জ:',
    grand_total: 'সর্বমোট:',
    safe_checkout_text: 'ক্যাশ অন ডেলিভারি | ১০০% নিরাপদ চেকআউট',

    // Checkout Page
    checkout_tag: 'সহজ ১-পেজ চেকআউট',
    checkout_heading: 'ডেলিভারি তথ্য ও পেমেন্ট',
    full_name: 'আপনার নাম *',
    full_name_placeholder: 'যেমন: মাসুম রানা',
    phone_number: 'মোবাইল নাম্বার *',
    phone_number_placeholder: 'যেমন: 018XXXXXXXX',
    full_address: 'সম্পূর্ণ ঠিকানা *',
    full_address_placeholder: 'গ্রাম/মহল্লা, থানা, জেলা (নওগাঁ বা যেকোনো জেলা)',
    delivery_zone_label: 'ডেলিভারি এলাকা *',
    dhaka_city_inside: 'নওগাঁ সদর (ভিতরে - ৬০৳)',
    dhaka_delivery_time: '২৪ ঘণ্টার মধ্যে',
    outside_dhaka_title: 'নওগাঁর বাইরে (সমগ্র বাংলাদেশ - ১২০৳)',
    outside_delivery_time: '২-৩ কার্যদিবসের মধ্যে',
    confirm_order_btn: 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)',

    // Mobile Dock
    dock_home: 'হোম',
    dock_shop: 'শপ',
    dock_wishlist: 'পছন্দ',
    dock_whatsapp: 'হোয়াটসঅ্যাপ',
    dock_cart: 'কার্ট',
    dock_admin: 'অ্যাডমিন',

    // Footer
    footer_about: 'Maya Shopping Mall (মায়া শপিং মল) – নওগাঁর বিশ্বস্ত লাইফস্টাইল ও ফ্যাশন ডেস্টিনেশন। এক্সক্লুসিভ বেডিং কম্বো, কাপল ড্রেস, গিফট হ্যাম্পার, পোলো শার্ট, কাশ্মীরি থ্রি-পিস ও ব্যাগ কালেকশন। দ্রুত হোম ডেলিভারি ও নির্ভরযোগ্য কাস্টমার সাপোর্ট।',
    verified_shop: '✓ ভেরিফাইড শপ নওগাঁ',
    quick_links: 'প্রয়োজনীয় লিংক',
    customer_care: 'গ্রাহক সেবা ও নীতি',
    contact_support: 'যোগাযোগ ও সাপোর্ট',
    emergency_hotline: 'হটলাইন ও বিকাশ',
    all_rights_reserved: 'সর্বস্বত্ব সংরক্ষিত।',
  },
  en: {
    // Header & Announcement
    cod_announcement: 'Fast Cash on Delivery Across Naogaon & Bangladesh',
    replacement_guarantee: '100% Quality Guarantee & Easy Return',
    admin_panel: 'Admin Panel',
    store_tagline: 'Naogaon Premier Lifestyle & Fashion Mall',
    search_placeholder: 'Search bedding sets, couple dress, gift hamper...',
    search_results_title: 'Search Results',
    search_results_count: 'products found',
    click_for_details: 'Click to view product details',
    search_no_results: 'No products found',
    search_not_found_desc: 'Please check your spelling or search by category.',
    shop_link: 'Collections',
    wishlist_title: 'Wishlist',
    cart_title: 'Shopping Bag',
    cart_btn: 'Cart',

    // Trust Badges & Benefits
    trust_cod_title: 'Nationwide Cash on Delivery',
    trust_cod_desc: 'Pay after receiving product',
    trust_original_title: '100% Quality Guarantee',
    trust_original_desc: 'Verified premium fabric & material',
    trust_replacement_title: 'Easy Return Policy',
    trust_replacement_desc: 'Hassle-free exchange for issues',
    trust_return_easy: 'Easy Return & Exchange',
    trust_authentic_title: '100% Genuine Collection',
    trust_checked_delivery: 'Checked Before Delivery',
    trust_support_title: '24/7 Live Support',
    trust_support_desc: 'Instant WhatsApp chat (01814741111)',

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
    color_variant: 'Select Color or Size Variant',
    selected_color: 'Selected',
    hot_deal: 'Hot Deal',
    flagship_offer: 'Exclusive Offer',
    stock_limited_order_fast: 'Limited Stock • Order Fast',
    colors_count: 'Colors',

    // Product Details Tabs & Bullets
    key_features: 'Key Features:',
    specifications: 'Product Specifications',
    customer_reviews: 'Customer Reviews',
    verified_reviews: 'Verified Reviews',
    verified_reviews_title: '100% Verified Customer Reviews',
    verified_reviews_subtitle: 'Authentic reviews from verified Maya Shopping Mall customers',
    model: 'Code',
    no_specs_available: 'No additional specifications listed for this product.',
    related_products: 'Related Collections You May Like',
    product_not_found: 'Product Not Found',
    back_to_home: 'Return to Home',
    back_to_shop: 'Back to Shop',
    fast_home_delivery: 'Fast Home Delivery',
    nationwide_delivery: 'Naogaon & Nationwide',
    if_any_issue: 'On Any Defect',
    pay_after_checking: 'Pay After Checking',

    // Home Page Sections
    categories_title: 'Categories',
    categories_subtitle: 'Choose your desired lifestyle & fashion collections',
    total_categories_prefix: 'Total',
    total_categories_suffix: 'Categories',
    premium_lifestyle_collection: 'Exclusive Lifestyle Collection',
    all_trending_products: 'All Trending Collections',
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
    help_desc: 'Call us directly or message on WhatsApp with your name, address, and product details.',
    whatsapp_chat_btn: 'Chat on WhatsApp (01814741111)',

    // Cart Drawer
    your_cart: 'Your Shopping Cart',
    cart_empty: 'Your cart is empty!',
    cart_empty_sub: 'Add your favorite products to cart.',
    continue_shopping: 'Continue Shopping',
    delivery_area: 'Delivery Area:',
    inside_dhaka_opt: 'Inside Naogaon Sadar',
    outside_dhaka_opt: 'Outside Naogaon (Nationwide)',
    cart_subtotal: 'Subtotal:',
    delivery_charge: 'Delivery Fee:',
    grand_total: 'Grand Total:',
    safe_checkout_text: 'Cash on Delivery | 100% Secure Checkout',

    // Checkout Page
    checkout_tag: 'Easy 1-Page Checkout',
    checkout_heading: 'Delivery Address & Payment',
    full_name: 'Your Name *',
    full_name_placeholder: 'e.g. Masum Rana',
    phone_number: 'Mobile Number *',
    phone_number_placeholder: 'e.g. 018XXXXXXXX',
    full_address: 'Delivery Address *',
    full_address_placeholder: 'House, Road, Area, Thana & District name',
    delivery_zone_label: 'Delivery Area *',
    dhaka_city_inside: 'Inside Naogaon Sadar (৳60)',
    dhaka_delivery_time: 'Within 24 Hours',
    outside_dhaka_title: 'Outside Naogaon (৳120)',
    outside_delivery_time: 'Within 2-3 Working Days',
    confirm_order_btn: 'Confirm Order (Cash on Delivery)',

    // Mobile Dock
    dock_home: 'Home',
    dock_shop: 'Shop',
    dock_wishlist: 'Wishlist',
    dock_whatsapp: 'WhatsApp',
    dock_cart: 'Cart',
    dock_admin: 'Admin',

    // Footer
    footer_about: 'Maya Shopping Mall – Naogaon’s trusted lifestyle and fashion shopping destination. Exclusive bedding combo sets, matching couple outfits, luxury gift hampers, polo shirts, Kashmiri three-pieces & stylish bags.',
    verified_shop: '✓ Verified Shop Naogaon',
    quick_links: 'Quick Links',
    customer_care: 'Customer Care & Policies',
    contact_support: 'Contact & Support',
    emergency_hotline: 'Hotline & bKash',
    all_rights_reserved: 'All Rights Reserved.',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('maya_shopping_mall_lang') || 'bn';
    } catch {
      return 'bn';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('maya_shopping_mall_lang', lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['bn']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
