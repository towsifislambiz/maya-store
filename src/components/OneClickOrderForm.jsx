import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, Clock, CheckCircle2, AlertCircle, Sparkles, Phone, MapPin, User, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';
import { useStoreSettings } from '../context/StoreSettingsContext';

export default function OneClickOrderForm({ product, selectedColor, selectedSize, quantity }) {
  const { placeOrder, loading } = useOrders();
  const { settings } = useStoreSettings();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka'); // inside_dhaka (Naogaon) or outside_dhaka
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bkash'
  const [bkashSender, setBkashSender] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const BKASH_NUMBER = settings?.bkashNumber || '01821067277';
  const feeInside = Number(settings?.deliveryFeeInside) || 60;
  const feeOutside = Number(settings?.deliveryFeeOutside) || 120;

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
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 018XXXXXXXX)।');
      return;
    }
    if (!address.trim() || address.trim().length < 5) {
      setErrorMsg('অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (গ্রাম/মহল্লা, থানা, জেলা)।');
      return;
    }

    if (paymentMethod === 'bkash') {
      const cleanBkash = bkashSender.replace(/[^0-9]/g, '');
      if (cleanBkash.length < 11) {
        setErrorMsg('যে বিকাশ নাম্বার থেকে টাকা পাঠিয়েছেন সেটি সঠিকভাবে লিখুন (১১ ডিজিট)।');
        return;
      }
      if (!bkashTrxId.trim() || bkashTrxId.trim().length < 4) {
        setErrorMsg('বিকাশ থেকে মেসেজে পাওয়া ট্রানজেকশন আইডি (TrxID) লিখুন।');
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
            nameBn: product.nameBn,
            price: product.price,
            images: [product.images[0]],
          },
          quantity,
          selectedColor: selectedColor || (product.colors && product.colors[0]?.name) || 'Standard',
          selectedSize: selectedSize || (product.sizes && product.sizes[0]) || null,
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
    <div id="order-form" className="bg-gradient-to-b from-[#3B0716] via-[#2A0510] to-[#181114] text-white rounded-3xl p-5 sm:p-7 border border-rose-900/60 shadow-2xl mt-6 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative border-b border-rose-900/40 pb-4 mb-5">
        <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="size-4" />
          <span>১-ক্লিক সহজ সরাসরি অর্ডার ফর্ম</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white font-sans">
          অর্ডার কনফার্ম করতে নিচের তথ্যগুলো দিন
        </h3>
        <p className="text-xs text-rose-200/80 mt-1">
          ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ করার সুযোগ।
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3.5 bg-rose-600/20 border border-rose-500/60 rounded-xl text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-rose-100 mb-1.5">
            আপনার নাম *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="যেমন: মাসুম রানা"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-[#1F0A11] text-white pl-10 pr-4 py-3 rounded-xl border border-rose-900/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm placeholder:text-rose-300/40 transition"
            />
            <User className="absolute left-3.5 top-3.5 size-4 text-rose-400" />
          </div>
        </div>

        {/* Customer Phone */}
        <div>
          <label className="block text-xs font-bold text-rose-100 mb-1.5">
            মোবাইল নাম্বার *
          </label>
          <div className="relative">
            <input
              type="tel"
              required
              placeholder="যেমন: 018XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#1F0A11] text-white pl-10 pr-4 py-3 rounded-xl border border-rose-900/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm placeholder:text-rose-300/40 transition"
            />
            <Phone className="absolute left-3.5 top-3.5 size-4 text-rose-400" />
          </div>
        </div>

        {/* Full Delivery Address */}
        <div>
          <label className="block text-xs font-bold text-rose-100 mb-1.5">
            সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা/জেলা) *
          </label>
          <div className="relative">
            <textarea
              required
              rows={2}
              placeholder="যেমন: বাড়ি নং ১২, রোড নং ৩, নওগাঁ সদর, নওগাঁ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#1F0A11] text-white pl-10 pr-4 py-3 rounded-xl border border-rose-900/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm placeholder:text-rose-300/40 transition resize-none"
            />
            <MapPin className="absolute left-3.5 top-3.5 size-4 text-rose-400" />
          </div>
        </div>

        {/* Delivery Zone Selector */}
        <div>
          <label className="block text-xs font-bold text-rose-100 mb-1.5">
            ডেলিভারি এরিয়া সিলেক্ট করুন *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setDeliveryZone('inside_dhaka')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer touch-manipulation ${
                deliveryZone === 'inside_dhaka'
                  ? 'bg-rose-950 border-amber-400 shadow-md ring-2 ring-amber-400/20 text-white'
                  : 'bg-[#1F0A11]/60 border-rose-900/60 text-rose-200/70 hover:border-rose-700'
              }`}
            >
              <div>
                <p className="text-xs font-bold">নওগাঁ সদর (ভিতরে)</p>
                <p className="text-[11px] text-rose-300/60">২৪ ঘণ্টার মধ্যে</p>
              </div>
              <span className="text-amber-400 font-black text-sm">৳{feeInside}</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryZone('outside_dhaka')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer touch-manipulation ${
                deliveryZone === 'outside_dhaka'
                  ? 'bg-rose-950 border-amber-400 shadow-md ring-2 ring-amber-400/20 text-white'
                  : 'bg-[#1F0A11]/60 border-rose-900/60 text-rose-200/70 hover:border-rose-700'
              }`}
            >
              <div>
                <p className="text-xs font-bold">নওগাঁর বাইরে (সমগ্র বাংলাদেশ)</p>
                <p className="text-[11px] text-rose-300/60">২-৩ দিনের মধ্যে</p>
              </div>
              <span className="text-amber-400 font-black text-sm">৳{feeOutside}</span>
            </button>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="block text-xs font-bold text-rose-100 mb-1.5">
            পেমেন্ট মাধ্যম বেছে নিন *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option 1: Cash on Delivery */}
            <button
              type="button"
              onClick={() => setPaymentMethod('cod')}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                paymentMethod === 'cod'
                  ? 'bg-rose-950 border-emerald-400 ring-2 ring-emerald-400/20 text-white shadow-md'
                  : 'bg-[#1F0A11]/60 border-rose-900/60 text-rose-200/70 hover:border-rose-700'
              }`}
            >
              <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                paymentMethod === 'cod' ? 'border-emerald-400 bg-emerald-500' : 'border-rose-700'
              }`}>
                {paymentMethod === 'cod' && <Check className="size-3 text-slate-950 stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-bold text-white">ক্যাশ অন ডেলিভারি (COD)</p>
                <p className="text-[11px] text-rose-300/70 mt-0.5">পণ্য হাতে পেয়ে দেখে টাকা দিন</p>
              </div>
            </button>

            {/* Option 2: bKash Manual Send Money */}
            <button
              type="button"
              onClick={() => setPaymentMethod('bkash')}
              className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                paymentMethod === 'bkash'
                  ? 'bg-[#E2136E]/20 border-[#E2136E] ring-2 ring-[#E2136E]/30 text-white shadow-md'
                  : 'bg-[#1F0A11]/60 border-rose-900/60 text-rose-200/70 hover:border-rose-700'
              }`}
            >
              <div className={`size-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                paymentMethod === 'bkash' ? 'border-[#E2136E] bg-[#E2136E]' : 'border-rose-700'
              }`}>
                {paymentMethod === 'bkash' && <Check className="size-3 text-white stroke-[3]" />}
              </div>
              <div>
                <p className="text-xs font-bold text-[#FF65A3]">বিকাশ (Personal Send Money)</p>
                <p className="text-[11px] text-rose-300/70 mt-0.5">01821067277 নম্বরে সেন্ড মানি</p>
              </div>
            </button>
          </div>

          {/* bKash Payment Box Details */}
          {paymentMethod === 'bkash' && (
            <div className="mt-3.5 p-4 rounded-2xl bg-[#E2136E]/10 border border-[#E2136E]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2136E]/20">
                <span className="text-xs font-bold text-[#FF80B2] uppercase tracking-wide">
                  বিকাশ সেন্ড মানি (Personal):
                </span>
                <span className="text-[10px] bg-[#E2136E] text-white px-2 py-0.5 rounded font-black">
                  bKash Personal
                </span>
              </div>

              {/* bKash Number & Copy Action */}
              <div className="bg-[#181114] p-3 rounded-xl border border-rose-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-rose-300 block -mb-0.5">আমাদের বিকাশ নম্বর:</span>
                  <span className="text-lg font-black font-sans text-white tracking-wider">
                    {BKASH_NUMBER}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="bg-[#E2136E] hover:bg-[#c90f5f] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow cursor-pointer"
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
              <div className="text-[11px] text-rose-200/90 space-y-1 pl-1">
                <p>১. আপনার বিকাশ অ্যাপ অথবা *২৪৭# ডায়াল করে <strong>Send Money</strong> অপশনে যান।</p>
                <p>২. প্রাপক নম্বরে <strong>{BKASH_NUMBER}</strong> দিন।</p>
                <p>৩. মোট টাকার পরিমাণ <strong>৳{grandTotal.toLocaleString()}</strong> টাকা পাঠান।</p>
                <p>৪. সফলভাবে টাকা পাঠানোর পর নিচের ঘরে তথ্য দিন:</p>
              </div>

              {/* Sender & TrxID Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-rose-200 mb-1">
                    যে বিকাশ নাম্বার থেকে পাঠিয়েছেন *
                  </label>
                  <input
                    type="tel"
                    required={paymentMethod === 'bkash'}
                    placeholder="যেমন: 018XXXXXXXX"
                    value={bkashSender}
                    onChange={(e) => setBkashSender(e.target.value)}
                    className="w-full bg-[#1F0A11] text-white px-3 py-2 rounded-xl text-xs border border-rose-900 outline-none focus:border-[#E2136E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-rose-200 mb-1">
                    বিকাশ ট্রানজেকশন আইডি (TrxID) *
                  </label>
                  <input
                    type="text"
                    required={paymentMethod === 'bkash'}
                    placeholder="যেমন: 9J8K2L4P"
                    value={bkashTrxId}
                    onChange={(e) => setBkashTrxId(e.target.value)}
                    className="w-full bg-[#1F0A11] text-white px-3 py-2 rounded-xl text-xs border border-rose-900 outline-none focus:border-[#E2136E] uppercase font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Bill Summary */}
        <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-900/50 space-y-2 text-xs">
          <div className="flex justify-between text-rose-200">
            <span>প্রোডাক্ট মূল্য ({quantity}টি):</span>
            <span className="font-bold text-white">৳{itemTotal.toLocaleString()}</span>
          </div>
          {selectedColor && (
            <div className="flex justify-between text-rose-300/80">
              <span>নির্বাচিত কালার:</span>
              <span className="font-bold text-amber-300">{selectedColor}</span>
            </div>
          )}
          {selectedSize && (
            <div className="flex justify-between text-rose-300/80">
              <span>নির্বাচিত সাইজ:</span>
              <span className="font-bold text-amber-300">{selectedSize}</span>
            </div>
          )}
          <div className="flex justify-between text-rose-200">
            <span>ডেলিভারি চার্জ:</span>
            <span className="font-bold text-white">৳{deliveryFee}</span>
          </div>
          <div className="pt-2 border-t border-rose-900/50 flex justify-between text-sm sm:text-base font-black text-white">
            <span>সর্বমোট পরিশোধযোগ্য:</span>
            <span className="text-amber-300 font-sans text-xl">৳{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Big Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-black py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-xs sm:text-base md:text-lg flex items-center justify-center gap-2 shadow-xl active:scale-98 transition-all disabled:opacity-50 cursor-pointer touch-manipulation ${
            paymentMethod === 'bkash'
              ? 'bg-gradient-to-r from-[#E2136E] to-[#c90f5f] text-white shadow-[#E2136E]/30'
              : 'bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white shadow-rose-600/30'
          }`}
        >
          {loading ? (
            <span>অর্ডার প্রসেস হচ্ছে...</span>
          ) : (
            <>
              <CheckCircle2 className="size-5 sm:size-6 text-amber-300 shrink-0" />
              <span className="text-center leading-tight">
                {paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট সহ অর্ডার কনফার্ম করুন' : 'ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন'} — ৳{grandTotal.toLocaleString()}
              </span>
            </>
          )}
        </button>

        {/* Trust Badges footer */}
        <div className="pt-2 flex items-center justify-around text-center text-[10px] text-rose-200/80">
          <div className="flex items-center gap-1">
            <Truck className="size-3.5 text-amber-400" />
            <span>দ্রুত ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>১০০% নিরাপদ</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="size-3.5 text-rose-400" />
            <span>সহজ রিটার্ন</span>
          </div>
        </div>
      </form>
    </div>
  );
}
