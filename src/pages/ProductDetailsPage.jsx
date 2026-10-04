import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import ProductGallery360 from '../components/ProductGallery360';
import ColorVariantSelector from '../components/ColorVariantSelector';
import OneClickOrderForm from '../components/OneClickOrderForm';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Zap,
  MessageCircle
} from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { settings } = useStoreSettings();
  const { lang, t } = useLanguage();

  const product = getProductById(id) || products[0];

  const [prevId, setPrevId] = useState(id);
  const [userSelectedColor, setUserSelectedColor] = useState(null);
  const [userSelectedSize, setUserSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc' | 'reviews'

  if (prevId !== id) {
    setPrevId(id);
    setUserSelectedColor(null);
    setUserSelectedSize(null);
    setQuantity(1);
  }

  const selectedColor = (userSelectedColor && product?.colors?.some(c => c.name === userSelectedColor))
    ? userSelectedColor
    : (product?.colors?.[0]?.name || 'Standard');

  const selectedSize = (userSelectedSize && product?.sizes?.includes(userSelectedSize))
    ? userSelectedSize
    : (product?.sizes?.[0] || null);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">{t('product_not_found')}</h2>
        <Link to="/" className="text-sm text-rose-700 underline mt-2 inline-block">{t('back_to_home')}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleProceedToCheckout = () => {
    addToCart(product, quantity, selectedColor);
    if (setIsCartOpen) setIsCartOpen(false);
    navigate('/checkout');
  };

  const selectedColorObj = product?.colors?.find(c => c.name === selectedColor);
  const activeImages = (product?.images && selectedColorObj?.image)
    ? [selectedColorObj.image, ...product.images.filter(img => img !== selectedColorObj.image)]
    : (product?.images && product.images.length > 0 ? product.images : [product?.image || '/assets/logo.svg']);

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  const whatsappNumber = (settings?.whatsappNumber || '01814741111').replace(/[^0-9]/g, '');
  const cleanWa = whatsappNumber.startsWith('880') ? whatsappNumber : `88${whatsappNumber}`;
  const orderMessage = encodeURIComponent(`আসসালামু আলাইকুম! Maya Shopping Mall থেকে "${product.nameBn || product.name}" পণ্যটি অর্ডার করতে চাচ্ছি। কালার: ${selectedColor}${selectedSize ? `, সাইজ: ${selectedSize}` : ''}, পরিমাণ: ${quantity}টি।`);

  return (
    <div className="min-h-screen pt-4 sm:pt-6 pb-24 md:pb-12 bg-[#FFFDFD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-rose-700 transition font-medium">{t('dock_home')}</Link>
          <ChevronRight className="size-3.5 text-rose-300" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-rose-700 transition uppercase font-bold text-rose-800">
            {product.category}
          </Link>
          <ChevronRight className="size-3.5 text-rose-300" />
          <span className="text-slate-900 font-extrabold truncate max-w-xs">
            {lang === 'en' ? product.name : (product.nameBn || product.name)}
          </span>
        </nav>

        {/* Product Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Gallery (6 Cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <ProductGallery360
              images={activeImages}
              has360View={product.has360View}
              productName={lang === 'en' ? product.name : (product.nameBn || product.name)}
            />
          </div>

          {/* Right: Product Details, Pricing, Variants & Actions (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Badges & Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full">
                ✓ {t('in_stock')} ({product.stockCount || 25} {t('items_left')})
              </span>
              {product.discountPercent && (
                <span className="bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                  {product.discountPercent}% {t('special_discount')}
                </span>
              )}
              {product.badgeText && (
                <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold px-3 py-1 rounded-full">
                  {product.badgeText}
                </span>
              )}
            </div>

            {/* Product Title & Short Description */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight leading-snug">
                {lang === 'en' ? product.name : (product.nameBn || product.name)}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                {lang === 'en' ? (product.nameBn || '') : product.name}
              </p>
              {(product.shortDescBn || product.shortDescEn) && (
                <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed bg-[#FFF5F6] border border-rose-100 p-3.5 rounded-2xl">
                  {lang === 'en' ? (product.shortDescEn || product.shortDescBn) : (product.shortDescBn || product.shortDescEn)}
                </p>
              )}
            </div>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-3 text-xs border-y border-rose-100 py-2.5">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-900 font-black ml-1">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} {t('verified_reviews')})</span>
              </div>
              <span className="text-rose-200">|</span>
              <span className="text-slate-500">{t('model')}: <strong className="text-slate-800">{product.model}</strong></span>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#FFF5F6] rounded-2xl p-4 border border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-rose-800 font-bold block">{t('offer_price')}:</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-rose-700 font-sans">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.regularPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ৳{product.regularPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {product.regularPrice && (
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl inline-block shadow-2xs">
                    {t('you_save')}: ৳{(product.regularPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Color Variant Selector */}
            <ColorVariantSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setUserSelectedColor}
            />

            {/* Size Variant Selector if applicable */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="my-3">
                <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  সাইজ নির্বাচন করুন:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUserSelectedSize(s)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        selectedSize === s
                          ? 'bg-rose-700 text-white border-rose-700 shadow-md ring-2 ring-rose-500/20'
                          : 'bg-white text-slate-700 border-rose-200 hover:border-rose-300 hover:bg-rose-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t('quantity')}:
              </span>
              <div className="flex items-center border border-rose-200 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 hover:bg-rose-50 text-slate-700 transition cursor-pointer"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="px-4 py-2 text-sm font-black text-slate-900 font-sans">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 hover:bg-rose-50 text-slate-700 transition cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-800 hover:to-rose-800 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl shadow-rose-600/30 transition active:scale-98 group cursor-pointer"
              >
                <Zap className="size-5 text-amber-300 fill-amber-300" />
                <span>{t('proceed_to_checkout')}</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-200 hover:border-rose-300 font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-xs transition active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="size-5" />
                <span>{t('add_to_cart')}</span>
              </button>
            </div>

            {/* WhatsApp Quick Order Link */}
            <a
              href={`https://wa.me/${cleanWa}?text=${orderMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-black py-3 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>WhatsApp এ এক ক্লিকে অর্ডার করুন (01814741111)</span>
            </a>

            {/* Quick Benefits Bullet Points */}
            <div className="bg-white rounded-2xl p-4 border border-rose-100 space-y-2 text-xs text-slate-700">
              <h4 className="font-black text-rose-900 flex items-center gap-1.5 text-sm">
                <Sparkles className="size-4 text-amber-500 fill-amber-400" />
                <span>{t('key_features')}</span>
              </h4>
              <ul className="space-y-1.5 pl-1">
                {(product.bulletPointsBn && product.bulletPointsBn.length > 0) ? (
                  product.bulletPointsBn.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{pt}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t('trust_original_title')} & {t('trust_cod_title')}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
              <div className="p-3 bg-[#FFF5F6] border border-rose-100 rounded-xl">
                <Truck className="size-4 text-amber-600 mx-auto mb-1" />
                <span className="font-extrabold block text-slate-900">{t('fast_home_delivery')}</span>
                <span className="text-[10px] text-slate-500">নওগাঁ সদর ২৪ ঘণ্টা</span>
              </div>
              <div className="p-3 bg-[#FFF5F6] border border-rose-100 rounded-xl">
                <RotateCcw className="size-4 text-rose-600 mx-auto mb-1" />
                <span className="font-extrabold block text-slate-900">{t('trust_replacement_title')}</span>
                <span className="text-[10px] text-slate-500">সহজ এক্সচেঞ্জ</span>
              </div>
              <div className="p-3 bg-[#FFF5F6] border border-rose-100 rounded-xl">
                <ShieldCheck className="size-4 text-emerald-600 mx-auto mb-1" />
                <span className="font-extrabold block text-slate-900">{t('trust_cod_title')}</span>
                <span className="text-[10px] text-slate-500">{t('pay_after_checking')}</span>
              </div>
            </div>

            {/* 1-Click Embedded Direct Order Form */}
            <OneClickOrderForm
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              quantity={quantity}
            />

          </div>
        </div>

        {/* Specifications & Reviews Section Tabs */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-rose-100 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-extrabold text-sm sm:text-base border-b-2 transition cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {t('specifications')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-extrabold text-sm sm:text-base border-b-2 transition cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-rose-600 text-rose-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {t('customer_reviews')} ({product.reviewsCount})
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              {(!product.specs || Object.keys(product.specs).length === 0) ? (
                <div className="py-8 text-center text-slate-400 text-sm">
                  <p>{t('no_specs_available')}</p>
                </div>
              ) : (
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-[#FFF9FA]' : 'bg-white'}
                      >
                        <td className="p-3.5 font-bold text-slate-700 w-1/3 border-b border-rose-50">
                          {key}
                        </td>
                        <td className="p-3.5 text-slate-900 border-b border-rose-50 font-semibold">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-rose-950 text-sm">{t('verified_reviews_title')}</h4>
                  <p className="text-xs text-rose-800">{t('verified_reviews_subtitle')}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-black">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating} / 5.0</span>
                </div>
              </div>

              {/* Sample Verified Reviews tailored to Maya Shopping Mall */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-rose-100 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {lang === 'en' ? 'Tarek Mahmud (Naogaon Sadar)' : 'তারেক মাহমুদ (নওগাঁ সদর)'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'en' ? '1 day ago' : '১ দিন আগে'}
                    </span>
                  </div>
                  <div className="flex text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    {lang === 'en'
                      ? '"Delivery within Naogaon was exceptionally fast! Fabric quality and print are 100% genuine and high standard."'
                      : '"নওগাঁ সদরে মাত্র ২৪ ঘণ্টায় ডেলিভারি পেয়েছি। কাপড় অত্যন্ত মোলায়েম ও প্রিমিয়াম। ছবির চেয়ে বাস্তবে আরও সুন্দর!"'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-rose-100 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {lang === 'en' ? 'Sharmin Akter (Rajshahi)' : 'শারমিন আক্তার (রাজশাহী)'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'en' ? '3 days ago' : '৩ দিন আগে'}
                    </span>
                  </div>
                  <div className="flex text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    {lang === 'en'
                      ? '"Ordered as a gift, packaging was stunning and the product was beyond expectations. Highly recommend Maya Shopping Mall!"'
                      : '"গিফট দেওয়ার জন্য অর্ডার করেছিলাম, প্যাকেজিং অসাধারণ ছিল এবং সবাই খুব পছন্দ করেছে। মায়াশপিং মলকে অনেক ধন্যবাদ!"'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl font-black text-slate-900 font-sans mb-5">
              {t('related_products')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
