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

  // Pick top 2 flagship deals dynamically
  const deal1 = products.find(p => p.id === 'luxury-bedding-combo-maroon') || products[0];
  const deal2 = products.find(p => p.id === 'mens-luxury-gift-hamper-7in1') || products[1];

  const handleQuickBuy = (product, e) => {
    e.preventDefault();
    if (!product) return;
    addToCart(product, 1);
    navigate('/checkout');
  };

  const whatsappNumber = (settings?.whatsappNumber || '01814741111').replace(/[^0-9]/g, '');
  const cleanWa = whatsappNumber.startsWith('880') ? whatsappNumber : `88${whatsappNumber}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 space-y-5 sm:space-y-6">
      
      {/* 1. E-COMMERCE TRUST & STORE BENEFITS STRIP */}
      <div className="bg-white border border-rose-100/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          
          {/* Benefit 1 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-rose-50/50 border border-rose-100">
            <div className="size-8 sm:size-10 rounded-xl bg-rose-600/10 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
              <Truck className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{t('trust_cod_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_cod_desc')}</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-rose-50/50 border border-rose-100">
            <div className="size-8 sm:size-10 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{t('trust_original_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_original_desc')}</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-rose-50/50 border border-rose-100">
            <div className="size-8 sm:size-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <RotateCcw className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{t('trust_replacement_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{t('trust_replacement_desc')}</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <a
            href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('আসসালামু আলাইকুম! Maya Shopping Mall থেকে পণ্য সম্পর্কে জানতে চাচ্ছি।')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl bg-rose-50/50 border border-rose-100 hover:border-emerald-400 hover:bg-emerald-50/50 transition group cursor-pointer"
          >
            <div className="size-8 sm:size-10 rounded-xl bg-emerald-600/10 text-emerald-700 group-hover:scale-110 transition flex items-center justify-center shrink-0 border border-emerald-200">
              <MessageCircle className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition truncate">{t('trust_support_title')}</h4>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">{settings?.hotline || '01814741111'}</p>
            </div>
          </a>

        </div>
      </div>

      {/* 2. TWO HIGH-CONVERTING FEATURED BENTO PROMO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* BENTO CARD 1: Bedding Set Mega Deal */}
        {deal1 && (
          <div className="relative rounded-3xl bg-gradient-to-br from-[#3B0716] via-[#700D2B] to-[#9F1239] border border-rose-900/60 p-5 sm:p-7 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-amber-400/50 group flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 size-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-all duration-500" />
            
            <div>
              {/* Header Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
                  <Zap className="size-3 fill-slate-950" />
                  {t('hot_deal')} • {deal1.discountPercent || 27}% {t('special_discount')}
                </span>
                <span className="bg-white/15 text-rose-100 border border-white/20 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('bestseller')}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-2xl font-black text-white font-sans tracking-tight mb-1.5 group-hover:text-amber-200 transition-colors">
                {lang === 'en' ? deal1.name : (deal1.nameBn || deal1.name)}
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 line-clamp-2 mb-4 leading-relaxed font-normal">
                {lang === 'en' ? (deal1.shortDescEn || deal1.shortDescBn) : (deal1.shortDescBn || deal1.shortDescEn)}
              </p>
            </div>

            {/* Middle: Product Image Showcase with Price */}
            <div className="relative py-2 sm:py-4 flex items-center justify-between gap-4">
              <div className="space-y-1 z-10">
                <span className="text-[11px] text-rose-200 font-medium block">{t('offer_price')}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">
                    ৳{deal1.price.toLocaleString()}
                  </span>
                  {deal1.regularPrice && (
                    <del className="text-xs sm:text-sm text-rose-300/70 font-sans">
                      ৳{deal1.regularPrice.toLocaleString()}
                    </del>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold pt-1">
                  <CheckCircle2 className="size-3.5" />
                  <span>{t('stock_limited_order_fast')}</span>
                </div>
              </div>

              {/* Floating Product Image */}
              <div className="relative size-28 sm:size-36 shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
                <img
                  src={deal1.image || deal1.images?.[0] || '/assets/products/bedding-1.webp'}
                  alt={deal1.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-rose-800/80 flex items-center gap-2.5 sm:gap-3 z-10">
              <button
                type="button"
                onClick={(e) => handleQuickBuy(deal1, e)}
                className="flex-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/25 transition active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span>{t('order_now')}</span>
              </button>

              <Link
                to={`/product/${deal1.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
              >
                <Eye className="size-3.5 text-amber-300" />
                <span>{t('view_details')}</span>
                <ArrowRight className="size-3.5 text-rose-200 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* BENTO CARD 2: Gift Hamper Showcase */}
        {deal2 && (
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#2E1B1B] to-[#451A03] border border-amber-900/40 p-5 sm:p-7 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-amber-500/40 group flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 size-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
            
            <div>
              {/* Header Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-rose-600 to-rose-700 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="size-3 fill-white" />
                  {t('flagship_offer')}
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                  {t('top_rated')}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-2xl font-black text-white font-sans tracking-tight mb-1.5 group-hover:text-amber-300 transition-colors">
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
                  <span className="text-2xl sm:text-3xl font-black text-amber-300 font-sans">
                    ৳{deal2.price.toLocaleString()}
                  </span>
                  {deal2.regularPrice && (
                    <del className="text-xs sm:text-sm text-slate-400 font-sans">
                      ৳{deal2.regularPrice.toLocaleString()}
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
                <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-xl animate-pulse" />
                <img
                  src={deal2.image || deal2.images?.[0] || '/assets/products/hamper-1.webp'}
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
                className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-black py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-rose-600/25 transition active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span>{t('order_now')}</span>
              </button>

              <Link
                to={`/product/${deal2.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95"
              >
                <Eye className="size-3.5 text-amber-300" />
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
