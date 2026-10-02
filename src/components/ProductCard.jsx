import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, RotateCcw, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const isWished = isInWishlist(product.id);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Proceed directly to dedicated checkout
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const savingsAmount = product.regularPrice ? (product.regularPrice - product.price) : 0;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-cyan-500/50 shadow-xs sm:shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group relative">
      
      {/* Top Floating Badges */}
      <div className="absolute top-2 sm:top-3.5 left-2 sm:left-3.5 right-2 sm:right-3.5 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] sm:text-[11px] font-black px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              -{product.discountPercent}%
            </span>
          )}
          {product.badgeText && (
            <span className="bg-slate-900/95 backdrop-blur-md text-cyan-300 text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow border border-slate-700/60 hidden sm:inline-block">
              {product.badgeText}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto">
          {product.has360View && (
            <span
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow flex items-center gap-0.5 sm:gap-1 animate-pulse transition"
              title={lang === 'en' ? '360° interactive view' : '৩৬০° ভিউ সম্ভব'}
            >
              <RotateCcw className="size-2.5 sm:size-3" />
              <span>360°</span>
            </span>
          )}
          <button
            onClick={handleToggleWish}
            className={`p-1.5 sm:p-2 rounded-full transition shadow-xs backdrop-blur-md cursor-pointer ${
              isWished
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
            }`}
            title={lang === 'en' ? 'Save to wishlist' : 'পছন্দের তালিকায় রাখুন'}
          >
            <Heart className={`size-3.5 sm:size-4 ${isWished ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Frame */}
      <Link
        to={`/product/${product.id}`}
        className="block relative bg-gradient-to-b from-slate-50/80 via-slate-100/60 to-slate-50 p-2 sm:p-4 md:p-6 pt-7 sm:pt-10 md:pt-12 overflow-hidden border-b border-slate-100"
      >
        <div className="aspect-square flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-sm sm:drop-shadow-md"
          />
        </div>

        {/* Color variants badge indicator */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-1.5 left-2 sm:bottom-2.5 sm:left-3.5 flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200/80">
            <span className="size-1.5 sm:size-2 rounded-full bg-cyan-500"></span>
            <span>{product.colors.length} {t('colors_count')}</span>
          </div>
        )}
      </Link>

      {/* Product Body Information */}
      <div className="p-2.5 sm:p-4 md:p-5 flex flex-col grow justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
            <span className="text-[9px] sm:text-[11px] font-extrabold text-slate-500 uppercase tracking-wider truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 text-[10px] sm:text-xs font-bold bg-amber-50 px-1 sm:px-1.5 py-0.5 rounded-md border border-amber-100 shrink-0">
              <Star className="size-2.5 sm:size-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 text-[9px] sm:text-[11px] hidden sm:inline">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Titles */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-cyan-600 transition-colors">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm md:text-base leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
              {lang === 'en' ? product.name : (product.nameBn || product.name)}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-600 line-clamp-1 mt-0.5 font-medium">
              {lang === 'en' ? (product.nameBn || '') : product.name}
            </p>
          </Link>

          {/* Price & Savings Block */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-base sm:text-xl md:text-2xl font-black text-slate-950 font-sans tracking-tight">
                ৳{product.price.toLocaleString()}
              </span>
              {product.regularPrice && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through font-sans">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            {savingsAmount > 0 && (
              <span className="text-[8px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-1 inline-block truncate max-w-full">
                {t('save_short')}: ৳{savingsAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Dual Actions: 1-Click Order & Add to Cart */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2">
          {/* 1-Click Order Now Button */}
          <button
            onClick={handleBuyNow}
            className="grow bg-slate-950 hover:bg-slate-900 text-white font-extrabold py-2 sm:py-2.5 px-2 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-xl transition-all active:scale-95 group/btn cursor-pointer"
          >
            <Zap className="size-3.5 sm:size-4 text-amber-400 fill-amber-400 group-hover/btn:scale-110 transition-transform shrink-0" />
            <span className="truncate">{t('buy_now')}</span>
          </button>

          {/* Add to Cart Icon Button */}
          <button
            onClick={handleAddToCart}
            className="p-2 sm:p-2.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 rounded-xl sm:rounded-2xl transition shadow-xs active:scale-90 shrink-0 cursor-pointer"
            title={t('add_to_cart')}
          >
            <ShoppingBag className="size-3.5 sm:size-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
