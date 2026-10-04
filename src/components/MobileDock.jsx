import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function MobileDock() {
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const { isAdminUnlocked } = useAdminAuth();
  const { settings } = useStoreSettings();
  const { t } = useLanguage();
  const location = useLocation();

  const rawWa = settings?.whatsappNumber || '01814741111';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('880') ? cleanWa : cleanWa.startsWith('0') ? `88${cleanWa}` : `880${cleanWa}`;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-rose-100 z-40 py-2 px-2 shadow-[0_-4px_20px_rgba(136,19,55,0.08)]">
      <div className={`grid ${isAdminUnlocked ? 'grid-cols-6' : 'grid-cols-5'} items-center text-center`}>
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
            isActive('/') ? 'text-rose-700 font-extrabold' : 'text-slate-500 hover:text-rose-700'
          }`}
        >
          <Home className="size-5" />
          <span className="text-[10px]">{t('dock_home')}</span>
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
            isActive('/shop') ? 'text-rose-700 font-extrabold' : 'text-slate-500 hover:text-rose-700'
          }`}
        >
          <Grid className="size-5" />
          <span className="text-[10px]">{t('dock_shop')}</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/shop?filter=wishlist"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 relative transition ${
            location.search.includes('wishlist') ? 'text-rose-700 font-extrabold' : 'text-slate-500 hover:text-rose-700'
          }`}
        >
          <div className="relative">
            <Heart className="size-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-black size-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">{t('dock_wishlist')}</span>
        </Link>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${formattedWa}?text=${encodeURIComponent('আসসালামু আলাইকুম! Maya Shopping Mall থেকে পণ্য অর্ডার করতে চাই।')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-emerald-600 hover:text-emerald-700 transition"
        >
          <MessageSquare className="size-5 fill-emerald-600/20" />
          <span className="text-[10px] font-bold">{t('dock_whatsapp')}</span>
        </a>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-slate-500 hover:text-rose-700 transition relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="size-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-black size-3.5 rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">{t('dock_cart')}</span>
        </button>

        {/* Admin (Only visible if 5-click unlocked) */}
        {isAdminUnlocked && (
          <Link
            to="/admin"
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
              isActive('/admin') ? 'text-amber-600 font-extrabold' : 'text-slate-500 hover:text-amber-600'
            }`}
          >
            <ShieldCheck className="size-5 text-amber-600" />
            <span className="text-[10px] text-amber-600 font-bold">{t('dock_admin')}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
