import React from 'react';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function FloatingWhatsApp() {
  const { settings } = useStoreSettings();
  const rawNumber = settings?.whatsappNumber || '8801322302319';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const formattedWa = cleanNumber.startsWith('880') ? cleanNumber : cleanNumber.startsWith('0') ? `88${cleanNumber}` : `880${cleanNumber}`;
  const defaultMessage = encodeURIComponent('আসসালামু আলাইকুম! Galaxy Gadgets থেকে গ্যাজেট অর্ডার বা যেকোনো তথ্য জানতে চাচ্ছি।');
  const whatsappUrl = `https://wa.me/${formattedWa}?text=${defaultMessage}`;
  const fbUrl = settings?.facebookPage || 'https://www.facebook.com/share/1FA8LYE5Y4/';

  return (
    <aside aria-label="Social Support Chat" className="fixed bottom-20 md:bottom-7 right-3.5 md:right-7 z-40 select-none flex flex-col items-center gap-2.5">
      {/* Floating Facebook Page Button */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center size-11 sm:size-12 rounded-full bg-[#1877F2] text-white shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 group"
        title="আমাদের ফেসবুক পেজ ভিজিট করুন"
      >
        <svg className="size-5 sm:size-6 fill-white group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center size-12 sm:size-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 group"
        title="WhatsApp-এ মেসেজ দিন"
      >
        {/* Radar Ping Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none"></span>

        {/* WhatsApp SVG Icon */}
        <svg
          className="size-6 sm:size-7 fill-white relative z-10 drop-shadow-md group-hover:rotate-12 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031a9.98 9.98 0 0 0 1.637 5.48L2 22l4.63-1.603a9.99 9.99 0 0 0 5.401 1.634c5.536 0 10.031-4.495 10.031-10.031S17.567 2 12.031 2zm0 18.257a8.21 8.21 0 0 1-4.223-1.168l-.303-.18-3.13.822.836-3.05-.198-.314a8.218 8.218 0 0 1-1.258-4.336c0-4.562 3.712-8.274 8.276-8.274 4.564 0 8.276 3.712 8.276 8.274 0 4.562-3.712 8.276-8.276 8.276zm4.537-6.208c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.737-.658-1.235-1.47-1.38-1.718-.145-.248-.016-.382.108-.506.112-.112.248-.29.373-.435.124-.145.166-.248.248-.415.083-.166.042-.31-.02-.435-.062-.124-.56-1.348-.767-1.846-.202-.485-.407-.419-.56-.427-.145-.008-.31-.01-.476-.01s-.435.062-.663.31c-.228.248-.87.85-.87 2.074s.891 2.406 1.015 2.572c.124.166 1.753 2.678 4.248 3.755.593.256 1.057.409 1.418.524.596.189 1.139.162 1.568.098.479-.071 1.468-.601 1.675-1.182.207-.58.207-1.077.145-1.182-.062-.104-.228-.166-.476-.29z" />
        </svg>

        {/* Live Active Online Badge */}
        <span className="absolute top-0 right-0 size-3 sm:size-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full z-20"></span>
      </a>
    </aside>
  );
}
