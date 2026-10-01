import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, MessageSquare, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function MobileDock() {
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const { isAdminUnlocked } = useAdminAuth();
  const { settings } = useStoreSettings();
  const location = useLocation();

  const rawWa = settings?.whatsappNumber || '8801322302319';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('880') ? cleanWa : cleanWa.startsWith('0') ? `88${cleanWa}` : `880${cleanWa}`;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0B0F19]/95 backdrop-blur-lg border-t border-slate-800/80 z-40 py-2 px-2 shadow-2xl">
      <div className={`grid ${isAdminUnlocked ? 'grid-cols-6' : 'grid-cols-5'} items-center text-center`}>
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
            isActive('/') ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="size-5" />
          <span className="text-[10px]">হোম</span>
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
            isActive('/shop') ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="size-5" />
          <span className="text-[10px]">শপিং</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/shop?filter=wishlist"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 relative transition ${
            location.search.includes('wishlist') ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <Heart className="size-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black size-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">পছন্দ</span>
        </Link>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${formattedWa}?text=আসসালামু%20আলাইকুম,%20Galaxy%20Gadgets%20থেকে%20প্রডাক্ট%20অর্ডার%20করতে%20চাই।`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-emerald-400 hover:text-emerald-300 transition"
        >
          <MessageSquare className="size-5 fill-emerald-400/20" />
          <span className="text-[10px] font-medium">হোয়াটসঅ্যাপ</span>
        </a>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 py-1 text-slate-400 hover:text-white transition relative"
        >
          <div className="relative">
            <ShoppingBag className="size-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-slate-950 text-[9px] font-black size-3.5 rounded-full flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">কার্ট</span>
        </button>

        {/* Admin (Only visible if 5-click unlocked) */}
        {isAdminUnlocked && (
          <Link
            to="/admin"
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition ${
              isActive('/admin') ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="size-5 text-amber-400" />
            <span className="text-[10px] text-amber-400 font-bold">অ্যাডমিন</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
