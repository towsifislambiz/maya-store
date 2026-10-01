import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, CheckCircle2, AlertCircle, Sparkles, Phone, MapPin, User, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function OneClickOrderForm({ product, selectedColor, quantity }) {
  const { placeOrder, loading } = useOrders();
  const { settings } = useStoreSettings();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka'); // inside_dhaka or outside_dhaka
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bkash'
  const [bkashSender, setBkashSender] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const BKASH_NUMBER = settings?.bkashNumber || '01749765271';
  const feeInside = Number(settings?.deliveryFeeInside) || 80;
  const feeOutside = Number(settings?.deliveryFeeOutside) || 150;

  const deliveryFee = deliveryZone === 'inside_dhaka' ? feeInside : feeOutside;
  const itemTotal = product.price * quantity;
  const grandTotal = itemTotal + deliveryFee;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(BKASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!customerName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন।');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)।');
      return;
    }
    if (!address.trim() || address.trim().length < 5) {
      setErrorMsg('অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/এলাকা/জেলা)।');
      return;
    }

    if (paymentMethod === 'bkash') {
      const cleanBkash = bkashSender.replace(/[^0-9]/g, '');
      if (cleanBkash.length < 11) {
        setErrorMsg('যে বিকাশ নাম্বার থেকে টাকা পাঠিয়েছেন সেটি সঠিকভাবে লিখুন (১১ ডিজিট)।');
        return;
      }
      if (!bkashTrxId.trim() || bkashTrxId.trim().length < 4) {
        setErrorMsg('বিকাশ থেকে মেসেজে পাওয়া সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।');
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
      items: [
        {
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            images: [product.images[0]],
          },
          quantity,
          selectedColor: selectedColor || (product.colors && product.colors[0]?.name) || 'Standard',
        }
      ],
      totalAmount: grandTotal,
    };

    try {
      const placed = await placeOrder(orderData);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      navigate(`/order-success/${placed.orderTrackingId}`, { state: { order: placed } });
    } catch {
      setErrorMsg('অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন বা সরাসরি কল দিন।');
    }
  };

  return (
    <div id="order-form" className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl mt-6 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="size-4" />
          <span>১-ক্লিক সহজ অর্ডার ফর্ম</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
          অর্ডার কনফার্ম করতে নিচের তথ্যগুলো পূরণ করুন
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          ক্যাশ অন ডেলিভারি অথবা বিকাশের মাধ্যমে দ্রুত পেমেন্ট করে অর্ডার কনফার্ম করুন।
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3.5 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        {/* Customer Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            আপনার নাম *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="যেমন: তানভীর আহমেদ"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-800/90 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm placeholder:text-slate-500 transition"
            />
            <User className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
          </div>
        </div>

        {/* Customer Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            মোবাইল নাম্বার *
          </label>
          <div className="relative">
            <input
              type="tel"
              required
              placeholder="যেমন: 017XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-800/90 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm placeholder:text-slate-500 transition"
            />
            <Phone className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
          </div>
        </div>

        {/* Full Delivery Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
          </label>
          <div className="relative">
            <textarea
              required
              rows={2}
              placeholder="যেমন: বাসা নং ১২, রোড নং ৪, সেক্টর ৭, উত্তরা, ঢাকা"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-800/90 text-white pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none text-sm placeholder:text-slate-500 transition resize-none"
            />
            <MapPin className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
          </div>
        </div>

        {/* Delivery Zone Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            ডেলিভারি এরিয়া সিলেক্ট করুন *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryZone('inside_dhaka')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                deliveryZone === 'inside_dhaka'
                  ? 'bg-slate-800 border-cyan-400 shadow-md ring-2 ring-cyan-400/20 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div>
                <p className="text-xs font-bold">ঢাকা সিটির ভিতরে</p>
                <p className="text-[11px] text-slate-400">২৪-৪৮ ঘণ্টার মধ্যে</p>
              </div>
              <span className="text-cyan-400 font-extrabold text-sm">৳{feeInside}</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryZone('outside_dhaka')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                deliveryZone === 'outside_dhaka'
                  ? 'bg-slate-800 border-cyan-400 shadow-md ring-2 ring-cyan-400/20 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div>
                <p className="text-xs font-bold">ঢাকার বাইরে (সারা দেশ)</p>
                <p className="text-[11px] text-slate-400">২-৩ দিনের মধ্যে</p>
              </div>
              <span className="text-cyan-400 font-extrabold text-sm">৳{feeOutside}</span>
            </button>
          </div>
        </div>

        {/* Payment Method Selector (COD vs bKash Manual) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            পেমেন্ট মাধ্যম বেছে নিন *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option 1: Cash on Delivery */}
            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                paymentMethod === 'cod'
                  ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-400/20 text-white shadow-md'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                paymentMethod === 'cod' ? 'border-emerald-400 bg-emerald-500' : 'border-slate-500'
              }`}>
                {paymentMethod === 'cod' && <Check className="size-3 text-slate-950 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-bold text-white">ক্যাশ অন ডেলিভারি (COD)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">পণ্য হাতে পেয়ে দেখে টাকা দিন</p>
              </div>
            </button>

            {/* Option 2: bKash Manual Send Money */}
            <button
              type="button"
              onClick={() => setPaymentMethod('bkash')}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
                paymentMethod === 'bkash'
                  ? 'bg-[#E2136E]/15 border-[#E2136E] ring-2 ring-[#E2136E]/30 text-white shadow-md'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                paymentMethod === 'bkash' ? 'border-[#E2136E] bg-[#E2136E]' : 'border-slate-500'
              }`}>
                {paymentMethod === 'bkash' && <Check className="size-3 text-white stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-bold text-[#FF5B99]">বিকাশ ম্যানুয়াল (Send Money)</p>
                <p className="text-[11px] text-slate-400 mt-0.5">দ্রুত বিকাশ পেমেন্ট সুবিধা</p>
              </div>
            </button>
          </div>

          {/* bKash Payment Box Details (when bKash is active) */}
          {paymentMethod === 'bkash' && (
            <div className="mt-3.5 p-4 rounded-2xl bg-[#E2136E]/10 border border-[#E2136E]/40 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2136E]/20">
                <span className="text-xs font-bold text-[#FF80B2] uppercase tracking-wide">
                  বিকাশ সেন্ড মানি (Personal Number):
                </span>
                <span className="text-[10px] bg-[#E2136E] text-white px-2 py-0.5 rounded font-black">
                  bKash Personal
                </span>
              </div>

              {/* bKash Number & Copy Action */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block -mb-0.5">আমাদের বিকাশ নম্বর:</span>
                  <span className="text-lg font-black font-sans text-white tracking-wider">
                    {BKASH_NUMBER}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="bg-[#E2136E] hover:bg-[#c90f5f] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" />
                      <span>কপি হয়েছে!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>নম্বর কপি করুন</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instruction Steps */}
              <div className="text-[11px] text-slate-300 space-y-1 pl-1">
                <p>১. আপনার বিকাশ অ্যাপ অথবা *২৪৭# ডায়াল করে <strong>Send Money</strong> অপশনে যান।</p>
                <p>২. প্রাপক নম্বরে <strong>{BKASH_NUMBER}</strong> দিন।</p>
                <p>৩. মোট টাকার পরিমাণ <strong>৳{grandTotal.toLocaleString()}</strong> টাকা পাঠান।</p>
                <p>৪. সফলভাবে টাকা পাঠানোর পর নিচের ঘরে তথ্য দিন:</p>
              </div>

              {/* Sender & TrxID Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    যে বিকাশ নাম্বার থেকে পাঠিয়েছেন *
                  </label>
                  <input
                    type="tel"
                    required={paymentMethod === 'bkash'}
                    placeholder="যেমন: 017XXXXXXXX"
                    value={bkashSender}
                    onChange={(e) => setBkashSender(e.target.value)}
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded-xl text-xs border border-slate-700 outline-none focus:border-[#E2136E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    বিকাশ ট্রানজেকশন আইডি (TrxID) *
                  </label>
                  <input
                    type="text"
                    required={paymentMethod === 'bkash'}
                    placeholder="যেমন: 9J8K2L4P"
                    value={bkashTrxId}
                    onChange={(e) => setBkashTrxId(e.target.value)}
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded-xl text-xs border border-slate-700 outline-none focus:border-[#E2136E] uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Bill Summary */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>প্রডাক্ট মূল্য ({quantity}টি):</span>
            <span className="font-semibold text-white">৳{itemTotal.toLocaleString()}</span>
          </div>
          {selectedColor && (
            <div className="flex justify-between text-slate-400">
              <span>সিলেক্টেড কালার:</span>
              <span className="font-medium text-cyan-300">{selectedColor}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-300">
            <span>ডেলিভারি চার্জ:</span>
            <span className="font-semibold text-white">৳{deliveryFee}</span>
          </div>
          <div className="pt-2 border-t border-slate-700 flex justify-between text-sm sm:text-base font-black text-white">
            <span>সর্বমোট পরিশোধযোগ্য:</span>
            <span className="text-emerald-400 font-sans text-lg">৳{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Big Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-black py-4 px-6 rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 ${
            paymentMethod === 'bkash'
              ? 'bg-gradient-to-r from-[#E2136E] to-[#c90f5f] text-white shadow-[#E2136E]/30'
              : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-emerald-500/25'
          }`}
        >
          {loading ? (
            <span>অর্ডার প্রসেস হচ্ছে...</span>
          ) : (
            <>
              <CheckCircle2 className={`size-6 ${paymentMethod === 'bkash' ? 'text-white' : 'text-slate-950'}`} />
              <span>
                {paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট সহ অর্ডার কনফার্ম করুন' : 'ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন'} — ৳{grandTotal.toLocaleString()}
              </span>
            </>
          )}
        </button>

        {/* Trust Badges footer */}
        <div className="pt-2 flex items-center justify-around text-center text-[10px] text-slate-400">
          <div className="flex items-center gap-1">
            <Truck className="size-3.5 text-emerald-400" />
            <span>দ্রুত ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-cyan-400" />
            <span>১০০% নিরাপদ</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5 text-amber-400" />
            <span>৭ দিনের ওয়ারেন্টি</span>
          </div>
        </div>
      </form>
    </div>
  );
}
