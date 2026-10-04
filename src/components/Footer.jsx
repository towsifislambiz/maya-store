import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();

  const rawWa = settings?.whatsappNumber || '01814741111';
  const cleanDigits = rawWa.replace(/[^0-9]/g, '');
  const cleanWa = cleanDigits.startsWith('880') ? cleanDigits : cleanDigits.startsWith('0') ? `88${cleanDigits}` : `880${cleanDigits}`;

  return (
    <footer className="bg-[#181114] text-slate-400 text-xs border-t border-rose-950/60 pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-rose-950/60">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/assets/logo.svg"
                alt="Maya Shopping Mall Logo"
                loading="lazy"
                decoding="async"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-rose-100/70 leading-relaxed">
              {t('footer_about')}
            </p>
            <div className="pt-1 flex items-center gap-2.5 text-slate-300 flex-wrap">
              <span className="bg-rose-950/80 border border-rose-800 px-2.5 py-1 rounded-md text-[11px] font-bold text-amber-300">
                {t('verified_shop')}
              </span>
              <span className="bg-rose-950/80 border border-rose-800 px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-400">
                ক্যাশ অন ডেলিভারি
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
                <Link to="/shop" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'All Collections' : 'সকল কালেকশন দেখুন'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=bedding" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Bedding Combo Sets' : 'বেডিং কম্বো সেট'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=couple" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Couple Matching Sets' : 'কাপল ড্রেস কালেকশন'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hamper" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Men’s Luxury Hampers' : '৭-ইন-১ লাক্সারি গিফট হ্যাম্পার'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=polo" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Polo Shirts' : 'প্রিমিয়াম পোলো শার্ট'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kashmiri" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Kashmiri 3-Piece' : 'কাশ্মীরি থ্রি-পিস ও কুর্তি'}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=lifestyle" className="hover:text-amber-300 transition">
                  {lang === 'en' ? 'Bags & Lifestyle' : 'ব্যাগ ও লাইফস্টাইল'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policy */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">
              {t('customer_care')}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-rose-100/90">
                <Truck className="size-4 text-amber-400 shrink-0" />
                <span>{lang === 'en' ? 'Naogaon Sadar: 24 hrs' : 'নওগাঁ সদর: ২৪ ঘণ্টা (৬০৳)'}</span>
              </li>
              <li className="flex items-center gap-2 text-rose-100/90">
                <Truck className="size-4 text-rose-400 shrink-0" />
                <span>{lang === 'en' ? 'Outside Naogaon: 2-3 days' : 'নওগাঁর বাইরে: ২-৩ দিন (১২০৳)'}</span>
              </li>
              <li className="flex items-center gap-2 text-rose-100/90">
                <RotateCcw className="size-4 text-emerald-400 shrink-0" />
                <span>{lang === 'en' ? 'Easy Exchange & Return Policy' : '১০০% কোয়ালিটি গ্যারান্টি ও সহজ রিটার্ন'}</span>
              </li>
              <li className="flex items-center gap-2 text-rose-100/90">
                <ShieldCheck className="size-4 text-amber-400 shrink-0" />
                <span>{lang === 'en' ? 'Cash on Delivery (Pay after check)' : 'ক্যাশ অন ডেলিভারি (পণ্য দেখে পেমেন্ট)'}</span>
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
                href={`tel:${settings?.hotline || '01814741111'}`}
                className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center gap-3 hover:border-amber-400 transition group block"
              >
                <div className="size-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="size-4" />
                </div>
                <div>
                  <span className="text-[10px] text-rose-300 block -mb-0.5">{t('emergency_hotline')}</span>
                  <span className="font-sans font-bold text-white group-hover:text-amber-300 transition text-sm">
                    {settings?.hotline || '01814741111'}
                  </span>
                </div>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings?.email || 'masud97186@gmail.com')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Gmail এ সরাসরি ইমেইল পাঠান"
                className="p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center justify-between gap-2.5 hover:border-rose-400 hover:bg-rose-950/80 transition-all group cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 group-hover:scale-105 transition">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-rose-300 block -mb-0.5">
                      {lang === 'en' ? 'Official Email' : 'অফিসিয়াল ইমেইল'}
                    </span>
                    <span className="text-rose-100 group-hover:text-amber-300 font-mono transition truncate text-xs block">
                      {settings?.email || 'masud97186@gmail.com'}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 group-hover:text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md shrink-0 hidden sm:inline-block">
                  ইমেইল ↗
                </span>
              </a>

              <div className="p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-xl flex items-center gap-2.5 text-[11px] text-rose-200">
                <MapPin className="size-4 text-amber-400 shrink-0" />
                <span className="truncate">{settings?.address || 'নওগাঁ সদর, নওগাঁ'}</span>
              </div>

              <a
                href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('আসসালামু আলাইকুম! Maya Shopping Mall থেকে পণ্য সম্পর্কে জানতে চাচ্ছি।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center justify-center gap-2 hover:bg-emerald-600/30 transition font-bold"
              >
                <span>{lang === 'en' ? 'Chat on WhatsApp' : 'হোয়াটসঅ্যাপে চ্যাট করুন'} (01814741111)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-rose-300/80 mr-1">
              {lang === 'en' ? 'Payment Methods:' : 'পেমেন্ট মাধ্যম:'}
            </span>
            <span className="bg-rose-950/90 border border-rose-900 px-2.5 py-1 rounded text-rose-200 font-bold text-[10px]">
              {lang === 'en' ? 'Cash on Delivery (COD)' : 'ক্যাশ অন ডেলিভারি (COD)'}
            </span>
            <span className="bg-[#DF146E]/20 text-[#DF146E] border border-[#DF146E]/40 px-2.5 py-1 rounded font-bold text-[10px]">
              bKash (Personal): {settings?.bkashNumber || '01821067277'}
            </span>
            <span className="bg-[#F7941D]/20 text-[#F7941D] border border-[#F7941D]/40 px-2.5 py-1 rounded font-bold text-[10px]">
              Nagad
            </span>
          </div>

          {/* Copyright & Agency Watermark */}
          <div className="text-rose-300/60 text-[11px]">
            <p>© {CURRENT_YEAR} Maya Shopping Mall. {t('all_rights_reserved')}</p>
            <p className="mt-0.5 text-rose-300/80">
              নওগাঁ সদর, নওগাঁ | Tech Partner: <span className="text-amber-400 font-semibold">Webcraft BD</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
