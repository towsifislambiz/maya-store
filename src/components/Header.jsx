import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, ShieldCheck, Phone, Zap, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function Header() {
  const { totalItemsCount, subtotal, setIsCartOpen, wishlist } = useCart();
  const { products } = useProducts();
  const { settings } = useStoreSettings();
  const { isAdminUnlocked, unlockNotification, recordLogoClick } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();

  // Universal search filter across title, bangla name, model, specs, and price
  const searchResults = searchQuery.trim() === '' ? [] : products.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchName = p.name?.toLowerCase().includes(q);
    const matchBn = p.nameBn?.toLowerCase().includes(q);
    const matchModel = p.model?.toLowerCase().includes(q);
    const matchCategory = p.category?.toLowerCase().includes(q);
    const matchPrice = p.price?.toString().includes(q);
    const matchSpecs = Object.values(p.specs || {}).some(val => val.toLowerCase().includes(q));
    const matchShortDesc = p.shortDescBn?.toLowerCase().includes(q) || p.shortDescEn?.toLowerCase().includes(q);
    return matchName || matchBn || matchModel || matchCategory || matchPrice || matchSpecs || matchShortDesc;
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
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#05070B] text-slate-300 text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Zap className="size-3.5 fill-emerald-400" />
              <span>সারা বাংলাদেশে ফাস্ট ক্যাশ অন ডেলিভারি</span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${settings?.hotline || '+8801322302319'}`} className="flex items-center gap-1 text-slate-300 hover:text-white transition">
              <Phone className="size-3 text-emerald-400" />
              <span className="font-sans text-[11px] sm:text-xs">{settings?.hotline || '+880 1322-302319'}</span>
            </a>
            {isAdminUnlocked && (
              <>
                <span className="text-slate-500 hidden sm:inline">|</span>
                <Link
                  to="/admin"
                  className="bg-amber-400/10 border border-amber-400/40 text-amber-400 hover:bg-amber-400 hover:text-slate-950 px-2.5 py-0.5 rounded-full hidden sm:flex items-center gap-1 font-bold text-[11px] transition shadow-xs animate-pulse"
                >
                  <ShieldCheck className="size-3.5" />
                  <span>অ্যাডমিন প্যানেল</span>
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

      {/* Main Jet Black Header */}
      <div className="bg-[#0B0F19] border-b border-slate-800 text-white py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo with 5-Click Secret Unlock Tracker */}
          <Link
            to="/"
            onClick={recordLogoClick}
            className="flex items-center gap-2.5 shrink-0 group select-none cursor-pointer"
            title="Galaxy Gadgets (ট্যাপ করুন)"
          >
            <img
              src="/assets/logo.webp"
              alt="Galaxy Gadgets Logo"
              decoding="async"
              className="size-10 sm:size-11 object-contain rounded-xl bg-black border border-slate-800 group-hover:scale-105 active:scale-90 transition-transform duration-200 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                  GALAXY<span className="text-cyan-400">GADGETS</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider hidden sm:inline-block">BD</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block">প্রিমিয়াম গ্যাজেট ও ইলেকট্রনিক্স স্টোর</p>
            </div>
          </Link>

          {/* Universal Live Search Bar (Desktop & Tablet) */}
          <div className="relative grow max-w-xl hidden md:block" ref={desktopSearchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="প্রডাক্টের নাম, মডেল বা স্পেসিফিকেশন দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleKeyDown}
                className="w-full bg-slate-900/90 text-white pl-11 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm transition placeholder:text-slate-400"
              />
              <Search className="absolute left-3.5 top-3 size-4 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>অনুসন্ধান ফলাফল: ({searchResults.length}) টি প্রডাক্ট পাওয়া গেছে</span>
                  <span className="text-cyan-400 font-medium">ক্লিক করে ডিটেইলস দেখুন</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    <p>দুঃখিত, <span className="text-white font-semibold">"{searchQuery}"</span> দিয়ে কোনো প্রডাক্ট পাওয়া যায়নি!</p>
                    <p className="text-xs text-slate-500 mt-1">দয়া করে সঠিক নাম বা মডেল লিখে আবার চেষ্টা করুন।</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/80">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectProduct(item.id);
                        }}
                        onClick={() => handleSelectProduct(item.id)}
                        className="p-3 hover:bg-slate-800/90 flex items-center gap-3.5 cursor-pointer transition group"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="size-12 object-contain rounded-lg bg-slate-800 p-1 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="grow min-w-0">
                          <p className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition">{item.name}</p>
                          <p className="text-xs text-slate-400 truncate">{item.nameBn}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-emerald-400 font-bold text-sm font-sans">৳{item.price}</span>
                            {item.regularPrice && (
                              <span className="text-xs text-slate-500 line-through font-sans">৳{item.regularPrice}</span>
                            )}
                            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-medium uppercase">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons (Right) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick Links */}
            <Link to="/shop" className="text-sm text-slate-300 hover:text-white font-medium hidden lg:inline-block transition px-2 py-1">
              শপিং
            </Link>

            {/* Wishlist Button */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="উইশলিস্ট"
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3.5 py-2 rounded-xl font-medium text-sm shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="size-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-slate-900 text-[10px] font-black size-4 rounded-full flex items-center justify-center shadow">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">কার্ট</span>
              {subtotal > 0 && (
                <span className="hidden sm:inline font-bold border-l border-emerald-400/40 pl-2">
                  ৳{subtotal}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden relative" ref={mobileSearchRef}>
          <input
            type="text"
            placeholder="প্রডাক্ট সার্চ করুন..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-900 text-white pl-10 pr-9 py-2 rounded-lg border border-slate-700 outline-none text-sm placeholder:text-slate-400"
          />
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-slate-400"
            >
              <X className="size-4" />
            </button>
          )}

          {/* Mobile search dropdown */}
          {isSearchOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-slate-400 text-sm">কোনো প্রডাক্ট পাওয়া যায়নি</div>
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
                    className="p-3 border-b border-slate-800 flex items-center gap-3 cursor-pointer hover:bg-slate-800/80"
                  >
                    <img src={item.images[0]} alt={item.name} className="size-10 object-contain rounded bg-slate-800 shrink-0" />
                    <div className="grow min-w-0">
                      <p className="text-xs font-bold text-white truncate">{item.name}</p>
                      <span className="text-emerald-400 font-bold text-xs">৳{item.price}</span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-500 shrink-0" />
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
