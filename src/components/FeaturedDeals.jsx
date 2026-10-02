import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  MessageCircle, 
  Zap,
  CheckCircle2,
  Eye
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function FeaturedDeals() {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  // Pick top 2 flagship deals dynamically from product catalog
  const deal1 = products.find(p => p.id === 'airpods-pro-2') || products[0];
  const deal2 = products.find(p => p.id === 'e88-pro-drone') || products[1];

  const handleQuickBuy = (product, e) => {
    e.preventDefault();
    if (!product) return;
    addToCart(product, 1);
    navigate('/checkout');
  };

  const whatsappNumber = (settings?.whatsappNumber || '+8801322302319').replace(/[^0-9]/g, '');
  const cleanWa = whatsappNumber.startsWith('880') ? whatsappNumber : `88${whatsappNumber}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12 space-y-5 sm:space-y-6">
      
      {/* =========================================================================
          1. E-COMMERCE TRUST & STORE BENEFITS STRIP
         ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xs sm:shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          
          {/* Benefit 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="size-8 sm:size-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0 border border-cyan-500/20">
              <Truck className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">{t('trust_cod_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_cod_desc')}</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="size-8 sm:size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">{t('trust_original_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_original_desc')}</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="size-8 sm:size-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
              <RotateCcw className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">{t('trust_replacement_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_replacement_desc')}</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <a
            href={`https://wa.me/${cleanWa}?text=আসসালামু%20আলাইকুম!%20Galaxy%20Gadgets%20থেকে%20তথ্য%20জানতে%20চাচ্ছি।`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-emerald-400 hover:bg-emerald-50/50 transition group cursor-pointer"
          >
            <div className="size-8 sm:size-10 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition flex items-center justify-center shrink-0 border border-emerald-500/20">
              <MessageCircle className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-emerald-700 transition truncate">{t('trust_support_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_support_desc')}</p>
            </div>
          </a>

        </div>
      </div>

      {/* =========================================================================
          2. TWO HIGH-CONVERTING FEATURED BENTO PROMO CARDS
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* BENTO CARD 1: AirPods Pro 2 Special Showcase */}
        {deal1 && (
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-5 sm:p-7 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/40 group flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 size-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div>
              {/* Header Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
                  <Zap className="size-3 fill-white" />
                  {t('hot_deal')} • {deal1.discountPercent || 38}% {t('special_discount')}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('bestseller')}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-2xl font-black text-white font-sans tracking-tight mb-1.5 group-hover:text-cyan-300 transition-colors">
                {lang === 'en' ? deal1.name : (deal1.nameBn || deal1.name)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                {lang === 'en' ? (deal1.shortDescEn || deal1.shortDescBn) : (deal1.shortDescBn || deal1.shortDescEn)}
              </p>
            </div>

            {/* Middle: Product Image Showcase with Price */}
            <div className="relative py-2 sm:py-4 flex items-center justify-between gap-4">
              <div className="space-y-1 z-10">
                <span className="text-[11px] text-slate-400 font-medium block">{t('offer_price')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                    ৳{deal1.price}
                  </span>
                  {deal1.regularPrice && (
                    <del className="text-xs sm:text-sm text-slate-400 font-sans">
                      ৳{deal1.regularPrice}
                    </del>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="size-3.5" />
                  <span>{t('stock_limited_order_fast')}</span>
                </div>
              </div>

              {/* Floating Product Image */}
              <div className="relative size-28 sm:size-36 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl animate-pulse" />
                <img
                  src={deal1.image || deal1.images?.[0] || '/assets/products/airpods_pro_2_open_case.webp'}
                  alt={deal1.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5 sm:gap-3 z-10">
              <button
                type="button"
                onClick={(e) => handleQuickBuy(deal1, e)}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-black py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 transition active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span>{t('order_now')}</span>
              </button>

              <Link
                to={`/product/${deal1.id}`}
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-white font-bold py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
              >
                <Eye className="size-3.5 text-cyan-400" />
                <span>{t('view_details')}</span>
                <ArrowRight className="size-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* BENTO CARD 2: E88 Pro Drone / Flagship Showcase */}
        {deal2 && (
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border border-slate-800 p-5 sm:p-7 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-emerald-500/40 group flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 size-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
            
            <div>
              {/* Header Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="size-3 fill-slate-950" />
                  {t('flagship_offer')}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('top_rated')}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-2xl font-black text-white font-sans tracking-tight mb-1.5 group-hover:text-emerald-300 transition-colors">
                {lang === 'en' ? deal2.name : (deal2.nameBn || deal2.name)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                {lang === 'en' ? (deal2.shortDescEn || deal2.shortDescBn) : (deal2.shortDescBn || deal2.shortDescEn)}
              </p>
            </div>

            {/* Middle: Product Image Showcase with Price */}
            <div className="relative py-2 sm:py-4 flex items-center justify-between gap-4">
              <div className="space-y-1 z-10">
                <span className="text-[11px] text-slate-400 font-medium block">{t('offer_price')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                    ৳{deal2.price}
                  </span>
                  {deal2.regularPrice && (
                    <del className="text-xs sm:text-sm text-slate-400 font-sans">
                      ৳{deal2.regularPrice}
                    </del>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold pt-1">
                  <CheckCircle2 className="size-3.5" />
                  <span>{t('stock_limited_order_fast')}</span>
                </div>
              </div>

              {/* Floating Product Image */}
              <div className="relative size-28 sm:size-36 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-xl animate-pulse" />
                <img
                  src={deal2.image || deal2.images?.[0] || '/assets/products/e88_pro_drone_unfolded_batteries.webp'}
                  alt={deal2.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2.5 sm:gap-3 z-10">
              <button
                type="button"
                onClick={(e) => handleQuickBuy(deal2, e)}
                className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 font-black py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25 transition active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span>{t('order_now')}</span>
              </button>

              <Link
                to={`/product/${deal2.id}`}
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-400/50 text-white font-bold py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
              >
                <Eye className="size-3.5 text-emerald-400" />
                <span>{t('view_details')}</span>
                <ArrowRight className="size-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

      </div>

    </section>
  );
}
