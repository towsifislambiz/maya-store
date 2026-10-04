import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    feeInside,
    feeOutside,
    grandTotal,
    deliveryZone,
    setDeliveryZone
  } = useCart();
  const { lang, t } = useLanguage();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-rose-900/20 flex items-center justify-between bg-gradient-to-r from-[#4C0519] to-[#881337] text-white">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center">
                <ShoppingBag className="size-4.5 text-amber-300" />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg">{t('your_cart')}</h2>
                <span className="text-[11px] text-rose-200">{cartItems.length} টি আইটেম যোগ করা হয়েছে</span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-4 sm:p-5 grow overflow-y-auto divide-y divide-rose-50">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <div className="size-20 rounded-full bg-rose-50 mx-auto flex items-center justify-center mb-3">
                  <ShoppingBag className="size-10 text-rose-300 stroke-[1.5]" />
                </div>
                <p className="font-black text-slate-800 text-lg">{t('cart_empty')}</p>
                <p className="text-xs text-slate-500 mt-1">{t('cart_empty_sub')}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-black px-6 py-3 rounded-2xl shadow-md shadow-rose-700/20 transition cursor-pointer"
                >
                  {t('continue_shopping')}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-3.5 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    loading="lazy"
                    decoding="async"
                    className="size-16 object-contain rounded-2xl bg-[#FFF5F6] p-1.5 border border-rose-100 shrink-0"
                  />
                  <div className="grow min-w-0">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                      {lang === 'en' ? item.product.name : (item.product.nameBn || item.product.name)}
                    </h4>
                    {item.selectedColor && (
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                        {lang === 'en' ? 'Color' : 'কালার'}: {item.selectedColor}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-rose-700 text-sm">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-rose-200 rounded-xl overflow-hidden bg-rose-50/50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="p-1.5 hover:bg-rose-100 text-slate-600 transition cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-2.5 text-xs font-black text-slate-900 font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          className="p-1.5 hover:bg-rose-100 text-slate-600 transition cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title={lang === 'en' ? 'Remove' : 'মুছে ফেলুন'}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Bill & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-rose-100 bg-[#FFFDFD] space-y-3">
              {/* Delivery Zone Selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">{t('delivery_area')}</span>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className="bg-white border border-rose-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-800 outline-none focus:border-rose-600"
                >
                  <option value="inside_dhaka">{t('inside_dhaka_opt')} (৳{feeInside || 60})</option>
                  <option value="outside_dhaka">{t('outside_dhaka_opt')} (৳{feeOutside || 120})</option>
                </select>
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>{t('cart_subtotal')}</span>
                  <span className="font-bold text-slate-900 font-sans">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('delivery_charge')}</span>
                  <span className="font-bold text-slate-900 font-sans">৳{deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-rose-100 flex justify-between text-base font-black text-slate-900">
                  <span>{t('grand_total')}</span>
                  <span className="text-rose-700 text-xl font-black font-sans">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white font-black py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition active:scale-98 cursor-pointer"
              >
                <span>{t('proceed_to_checkout')}</span>
                <ArrowRight className="size-4 text-amber-300" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>{t('safe_checkout_text')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
