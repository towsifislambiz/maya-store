import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ShoppingBag, CheckCircle2, ArrowLeft, AlertCircle, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { cartItems, subtotal, deliveryZone, setDeliveryZone, deliveryFee, feeInside, feeOutside, grandTotal, clearCart } = useCart();
  const { placeOrder, loading } = useOrders();
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bkash'
  const [bkashSender, setBkashSender] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const BKASH_NUMBER = settings?.bkashNumber || '01821067277';

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="size-20 rounded-full bg-rose-50 mx-auto flex items-center justify-center mb-3">
          <ShoppingBag className="size-10 text-rose-300 stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-black text-slate-800">{t('cart_empty')}</h2>
        <p className="text-xs text-slate-500 mt-1 mb-5">{t('cart_empty_sub')}</p>
        <Link to="/shop" className="bg-rose-700 hover:bg-rose-800 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md transition cursor-pointer">
          {t('continue_shopping')}
        </Link>
      </div>
    );
  }

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BKASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please provide your full name.' : 'অনুগ্রহ করে আপনার নাম দিন।');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid 11-digit mobile number (e.g., 018XXXXXXXX).' : 'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 018XXXXXXXX)।');
      return;
    }
    if (!address.trim()) {
      setErrorMsg(lang === 'en' ? 'Please provide your complete delivery address.' : 'অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা দিন।');
      return;
    }

    if (paymentMethod === 'bkash') {
      const cleanBkash = bkashSender.replace(/[^0-9]/g, '');
      if (cleanBkash.length < 11) {
        setErrorMsg(lang === 'en' ? 'Enter valid 11-digit bKash sender number.' : 'যে বিকাশ নাম্বার থেকে টাকা পাঠিয়েছেন সেটি সঠিকভাবে লিখুন (১১ ডিজিট)।');
        return;
      }
      if (!bkashTrxId.trim() || bkashTrxId.trim().length < 4) {
        setErrorMsg(lang === 'en' ? 'Please enter the bKash TrxID.' : 'বিকাশ থেকে মেসেজে পাওয়া সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।');
        return;
      }
    }

    const orderData = {
      customerName: customerName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      deliveryZone,
      deliveryFee,
      paymentMethod,
      bkashTargetNumber: paymentMethod === 'bkash' ? BKASH_NUMBER : null,
      bkashSender: paymentMethod === 'bkash' ? bkashSender.trim() : null,
      bkashTrxId: paymentMethod === 'bkash' ? bkashTrxId.trim().toUpperCase() : null,
      items: cartItems.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          nameBn: item.product.nameBn,
          price: item.product.price,
          images: [item.product.images[0]],
        },
        quantity: item.quantity,
        selectedColor: item.selectedColor || 'Standard',
      })),
      totalAmount: grandTotal,
    };

    try {
      const placed = await placeOrder(orderData);
      clearCart();
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {}
      navigate(`/order-success/${placed.orderTrackingId}`, { state: { order: placed } });
    } catch {
      setErrorMsg(lang === 'en' ? 'Failed to submit order. Please try again.' : 'অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-screen pt-4 sm:pt-8 pb-24 md:pb-12 bg-[#FFFDFD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-900 mb-6 transition">
          <ArrowLeft className="size-4" />
          <span>{t('back_to_shop')}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-rose-100 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black text-rose-700 uppercase tracking-wider mb-1">
              <Sparkles className="size-3.5 fill-rose-600" />
              <span>{t('checkout_tag')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-sans mb-4">
              {t('checkout_heading')}
            </h1>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('full_name')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('full_name_placeholder')}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#FFF5F6] border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('phone_number')}</label>
                <input
                  type="tel"
                  required
                  placeholder={t('phone_number_placeholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FFF5F6] border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('full_address')}</label>
                <textarea
                  required
                  rows={2}
                  placeholder={t('full_address_placeholder')}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FFF5F6] border border-rose-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-rose-600 focus:bg-white transition resize-none"
                />
              </div>

              {/* Delivery Zone Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('delivery_zone_label')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryZone('inside_dhaka')}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer touch-manipulation ${
                      deliveryZone === 'inside_dhaka'
                        ? 'bg-rose-700 text-white border-rose-700 shadow-md ring-2 ring-rose-500/20'
                        : 'bg-[#FFF5F6] border-rose-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{t('dhaka_city_inside')}</p>
                      <p className="text-[10px] opacity-80">{t('dhaka_delivery_time')}</p>
                    </div>
                    <span className="font-black text-sm">৳{feeInside}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer touch-manipulation ${
                      deliveryZone === 'outside_dhaka'
                        ? 'bg-rose-700 text-white border-rose-700 shadow-md ring-2 ring-rose-500/20'
                        : 'bg-[#FFF5F6] border-rose-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{t('outside_dhaka_title')}</p>
                      <p className="text-[10px] opacity-80">{t('outside_delivery_time')}</p>
                    </div>
                    <span className="font-black text-sm">৳{feeOutside}</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'en' ? 'Payment Method *' : 'পেমেন্ট মাধ্যম *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-rose-700 text-white border-rose-700 shadow-md'
                        : 'bg-[#FFF5F6] border-rose-200 text-slate-700'
                    }`}
                  >
                    <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      paymentMethod === 'cod' ? 'border-white bg-white' : 'border-slate-400'
                    }`}>
                      {paymentMethod === 'cod' && <Check className="size-3 text-rose-700 stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        {lang === 'en' ? 'Cash on Delivery (COD)' : 'ক্যাশ অন ডেলিভারি (COD)'}
                      </p>
                      <p className="text-[10px] opacity-80">
                        {lang === 'en' ? 'Pay upon delivery' : 'পণ্য দেখে মূল্য পরিশোধ'}
                      </p>
                    </div>
                  </button>

                  {/* bKash Manual */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'bg-[#E2136E] text-white border-[#E2136E] shadow-md'
                        : 'bg-[#FFF5F6] border-rose-200 text-slate-700'
                    }`}
                  >
                    <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      paymentMethod === 'bkash' ? 'border-white bg-white' : 'border-slate-400'
                    }`}>
                      {paymentMethod === 'bkash' && <Check className="size-3 text-[#E2136E] stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold">
                        {lang === 'en' ? 'bKash (Send Money)' : 'বিকাশ পার্সোনাল (Send Money)'}
                      </p>
                      <p className="text-[10px] opacity-80">
                        {lang === 'en' ? 'Instant bKash payment' : 'দ্রুত বিকাশ পেমেন্ট'}
                      </p>
                    </div>
                  </button>
                </div>

                {/* bKash Instructions & Inputs Box */}
                {paymentMethod === 'bkash' && (
                  <div className="mt-3 p-4 rounded-2xl bg-rose-50 border border-[#E2136E]/30 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                      <span className="text-xs font-bold text-[#E2136E]">
                        {lang === 'en' ? 'bKash Personal Number (Send Money):' : 'বিকাশ পার্সোনাল নাম্বার (Send Money):'}
                      </span>
                      <span className="text-[10px] bg-[#E2136E] text-white px-2 py-0.5 rounded font-black">bKash Personal</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-rose-200 flex items-center justify-between">
                      <span className="text-base font-black font-sans text-slate-900 tracking-wider">
                        {BKASH_NUMBER}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="bg-[#E2136E] text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
                      >
                        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                        <span>{copied ? (lang === 'en' ? 'Copied' : 'কপি হয়েছে') : (lang === 'en' ? 'Copy' : 'কপি করুন')}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600">
                      {lang === 'en'
                        ? <>Send total <strong>৳{grandTotal.toLocaleString()}</strong> to this number and provide details below:</>
                        : <>মোট <strong>৳{grandTotal.toLocaleString()}</strong> টাকা এই নম্বরে Send Money করার পর তথ্যগুলো দিন:</>}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                          {lang === 'en' ? 'Your bKash Number *' : 'আপনার বিকাশ নাম্বার *'}
                        </label>
                        <input
                          type="tel"
                          required={paymentMethod === 'bkash'}
                          placeholder="018XXXXXXXX"
                          value={bkashSender}
                          onChange={(e) => setBkashSender(e.target.value)}
                          className="w-full bg-white border border-rose-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#E2136E]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                          {lang === 'en' ? 'bKash TrxID *' : 'বিকাশ TrxID *'}
                        </label>
                        <input
                          type="text"
                          required={paymentMethod === 'bkash'}
                          placeholder="যেমন: 9J8K2L4P"
                          value={bkashTrxId}
                          onChange={(e) => setBkashTrxId(e.target.value)}
                          className="w-full bg-white border border-rose-200 rounded-lg px-2.5 py-1.5 text-xs outline-none uppercase font-mono focus:border-[#E2136E]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 font-black py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-xs sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-600/25 transition active:scale-98 disabled:opacity-50 cursor-pointer touch-manipulation ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#E2136E] hover:bg-[#c90f5f] text-white'
                    : 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white'
                }`}
              >
                <CheckCircle2 className="size-5 text-amber-300 shrink-0" />
                <span className="text-center leading-tight">
                  {paymentMethod === 'bkash'
                    ? (lang === 'en' ? 'Place Order with bKash' : 'বিকাশ পেমেন্ট সহ অর্ডার করুন')
                    : (lang === 'en' ? 'Confirm Order (Cash on Delivery)' : 'ক্যাশ অন ডেলিভারিতে অর্ডার করুন')} — ৳{grandTotal.toLocaleString()}
                </span>
              </button>
            </form>
          </div>

          {/* Right: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-black text-slate-900 text-base mb-4 pb-3 border-b border-rose-100 flex items-center gap-2">
              <ShoppingBag className="size-4 text-rose-700" />
              <span>
                {lang === 'en' ? `Order Summary (${cartItems.length} items)` : `অর্ডার সারসংক্ষেপ (${cartItems.length}টি আইটেম)`}
              </span>
            </h3>

            <div className="divide-y divide-rose-50 max-h-72 overflow-y-auto mb-4">
              {cartItems.map(item => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-3 flex items-center gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="size-12 object-contain bg-[#FFF5F6] rounded-xl p-1 border border-rose-100 shrink-0" />
                  <div className="grow min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 truncate">
                      {lang === 'en' ? item.product.name : (item.product.nameBn || item.product.name)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {lang === 'en' ? 'Color' : 'কালার'}: {item.selectedColor} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-black text-xs text-rose-700 font-sans">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-rose-100 text-xs text-slate-600">
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

            <div className="mt-4 p-3 bg-rose-50/60 rounded-xl text-[11px] text-slate-600 space-y-1 border border-rose-100">
              <p className="flex items-center gap-1.5 text-rose-900 font-bold">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>{lang === 'en' ? 'Safe Payment & Fast Delivery' : 'নিরাপদ পেমেন্ট ও ডেলিভারি'}</span>
              </p>
              <p>
                {lang === 'en'
                  ? 'Shop hassle-free with nationwide cash on delivery or instant bKash payment.'
                  : 'ক্যাশ অন ডেলিভারি অথবা বিকাশের মাধ্যমে নিশ্চিন্তে কেনাকাটা করুন।'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
