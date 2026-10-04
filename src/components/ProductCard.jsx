import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Zap, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const isWished = isInWishlist(product.id);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleToggleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const savingsAmount = product.regularPrice ? (product.regularPrice - product.price) : 0;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-rose-100/90 hover:border-rose-400/80 shadow-[0_4px_20px_-4px_rgba(136,19,55,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(190,18,60,0.18)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group relative">
      
      {/* Top Floating Badges & Actions */}
      <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discountPercent && (
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-[9px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm tracking-wider flex items-center gap-1">
              <Zap className="size-2.5 sm:size-3 fill-white" />
              <span>{product.discountPercent}% ছাড়</span>
            </span>
          )}
          {product.badgeText && (
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-amber-200/40 hidden sm:inline-block">
              {product.badgeText}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Quick View Button */}
          <Link
            to={`/product/${product.id}`}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 text-slate-500 hover:text-rose-600 hover:bg-rose-50 shadow-sm border border-rose-100 transition duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100"
            title="ডিটেইলস দেখুন"
          >
            <Eye className="size-3.5 sm:size-4" />
          </Link>

          {/* Wishlist Toggle Button */}
          <button
            onClick={handleToggleWish}
            className={`p-1.5 sm:p-2 rounded-full transition-all shadow-sm border cursor-pointer ${
              isWished
                ? 'bg-rose-600 text-white border-rose-600 scale-110'
                : 'bg-white/95 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-rose-100'
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
        className="block relative bg-gradient-to-b from-[#FFF5F6] via-[#FFF9FA] to-white p-3 sm:p-5 pt-9 sm:pt-11 overflow-hidden border-b border-rose-50"
      >
        <div className="aspect-[4/3.8] sm:aspect-square flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-sm group-hover:drop-shadow-md"
          />
        </div>

        {/* Color variants badge indicator */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-slate-700 shadow-xs border border-rose-100">
            <div className="flex -space-x-1 items-center">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="size-2 sm:size-2.5 rounded-full border border-white shadow-2xs"
                  style={{ backgroundColor: col.hex }}
                />
              ))}
            </div>
            <span>{product.colors.length} টি কালার</span>
          </div>
        )}
      </Link>

      {/* Product Body Information */}
      <div className="p-2.5 sm:p-4 md:p-5 flex flex-col grow justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-black text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 uppercase tracking-wide truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-600 text-[10px] sm:text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/80 shrink-0">
              <Star className="size-3 sm:size-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[9px] sm:text-[10px] hidden sm:inline">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Titles */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-rose-700 transition-colors">
            <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm md:text-base leading-snug line-clamp-2 min-h-[2.2rem] sm:min-h-[2.6rem]">
              {lang === 'en' ? product.name : (product.nameBn || product.name)}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
              {lang === 'en' ? (product.nameBn || '') : product.name}
            </p>
          </Link>

          {/* Price & Savings Block */}
          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-rose-50">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-base sm:text-xl md:text-2xl font-black text-rose-700 font-sans tracking-tight">
                ৳{product.price.toLocaleString()}
              </span>
              {product.regularPrice && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through font-sans">
                  ৳{product.regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            {savingsAmount > 0 && (
              <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-md border border-emerald-200/80 mt-1 inline-block truncate max-w-full">
                সাশ্রয়: ৳{savingsAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Redesigned Dual Actions: Order Now & Add to Cart */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-rose-50 flex items-center gap-1.5 sm:gap-2">
          {/* Order Now (Direct Checkout) Button */}
          <button
            onClick={handleBuyNow}
            className="grow min-h-[38px] sm:min-h-[44px] bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white font-black py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-1 sm:gap-1.5 shadow-[0_4px_14px_0_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_0_rgba(225,29,72,0.45)] transition-all active:scale-95 group/btn cursor-pointer touch-manipulation"
          >
            <Zap className="size-3.5 sm:size-4 text-amber-300 fill-amber-300 group-hover/btn:scale-110 transition-transform shrink-0" />
            <span className="truncate">{lang === 'en' ? 'Order Now' : 'অর্ডার করুন'}</span>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`size-[38px] sm:size-[44px] rounded-xl sm:rounded-2xl transition-all shadow-xs border shrink-0 flex items-center justify-center cursor-pointer active:scale-90 touch-manipulation ${
              addedAnim
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200/90 hover:border-rose-300'
            }`}
            title={lang === 'en' ? 'Add to Cart' : 'কার্ট-এ যোগ করুন'}
          >
            {addedAnim ? (
              <Check className="size-3.5 sm:size-4 animate-bounce" />
            ) : (
              <ShoppingBag className="size-3.5 sm:size-4" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
