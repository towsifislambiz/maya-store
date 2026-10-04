import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function ProductGallery360({ images = [], has360View = false, productName = '' }) {
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

  // Touch and mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || images.length <= 1) return;
    const diff = e.clientX - startXRef.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActiveAngleIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setActiveAngleIndex((prev) => (prev + 1) % images.length);
      }
      startXRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => setIsDragging(false);

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

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-md select-none">
      
      {/* 360 Badge & Interactive Controller Banner */}
      {has360View && (
        <div className="mb-3 flex items-center justify-between bg-gradient-to-r from-[#4C0519] to-[#881337] text-white px-3.5 py-2 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-white/20 text-amber-300">
              <RotateCcw className="size-4 animate-spin" style={{ animationDuration: '6s' }} />
            </span>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                ৩৬০° ইন্টারঅ্যাক্টিভ ভিউ
                <Sparkles className="size-3 text-amber-300 fill-amber-300" />
              </span>
              <p className="text-[10px] text-rose-200">ছবিটি ড্র্যাগ করে বা বাটনে ক্লিক করে চারদিক ঘুরে দেখুন</p>
            </div>
          </div>

          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`text-xs px-2.5 py-1 rounded-xl font-bold flex items-center gap-1 transition cursor-pointer ${
              isAutoSpinning
                ? 'bg-amber-400 text-slate-950'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            {isAutoSpinning ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span>{isAutoSpinning ? 'পজ' : 'অটো স্পিন'}</span>
          </button>
        </div>
      )}

      {/* Main Image Frame (Drag Enabled) */}
      <div
        className="relative aspect-square max-h-[460px] mx-auto flex items-center justify-center bg-gradient-to-b from-[#FFF5F6] via-[#FFF9FA] to-white rounded-2xl p-6 overflow-hidden cursor-grab active:cursor-grabbing border border-rose-100/80"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[activeAngleIndex] || images[0]}
          alt={`${productName} View ${activeAngleIndex + 1}`}
          decoding="async"
          className="max-h-full max-w-full object-contain drop-shadow-xl transition-all duration-300 pointer-events-none"
        />

        {/* Current Angle Label Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#3B0716]/85 backdrop-blur-md text-rose-100 text-[11px] font-bold px-3 py-1 rounded-full shadow border border-rose-900/40">
          ছবি {activeAngleIndex + 1} / {images.length}
        </div>

        {/* Left & Right Chevron Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveAngleIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md transition hover:scale-110 active:scale-95 cursor-pointer border border-rose-100"
              title="পূর্ববর্তী ছবি"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => setActiveAngleIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md transition hover:scale-110 active:scale-95 cursor-pointer border border-rose-100"
              title="পরবর্তী ছবি"
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
              className={`size-14 sm:size-16 rounded-xl p-1 bg-rose-50/50 border-2 transition-all shrink-0 overflow-hidden cursor-pointer ${
                activeAngleIndex === idx
                  ? 'border-rose-600 ring-2 ring-rose-500/20 shadow-md scale-105 bg-white'
                  : 'border-rose-100 hover:border-rose-300 opacity-75 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumb-${idx}`} loading="lazy" decoding="async" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
