import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, RotateCcw, ArrowRight, Sparkles, Star, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

const SLIDES = [
  {
    id: 'luxury-bedding-combo-maroon',
    tagBn: 'স্পেশাল বেডিং অফার — ২৭% ছাড়',
    tagEn: 'Special Bedding Offer — 27% OFF',
    title: 'Luxury Cotton Bedding Combo',
    titleBn: 'লাক্সারি কটন বেডিং কম্বো সেট',
    titleEn: 'Luxury Cotton Bedding Combo Set',
    subtitleBn: '১০০% পিওর সফট কটন, ১টি কিং সাইজ বেডশিট + ২টি বালিশের কাভার + ১টি কুশন কাভার। পাকা রং গ্যারান্টি।',
    subtitleEn: '100% combed cotton, 1 King size sheet + 2 pillow covers + 1 cushion cover. Fast color guarantee.',
    price: 1350,
    regularPrice: 1850,
    image: '/assets/products/bedding-1.webp',
    badgeBn: 'কিং সাইজ (৭.৫x৮.৫ ফুট)',
    badgeEn: 'King Size (7.5x8.5 ft)',
    bgGradient: 'from-[#4C0519] via-[#881337] to-[#9F1239]',
    accentColor: 'text-amber-300',
  },
  {
    id: 'couple-combo-black-floral',
    tagBn: 'ফেস্টিভ কাপল কালেকশন — ২৬% ছাড়',
    tagEn: 'Festive Couple Collection — 26% OFF',
    title: 'Royal Couple Matching Outfits',
    titleBn: 'রয়্যাল ব্ল্যাক ও গোল্ডেন কাপল কম্বো',
    titleEn: 'Royal Black & Gold Couple Matching Set',
    subtitleBn: 'ডিজাইনার পাঞ্জাবি ও ম্যাচিং সালোয়ার কামিজ সেট। ঈদ, বিয়ে কিংবা যেকোনো অনুষ্ঠানের আভিজাত্য।',
    subtitleEn: 'Designer Panjabi and matching Salwar Kameez set with dupatta for festive royal elegance.',
    price: 1950,
    regularPrice: 2650,
    image: '/assets/products/couple-1.webp',
    badgeBn: 'পাঞ্জাবি + কামিজ কম্বো',
    badgeEn: 'Panjabi + Kameez Combo',
    bgGradient: 'from-[#18181B] via-[#2E1065] to-[#881337]',
    accentColor: 'text-rose-300',
  },
  {
    id: 'mens-luxury-gift-hamper-7in1',
    tagBn: '৭-ইন-১ লাক্সারি গিফট বক্স — ২৬% ছাড়',
    tagEn: '7-in-1 Luxury Gift Box — 26% OFF',
    title: '7-in-1 Men’s Luxury Gift Hamper',
    titleBn: '৭-ইন-১ জেন্টস লাক্সারি গিফট হ্যাম্পার',
    titleEn: '7-in-1 Men’s Complete Luxury Gift Hamper',
    subtitleBn: 'কটন শার্ট, এনালগ ওয়াচ, সানগ্লাস, লেদার ওয়ালেট, বেল্ট ও ফগ বডি স্প্রে সহ এক্সক্লুসিভ প্যাকেজিং।',
    subtitleEn: 'Premium shirt, quartz watch, sunglasses, leather wallet, belt & Fogg perfume in luxury gift box.',
    price: 1850,
    regularPrice: 2500,
    image: '/assets/products/hamper-1.webp',
    badgeBn: 'কমপ্লিট গিফট বক্স',
    badgeEn: 'Complete Gift Box',
    bgGradient: 'from-[#451A03] via-[#78350F] to-[#991B1B]',
    accentColor: 'text-amber-300',
  },
  {
    id: 'zena-luxury-kashmiri-three-piece',
    tagBn: 'কাশ্মীরি সূচিকর্ম থ্রি-পিস — ২৯% ছাড়',
    tagEn: 'Kashmiri Needlework — 29% OFF',
    title: 'ZENA Luxury Kashmiri 3-Piece',
    titleBn: 'জিনা লাক্সারি কাশ্মীরি থ্রি-পিস',
    titleEn: 'ZENA Luxury Kashmiri Needlework 3-Piece',
    subtitleBn: 'গলায় ও দামানে নিপুণ কাশ্মীরি সুতার কাজ, সফট বাটার সিল্ক ও ৫ হাত নজরকাড়া দোপাট্টা।',
    subtitleEn: 'Finest Kashmiri embroidery neckline and daman with soft butter bottom and designer dupatta.',
    price: 1750,
    regularPrice: 2450,
    image: '/assets/products/kashmiri-1.webp',
    badgeBn: 'আসল কাশ্মীরি কারুকাজ',
    badgeEn: 'Genuine Kashmiri Work',
    bgGradient: 'from-[#042F2E] via-[#0F766E] to-[#881337]',
    accentColor: 'text-emerald-300',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { lang, t } = useLanguage();
  const { settings } = useStoreSettings();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = SLIDES[current];

  return (
    <section 
      className="relative overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Gradient & Animated Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-all duration-1000 ease-in-out`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.15),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[420px] sm:min-h-[480px] md:min-h-[520px]">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center z-10 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm">
                <Sparkles className="size-3.5 text-amber-300 fill-amber-300" />
                <span>{lang === 'en' ? slide.tagEn : slide.tagBn}</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {lang === 'en' ? slide.badgeEn : slide.badgeBn}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-tight mb-3">
              <span className="block text-white">
                {lang === 'en' ? slide.titleEn : slide.titleBn}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-rose-100/90 font-medium mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {lang === 'en' ? slide.subtitleEn : slide.subtitleBn}
            </p>

            {/* Price & Actions Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="flex items-baseline gap-2.5 bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <span className="text-xs text-rose-200/80 font-bold">{t('offer_price')}:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-sans tracking-tight">
                  ৳{slide.price.toLocaleString()}
                </span>
                <span className="text-sm text-rose-300/60 line-through font-sans">
                  ৳{slide.regularPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/product/${slide.id}`}
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Zap className="size-4 fill-slate-950" />
                  <span>{t('buy_now')}</span>
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  to="/shop"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-2xl text-sm sm:text-base transition border border-white/15 backdrop-blur-md"
                >
                  {t('view_all')}
                </Link>
              </div>
            </div>

          </div>

          {/* Right Product Image Showcase Box */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end relative z-10 w-full">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] md:max-w-[480px] lg:max-w-[500px] group">
              
              {/* Multi-layered Glowing Aura Background */}
              <div className="absolute -inset-3 sm:-inset-5 rounded-[38px] bg-gradient-to-tr from-amber-500/30 via-rose-500/30 to-amber-300/20 blur-2xl sm:blur-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Outer Decorative Glass Frame */}
              <div className="relative rounded-[32px] sm:rounded-[36px] p-2.5 sm:p-3.5 bg-gradient-to-b from-white/30 via-white/10 to-amber-400/25 backdrop-blur-xl border border-white/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] transition-all duration-500 group-hover:shadow-[0_30px_75px_-12px_rgba(244,63,94,0.4)] group-hover:border-amber-400/50">
                
                {/* Inner Main Showcase Stage Canvas */}
                <div className="relative w-full h-[350px] sm:h-[410px] md:h-[450px] rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-white via-[#FFFBFB] to-rose-50/40 p-5 sm:p-7 flex items-center justify-center overflow-hidden border border-white/90 shadow-[inset_0_2px_16px_rgba(0,0,0,0.04)]">
                  
                  {/* Subtle Luxury Ambient Spotlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,1)_0%,rgba(255,241,242,0.65)_70%,rgba(254,226,226,0.35)_100%)] pointer-events-none" />
                  <div className="absolute -top-20 -right-20 size-48 rounded-full bg-rose-200/40 blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 size-48 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />

                  {/* Gold Luxury Corner Brackets */}
                  <div className="absolute top-3.5 left-3.5 size-4 sm:size-5 border-t-2 border-l-2 border-amber-500/70 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-3.5 right-3.5 size-4 sm:size-5 border-t-2 border-r-2 border-amber-500/70 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-3.5 left-3.5 size-4 sm:size-5 border-b-2 border-l-2 border-amber-500/70 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-3.5 right-3.5 size-4 sm:size-5 border-b-2 border-r-2 border-amber-500/70 rounded-br-sm pointer-events-none" />

                  {/* Floating Discount Pill Badge (Top-Left) */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs sm:text-sm font-black shadow-lg shadow-rose-600/35 border border-rose-400/40">
                    <Sparkles className="size-3 sm:size-3.5 fill-amber-300 text-amber-300 animate-pulse" />
                    <span>{Math.round(((slide.regularPrice - slide.price) / slide.regularPrice) * 100)}% {lang === 'en' ? 'OFF' : 'ছাড়'}</span>
                  </div>

                  {/* Floating Rating Badge (Top-Right) */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs sm:text-sm font-extrabold shadow-md border border-slate-200/80">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">({lang === 'en' ? 'Top Rated' : 'টপ রেটেড'})</span>
                  </div>

                  {/* Hover Prompt (Center-Bottom) */}
                  <div className="absolute bottom-16 inset-x-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/90 text-white text-xs font-bold shadow-xl border border-white/20 backdrop-blur-md">
                      <Eye className="size-3.5 text-amber-300" />
                      <span>{lang === 'en' ? 'Click to View Details' : 'বিস্তারিত দেখতে ক্লিক করুন'}</span>
                    </span>
                  </div>

                  {/* Main Product Image (Large & Prominent) */}
                  <Link 
                    to={`/product/${slide.id}`} 
                    className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer p-4 group/img"
                  >
                    <img
                      key={slide.id}
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full max-h-[220px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[380px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out group-hover/img:scale-108 group-hover/img:drop-shadow-[0_22px_40px_rgba(0,0,0,0.28)]"
                    />
                  </Link>

                  {/* Floating Trust Banner Pill (Bottom) */}
                  <div className="absolute bottom-2.5 sm:bottom-3.5 inset-x-2.5 sm:inset-x-5 z-20 bg-slate-950/90 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-2.5 sm:px-4 flex items-center justify-between text-white shadow-xl shadow-black/25">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-amber-300 shrink-0">
                      <ShieldCheck className="size-3.5 sm:size-4 text-emerald-400 shrink-0" />
                      <span className="whitespace-nowrap">{lang === 'en' ? '100% Genuine' : '১০০% অরিজিনাল'}</span>
                    </div>
                    <div className="h-3 w-px bg-white/20 mx-1" />
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium text-rose-100 shrink-0">
                      <Truck className="size-3.5 sm:size-4 text-amber-400 shrink-0" />
                      <span className="whitespace-nowrap">{lang === 'en' ? 'Cash On Delivery' : 'ক্যাশ অন ডেলিভারি'}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Slider Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  current === idx ? 'w-8 bg-amber-400 shadow-md' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                title={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Left/Right Nav Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition active:scale-90 cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition active:scale-90 cursor-pointer"
              title="Next"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges Ribbon */}
      <div className="bg-[#1C1917] border-t border-rose-950/60 py-3.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-rose-100">
            <Truck className="size-4 sm:size-5 text-amber-400 shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">{t('trust_cod_title')}</p>
              <p className="text-[10px] sm:text-xs text-rose-300/80 truncate">{t('trust_cod_desc')}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-rose-100">
            <ShieldCheck className="size-4 sm:size-5 text-emerald-400 shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">{t('trust_original_title')}</p>
              <p className="text-[10px] sm:text-xs text-rose-300/80 truncate">{t('trust_original_desc')}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-rose-100">
            <RotateCcw className="size-4 sm:size-5 text-rose-400 shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">{t('trust_replacement_title')}</p>
              <p className="text-[10px] sm:text-xs text-rose-300/80 truncate">{t('trust_replacement_desc')}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-rose-100">
            <Zap className="size-4 sm:size-5 text-amber-400 shrink-0" />
            <div className="text-left min-w-0">
              <p className="text-xs sm:text-sm font-bold truncate">{t('trust_support_title')}</p>
              <p className="text-[10px] sm:text-xs text-rose-300/80 truncate">হোয়াটসঅ্যাপ: {settings?.hotline || '01814741111'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
