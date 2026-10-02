import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();

  const rawWa = settings?.whatsappNumber || '8801322302319';
  const cleanDigits = rawWa.replace(/[^0-9]/g, '');
  const cleanWa = cleanDigits.startsWith('880') ? cleanDigits : cleanDigits.startsWith('0') ? `88${cleanDigits}` : `880${cleanDigits}`;

  return (
    <footer className="bg-[#070A11] text-slate-400 text-xs border-t border-slate-800/80 pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/logo.webp"
                alt="Galaxy Gadgets Logo"
                loading="lazy"
                decoding="async"
                className="size-9 object-contain rounded-xl bg-black border border-slate-800 shadow"
              />
              <span className="text-xl font-black text-white font-sans tracking-tight">
                GALAXY<span className="text-cyan-400">GADGETS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer_about')}
            </p>
            <div className="pt-1 flex items-center gap-3 text-slate-300">
              <span className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-400">
                {t('verified_shop')}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
              {t('quick_links')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  {lang === 'en' ? 'View All Products' : 'সকল প্রডাক্ট দেখুন'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=audio" className="hover:text-white transition">
                  {lang === 'en' ? 'AirPods & Earbuds' : 'এয়ারপডস ও হেডফোন'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=powerbank" className="hover:text-white transition">
                  {lang === 'en' ? 'Fast Power Banks' : 'ফাস্ট পাওয়ার ব্যাংক'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=drones" className="hover:text-white transition">
                  {lang === 'en' ? 'Camera Drones' : 'ক্যামেরা ড্রোন'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=camera" className="hover:text-white transition">
                  {lang === 'en' ? 'Mini Digital Cameras' : 'মিনি ডিজিটাল ক্যামেরা'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policy */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
              {t('customer_care')}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Truck className="size-3.5 text-emerald-400" />
                <span>{lang === 'en' ? 'Dhaka City: 24-48 hrs' : 'ঢাকা সিটি: ২৪-৪৮ ঘণ্টা'}</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Truck className="size-3.5 text-cyan-400" />
                <span>{lang === 'en' ? 'Outside Dhaka: 2-3 days' : 'ঢাকার বাইরে: ২-৩ দিন'}</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <RotateCcw className="size-3.5 text-amber-400" />
                <span>{lang === 'en' ? '7-Day Replacement Policy' : '৭ দিনের রিপ্লেসমেন্ট সুবিধা'}</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="size-3.5 text-blue-400" />
                <span>{lang === 'en' ? 'Cash on Delivery (Pay upon arrival)' : 'ক্যাশ অন ডেলিভারি (পণ্য দেখে পেমেন্ট)'}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotline */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
              {t('contact_support')}
            </h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${settings?.hotline || '+8801322302319'}`}
                className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 hover:border-emerald-500 transition group block"
              >
                <div className="size-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block -mb-0.5">{t('emergency_hotline')}</span>
                  <span className="font-sans font-bold text-white group-hover:text-emerald-400 transition text-sm">
                    {settings?.hotline || '+880 1322-302319'}
                  </span>
                </div>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings?.email || 'gadgetsgalaxy2026gg@gmail.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Gmail এ সরাসরি ইমেইল পাঠান (ক্লিক করুন)"
                className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2.5 hover:border-cyan-400 hover:bg-slate-800/80 transition-all group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:scale-105 transition">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block -mb-0.5">
                      {lang === 'en' ? 'Official Email (Gmail)' : 'অফিসিয়াল ইমেইল (Gmail)'}
                    </span>
                    <span className="text-slate-300 group-hover:text-cyan-400 font-mono transition truncate text-xs block">
                      {settings?.email || 'gadgetsgalaxy2026gg@gmail.com'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-cyan-400/80 group-hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md shrink-0 hidden sm:inline-block">
                  {lang === 'en' ? 'Email ↗' : 'ইমেইল করুন ↗'}
                </span>
              </a>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2.5 text-[11px] text-slate-400">
                <MapPin className="size-4 text-amber-400 shrink-0" />
                <span className="truncate">{settings?.address || (lang === 'en' ? 'Online Store, Bangladesh' : 'অনলাইন স্টোর, বাংলাদেশ')}</span>
              </div>

              <a
                href={`https://wa.me/${cleanWa}?text=আসসালামু%20আলাইকুম!%20Galaxy%20Gadgets%20থেকে%20তথ্য%20জানতে%20চাচ্ছি।`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center justify-center gap-2 hover:bg-emerald-600/30 transition font-bold"
              >
                <span>{lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে চ্যাট করুন'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-slate-500 mr-1">
              {lang === 'en' ? 'Payment Methods:' : 'পেমেন্ট মাধ্যম:'}
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300 font-bold text-[10px]">
              {lang === 'en' ? 'Cash on Delivery (COD)' : 'ক্যাশ অন ডেলিভারি (COD)'}
            </span>
            <span className="bg-[#DF146E]/20 text-[#DF146E] border border-[#DF146E]/40 px-2.5 py-1 rounded font-bold text-[10px]">
              bKash: {settings?.bkashNumber || '01749-765271'}
            </span>
            <span className="bg-[#F7941D]/20 text-[#F7941D] border border-[#F7941D]/40 px-2.5 py-1 rounded font-bold text-[10px]">
              Nagad
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300 font-bold text-[10px]">
              Rocket / Bank Cards
            </span>
          </div>

          {/* Copyright & Agency Watermark */}
          <div className="text-slate-500 text-[11px]">
            <p>© {CURRENT_YEAR} Galaxy Gadgets. {t('all_rights_reserved')}</p>
            <p className="mt-0.5 text-slate-400">
              Tech Partner: <span className="text-cyan-400 font-semibold">Webcraft BD</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
