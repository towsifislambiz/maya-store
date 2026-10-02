import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductGallery360 from '../components/ProductGallery360';
import ColorVariantSelector from '../components/ColorVariantSelector';
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
  ArrowRight
} from 'lucide-react';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart, setIsCartOpen } = useCart();
  const { lang, t } = useLanguage();

  const product = getProductById(id) || products[0];

  const [prevId, setPrevId] = useState(id);
  const [userSelectedColor, setUserSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'desc' | 'reviews'

  if (prevId !== id) {
    setPrevId(id);
    setUserSelectedColor(null);
    setQuantity(1);
  }

  const selectedColor = (userSelectedColor && product?.colors?.some(c => c.name === userSelectedColor))
    ? userSelectedColor
    : (product?.colors?.[0]?.name || 'Standard');

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">{t('product_not_found')}</h2>
        <Link to="/" className="text-sm text-cyan-600 underline mt-2 inline-block">{t('back_to_home')}</Link>
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
    : (product?.images && product.images.length > 0 ? product.images : [product?.image || '/assets/logo.webp']);

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 4);

  return (
    <div className="min-h-screen pt-4 sm:pt-6 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-slate-900 transition">{t('dock_home')}</Link>
          <ChevronRight className="size-3.5" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-slate-900 transition uppercase">
            {product.category}
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">
            {lang === 'en' ? product.name : (product.nameBn || product.name)}
          </span>
        </nav>

        {/* Product Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Gallery & 360 Viewer (6 Cols) */}
          <div className="lg:col-span-6">
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
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
                ✓ {t('in_stock')} ({product.stockCount || 25} {t('items_left')})
              </span>
              {product.discountPercent && (
                <span className="bg-rose-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  {product.discountPercent}% {t('special_discount')}
                </span>
              )}
              {product.badgeText && (
                <span className="bg-slate-900 text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {product.badgeText}
                </span>
              )}
            </div>

            {/* Product Title & Short Description */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight leading-snug">
                {lang === 'en' ? product.name : (product.nameBn || product.name)}
              </h1>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                {lang === 'en' ? (product.nameBn || '') : product.name}
              </p>
              {(product.shortDescBn || product.shortDescEn) && (
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed bg-slate-50 border border-slate-200/80 p-3 rounded-2xl">
                  {lang === 'en' ? (product.shortDescEn || product.shortDescBn) : (product.shortDescBn || product.shortDescEn)}
                </p>
              )}
            </div>

            {/* Ratings & SKU */}
            <div className="flex items-center gap-3 text-xs border-y border-slate-200/80 py-2.5">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-900 font-extrabold ml-1">{product.rating}</span>
                <span className="text-slate-500">({product.reviewsCount} {t('verified_reviews')})</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{t('model')}: <strong className="text-slate-800">{product.model}</strong></span>
            </div>

            {/* Pricing Section */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">{t('offer_price')}:</span>
                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
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
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg inline-block">
                    {t('you_save')}: ৳{(product.regularPrice - product.price).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Color Variant Selector (Dynamic) */}
            <ColorVariantSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={setUserSelectedColor}
            />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t('quantity')}:
              </span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="px-4 py-2 text-sm font-bold text-slate-900 font-sans">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Proceed to Checkout & Add to Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition active:scale-98 group cursor-pointer"
              >
                <span>{t('proceed_to_checkout')}</span>
                <ArrowRight className="size-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="size-5" />
                <span>{t('add_to_cart')}</span>
              </button>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <Sparkles className="size-4 text-emerald-600" />
                <span>{t('key_features')}</span>
              </h4>
              <ul className="space-y-1.5 pl-1">
                {(product.bulletPointsBn && product.bulletPointsBn.length > 0) ? (
                  product.bulletPointsBn.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t('trust_original_title')} & {t('trust_cod_title')}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <Truck className="size-4 text-emerald-600 mx-auto mb-1" />
                <span className="font-bold block text-slate-800">{t('fast_home_delivery')}</span>
                <span className="text-[10px] text-slate-500">{t('nationwide_delivery')}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <RotateCcw className="size-4 text-amber-600 mx-auto mb-1" />
                <span className="font-bold block text-slate-800">{t('trust_replacement_title')}</span>
                <span className="text-[10px] text-slate-500">{t('if_any_issue')}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <ShieldCheck className="size-4 text-cyan-600 mx-auto mb-1" />
                <span className="font-bold block text-slate-800">{t('trust_cod_title')}</span>
                <span className="text-[10px] text-slate-500">{t('pay_after_checking')}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications & Details Section Tabs */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 font-bold text-sm sm:text-base border-b-2 transition cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-slate-950 text-slate-950'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {t('specifications')}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-bold text-sm sm:text-base border-b-2 transition cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-slate-950 text-slate-950'
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
                        className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                      >
                        <td className="p-3.5 font-bold text-slate-700 w-1/3 border-b border-slate-100">
                          {key}
                        </td>
                        <td className="p-3.5 text-slate-900 border-b border-slate-100 font-medium">
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
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">{t('verified_reviews_title')}</h4>
                  <p className="text-xs text-emerald-700">{t('verified_reviews_subtitle')}</p>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Star className="size-4 fill-emerald-500 text-emerald-500" />
                  <span>{product.rating} / 5.0</span>
                </div>
              </div>

              {/* Sample Verified Reviews */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      {lang === 'en' ? 'Rakibul Hasan (Mirpur, Dhaka)' : 'রাকিবুল হাসান (মিরপুর, ঢাকা)'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'en' ? '2 days ago' : '২ দিন আগে'}
                    </span>
                  </div>
                  <div className="flex text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    {lang === 'en'
                      ? '"Received genuine sealed Dubai pack product. Sound quality and battery backup exceeded my expectations!"'
                      : '"প্রডাক্ট হাতে পাওয়ার পর চেক করে দেখেছি, একদম অরিজিনাল দুবাই বক্স সিল প্যাক ছিল। সাউন্ড কোয়ালিটি এবং ব্যাটারি ব্যাকআপ নিয়ে কোনো কথা হবে না!"'}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      {lang === 'en' ? 'Mehedi Hasan (Chattogram)' : 'মেহেদী হাসান (চট্টগ্রাম)'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {lang === 'en' ? '4 days ago' : '৪ দিন আগে'}
                    </span>
                  </div>
                  <div className="flex text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600">
                    {lang === 'en'
                      ? '"Very fast delivery. Build quality is extremely premium. Thanks to Galaxy Gadgets team!"'
                      : '"খুব দ্রুত ডেলিভারি পেয়েছি। প্রোডাক্টের বিল্ড কোয়ালিটি বেশ প্রিমিয়াম। ধন্যবাদ Galaxy Gadgets টিমকে!"'}
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
