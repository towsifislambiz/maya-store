import React from 'react';
import { CATEGORIES } from '../data/products';
import { LayoutGrid, Headphones, BatteryCharging, Volume2, Navigation, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP = {
  LayoutGrid,
  Headphones,
  BatteryCharging,
  Volume2,
  Navigation,
  Camera
};

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
        <div>
          <h2 className="text-base sm:text-xl font-black text-slate-900 font-sans tracking-tight">
            {t('categories_title')}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500">{t('categories_subtitle')}</p>
        </div>
        <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
          {t('total_categories_prefix')} {CATEGORIES.length - 1} {t('total_categories_suffix')}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || LayoutGrid;
          const isActive = activeCategory === cat.id;
          const categoryName = lang === 'en' ? (cat.nameEn || cat.nameBn) : cat.nameBn;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 border cursor-pointer ${
                isActive
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md scale-102 ring-2 ring-slate-950/20'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className={`p-1.5 rounded-xl ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-100 text-slate-600'}`}>
                <IconComp className="size-4" />
              </span>
              <span>{categoryName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
