import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SLIDES = [
  {
    id: 'airpods-pro-2',
    tagBn: 'মেগা অফার — ৩৮% ছাড়',
    tagEn: 'Mega Deal — 38% OFF',
    title: 'Apple AirPods Pro 2nd Gen',
    titleBn: '৩৬০° ইন্টারেক্টিভ অডিও এক্সপেরিয়েন্স',
    titleEn: '360° Interactive Spatial Audio Experience',
    subtitleBn: 'অরিজিনাল দুবাই সিরিয়াল বক্স, গোল্ড সিল ANC ও টাইপ-সি স্পিকার কেস।',
    subtitleEn: 'Original Dubai serial box, gold seal ANC & Type-C speaker case.',
    price: 899,
    regularPrice: 1450,
    image: '/assets/products/airpods_pro_2_open_case.webp',
    badgeBn: '৩৬০° ভিউ সাপোর্টেড',
    badgeEn: '360° View Supported',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
    accentColor: 'text-cyan-400',
  },
  {
    id: 'e88-pro-drone',
    tagBn: 'টপ রেটেড ফ্ল্যাগশিপ',
    tagEn: 'Top Rated Flagship',
    title: 'E88 PRO Dual Camera Drone',
    titleBn: 'ব্রাশলেস মোটর ও ২টি মডুলার ব্যাটারি ফ্রি',
    titleEn: 'Brushless Motors & 2 Free Modular Batteries',
    subtitleBn: 'ডুয়াল এইচডি ক্যামেরা ও অপটিক্যাল ফ্লো সেন্সর দিয়ে বাতাসে স্ট্যাবল ওড়ে।',
    subtitleEn: 'Dual HD camera & optical flow sensor for ultra-stable aerial flight.',
    price: 5299,
    regularPrice: 6500,
    image: '/assets/products/e88_pro_drone_unfolded_batteries.webp',
    badgeBn: 'হার্ড কেস ফ্রি',
    badgeEn: 'Free Hard Case',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    accentColor: 'text-emerald-400',
  },
  {
    id: 'zokd-45w-powerbank',
    tagBn: 'সুপার ফাস্ট চার্জিং',
    tagEn: 'Super Fast Charging',
    title: 'ZOKD 45W Fast Power Bank',
    titleBn: '৪৫ ওয়াট আল্ট্রা চার্জ ও ৩টি বিল্ট-ইন কেবল',
    titleEn: '45W Ultra Charge & 3 Built-in Cables',
    subtitleBn: '১০,০০০ এমএএইচ হাই-ডেনসিটি ব্যাটারি ও প্রিমিয়াম মিন্ট গ্রিন লাক্সারি ফিনিশ।',
    subtitleEn: '10,000mAh high-density battery & premium mint green luxury finish.',
    price: 3999,
    regularPrice: 4800,
    image: '/assets/products/zokd_45w_10000mah_powerbank.webp',
    badgeBn: 'ইন-বিল্ট কেবলস',
    badgeEn: 'Built-in Cables',
    bgGradient: 'from-slate-950 via-slate-900 to-teal-950',
    accentColor: 'text-teal-400',
  },
];

export default function HeroSlider() {
  const { lang, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Main Banner Slider (3 Cols) */}
        <div className={`lg:col-span-3 rounded-3xl bg-gradient-to-r ${slide.bgGradient} text-white p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-slate-800 min-h-[380px] sm:min-h-[420px] flex items-center`}>
          
          {/* Subtle Cyberpunk Grid Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
            {/* Left Content */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-white/10 text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-white/10">
                  {lang === 'en' ? slide.tagEn : slide.tagBn}
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {t('in_stock')}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight text-white leading-tight">
                {slide.title}
              </h1>

              <p className={`text-base sm:text-xl font-bold ${slide.accentColor}`}>
                {lang === 'en' ? slide.titleEn : slide.titleBn}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-md">
                {lang === 'en' ? slide.subtitleEn : slide.subtitleBn}
              </p>

              {/* Price & CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80">
                  <span className="text-xs text-slate-400 block -mb-1">{t('offer_price')}</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                    ৳{slide.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 line-through ml-2 font-sans">
                    ৳{slide.regularPrice.toLocaleString()}
                  </span>
                </div>

                <Link
                  to={`/product/${slide.id}`}
                  className="bg-white hover:bg-slate-100 text-slate-950 font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl transition active:scale-95 group cursor-pointer"
                >
                  <span>{lang === 'en' ? 'Order Now' : 'এখনই অর্ডার করুন'}</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Product Image Showcase */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              <div className="relative size-56 sm:size-72 flex items-center justify-center">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  decoding="async"
                  className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Pill Badge */}
              <div className="absolute -bottom-2 right-4 bg-slate-950/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 shadow-xl flex items-center gap-1.5">
                <Zap className="size-3.5 text-amber-400 fill-amber-400" />
                <span>{lang === 'en' ? slide.badgeEn : slide.badgeBn}</span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2 z-10">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Left/Right controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/80 text-white transition backdrop-blur-xs hidden sm:block cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/40 hover:bg-slate-950/80 text-white transition backdrop-blur-xs hidden sm:block cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Right Feature Highlights (Trust Cards): 1 Col Mobile, 3 Cols Tablet, 1 Col Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 sm:gap-3.5 justify-between">
          {/* Card 1: Fast COD */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-3.5 hover:shadow-md transition">
            <div className="size-11 sm:size-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Truck className="size-5 sm:size-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {t('trust_cod_title')}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {t('trust_cod_desc')}
              </p>
            </div>
          </div>

          {/* Card 2: 7 Days Warranty */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-3.5 hover:shadow-md transition">
            <div className="size-11 sm:size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <RotateCcw className="size-5 sm:size-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {t('trust_replacement_title')}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {t('trust_return_easy')}
              </p>
            </div>
          </div>

          {/* Card 3: 100% Genuine */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex items-center gap-3 sm:gap-3.5 hover:shadow-md transition">
            <div className="size-11 sm:size-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <ShieldCheck className="size-5 sm:size-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {t('trust_authentic_title')}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {t('trust_checked_delivery')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
