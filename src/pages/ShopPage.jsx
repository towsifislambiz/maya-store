import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search } from 'lucide-react';

export default function ShopPage() {
  const { products } = useProducts();
  const { wishlist } = useCart();
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || '';
  const urlSearchParam = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high'
  const [userSearchText, setUserSearchText] = useState('');

  const currentSearch = userSearchText !== '' ? userSearchText : urlSearchParam;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (categoryParam !== 'all' && p.category !== categoryParam) {
        return false;
      }
      // Wishlist filter
      if (filterParam === 'wishlist' && !wishlist.includes(p.id)) {
        return false;
      }
      // Search text filter
      if (currentSearch.trim() !== '') {
        const q = currentSearch.toLowerCase().trim();
        const matchName = p.name?.toLowerCase().includes(q);
        const matchBn = p.nameBn?.toLowerCase().includes(q);
        const matchModel = p.model?.toLowerCase().includes(q);
        const matchCategory = p.category?.toLowerCase().includes(q);
        const matchPrice = p.price?.toString().includes(q);
        const matchSpecs = Object.values(p.specs || {}).some(val => typeof val === 'string' && val.toLowerCase().includes(q));
        const matchSpecKeys = Object.keys(p.specs || {}).some(key => typeof key === 'string' && key.toLowerCase().includes(q));
        const matchBullets = (p.bulletPointsBn || []).some(pt => typeof pt === 'string' && pt.toLowerCase().includes(q));
        const matchShortDesc = p.shortDescBn?.toLowerCase().includes(q) || p.shortDescEn?.toLowerCase().includes(q);
        if (!(matchName || matchBn || matchModel || matchCategory || matchPrice || matchSpecs || matchSpecKeys || matchBullets || matchShortDesc)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
    });
  }, [products, categoryParam, filterParam, wishlist, currentSearch, sortBy]);

  return (
    <div className="min-h-screen pt-4 sm:pt-8 pb-24 md:pb-12 bg-[#FFFDFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#4C0519] via-[#881337] to-[#1C1917] text-white rounded-3xl p-6 sm:p-8 mb-8 border border-rose-900/60 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider mb-1">
                <Sparkles className="size-3.5 fill-amber-300" />
                <span>{lang === 'en' ? 'Exclusive Collections' : 'এক্সক্লুসিভ লাইফস্টাইল ও ফ্যাশন কালেকশন'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-sans">
                {filterParam === 'wishlist' 
                  ? (lang === 'en' ? 'Your Wishlist' : 'আপনার পছন্দের পণ্য (উইশলিস্ট)') 
                  : (lang === 'en' ? 'Maya Lifestyle Collections' : 'মায়া শপিং মল কালেকশন')}
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/80 mt-1">
                {lang === 'en' 
                  ? 'Premium bedding, couple dress, luxury hampers, polo shirts & accessories' 
                  : 'প্রিমিয়াম বেডিং, কাপল ড্রেস, লাক্সারি হ্যাম্পার, পোলো শার্ট ও ফ্যাশন পণ্য'}
              </p>
            </div>

            {/* Quick in-page search */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder={lang === 'en' ? 'Filter products...' : 'পণ্য ফিল্টার করুন...'}
                value={currentSearch}
                onChange={(e) => setUserSearchText(e.target.value)}
                className="w-full bg-white/10 hover:bg-white/15 text-white pl-9 pr-3 py-2.5 rounded-xl text-xs border border-white/20 outline-none focus:border-amber-300 placeholder:text-rose-200/60 transition"
              />
              <Search className="size-4 text-amber-300 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
          
          {/* Category Tabs */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer touch-manipulation whitespace-nowrap ${
                  categoryParam === cat.id
                    ? 'bg-rose-700 text-white shadow-md shadow-rose-700/20'
                    : 'bg-rose-50/70 text-rose-900 hover:bg-rose-100'
                }`}
              >
                {lang === 'en' ? (cat.nameEn || cat.nameBn) : cat.nameBn}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs shrink-0">
            <span className="text-slate-500 font-medium">
              {lang === 'en' ? 'Sort by:' : 'সর্ট করুন:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FFF5F6] border border-rose-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-800 outline-none focus:border-rose-600"
            >
              <option value="popular">{lang === 'en' ? 'Most Popular' : 'জনপ্রিয়তা অনুযায়ী'}</option>
              <option value="price-low">{lang === 'en' ? 'Price: Low to High' : 'দাম: কম থেকে বেশি'}</option>
              <option value="price-high">{lang === 'en' ? 'Price: High to Low' : 'দাম: বেশি থেকে কম'}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-rose-100 shadow-xs">
            <p className="text-base font-black text-slate-800">{t('search_no_results')}</p>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'en' 
                ? 'Please select another category or reset filters.' 
                : 'দয়া করে অন্য ক্যাটাগরি বেছে নিন অথবা ফিল্টার রিসেট করুন।'}
            </p>
            <button
              onClick={() => {
                setSearchParams({});
                setUserSearchText('');
              }}
              className="mt-4 bg-rose-700 hover:bg-rose-800 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow cursor-pointer transition"
            >
              {lang === 'en' ? 'Reset All Filters' : 'সকল ফিল্টার রিসেট করুন'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
