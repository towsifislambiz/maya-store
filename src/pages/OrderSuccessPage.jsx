import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Printer, MessageSquare, ArrowLeft, Package, CreditCard } from 'lucide-react';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function OrderSuccessPage() {
  const { trackingId } = useParams();
  const location = useLocation();
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();
  const order = location.state?.order;

  const handlePrint = () => {
    window.print();
  };

  const isBkash = order?.paymentMethod === 'bkash';
  const rawWa = settings?.whatsappNumber || '8801322302319';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('880') ? cleanWa : cleanWa.startsWith('0') ? `88${cleanWa}` : `880${cleanWa}`;

  const whatsappMessage = encodeURIComponent(
    `আসসালামু আলাইকুম! আমি Galaxy Gadgets থেকে একটি অর্ডার করেছি।\nঅর্ডার ট্র্যাকিং আইডি: ${trackingId}\nপেমেন্ট মেথড: ${isBkash ? 'বিকাশ (TrxID: ' + (order?.bkashTrxId || '') + ')' : 'ক্যাশ অন ডেলিভারি'}\nমোট টাকা: ৳${order?.totalAmount || ''}\nদয়া করে অর্ডারটি কনফার্ম করুন।`
  );

  return (
    <div className="min-h-screen pt-4 sm:pt-10 pb-24 md:pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xl text-center">
          <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="size-10 stroke-[2.5]" />
          </div>

          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            {lang === 'en' ? 'Order Placed Successfully' : 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-3">
            {lang === 'en' ? 'Thank You! Your Order is Confirmed' : 'ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {lang === 'en'
              ? 'Our customer support representative will call you shortly to verify and dispatch your order.'
              : 'আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে অর্ডারটি কনফার্ম করবেন।'}
          </p>

          {/* Tracking ID Badge */}
          <div className="my-6 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex items-center justify-between text-left">
            <div>
              <span className="text-[11px] text-slate-400 block">
                {lang === 'en' ? 'Order Tracking ID:' : 'অর্ডার ট্র্যাকিং নাম্বার (Order ID):'}
              </span>
              <span className="text-lg sm:text-xl font-black font-sans text-cyan-400 tracking-wider">
                {trackingId}
              </span>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isBkash ? 'bg-[#E2136E] text-white' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {isBkash
                ? (lang === 'en' ? 'bKash Paid' : 'বিকাশ পেমেন্ট')
                : (lang === 'en' ? 'Cash on Delivery' : 'ক্যাশ অন ডেলিভারি')}
            </span>
          </div>

          {/* bKash Payment Confirmation Note */}
          {isBkash && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-left text-xs text-rose-950 space-y-1 mb-6">
              <div className="flex items-center gap-1.5 font-bold text-[#E2136E]">
                <CreditCard className="size-4" />
                <span>{lang === 'en' ? 'bKash Transaction Details Recorded:' : 'বিকাশ ট্রানজেকশন তথ্য রেকর্ড করা হয়েছে:'}</span>
              </div>
              <p>{lang === 'en' ? 'Recipient:' : 'প্রাপক নম্বর:'} <strong>{settings?.bkashNumber || '01749765271'}</strong></p>
              <p>{lang === 'en' ? 'Sender Number:' : 'প্রেরক বিকাশ নম্বর:'} <strong>{order?.bkashSender}</strong></p>
              <p>TrxID: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-rose-200">{order?.bkashTrxId}</strong></p>
            </div>
          )}

          {/* Order Details Receipt Box (Printable) */}
          {order && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-4 my-6 text-xs text-slate-700">
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2 flex items-center gap-1.5">
                <Package className="size-4 text-emerald-600" />
                <span>{lang === 'en' ? 'Order Invoice Summary' : 'অর্ডার ইনভয়েস সারসংক্ষেপ'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'en' ? 'Customer Name:' : 'গ্রাহকের নাম:'}</span>
                  <strong className="text-slate-900 text-sm">{order.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{lang === 'en' ? 'Phone Number:' : 'মোবাইল নাম্বার:'}</span>
                  <strong className="text-slate-900 font-sans text-sm">{order.phone}</strong>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">{lang === 'en' ? 'Delivery Address:' : 'ডেলিভারি ঠিকানা:'}</span>
                  <p className="text-slate-900 font-medium">{order.address}</p>
                </div>
              </div>

              {/* Items */}
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[11px] mb-2">{lang === 'en' ? 'Ordered Items:' : 'অর্ডারের পণ্যসমূহ:'}</span>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-2 rounded-xl border border-slate-200/80">
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{item.product.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {lang === 'en' ? 'Color' : 'কালার'}: {item.selectedColor} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-slate-900 text-xs font-sans">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Totals */}
              <div className="pt-2 border-t border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span>{t('delivery_charge')}</span>
                  <span className="font-semibold text-slate-900 font-sans">৳{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1">
                  <span>{lang === 'en' ? 'Total Payable:' : 'মোট প্রদেয় টাকা:'}</span>
                  <span className="text-emerald-600 font-sans text-base">৳{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`https://wa.me/${formattedWa}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition cursor-pointer"
            >
              <MessageSquare className="size-4" />
              <span>{lang === 'en' ? 'WhatsApp Support' : 'হোয়াটসঅ্যাপে আপডেট নিন'}</span>
            </a>

            <button
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition cursor-pointer"
            >
              <Printer className="size-4" />
              <span>{lang === 'en' ? 'Print Receipt' : 'রসিদ প্রিন্ট করুন'}</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>{t('back_to_home')}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
