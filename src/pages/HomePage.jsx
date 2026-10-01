import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryNav from '../components/CategoryNav';
import FlashDeals from '../components/FlashDeals';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { Sparkles, ShieldCheck, Truck, Headphones, RotateCcw, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { products } = useProducts();
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

      {/* 3. Live Countdown Flash Deals */}
      <FlashDeals />

      {/* 4. Elevated Product Grid Section (Exactly 4 Cards Per Row on Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Sparkles className="size-3.5" />
              <span>প্রিমিয়াম গ্যাজেট কালেকশন</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-sans tracking-tight">
              {activeCategory === 'all' ? 'সকল ট্রেন্ডিং গ্যাজেট' : 'ক্যাটাগরি প্রডাক্টসমূহ'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              প্রদর্শিত হচ্ছে {displayedProducts.length} / মোট {filteredProducts.length} টি প্রডাক্ট
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 transition"
          >
            <span>সব দেখুন</span>
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
              className="bg-slate-950 hover:bg-slate-900 text-white font-black py-3 sm:py-3.5 px-5 sm:px-7 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-xl hover:shadow-2xl transition active:scale-95 group"
            >
              <span>See More (+৪টি প্রডাক্ট)</span>
              <ChevronDown className="size-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          )}

          {/* Less Product Button (Appears if visibleCount > 12, reduces by 4 each click) */}
          {visibleCount > INITIAL_COUNT && (
            <button
              onClick={handleLessProduct}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-xs transition active:scale-95 group"
            >
              <span>Less Product (-৪টি প্রডাক্ট)</span>
              <ChevronUp className="size-4 text-slate-500 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </section>

      {/* 5. Trust & Quality Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <Truck className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">সুপার ফাস্ট ডেলিভারি</h4>
                <p className="text-xs text-slate-400">ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">ক্যাশ অন ডেলিভারি</h4>
                <p className="text-xs text-slate-400">পণ্য হাতে পেয়ে পেমেন্ট</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <RotateCcw className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">৭ দিনের রিপ্লেসমেন্ট</h4>
                <p className="text-xs text-slate-400">সহজ রিটার্ন ও এক্সচেঞ্জ</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <Headphones className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">২৪/৭ কাস্টমার সাপোর্ট</h4>
                <p className="text-xs text-slate-400">যেকোনো তথ্যে কল বা চ্যাট করুন</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
