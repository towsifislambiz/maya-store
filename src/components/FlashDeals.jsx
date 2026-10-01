import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => num.toString().padStart(2, '0');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 rounded-xl sm:rounded-2xl py-2 px-3 sm:py-2.5 sm:px-4 border border-slate-800 text-white flex items-center justify-between gap-2.5 sm:gap-4 shadow-lg">
        
        {/* Left Title */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="size-8 sm:size-9 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 border border-rose-500/30">
            <Flame className="size-4 sm:size-4.5 fill-rose-500 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-rose-500 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                ফ্ল্যাশ সেল
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-400 font-bold flex items-center gap-0.5 hidden xs:inline-flex">
                <Sparkles className="size-2.5" />
                লিমিটেড অফার
              </span>
            </div>
            <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white font-sans truncate mt-0.5">
              আজকের সেরা মেগা ডিসকাউন্ট ডিল
            </h3>
          </div>
        </div>

        {/* Right Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="items-center gap-1 text-[11px] text-slate-400 mr-0.5 hidden lg:flex">
            <Clock className="size-3.5 text-rose-400" />
            <span>অফার শেষ হতে বাকি:</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 text-center font-sans">
            {/* Hours */}
            <div className="bg-slate-900/95 border border-slate-700/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg min-w-[28px] sm:min-w-[34px] shadow-inner">
              <span className="text-xs sm:text-sm font-black text-white block leading-tight">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase font-semibold">ঘণ্টা</span>
            </div>
            <span className="text-slate-500 font-black text-xs sm:text-sm">:</span>

            {/* Minutes */}
            <div className="bg-slate-900/95 border border-slate-700/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg min-w-[28px] sm:min-w-[34px] shadow-inner">
              <span className="text-xs sm:text-sm font-black text-white block leading-tight">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 uppercase font-semibold">মিনিট</span>
            </div>
            <span className="text-slate-500 font-black text-xs sm:text-sm">:</span>

            {/* Seconds */}
            <div className="bg-rose-500/20 border border-rose-500/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg min-w-[28px] sm:min-w-[34px] shadow-inner">
              <span className="text-xs sm:text-sm font-black text-rose-400 block leading-tight">
                {formatDigit(timeLeft.seconds)}
              </span>
              <span className="text-[7px] sm:text-[8px] text-rose-300 uppercase font-semibold">সেকেন্ড</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
