import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

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

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-emerald-400" />
              <h2 className="font-bold text-base sm:text-lg">আপনার শপিং কার্ট ({cartItems.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-4 sm:p-5 grow overflow-y-auto divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <ShoppingBag className="size-16 mx-auto text-slate-300 mb-3 stroke-[1.5]" />
                <p className="font-bold text-slate-800 text-lg">আপনার কার্ট খালি!</p>
                <p className="text-xs text-slate-500 mt-1">পছন্দের গ্যাজেট কার্টে যোগ করুন।</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition"
                >
                  শপিং চালিয়ে যান
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
                    className="size-16 object-contain rounded-xl bg-slate-50 p-1.5 border border-slate-100 shrink-0"
                  />
                  <div className="grow min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedColor && (
                      <span className="inline-block mt-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        কালার: {item.selectedColor}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-slate-900 text-sm">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Bill & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              {/* Delivery Zone Selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">ডেলিভারি এরিয়া:</span>
                <select
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-800 outline-none"
                >
                  <option value="inside_dhaka">ঢাকা সিটির ভিতরে (৳{feeInside || 80})</option>
                  <option value="outside_dhaka">ঢাকার বাইরে (৳{feeOutside || 150})</option>
                </select>
              </div>

              {/* Subtotal & Total */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span className="font-bold text-slate-900">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-slate-900">৳{deliveryFee}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                  <span>সর্বমোট:</span>
                  <span className="text-emerald-600 text-lg">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-4 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-98"
              >
                <span>Proceed to Checkout (চেকআউট করুন)</span>
                <ArrowRight className="size-4 text-emerald-400" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>ক্যাশ অন ডেলিভারি | ১০০% নিরাপদ চেকআউট</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
