import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, ShieldCheck, Phone, Zap, X, ArrowRight, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { totalItemsCount, subtotal, setIsCartOpen, wishlist } = useCart();
  const { products } = useProducts();
  const { settings } = useStoreSettings();
  const { isAdminUnlocked, unlockNotification, recordLogoClick } = useAdminAuth();
  const { lang, toggleLang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  // Universal search filter across title, bangla name, model, specs, and category
  const searchResults = searchQuery.trim() === '' ? [] : products.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    const matchName = p.name?.toLowerCase().includes(q);
    const matchBn = p.nameBn?.toLowerCase().includes(q);
    const matchModel = p.model?.toLowerCase().includes(q);
    const matchCategory = p.category?.toLowerCase().includes(q);
    const matchPrice = p.price?.toString().includes(q);
    const matchSpecs = Object.values(p.specs || {}).some(val => typeof val === 'string' && val.toLowerCase().includes(q));
    const matchSpecKeys = Object.keys(p.specs || {}).some(key => typeof key === 'string' && key.toLowerCase().includes(q));
    const matchBullets = (p.bulletPointsBn || []).some(pt => typeof pt === 'string' && pt.toLowerCase().includes(q));
    const matchShortDesc = p.shortDescBn?.toLowerCase().includes(q) || p.shortDescEn?.toLowerCase().includes(q);
    return Boolean(matchName || matchBn || matchModel || matchCategory || matchPrice || matchSpecs || matchSpecKeys || matchBullets || matchShortDesc);
  });

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isInsideDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(event.target);
      const isInsideMobile = mobileSearchRef.current && mobileSearchRef.current.contains(event.target);
      if (!isInsideDesktop && !isInsideMobile) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (productId) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        handleSelectProduct(searchResults[0].id);
      } else if (searchQuery.trim()) {
        setIsSearchOpen(false);
        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-[#3B0413] text-rose-100 text-xs py-1.5 px-3 sm:px-6 border-b border-rose-950/60 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          
          {/* Announcement Message */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left min-w-0">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold text-[11px] sm:text-xs">
              <Zap className="size-3.5 fill-amber-300 shrink-0 animate-pulse" />
              <span>{t('cod_announcement')}</span>
            </span>
            <span className="hidden lg:inline text-rose-400/40">|</span>
            <span className="hidden lg:inline text-rose-200 text-xs font-medium">{t('replacement_guarantee')}</span>
          </div>

          {/* Right Controls: Language Pill + Phone + Admin Link */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap">
            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/90 hover:bg-rose-900 border border-rose-800 text-[10px] sm:text-[11px] font-bold text-white transition active:scale-95 cursor-pointer shadow-xs shrink-0"
              title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            >
              <Globe className="size-3 text-amber-300 shrink-0" />
              <span className={lang === 'bn' ? 'text-amber-300 font-black' : 'text-rose-300'}>বাংলা</span>
              <span className="text-rose-400 text-[10px]">/</span>
              <span className={lang === 'en' ? 'text-amber-300 font-black' : 'text-rose-300'}>EN</span>
            </button>

            {/* Hotline Phone - with strict whitespace-nowrap and flex-nowrap */}
            <a
              href={`tel:${settings?.hotline || '01814741111'}`}
              className="inline-flex items-center gap-1.5 text-rose-200 hover:text-white transition shrink-0 whitespace-nowrap text-[11px] sm:text-xs font-bold"
            >
              <Phone className="size-3 shrink-0 text-emerald-400" />
              <span className="font-sans whitespace-nowrap tracking-wide">
                {settings?.hotline || '01814741111'}
              </span>
            </a>

            {isAdminUnlocked && (
              <>
                <span className="text-rose-400/50 hidden md:inline">|</span>
                <Link
                  to="/admin"
                  className="bg-amber-400 text-slate-950 hover:bg-amber-300 px-2.5 py-0.5 rounded-full hidden md:inline-flex items-center gap-1 font-bold text-[11px] transition shadow-xs animate-pulse"
                >
                  <ShieldCheck className="size-3.5" />
                  <span>{t('admin_panel')}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Secret Unlock Toast Notification */}
      {unlockNotification && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-amber-400/60 text-amber-300 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <ShieldCheck className="size-4 text-amber-400 shrink-0" />
          <span>{unlockNotification}</span>
        </div>
      )}

      {/* Main Luxury Header Bar */}
      <div className="bg-white border-b border-rose-100 text-slate-800 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo with 5-Click Secret Unlock Tracker */}
          <Link
            to="/"
            onClick={recordLogoClick}
            className="flex items-center gap-2.5 shrink-0 group select-none cursor-pointer"
            title="Maya Shopping Mall (মায়া শপিং মল)"
          >
            <img
              src="/assets/logo.svg"
              alt="Maya Shopping Mall Logo"
              decoding="async"
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 active:scale-95 transition-transform duration-200"
            />
          </Link>

          {/* Universal Live Search Bar (Desktop & Tablet) */}
          <div className="relative grow max-w-xl hidden md:block" ref={desktopSearchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#FFF5F6] hover:bg-[#FFF0F2] text-slate-800 pl-11 pr-10 py-2.5 rounded-2xl border border-rose-200/90 focus:border-rose-600 focus:bg-white focus:ring-2 focus:ring-rose-500/20 outline-none text-sm transition placeholder:text-slate-400"
              />
              <Search className="absolute left-3.5 top-3 size-4 text-rose-600" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-rose-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-rose-100 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-3 bg-rose-50/80 border-b border-rose-100 text-xs text-rose-900 font-bold flex items-center justify-between">
                  <span>{t('search_results_title')}: ({searchResults.length}) {t('search_results_count')}</span>
                  <span className="text-rose-700 font-medium">{t('click_for_details')}</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    <p>{lang === 'bn' ? 'দুঃখিত,' : 'Sorry,'} <span className="text-rose-900 font-bold">"{searchQuery}"</span> {lang === 'bn' ? 'দিয়ে কোনো পণ্য পাওয়া যায়নি!' : 'no products found!'}</p>
                    <p className="text-xs text-slate-400 mt-1">{t('search_not_found_desc')}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-rose-50">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectProduct(item.id);
                        }}
                        onClick={() => handleSelectProduct(item.id)}
                        className="p-3 hover:bg-rose-50/70 flex items-center gap-3.5 cursor-pointer transition group"
                      >
                        <img
                          src={item.image || item.images?.[0] || '/assets/logo.svg'}
                          alt={item.name}
                          className="size-12 object-contain rounded-xl bg-[#FFF5F6] p-1 shrink-0 group-hover:scale-105 transition-transform border border-rose-100"
                        />
                        <div className="grow min-w-0">
                          <p className="text-sm font-extrabold text-slate-900 truncate group-hover:text-rose-700 transition">
                            {lang === 'en' ? item.name : (item.nameBn || item.name)}
                          </p>
                          {lang === 'bn' && item.nameBn && (
                            <p className="text-xs text-slate-400 truncate">{item.name}</p>
                          )}
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-rose-700 font-black text-sm font-sans">৳{item.price.toLocaleString()}</span>
                            {item.regularPrice && (
                              <span className="text-xs text-slate-400 line-through font-sans">৳{item.regularPrice.toLocaleString()}</span>
                            )}
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold uppercase">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Quick Link to All Products */}
            <Link to="/shop" className="text-sm text-slate-700 hover:text-rose-700 font-extrabold hidden lg:inline-block transition px-2 py-1">
              {t('shop_link')}
            </Link>

            {/* Wishlist Button */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2.5 rounded-2xl hover:bg-rose-50 text-slate-700 hover:text-rose-700 transition border border-rose-100"
              title={t('wishlist_title')}
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black size-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white px-3.5 sm:px-4 py-2.5 rounded-2xl font-bold text-sm shadow-md shadow-rose-600/25 transition active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="size-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black size-4 rounded-full flex items-center justify-center shadow">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">{t('cart_btn')}</span>
              {subtotal > 0 && (
                <span className="hidden sm:inline font-black border-l border-rose-400/40 pl-2">
                  ৳{subtotal.toLocaleString()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden relative" ref={mobileSearchRef}>
          <div className="relative">
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#FFF5F6] text-slate-800 pl-10 pr-9 py-2.5 rounded-2xl border border-rose-200 outline-none text-xs sm:text-sm placeholder:text-slate-400 focus:bg-white focus:border-rose-600 focus:ring-2 focus:ring-rose-500/20 shadow-xs transition"
            />
            <Search className="absolute left-3.5 top-3 size-4 text-rose-600" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-rose-600 active:scale-90"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Mobile search dropdown */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-rose-200/80 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-5 text-center text-slate-400 text-xs sm:text-sm">{t('search_no_results')}</div>
              ) : (
                searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectProduct(item.id);
                    }}
                    onClick={() => handleSelectProduct(item.id)}
                    className="p-3 border-b border-rose-50/80 flex items-center gap-3 cursor-pointer hover:bg-rose-50/80 active:bg-rose-100 transition"
                  >
                    <img src={item.image || item.images?.[0] || '/assets/logo.svg'} alt={item.name} className="size-11 object-contain rounded-xl bg-rose-50 p-1 shrink-0 border border-rose-100" />
                    <div className="grow min-w-0">
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        {lang === 'en' ? item.name : (item.nameBn || item.name)}
                      </p>
                      <span className="text-rose-700 font-black text-xs font-sans">৳{item.price.toLocaleString()}</span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400 shrink-0" />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
