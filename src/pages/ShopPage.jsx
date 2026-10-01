import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search } from 'lucide-react';

export default function ShopPage() {
  const { products } = useProducts();
  const { wishlist } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter') || '';
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high'
  const [searchFilter, setSearchFilter] = useState('');

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
      if (searchFilter.trim() !== '') {
        const q = searchFilter.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || p.nameBn.toLowerCase().includes(q) || p.model.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
    });
  }, [products, categoryParam, filterParam, wishlist, searchFilter, sortBy]);

  return (
    <div className="min-h-screen pt-4 sm:pt-8 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <Sparkles className="size-3.5" />
                <span>সকল গ্যাজেট ব্রাউজ করুন</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-sans">
                {filterParam === 'wishlist' ? 'আপনার পছন্দের গ্যাজেট (উইশলিস্ট)' : 'গ্যাজেট কালেকশন'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                ১০০% অথেনটিক গ্যাজেট, ইনস্ট্যান্ট ওয়ারেন্টি ও ক্যাশ অন ডেলিভারি
              </p>
            </div>

            {/* Quick in-page search */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="প্রডাক্ট ফিল্টার করুন..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-800 text-white pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-700 outline-none focus:border-cyan-400"
              />
              <Search className="size-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Filter Bar & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  categoryParam === cat.id
                    ? 'bg-slate-950 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.nameBn}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs shrink-0">
            <span className="text-slate-500 font-medium">সর্ট করুন:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-800 outline-none"
            >
              <option value="popular">জনপ্রিয়তা অনুযায়ী</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs">
            <p className="text-base font-bold text-slate-800">কোনো প্রডাক্ট পাওয়া যায়নি!</p>
            <p className="text-xs text-slate-500 mt-1">দয়া করে অন্য ক্যাটাগরি বেছে নিন অথবা ফিল্টার রিসেট করুন।</p>
            <button
              onClick={() => {
                setSearchParams({});
                setSearchFilter('');
              }}
              className="mt-4 bg-slate-950 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
            >
              সকল প্রডাক্ট রিসেট করুন
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
