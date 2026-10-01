import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function ProductGallery360({ images, has360View = false, productName }) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  // Auto-rotate timer
  useEffect(() => {
    let interval;
    if (isAutoSpinning && images.length > 1) {
      interval = setInterval(() => {
        setActiveAngleIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAutoSpinning, images.length]);

  // Touch and mouse drag handlers for 360 simulation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || images.length <= 1) return;
    const diff = e.clientX - startXRef.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // Drag right -> previous image
        setActiveAngleIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        // Drag left -> next image
        setActiveAngleIndex((prev) => (prev + 1) % images.length);
      }
      startXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || images.length <= 1) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    if (Math.abs(diff) > 25) {
      if (diff > 0) {
        setActiveAngleIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setActiveAngleIndex((prev) => (prev + 1) % images.length);
      }
      startXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const angleLabels = [
    'সামনের ভিউ (Open Case)',
    'টাইপ-সি পোর্ট (Type-C Base)',
    'বক্সের ফ্রন্ট ভিউ (Box Front)',
    'বক্সের পেছনের সিল (Back Details)',
    'বারকোড ও সিরিয়াল (Barcode Seal)',
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-lg select-none">
      
      {/* 360 Badge & Interactive Controller Banner */}
      {has360View && (
        <div className="mb-3 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white px-3.5 py-2 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
              <RotateCcw className="size-4 animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                ৩৬০° ইন্টারঅ্যাক্টিভ ভিউয়ার
                <Sparkles className="size-3 text-amber-400" />
              </span>
              <p className="text-[10px] text-slate-300">ছবিটি মাউস দিয়ে টেনে বা বাটনে ক্লিক করে চারদিক ঘুরে দেখুন</p>
            </div>
          </div>

          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`text-xs px-2.5 py-1 rounded-xl font-medium flex items-center gap-1 transition ${
              isAutoSpinning
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            {isAutoSpinning ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span>{isAutoSpinning ? 'পজ' : 'অটো স্পিন'}</span>
          </button>
        </div>
      )}

      {/* Main Image Frame (Drag Enabled) */}
      <div
        className="relative aspect-square max-h-[460px] mx-auto flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-2xl p-6 overflow-hidden cursor-grab active:cursor-grabbing border border-slate-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeAngleIndex]}
          alt={`${productName} Angle ${activeAngleIndex + 1}`}
          decoding="async"
          className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300 pointer-events-none"
        />

        {/* Current Angle Label Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow">
          {angleLabels[activeAngleIndex] || `অ্যাঙ্গেল ${activeAngleIndex + 1} / ${images.length}`}
        </div>

        {/* Left & Right Chevron Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveAngleIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition hover:scale-110 active:scale-95"
              title="পূর্ববর্তী অ্যাঙ্গেল"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => setActiveAngleIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition hover:scale-110 active:scale-95"
              title="পরবর্তী অ্যাঙ্গেল"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Reel */}
      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveAngleIndex(idx);
                setIsAutoSpinning(false);
              }}
              className={`size-14 sm:size-16 rounded-xl p-1 bg-slate-50 border-2 transition-all shrink-0 overflow-hidden ${
                activeAngleIndex === idx
                  ? 'border-slate-950 ring-2 ring-slate-950/20 shadow-md scale-105'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumb-${idx}`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}

      {/* Helpful Hint */}
      {has360View && (
        <p className="text-center text-xs text-slate-400 mt-2 font-medium">
          💡 মোবাইলে সোয়াইপ করে অথবা মাউসে ড্র্যাগ করে চারদিক ঘুরিয়ে যাচাই করুন
        </p>
      )}
    </div>
  );
}
