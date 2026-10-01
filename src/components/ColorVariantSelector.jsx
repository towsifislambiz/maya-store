import React from 'react';
import { Check } from 'lucide-react';

export default function ColorVariantSelector({ colors, selectedColor, onSelectColor }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          কালার ভ্যারিয়েন্ট সিলেক্ট করুন:
        </span>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          নির্বাচিত: {selectedColor}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {colors.map((color) => {
          const isSelected = selectedColor === color.name;
          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-slate-950/20 scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <span
                className="size-3.5 rounded-full border border-black/15 shrink-0 shadow-inner flex items-center justify-center"
                style={{ backgroundColor: color.hex || '#CCCCCC' }}
              >
                {isSelected && (
                  <Check className={`size-2.5 ${color.hex === '#FFFFFF' || color.hex === '#F1F5F9' ? 'text-black' : 'text-white'}`} />
                )}
              </span>
              <span>{color.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
