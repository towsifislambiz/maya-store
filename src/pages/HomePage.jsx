import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryNav from '../components/CategoryNav';
import FeaturedDeals from '../components/FeaturedDeals';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowRight, ChevronDown, ChevronUp, Headphones, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { products } = useProducts();
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const INITIAL_COUNT = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredProducts.length));
  };

  const handleLessProduct = () => {
    setVisibleCount(prev => Math.max(INITIAL_COUNT, prev - 4));
  };

  const whatsappNumber = (settings?.whatsappNumber || '+8801322302319').replace(/[^0-9]/g, '');
  const cleanWa = whatsappNumber.startsWith('880') ? whatsappNumber : `88${whatsappNumber}`;

  return (
    <div className="min-h-screen pb-16">
      {/* 1. Hero Promotional Slider */}
      <HeroSlider />

      {/* 2. Interactive Category Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setVisibleCount(INITIAL_COUNT);
        }}
      />

      {/* 3. High-Converting Featured Deals & Store Benefits */}
      <FeaturedDeals />

      {/* 4. Elevated Product Grid Section (Exactly 4 Cards Per Row on Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>{t('premium_gadget_collection')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              {activeCategory === 'all' ? t('all_trending_gadgets') : t('category_products')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('showing_prefix')} {displayedProducts.length} {t('of_total_prefix')} {filteredProducts.length} {t('products_unit')}
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition"
          >
            <span>{t('view_all')}</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Responsive Product Grid: Exactly 2 Cards Per Row on Mobile, 3 on Tablet, 4 on Desktop/Laptop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See More & Less Product Pagination Controller */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {/* See More Button (Appears if total > visibleCount, adds 4 each click) */}
          {filteredProducts.length > visibleCount && (
            <button
              onClick={handleSeeMore}
              className="bg-slate-950 hover:bg-slate-900 text-white font-black py-3 sm:py-3.5 px-5 sm:px-7 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-xl hover:shadow-2xl transition active:scale-95 group cursor-pointer"
            >
              <span>{t('see_more')}</span>
              <ChevronDown className="size-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          )}

          {/* Less Product Button (Appears if visibleCount > 12, reduces by 4 each click) */}
          {visibleCount > INITIAL_COUNT && (
            <button
              onClick={handleLessProduct}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-xs transition active:scale-95 group cursor-pointer"
            >
              <span>{t('less_product')}</span>
              <ChevronUp className="size-4 text-slate-500 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </section>

      {/* 5. Direct Order Helpline & Assistance CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <Headphones className="size-4" />
              <span>{t('help_tag')}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
              {t('help_title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {t('help_desc')}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center shrink-0">
            <a
              href={`https://wa.me/${cleanWa}?text=আসসালামু%20আলাইকুম!%20Galaxy%20Gadgets%20থেকে%20অর্ডার%20করতে%20সহায়তা%20চাচ্ছি।`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-6 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25 transition active:scale-95 cursor-pointer"
            >
              <MessageCircle className="size-4" />
              <span>{t('whatsapp_chat_btn')}</span>
            </a>

            <a
              href={`tel:${settings?.hotline || '+8801322302319'}`}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <Phone className="size-4 text-cyan-400" />
              <span>{settings?.hotline || '+880 1322-302319'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
