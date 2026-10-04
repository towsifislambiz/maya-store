import React from 'react';
import { CATEGORIES } from '../data/products';
import { LayoutGrid, BedDouble, HeartHandshake, Gift, Shirt, Sparkles, Crown, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  LayoutGrid,
  BedDouble,
  HeartHandshake,
  Gift,
  Shirt,
  Sparkles,
  Crown,
  ShoppingBag
};

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 className="text-base sm:text-xl font-black text-slate-900 font-sans tracking-tight">
            {t('categories_title')}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">{t('categories_subtitle')}</p>
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
          {t('total_categories_prefix')} {CATEGORIES.length - 1} {t('total_categories_suffix')}
        </span>
      </div>

      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || LayoutGrid;
          const isActive = activeCategory === cat.id;
          const categoryName = lang === 'en' ? (cat.nameEn || cat.nameBn) : cat.nameBn;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 border cursor-pointer touch-manipulation ${
                isActive
                  ? 'bg-rose-700 text-white border-rose-700 shadow-md shadow-rose-700/20 scale-102 ring-2 ring-rose-500/20'
                  : 'bg-white text-slate-700 border-rose-100/90 hover:border-rose-300 hover:bg-rose-50/60'
              }`}
            >
              <span className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20 text-amber-300' : 'bg-rose-50 text-rose-700'}`}>
                <IconComp className="size-4" />
              </span>
              <span className="whitespace-nowrap">{categoryName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
