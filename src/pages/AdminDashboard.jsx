import React, { useState, useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { generateMonthlyReportPDF } from '../utils/pdfGenerator';
import {
  ShieldCheck,
  Package,
  Clock,
  Truck,
  Plus,
  Trash2,
  Edit3,
  Layers,
  FileDown,
  AlertTriangle,
  Settings,
  Check,
  X,
  Search,
  MessageSquare,
  ArrowRight,
  Save,
  Palette,
  Upload,
  CheckCircle2,
  LogOut,
  Lock,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { compressAndReadImage, getImageDataSizeKB } from '../utils/imageUpload';
import { useAdminAuth } from '../context/AdminAuthContext';
import { CATEGORIES } from '../data/products';

export default function AdminDashboard() {
  const { orders, updateOrderStatus, deleteOrder, daysLeftInMonth, isMonthEndingSoon } = useOrders();
  const { products, addProduct, updateProduct, deleteProduct, addColorVariant, removeColorVariant, toggleColorVariantStock } = useProducts();
  const { settings, updateSettings } = useStoreSettings();
  const { logout, lockAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'variants' | 'orders' | 'settings'

  // Orders State & Filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // Products State & Filters
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // New Product Form State
  const initialNewProductForm = {
    name: '',
    nameBn: '',
    price: '',
    regularPrice: '',
    category: 'bedding',
    model: '',
    stockCount: 25,
    discountPercent: '',
    badgeText: '',
    has360View: false,
    shortDescBn: '',
    bulletPointsText: '১০০% পাকা রং ও প্রিমিয়াম কোয়ালিটি\nনওগাঁ সদর সহ সারা দেশে হোম ডেলিভারি\nপছন্দ না হলে বা ডিফেক্ট থাকলে রিপ্লেসমেন্ট সুবিধা',
    specRows: [
      { key: 'ফেব্রিক', value: '১০০% পিওর সফট কটন' },
      { key: 'ডেলিভারি', value: 'নওগাঁ সদর ও সারাদেশে হোম ডেলিভারি' }
    ],
    image: '/assets/products/bedding-1.webp',
    colors: [{ name: 'Default', hex: '#881337', inStock: true }]
  };
  const [newProductForm, setNewProductForm] = useState(initialNewProductForm);

  // Color Variant Manager State
  const [selectedVariantProductId, setSelectedVariantProductId] = useState('');
  const activeVariantProductId = selectedVariantProductId || products[0]?.id || '';
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');
  const [newColorInStock, setNewColorInStock] = useState(true);
  const [newColorImage, setNewColorImage] = useState('');
  const [isColorImageUploading, setIsColorImageUploading] = useState(false);
  const [colorSuccessMsg, setColorSuccessMsg] = useState('');
  const [isProductImageUploading, setIsProductImageUploading] = useState(false);
  const [isEditImageUploading, setIsEditImageUploading] = useState(false);

  // Store Settings Form State
  const [prevSettings, setPrevSettings] = useState(settings);
  const [settingsForm, setSettingsForm] = useState({
    storeName: settings?.storeName || 'Maya Shopping Mall',
    tagline: settings?.tagline || 'নওগাঁর বিশ্বস্ত ফ্যাশন ও লাক্সারি লাইফস্টাইল শপ',
    address: settings?.address || 'নওগাঁ সদর, নওগাঁ',
    email: settings?.email || 'masud97186@gmail.com',
    bkashNumber: settings?.bkashNumber || '01821067277',
    whatsappNumber: settings?.whatsappNumber || '01814741111',
    hotline: settings?.hotline || '01814741111',
    deliveryFeeInside: settings?.deliveryFeeInside || 60,
    deliveryFeeOutside: settings?.deliveryFeeOutside || 120,
    facebookPage: settings?.facebookPage || ''
  });
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState('');

  // Admin Password Management State
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Update settingsForm when context settings change
  if (prevSettings !== settings) {
    setPrevSettings(settings);
    if (settings) {
      setSettingsForm({
        storeName: settings.storeName || 'Maya Shopping Mall',
        tagline: settings.tagline || 'নওগাঁর বিশ্বস্ত ফ্যাশন ও লাক্সারি লাইফস্টাইল শপ',
        address: settings.address || 'নওগাঁ সদর, নওগাঁ',
        email: settings.email || 'masud97186@gmail.com',
        bkashNumber: settings.bkashNumber || '01821067277',
        whatsappNumber: settings.whatsappNumber || '01814741111',
        hotline: settings.hotline || '01814741111',
        deliveryFeeInside: settings.deliveryFeeInside || 60,
        deliveryFeeOutside: settings.deliveryFeeOutside || 120,
        facebookPage: settings.facebookPage || ''
      });
    }
  }

  // Handle Admin Password Change
  const handleSavePassword = async (e) => {
    e.preventDefault();
    setPasswordErrorMsg('');
    setPasswordSuccessMsg('');
    if (!newAdminPassword || newAdminPassword.trim().length < 6) {
      setPasswordErrorMsg('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!');
      return;
    }
    if (newAdminPassword !== confirmAdminPassword) {
      setPasswordErrorMsg('উভয় পাসওয়ার্ড হুবহু মিলতে হবে!');
      return;
    }
    try {
      setIsSavingPassword(true);
      await updateSettings({ adminPassword: newAdminPassword.trim() });
      setPasswordSuccessMsg('অ্যাডমিন পাসওয়ার্ড সফলভাবে আপডেট ও সেভ করা হয়েছে! পরবর্তী লগইনে এই নতুন পাসওয়ার্ড ব্যবহার করুন।');
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      setTimeout(() => setPasswordSuccessMsg(''), 5000);
    } catch (err) {
      setPasswordErrorMsg('পাসওয়ার্ড সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Financial Stats
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0), [orders]);
  const pendingOrders = useMemo(() => orders.filter(o => o.status === 'Pending').length, [orders]);
  const confirmedOrders = useMemo(() => orders.filter(o => o.status === 'Confirmed' || o.status === 'Delivered').length, [orders]);
  const bkashOrdersCount = useMemo(() => orders.filter(o => o.paymentMethod === 'bkash').length, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const q = orderSearchQuery.toLowerCase();
      const matchSearch = !q ||
        o.orderTrackingId?.toLowerCase().includes(q) ||
        o.customerName?.toLowerCase().includes(q) ||
        o.phone?.includes(q) ||
        o.address?.toLowerCase().includes(q) ||
        o.bkashTrxId?.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedProductCategory === 'all' || p.category === selectedProductCategory;
      const q = productSearch.toLowerCase();
      const matchSearch = !q ||
        p.name?.toLowerCase().includes(q) ||
        p.nameBn?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, selectedProductCategory, productSearch]);

  // Selected Product for Dedicated Color Variant Page
  const selectedProduct = useMemo(
    () => products.find(p => p.id === activeVariantProductId) || products[0],
    [products, activeVariantProductId]
  );

  // Handle Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await updateSettings({
      ...settingsForm,
      deliveryFeeInside: Number(settingsForm.deliveryFeeInside) || 60,
      deliveryFeeOutside: Number(settingsForm.deliveryFeeOutside) || 120
    });
    setSettingsSuccessMsg('স্টোর সেটিংস সফলভাবে সেভ করা হয়েছে!');
    setTimeout(() => setSettingsSuccessMsg(''), 3000);
  };

  // Upload image for New Product (PC / Mobile Gallery)
  const handleNewProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProductImageUploading(true);
      const dataUrl = await compressAndReadImage(file);
      setNewProductForm(prev => ({ ...prev, image: dataUrl }));
    } catch (err) {
      alert(err.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
    } finally {
      setIsProductImageUploading(false);
      e.target.value = '';
    }
  };

  // Upload image for Editing Product (PC / Mobile Gallery)
  const handleEditProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsEditImageUploading(true);
      const dataUrl = await compressAndReadImage(file);
      setEditingProduct(prev => {
        const existingImages = prev?.images || [];
        return {
          ...prev,
          image: dataUrl,
          images: [dataUrl, ...existingImages.slice(1)]
        };
      });
    } catch (err) {
      alert(err.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
    } finally {
      setIsEditImageUploading(false);
      e.target.value = '';
    }
  };

  // Upload image for Color Variant (PC / Mobile Gallery)
  const handleVariantImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsColorImageUploading(true);
      const dataUrl = await compressAndReadImage(file);
      setNewColorImage(dataUrl);
    } catch (err) {
      alert(err.message || 'ছবি আপলোড করতে সমস্যা হয়েছে');
    } finally {
      setIsColorImageUploading(false);
      e.target.value = '';
    }
  };

  // Open Edit Modal with structured specRows and bulletPointsText
  const handleOpenEditModal = (p) => {
    const specRows = Object.entries(p.specs || {}).map(([key, value]) => ({ key, value }));
    setEditingProduct({
      ...p,
      shortDescBn: p.shortDescBn || '',
      bulletPointsText: Array.isArray(p.bulletPointsBn) ? p.bulletPointsBn.join('\n') : '',
      specRows: specRows.length > 0 ? specRows : [
        { key: 'ওয়ারেন্টি', value: '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' },
        { key: 'কানেক্টিভিটি', value: 'ব্লুটুথ / ওয়্যারলেস' }
      ]
    });
  };

  // Spec Row Handlers for New Product
  const handleAddNewSpecRow = () => {
    setNewProductForm(prev => ({
      ...prev,
      specRows: [...(prev.specRows || []), { key: '', value: '' }]
    }));
  };

  const handleUpdateNewSpecRow = (index, field, val) => {
    setNewProductForm(prev => {
      const rows = [...(prev.specRows || [])];
      rows[index] = { ...rows[index], [field]: val };
      return { ...prev, specRows: rows };
    });
  };

  const handleRemoveNewSpecRow = (index) => {
    setNewProductForm(prev => {
      const rows = (prev.specRows || []).filter((_, i) => i !== index);
      return { ...prev, specRows: rows };
    });
  };

  // Spec Row Handlers for Editing Product
  const handleAddEditSpecRow = () => {
    setEditingProduct(prev => ({
      ...prev,
      specRows: [...(prev.specRows || []), { key: '', value: '' }]
    }));
  };

  const handleUpdateEditSpecRow = (index, field, val) => {
    setEditingProduct(prev => {
      const rows = [...(prev.specRows || [])];
      rows[index] = { ...rows[index], [field]: val };
      return { ...prev, specRows: rows };
    });
  };

  const handleRemoveEditSpecRow = (index) => {
    setEditingProduct(prev => {
      const rows = (prev.specRows || []).filter((_, i) => i !== index);
      return { ...prev, specRows: rows };
    });
  };

  // Handle Add Product Submit
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProductForm.name.trim() || !newProductForm.price) return;

    // Parse bullet points
    const bulletPointsBn = (newProductForm.bulletPointsText || '')
      .split('\n')
      .map(line => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    // Parse specs object
    const specs = {};
    (newProductForm.specRows || []).forEach(row => {
      if (row.key && row.key.trim()) {
        specs[row.key.trim()] = (row.value || '').trim();
      }
    });

    const created = {
      ...newProductForm,
      id: newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      price: Number(newProductForm.price),
      regularPrice: newProductForm.regularPrice ? Number(newProductForm.regularPrice) : null,
      stockCount: Number(newProductForm.stockCount) || 20,
      discountPercent: newProductForm.discountPercent ? Number(newProductForm.discountPercent) : null,
      shortDescBn: newProductForm.shortDescBn?.trim() || '',
      bulletPointsBn: bulletPointsBn.length > 0 ? bulletPointsBn : ['১০০% অরিজিনাল ও পাকা রং', 'নওগাঁ সদর সহ সারা দেশে হোম ডেলিভারি'],
      specs: Object.keys(specs).length > 0 ? specs : { 'ফেব্রিক': '১০০% পিওর কটন', 'ডেলিভারি': 'হোম ডেলিভারি' },
      image: newProductForm.image || '/assets/products/bedding-1.webp',
      images: [newProductForm.image || '/assets/products/bedding-1.webp'],
      reviewsCount: 12,
      rating: 4.9,
      inStock: true
    };

    await addProduct(created);
    setNewProductForm(initialNewProductForm);
    setIsAddProductModalOpen(false);
  };

  // Handle Update Product Submit
  const handleUpdateProductSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Parse bullet points
    const bulletPointsBn = (editingProduct.bulletPointsText || '')
      .split('\n')
      .map(line => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean);

    // Parse specs object
    const specs = {};
    (editingProduct.specRows || []).forEach(row => {
      if (row.key && row.key.trim()) {
        specs[row.key.trim()] = (row.value || '').trim();
      }
    });

    const updatedImages = editingProduct.image
      ? [editingProduct.image, ...(editingProduct.images?.filter(img => img !== editingProduct.image) || [])]
      : (editingProduct.images || []);

    await updateProduct(editingProduct.id, {
      ...editingProduct,
      images: updatedImages.length > 0 ? updatedImages : ['/assets/products/bedding-1.webp'],
      price: Number(editingProduct.price),
      regularPrice: editingProduct.regularPrice ? Number(editingProduct.regularPrice) : null,
      stockCount: Number(editingProduct.stockCount) || 0,
      discountPercent: editingProduct.discountPercent ? Number(editingProduct.discountPercent) : null,
      shortDescBn: editingProduct.shortDescBn?.trim() || '',
      bulletPointsBn: bulletPointsBn,
      specs: specs
    });
    setEditingProduct(null);
  };

  // Handle Color Variant Add
  const handleAddColor = async (e) => {
    e?.preventDefault();
    if (!newColorName.trim() || !activeVariantProductId) return;

    await addColorVariant(activeVariantProductId, {
      name: newColorName.trim(),
      hex: newColorHex || '#000000',
      inStock: newColorInStock,
      image: newColorImage || undefined
    });
    setNewColorName('');
    setNewColorHex('#000000');
    setNewColorImage('');
    setNewColorInStock(true);
    setColorSuccessMsg(`"${newColorName}" কালার ভ্যারিয়েন্ট সফলভাবে যোগ করা হয়েছে!`);
    setTimeout(() => setColorSuccessMsg(''), 4000);
  };

  // Handle WhatsApp Message to Customer on Order Confirm
  const handleConfirmAndMessageCustomer = (order) => {
    updateOrderStatus(order.id || order.orderTrackingId, 'Confirmed');
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('880') ? cleanPhone : `88${cleanPhone}`;
    const msg = encodeURIComponent(
      `আসসালামু আলাইকুম ${order.customerName}!\nমায়া শপিং মল (Maya Shopping Mall) থেকে আপনার অর্ডারটি কনফার্ম করা হয়েছে।\n\nঅর্ডার আইডি: ${order.orderTrackingId}\nমোট প্রদেয়: ৳${order.totalAmount} (${order.paymentMethod === 'bkash' ? 'বিকাশ সম্পন্ন' : 'ক্যাশ অন ডেলিভারি'})\nডেলিভারি ঠিকানা: ${order.address}\n\nআমরা দ্রুততম সময়ে পার্সেলটি পাঠিয়ে দিচ্ছি। ধন্যবাদ!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${msg}`, '_blank');
  };

  // Trigger Monthly PDF Report Download
  const handleDownloadPDF = () => {
    generateMonthlyReportPDF(orders, settings);
  };

  return (
    <div className="min-h-screen pt-4 sm:pt-6 pb-24 md:pb-12 bg-gradient-to-b from-[#160610] via-[#0E0308] to-[#0A0205] text-rose-100 relative">
      {/* Background Ambient Luxury Light */}
      <div className="absolute top-0 right-1/4 size-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 size-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-rose-900/40">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/logo.svg"
              alt="Maya Shopping Mall Logo"
              decoding="async"
              className="size-12 sm:size-14 object-contain rounded-2xl bg-[#1C0812] border border-rose-800/60 shadow-xl shrink-0 p-1.5"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                <ShieldCheck className="size-4" />
                <span>MAYA SHOPPING MALL — MASTER ADMIN CONTROL</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-sans text-white">
                বিজনেস ড্যাশবোর্ড ও শপ ম্যানেজার
              </h1>
              <p className="text-xs text-rose-300/70 mt-0.5">
                রিয়েল-টাইম প্রোডাক্ট এডিটর, অর্ডার প্রসেসিং, অটো মান্থলি রিসেট ও হিসাব রিপোর্ট
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleDownloadPDF}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 sm:px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-1.5 transition active:scale-95 text-center cursor-pointer border border-emerald-400/30"
            >
              <FileDown className="size-4 shrink-0" />
              <span>মান্থলি হিসাব PDF</span>
            </button>
            <Link
              to="/"
              className="bg-[#1C0913] hover:bg-rose-950/80 text-rose-200 hover:text-white border border-rose-900/60 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 text-center"
            >
              <span>লাইভ শপে যান →</span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-600/40 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95 text-center cursor-pointer"
              title="অ্যাডমিন প্যানেল থেকে লগআউট করুন"
            >
              <LogOut className="size-3.5 shrink-0" />
              <span>লগআউট</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('আপনি কি নিশ্চিত যে অ্যাডমিন বাটনটি আবার গোপন করে লক করতে চান? এর ফলে লোগোতে আবার ৫ বার ক্লিক না করা পর্যন্ত বাটনটি আর দেখা যাবে না।')) {
                  lockAdmin();
                  navigate('/');
                }
              }}
              className="bg-[#1C0913] hover:bg-rose-950/80 text-rose-300/80 hover:text-amber-300 border border-rose-900/60 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95 text-center cursor-pointer"
              title="অ্যাডমিন বাটনটি আবার গোপন করে সম্পূর্ণ লক করুন"
            >
              <Lock className="size-3.5 shrink-0 text-amber-400" />
              <span>বাটন লক</span>
            </button>
          </div>
        </div>

        {/* ⚠️ Monthly Reset Warning Banner (Only shown during the last 3 days of the month) */}
        {isMonthEndingSoon && (
          <div className="p-4 sm:p-5 rounded-2xl border bg-rose-950/60 border-rose-500/50 text-rose-100 shadow-xl animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl shrink-0 bg-rose-500/20 text-rose-400">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    ⚠️ জরুরি সতর্কতা: চলতি মাসের শেষ সময় সমাগত!
                  </h4>
                  <span className="bg-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full">
                    বাকি: {daysLeftInMonth} দিন
                  </span>
                </div>
                <p className="text-xs text-rose-200/90 mt-1 leading-relaxed max-w-2xl">
                  ক্লায়েন্ট পলিসি অনুযায়ী চলতি মাস শেষ হওয়ার পর নতুন মাসের ফ্রেশ হিসাব নিশ্চিত করতে অর্ডার হিস্ট্রি স্বয়ংক্রিয়ভাবে ফায়ারবেস ও ড্যাশবোর্ড থেকে রিসেট হয়ে যাবে। মাস শেষ হওয়ার আগেই অনুগ্রহ করে <strong>মান্থলি PDF রিপোর্ট ডাউনলোড</strong> করে সংরক্ষণ করুন।
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 active:scale-95"
              >
                <FileDown className="size-4 text-emerald-600 shrink-0" />
                <span>PDF রিপোর্ট ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs (Mobile Edge-to-Edge Scrollable) */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-rose-900/40">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-950/60 font-black border border-rose-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Layers className="size-4 shrink-0" />
            <span className="hidden sm:inline">১. ড্যাশবোর্ড ও অ্যানালিটিক্স</span>
            <span className="sm:hidden">১. ড্যাশবোর্ড</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-950/60 font-black border border-rose-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Package className="size-4 shrink-0" />
            <span className="hidden sm:inline">২. প্রোডাক্ট ক্যাটালগ ({products.length})</span>
            <span className="sm:hidden">২. ক্যাটালগ ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('variants')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'variants'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-950/60 font-black border border-rose-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Palette className={`size-4 shrink-0 ${activeTab === 'variants' ? 'text-amber-300' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">৩. কালার ভ্যারিয়েন্ট পেজ</span>
            <span className="sm:hidden">৩. কালার পেজ</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-950/60 font-black border border-rose-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Clock className="size-4 shrink-0" />
            <span className="hidden sm:inline">৪. কাস্টমার অর্ডার্স ({orders.length})</span>
            <span className="sm:hidden">৪. অর্ডার্স ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-950/60 font-black border border-rose-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Settings className="size-4 shrink-0" />
            <span className="hidden sm:inline">৫. শপ সেটিংস ও চার্জ</span>
            <span className="sm:hidden">৫. সেটিংস</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30'
                : 'bg-[#1A0A12] text-rose-200/70 hover:text-white hover:bg-rose-950/60 border border-rose-900/40'
            }`}
          >
            <Lock className={`size-4 shrink-0 ${activeTab === 'security' ? 'text-slate-950' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">৬. পাসওয়ার্ড ও সিকিউরিটি</span>
            <span className="sm:hidden">৬. সিকিউরিটি</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: DASHBOARD OVERVIEW & METRICS
           ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#1A0A12]/90 rounded-2xl p-4 sm:p-5 border border-rose-900/40 shadow-lg">
                <span className="text-xs text-rose-300/70 block mb-1">মোট বিক্রয় রেভিনিউ</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-sans">
                  ৳{totalRevenue.toLocaleString()}
                </span>
                <span className="text-[10px] text-rose-400/60 block mt-1">চলতি মাসের হিসেব</span>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-4 sm:p-5 border border-rose-900/40 shadow-lg">
                <span className="text-xs text-rose-300/70 block mb-1">মোট অর্ডার সংখ্যা</span>
                <span className="text-xl sm:text-2xl font-black text-rose-400 font-sans">
                  {orders.length} টি
                </span>
                <span className="text-[10px] text-rose-400/60 block mt-1">{confirmedOrders} টি কনফার্মড</span>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-4 sm:p-5 border border-rose-900/40 shadow-lg">
                <span className="text-xs text-rose-300/70 block mb-1">অপেক্ষমাণ (Pending)</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-sans">
                  {pendingOrders} টি
                </span>
                <span className="text-[10px] text-rose-400/60 block mt-1">কাস্টমারকে কনফার্ম করুন</span>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-4 sm:p-5 border border-rose-900/40 shadow-lg">
                <span className="text-xs text-rose-300/70 block mb-1">বিকাশ পেমেন্ট অর্ডার</span>
                <span className="text-xl sm:text-2xl font-black text-[#E2136E] font-sans">
                  {bkashOrdersCount} টি
                </span>
                <span className="text-[10px] text-rose-400/60 block mt-1">TrxID ভেরিফাইড</span>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1A0A12]/90 rounded-2xl p-5 border border-rose-900/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Package className="size-4" />
                  <span>প্রোডাক্ট কুইক অ্যাকশন</span>
                </div>
                <p className="text-xs text-rose-300/70 leading-relaxed">
                  স্টোরে বর্তমানে {products.length}টি লাইভ প্রোডাক্ট রয়েছে। নতুন প্রোডাক্ট যোগ করতে বা দাম আপডেট করতে বোতাম চাপুন।
                </p>
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setIsAddProductModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-rose-950/50 cursor-pointer border border-rose-400/30"
                >
                  <Plus className="size-4" />
                  <span>নতুন প্রোডাক্ট যোগ করুন</span>
                </button>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-5 border border-rose-900/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Palette className="size-4" />
                  <span>কালার ভ্যারিয়েন্ট পেজ</span>
                </div>
                <p className="text-xs text-rose-300/70 leading-relaxed">
                  খুব সহজে পোশাক বা পণ্যের কালার সেট করুন, পিসি বা ফোন গ্যালারি থেকে কালার ফটো আপলোড করুন।
                </p>
                <button
                  onClick={() => setActiveTab('variants')}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-amber-950/40 cursor-pointer"
                >
                  <Palette className="size-4" />
                  <span>কালার ভ্যারিয়েন্ট পেজে যান</span>
                </button>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-5 border border-rose-900/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Clock className="size-4" />
                  <span>অর্ডার প্রসেসিং</span>
                </div>
                <p className="text-xs text-rose-300/70 leading-relaxed">
                  পেন্ডিং অর্ডারগুলো ১-ক্লিকে কনফার্ম করুন এবং সরাসরি কাস্টমারের হোয়াটসঅ্যাপে ইনভয়েস মেসেজ পাঠান।
                </p>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-950/40 cursor-pointer border border-emerald-400/30"
                >
                  <MessageSquare className="size-4" />
                  <span>অর্ডারসমূহ ম্যানেজ করুন</span>
                </button>
              </div>

              <div className="bg-[#1A0A12]/90 rounded-2xl p-5 border border-rose-900/40 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Settings className="size-4" />
                  <span>স্টোর ও ডেলিভারি রেট</span>
                </div>
                <p className="text-xs text-rose-300/70 leading-relaxed">
                  ঠিকানা: {settings?.address} | বিকাশ: {settings?.bkashNumber} | নওগাঁ সদর ডেলিভারি: ৳{settings?.deliveryFeeInside}
                </p>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full bg-[#12050B] hover:bg-rose-950 text-rose-200 hover:text-white border border-rose-900/60 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <Settings className="size-4" />
                  <span>সেটিংস এডিট করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: REAL-TIME PRODUCTS MANAGEMENT & COLOR VARIANTS
           ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Products Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#1A0A12]/90 p-4 rounded-2xl border border-rose-900/40 shadow-lg">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto flex-1 max-w-xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="নাম, বাংলা নাম বা মডেল দিয়ে খুঁজুন..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-[#12050B] border border-rose-900/60 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20"
                  />
                  <Search className="size-4 text-rose-400/50 absolute left-3 top-3" />
                </div>

                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className="bg-[#12050B] border border-rose-900/60 rounded-xl px-3 py-2.5 text-xs text-white outline-none cursor-pointer focus:border-rose-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-[#12050B] text-white">
                      {cat.nameBn || cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-950/50 transition active:scale-95 cursor-pointer border border-rose-400/30"
                >
                  <Plus className="size-4" />
                  <span>নতুন প্রোডাক্ট যোগ করুন</span>
                </button>
              </div>
            </div>

            {/* Products Container */}
            <div className="bg-[#1A0A12]/90 rounded-2xl border border-rose-900/40 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-rose-900/40 flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">
                  লাইভ প্রোডাক্ট ক্যাটালগ ({filteredProducts.length}টি)
                </h3>
                <span className="text-xs text-emerald-400 font-medium">● রিয়েল-টাইম সিঙ্ক অ্যাক্টিভ</span>
              </div>

              {/* Mobile View: High Quality Responsive Product Cards */}
              <div className="block md:hidden p-3 space-y-3">
                {filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-rose-300/60 text-xs">
                    কোনো প্রোডাক্ট পাওয়া যায়নি। ফিল্টার রিসেট করুন।
                  </div>
                ) : (
                  filteredProducts.map((p) => (
                    <div key={p.id} className="bg-[#12050B] border border-rose-900/50 rounded-2xl p-3.5 space-y-3 shadow-md">
                      <div className="flex items-start gap-3">
                        <img
                          src={p.images?.[0] || '/assets/logo.svg'}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="size-16 object-contain bg-[#1C0812] rounded-xl p-1.5 border border-rose-900/60 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] bg-[#1C0812] text-rose-300 px-1.5 py-0.5 rounded font-mono uppercase border border-rose-900/40">
                              {p.category}
                            </span>
                            <button
                              onClick={() => updateProduct(p.id, { stockCount: p.stockCount > 0 ? 0 : 25 })}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                p.stockCount > 0
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {p.stockCount > 0 ? `ইন স্টক (${p.stockCount})` : 'স্টক আউট'}
                            </button>
                          </div>
                          <h4 className="font-bold text-white text-xs mt-1 truncate">{p.name}</h4>
                          <p className="text-[11px] text-rose-300/70 truncate">{p.nameBn}</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-bold font-sans text-emerald-400 text-sm">৳{p.price?.toLocaleString()}</span>
                            {p.regularPrice && (
                              <span className="text-[11px] text-rose-400/50 font-sans line-through">৳{p.regularPrice.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Colors Swatches & Action Buttons */}
                      <div className="pt-2 border-t border-rose-900/40 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          {(p.colors || []).map((c, i) => (
                            <span
                              key={i}
                              className="size-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          <span className="text-[10px] text-rose-300/70 ml-1">
                            {p.colors?.length || 0} টি কালার
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            onClick={() => {
                              setSelectedVariantProductId(p.id);
                              setActiveTab('variants');
                            }}
                            className="px-2.5 py-1.5 bg-[#1C0812] hover:bg-rose-950 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer"
                            title="কালার ভ্যারিয়েন্ট পেজ"
                          >
                            <Palette className="size-3 text-amber-400" />
                            <span>কালার</span>
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 bg-[#1C0812] hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg transition active:scale-95 cursor-pointer border border-rose-900/50"
                            title="এডিট করুন"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`"${p.name}" প্রোডাক্টটি মুছে ফেলতে চান?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-[#1C0812] hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg transition active:scale-95 cursor-pointer border border-rose-900/50"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop / Tablet View: High Density Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#12050B] text-rose-300/80 uppercase text-[10px] tracking-wider border-b border-rose-900/50">
                    <tr>
                      <th className="p-3.5">ছবি</th>
                      <th className="p-3.5">নাম ও বাংলা শিরোনাম</th>
                      <th className="p-3.5">অফার মূল্য</th>
                      <th className="p-3.5">রেগুলার মূল্য</th>
                      <th className="p-3.5">স্টক</th>
                      <th className="p-3.5">ভ্যারিয়েন্টস</th>
                      <th className="p-3.5 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-950/60">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-rose-950/30 transition">
                        <td className="p-3.5">
                          <img
                            src={p.images?.[0] || '/assets/logo.svg'}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            className="size-12 object-contain bg-[#12050B] rounded-lg p-1 border border-rose-900/50"
                          />
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <p className="font-bold text-white truncate">{p.name}</p>
                          <p className="text-rose-300/70 truncate text-[11px]">{p.nameBn}</p>
                          <span className="text-[10px] bg-[#1C0812] text-rose-300 px-1.5 py-0.5 rounded font-mono border border-rose-900/40">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-sans text-emerald-400 text-sm">
                          ৳{p.price?.toLocaleString()}
                        </td>
                        <td className="p-3.5 text-rose-400/50 font-sans line-through">
                          {p.regularPrice ? `৳${p.regularPrice.toLocaleString()}` : '—'}
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => updateProduct(p.id, { stockCount: p.stockCount > 0 ? 0 : 25 })}
                            className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer ${
                              p.stockCount > 0
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {p.stockCount > 0 ? `ইন স্টক (${p.stockCount})` : 'স্টক আউট'}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-1">
                            {(p.colors || []).map((c, i) => (
                              <span
                                key={i}
                                className="size-3.5 rounded-full border border-white/30"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                            <span className="text-[10px] text-rose-300/70 ml-1">
                              {p.colors?.length || 0} টি
                            </span>
                          </div>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedVariantProductId(p.id);
                              setActiveTab('variants');
                            }}
                            className="p-1.5 bg-[#1C0812] hover:bg-amber-600 text-amber-300 hover:text-slate-950 rounded-lg transition cursor-pointer border border-amber-500/30"
                            title="কালার ভ্যারিয়েন্ট পেজে যান"
                          >
                            <Palette className="size-3.5 text-amber-400" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 bg-[#1C0812] hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg transition cursor-pointer border border-rose-900/50"
                            title="এডিট করুন"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`"${p.name}" প্রোডাক্টটি মুছে ফেলতে চান?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-[#1C0812] hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg transition cursor-pointer border border-rose-900/50"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Link Banner to Dedicated Color Variant Page */}
            <div className="bg-gradient-to-r from-[#18070F] via-[#240A18] to-[#18070F] rounded-3xl p-5 border border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 shrink-0">
                  <Palette className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    প্রোডাক্ট কালার ভ্যারিয়েন্ট ও ইমেজ কন্ট্রোল
                  </h4>
                  <p className="text-xs text-rose-200/70 mt-0.5 leading-relaxed">
                    সহজে যেকোনো প্রোডাক্টের কালার সেট করুন এবং পিসি বা মোবাইল গ্যালারি/ক্যামেরা থেকে সরাসরি ছবি আপলোড করুন।
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('variants')}
                className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shrink-0 active:scale-95"
              >
                <span>কালার ভ্যারিয়েন্ট পেজে যান</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: DEDICATED COLOR VARIANT & IMAGE MANAGER PAGE
           ========================================================================= */}
        {activeTab === 'variants' && (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="bg-[#18070F]/90 rounded-3xl p-5 sm:p-6 border border-rose-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                  <Palette className="size-4" />
                  <span>প্রোডাক্ট কালার ও ভ্যারিয়েন্ট ম্যানেজমেন্ট</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  কালার ভ্যারিয়েন্ট ও ইমেজ কন্ট্রোল পেজ
                </h2>
                <p className="text-xs text-rose-200/70 mt-1 max-w-2xl leading-relaxed">
                  খুব সহজে যেকোনো প্রোডাক্টের কালার ভ্যারিয়েন্ট যুক্ত করুন, পিসি ফাইল বা ফোনের গ্যালারি/ক্যামেরা থেকে ছবি আপলোড করুন এবং রিয়েল-টাইম স্টক নির্ধারণ করুন।
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs bg-[#10030A] border border-rose-900/40 text-rose-200 px-3.5 py-2 rounded-xl">
                  মোট প্রোডাক্ট: <strong className="text-amber-400">{products.length}</strong> টি
                </span>
              </div>
            </div>

            {/* Section 1: Product Selector */}
            <div className="bg-[#1A0A12] rounded-3xl p-5 sm:p-6 border border-rose-900/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="size-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">১</span>
                  <span>প্রোডাক্ট সিলেক্ট করুন</span>
                </h3>
                <span className="text-xs text-rose-200/60">যে প্রোডাক্টের কালার সেট করতে চান সেটি নির্বাচন করুন</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8">
                  <select
                    value={activeVariantProductId}
                    onChange={(e) => setSelectedVariantProductId(e.target.value)}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-2xl p-3.5 text-xs sm:text-sm text-white outline-none focus:border-rose-400 font-medium cursor-pointer"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} — (৳{p.price} | {p.colors?.length || 0} টি কালার)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Product Quick Info Card */}
                {selectedProduct && (
                  <div className="md:col-span-4 bg-[#10030A]/90 rounded-2xl p-3 border border-rose-900/30 flex items-center gap-3">
                    <img
                      src={selectedProduct.images?.[0] || '/assets/logo.webp'}
                      alt={selectedProduct.name}
                      decoding="async"
                      className="size-12 rounded-xl object-contain bg-black border border-rose-900/40 shrink-0 p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white truncate">{selectedProduct.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-rose-400">৳{selectedProduct.price}</span>
                        <span className="text-[10px] text-rose-200/60">• {selectedProduct.colors?.length || 0} টি কালার বিদ্যমান</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Add New Color Variant Form */}
            <div className="bg-[#1A0A12] rounded-3xl p-5 sm:p-6 border border-rose-900/30 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                  <span className="size-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-black">২</span>
                  <span>নতুন কালার ভ্যারিয়েন্ট যোগ করুন</span>
                </h3>
                {colorSuccessMsg && (
                  <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 className="size-3.5" />
                    <span>{colorSuccessMsg}</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Color Name */}
                  <div className="md:col-span-5">
                    <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                      কালারের নাম (যেমন: Royal Maroon, Rich Wine, Rose Gold, Classic Black) *
                    </label>
                    <input
                      type="text"
                      placeholder="কালারের নাম লিখুন..."
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-3 text-xs sm:text-sm text-white outline-none focus:border-rose-400"
                    />
                  </div>

                  {/* Color Picker & Hex */}
                  <div className="md:col-span-4">
                    <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                      কালার সিলেক্ট করুন (পিকার)
                    </label>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={newColorHex}
                        onChange={(e) => setNewColorHex(e.target.value)}
                        className="size-11 rounded-xl bg-[#10030A] border border-rose-900/40 cursor-pointer p-1 shrink-0"
                      />
                      <input
                        type="text"
                        value={newColorHex}
                        onChange={(e) => setNewColorHex(e.target.value)}
                        placeholder="#000000"
                        className="w-28 bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono uppercase outline-none focus:border-rose-400"
                      />
                      <span className="inline-block size-8 rounded-xl border border-white/20 shadow-xs shrink-0" style={{ backgroundColor: newColorHex }} />
                    </div>
                  </div>

                  {/* Stock State */}
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-rose-200/90 mb-1.5">স্টক অবস্থা</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setNewColorInStock(true)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          newColorInStock
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-[#10030A] text-slate-400 border border-rose-900/30'
                        }`}
                      >
                        <Check className="size-3.5" />
                        <span>ইন স্টক</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewColorInStock(false)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          !newColorInStock
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-[#10030A] text-slate-400 border border-rose-900/30'
                        }`}
                      >
                        <X className="size-3.5" />
                        <span>আউট অফ স্টক</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1-Click Popular Colors Palette */}
                <div className="pt-3 border-t border-rose-900/30 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-rose-200/60 mr-1">রেডিমেড কালার (১-ক্লিক):</span>
                  {[
                    { name: 'Royal Maroon', hex: '#881337' },
                    { name: 'Rich Rose', hex: '#BE123C' },
                    { name: 'Luxury Gold', hex: '#F59E0B' },
                    { name: 'Deep Wine', hex: '#4C0519' },
                    { name: 'Pure White', hex: '#FFFFFF' },
                    { name: 'Matte Black', hex: '#0F172A' },
                    { name: 'Silver Gray', hex: '#94A3B8' },
                    { name: 'Deep Navy', hex: '#1E3A8A' },
                    { name: 'Emerald Green', hex: '#059669' },
                  ].map(chip => (
                    <button
                      key={chip.name}
                      type="button"
                      onClick={() => {
                        setNewColorHex(chip.hex);
                        setNewColorName(chip.name);
                      }}
                      className="flex items-center gap-1.5 bg-[#10030A] hover:bg-[#250D1B] border border-rose-900/30 hover:border-rose-700/50 px-3 py-1.5 rounded-xl text-xs text-rose-200 transition active:scale-95"
                    >
                      <span className="size-3 rounded-full border border-white/20" style={{ backgroundColor: chip.hex }} />
                      <span>{chip.name}</span>
                    </button>
                  ))}
                </div>

                {/* Optional Image for this Color Variant */}
                <div className="pt-3 border-t border-rose-900/30">
                  <label className="block text-xs font-bold text-rose-200/90 mb-1.5 flex items-center justify-between">
                    <span>এই কালারের ছবি আপলোড করুন (ঐচ্ছিক)</span>
                    <span className="text-[11px] text-amber-400 font-normal">PC ফাইল বা ফোনের গ্যালারি/ক্যামেরা (Auto WebP)</span>
                  </label>
                  <div className="bg-[#10030A] border border-rose-900/40 rounded-2xl p-3 flex flex-col sm:flex-row items-center gap-3">
                    {newColorImage ? (
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={newColorImage}
                          alt="Variant preview"
                          decoding="async"
                          className="size-14 rounded-xl object-contain bg-black border border-rose-900/40 shrink-0 p-1"
                        />
                        <div className="flex-1 space-y-1">
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 inline-block">
                            ✓ WebP রেডি (~{getImageDataSizeKB(newColorImage)} KB)
                          </span>
                          <div className="flex items-center gap-2">
                            <label className="cursor-pointer bg-[#1A0A12] hover:bg-[#250D1B] text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-rose-900/40 transition inline-flex items-center gap-1 active:scale-95">
                              <Upload className="size-3" />
                              <span>পরিবর্তন</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleVariantImageUpload}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => setNewColorImage('')}
                              className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded-lg border border-rose-500/30 hover:bg-rose-500/10 transition"
                            >
                              মুছে ফেলুন
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex items-center gap-2.5 bg-[#1A0A12] hover:bg-[#250D1B] border border-rose-900/40 hover:border-rose-500/50 px-4 py-2.5 rounded-xl text-xs text-rose-200 transition w-full sm:w-auto active:scale-95">
                        <Upload className="size-4 text-rose-400 shrink-0" />
                        <span>{isColorImageUploading ? 'ছবি আপলোড ও WebP কনভার্ট হচ্ছে...' : 'ছবি সিলেক্ট করুন (PC বা ফোনের গ্যালারি/ক্যামেরা)'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleVariantImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit Save Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleAddColor}
                    disabled={!newColorName.trim()}
                    className="w-full sm:w-auto bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3 px-8 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition active:scale-95"
                  >
                    <Plus className="size-4" />
                    <span>+ কালার ভ্যারিয়েন্ট যোগ করুন</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3: Existing Color Variants for Selected Product */}
            <div className="bg-[#1A0A12] rounded-3xl p-5 sm:p-6 border border-rose-900/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span className="size-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">৩</span>
                    <span>{selectedProduct?.name} — বিদ্যমান কালারসমূহ ({selectedProduct?.colors?.length || 0})</span>
                  </h3>
                  <p className="text-xs text-rose-200/60 mt-0.5">
                    নিচের কার্ডগুলো থেকে সরাসরি কালারের স্টক টগল বা রিমুভ করতে পারবেন।
                  </p>
                </div>
              </div>

              {(!selectedProduct?.colors || selectedProduct.colors.length === 0) ? (
                <div className="py-8 text-center text-slate-500">
                  <Palette className="size-10 mx-auto text-rose-900/60 mb-2" />
                  <p className="text-xs">এই প্রোডাক্টে এখনো কোনো কালার সেট করা হয়নি।</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">উপরের ফর্ম থেকে সহজে আপনার পছন্দের কালার যোগ করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {selectedProduct.colors.map((c) => (
                    <div
                      key={c.name}
                      className="bg-[#10030A] rounded-2xl p-4 border border-rose-900/30 hover:border-rose-700/60 transition flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {c.image ? (
                          <img
                            src={c.image}
                            alt={c.name}
                            decoding="async"
                            className="size-11 rounded-xl object-contain bg-black border border-rose-900/40 shrink-0 p-0.5"
                          />
                        ) : (
                          <span
                            className="size-10 rounded-xl border border-white/20 shrink-0 shadow-inner flex items-center justify-center"
                            style={{ backgroundColor: c.hex || '#CCCCCC' }}
                          />
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                          <span className="text-[10px] font-mono text-rose-200/60 block mt-0.5">{c.hex}</span>
                          <div className="mt-1">
                            {c.inStock !== false ? (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md inline-block">
                                ✓ ইন স্টক
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md inline-block">
                                ✕ আউট অফ স্টক
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleColorVariantStock(activeVariantProductId, c.name)}
                          className="bg-[#1A0A12] hover:bg-[#250D1B] text-rose-200 hover:text-white text-[11px] font-bold py-1.5 px-2.5 rounded-xl border border-rose-900/30 transition text-center"
                          title="স্টক পরিবর্তন"
                        >
                          {c.inStock !== false ? 'আউট' : 'ইন'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeColorVariant(activeVariantProductId, c.name)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                          title="কালার মুছে ফেলুন"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 4: ORDERS MANAGEMENT & MESSAGING
           ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Orders Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#1A0A12] p-4 rounded-2xl border border-rose-900/40 shadow-xl">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto flex-1 max-w-xl">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="অর্ডার আইডি, ফোন বা নাম দিয়ে খুঁজুন..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                  <Search className="size-4 text-rose-300/50 absolute left-3 top-3" />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#10030A] border border-rose-900/40 rounded-xl px-3 py-2.5 text-xs text-rose-200 outline-none cursor-pointer"
                >
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="Pending">Pending (অপেক্ষমাণ)</option>
                  <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                  <option value="Shipped">Shipped (ডেলিভারিতে)</option>
                  <option value="Delivered">Delivered (সম্পন্ন)</option>
                  <option value="Cancelled">Cancelled (বাতিল)</option>
                </select>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95"
              >
                <FileDown className="size-4 shrink-0" />
                <span>PDF রিপোর্ট ডাউনলোড ({filteredOrders.length})</span>
              </button>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-[#1A0A12] rounded-2xl p-12 text-center border border-rose-900/30 text-rose-200/60 shadow-xl">
                <Clock className="size-12 mx-auto text-rose-900/60 mb-2" />
                <p className="text-base font-bold text-white">কোনো অর্ডার পাওয়া যায়নি</p>
                <p className="text-xs mt-1">ফিল্টার রিসেট করুন অথবা নতুন অর্ডারের জন্য অপেক্ষা করুন।</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id || order.orderTrackingId}
                    className="bg-[#1A0A12] rounded-2xl p-4 sm:p-5 border border-rose-900/30 space-y-3 shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-900/30">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-black text-amber-400 text-sm">
                          {order.orderTrackingId || order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                          order.status === 'Delivered' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'Shipped' ? 'bg-indigo-500/20 text-indigo-400' :
                          order.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          ● {order.status}
                        </span>
                        <span className="text-rose-200/50 text-[11px]">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                        {/* Status Updater Select */}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id || order.orderTrackingId, e.target.value)}
                          className="flex-1 sm:flex-none bg-[#10030A] border border-rose-900/40 text-rose-200 text-xs rounded-lg px-2.5 py-2 sm:py-1 outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        {/* Direct WhatsApp Confirmation Button */}
                        <button
                          onClick={() => handleConfirmAndMessageCustomer(order)}
                          className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 sm:py-1 rounded-lg flex items-center justify-center gap-1 transition active:scale-95"
                          title="কনফার্ম করুন ও হোয়াটসঅ্যাপে মেসেজ পাঠান"
                        >
                          <MessageSquare className="size-3.5" />
                          <span>কনফার্ম & মেসেজ</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm('অর্ডারটি মুছে ফেলতে চান?')) {
                              deleteOrder(order.id || order.orderTrackingId);
                            }
                          }}
                          className="p-2 sm:p-1 bg-[#10030A] hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg transition shrink-0 border border-rose-900/30"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Items Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Customer Info */}
                      <div>
                        <span className="text-rose-200/60 block text-[10px]">গ্রাহকের বিবরণ:</span>
                        <p className="font-bold text-white text-sm">{order.customerName}</p>
                        <a href={`tel:${order.phone}`} className="text-rose-400 font-mono hover:underline block">
                          📞 {order.phone}
                        </a>
                        <p className="text-rose-100/80 mt-1">{order.address}</p>
                        <span className="text-[10px] text-rose-300/60 block">
                          জোন: {order.deliveryZone === 'outside_naogaon' || order.deliveryZone === 'outside_dhaka' ? 'নওগাঁর বাইরে সারা দেশ (৳' + (order.deliveryFee || 120) + ')' : 'নওগাঁ সদর (৳' + (order.deliveryFee || 60) + ')'}
                        </span>
                      </div>

                      {/* Items */}
                      <div>
                        <span className="text-rose-200/60 block text-[10px] mb-1">অর্ডারকৃত পণ্য:</span>
                        <div className="space-y-1">
                          {(order.items || []).map((it, idx) => (
                            <div key={idx} className="bg-[#10030A] p-1.5 rounded-lg border border-rose-900/30 flex items-center justify-between">
                              <span className="text-rose-100 truncate pr-2">
                                {it.product?.name} ({it.selectedColor || 'Standard'})
                              </span>
                              <span className="font-mono text-rose-400 font-bold shrink-0">
                                ×{it.quantity} (৳{it.product?.price * it.quantity})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment & Total */}
                      <div className="bg-[#10030A] p-3 rounded-xl border border-rose-900/40 flex flex-col justify-between">
                        <div>
                          <span className="text-rose-200/60 block text-[10px]">পেমেন্ট মাধ্যম:</span>
                          <span className={`font-bold inline-block mt-0.5 text-xs ${
                            order.paymentMethod === 'bkash' ? 'text-[#E2136E]' : 'text-emerald-400'
                          }`}>
                            {order.paymentMethod === 'bkash' ? 'বিকাশ সেন্ড মানি (Manual)' : 'ক্যাশ অন ডেলিভারি (COD)'}
                          </span>
                          {order.paymentMethod === 'bkash' && (
                            <div className="mt-1 font-mono text-[11px] text-rose-100 bg-rose-950/40 border border-rose-500/20 p-1 rounded">
                              <p>প্রেরক: {order.bkashSender}</p>
                              <p>TrxID: <strong className="text-white">{order.bkashTrxId}</strong></p>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-rose-900/30 mt-2 flex items-center justify-between">
                          <span className="text-rose-200/60 text-xs">সর্বমোট প্রদেয়:</span>
                          <span className="text-lg font-black text-amber-400 font-sans">
                            ৳{Number(order.totalAmount)?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 5: REAL-TIME STORE SETTINGS, CONTACT & DELIVERY FEES
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-[#1A0A12] rounded-3xl p-6 sm:p-8 border border-rose-900/40 shadow-xl max-w-4xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Settings className="size-4" />
                <span>রিয়েল-টাইম স্টোর সেটিংস ও ডেলিভারি কনফিগ</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-sans">
                ক্লায়েন্ট তথ্য, নম্বর ও ডেলিভারি চার্জ পরিবর্তন
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                এখানে করা যেকোনো পরিবর্তন ওয়েবসাইটের হেডার, ফুটার, চেকআউট পেজ এবং ফ্লোটিং বাটনে তাৎক্ষণিকভাবে লাইভ হবে।
              </p>
            </div>

            {settingsSuccessMsg && (
              <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="size-4" />
                <span>{settingsSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">স্টোরের নাম</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">ট্যাগলাইন / স্লোগান</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Physical Address & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">
                    ঠিকানা (Address)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    placeholder="নওগাঁ সদর, নওগাঁ"
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">
                    অফিসিয়াল ইমেইল (Email) *
                  </label>
                  <input
                    type="email"
                    required
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    placeholder="masud97186@gmail.com"
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Contact Numbers: bKash, WhatsApp, Hotline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">
                    বিকাশ পার্সোনাল নম্বর (Send Money) *
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.bkashNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bkashNumber: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">
                    ক্লায়েন্ট হোয়াটসঅ্যাপ নম্বর *
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">
                    জরুরি হটলাইন নম্বর *
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.hotline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Client Facebook Page Link */}
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">
                  ক্লায়েন্ট ফেসবুক পেজ লিংক (Facebook Page URL)
                </label>
                <input
                  type="url"
                  value={settingsForm.facebookPage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebookPage: e.target.value })}
                  placeholder="https://www.facebook.com/share/1FA8LYE5Y4/"
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                />
                <p className="text-[11px] text-rose-200/50 mt-1">
                  এই লিংকটি ওয়েবসাইটের ফুটার, হেডার এবং ফ্লোটিং সোশ্যাল বাটনে স্বয়ংক্রিয়ভাবে ব্যবহার হবে।
                </p>
              </div>

              {/* Delivery Charge Controls */}
              <div className="p-4 bg-[#10030A] rounded-2xl border border-rose-900/40 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <Truck className="size-4 text-rose-400" />
                  <span>ডেলিভারি চার্জ কনফিগারেশন (Delivery Fees)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-rose-200/70 mb-1">নওগাঁ সদর এর ভিতরে চার্জ (৳)</label>
                    <input
                      type="number"
                      required
                      value={settingsForm.deliveryFeeInside}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFeeInside: e.target.value })}
                      className="w-full bg-[#1A0A12] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-bold outline-none focus:border-rose-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-rose-200/70 mb-1">নওগাঁর বাইরে সারা দেশে চার্জ (৳)</label>
                    <input
                      type="number"
                      required
                      value={settingsForm.deliveryFeeOutside}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFeeOutside: e.target.value })}
                      className="w-full bg-[#1A0A12] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-bold outline-none focus:border-rose-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Save Settings */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-950/50 transition active:scale-95 cursor-pointer"
                >
                  <Save className="size-4" />
                  <span>সব সেটিংস রিয়েল-টাইমে সেভ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 6: ADMIN SECURITY & PASSWORD MANAGER (FIXED USERNAME)
           ========================================================================= */}
        {activeTab === 'security' && (
          <div className="bg-[#1A0A12] rounded-3xl p-6 sm:p-8 border border-rose-900/40 shadow-xl max-w-2xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Lock className="size-4" />
                <span>অ্যাডমিন সিকিউরিটি ও পাসওয়ার্ড কন্ট্রোল</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-sans">
                অ্যাডমিন পাসওয়ার্ড পরিবর্তন
              </h2>
              <p className="text-xs text-rose-200/70 mt-1 leading-relaxed">
                আপনার সুবিধার জন্য অ্যাডমিন ইউজারনেম ফিক্সড রাখা হয়েছে। আপনি যেকোনো সময় আপনার অ্যাডমিন পাসওয়ার্ড পরিবর্তন করতে পারবেন।
              </p>
            </div>

            {/* Locked Fixed Username Notice */}
            <div className="p-4 bg-[#10030A] border border-rose-900/40 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-rose-200/60 block font-bold uppercase tracking-wider">
                  ফিক্সড ইউজারনেম (অপরিবর্তনীয়)
                </span>
                <span className="text-base sm:text-lg font-black text-white font-mono mt-0.5 block">
                  {settings?.adminUsername || 'Maya Shopping Mall'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#240A18] border border-rose-900/50 text-rose-200 text-xs font-bold">
                <Lock className="size-3.5 text-amber-400" />
                <span>লকড / স্থায়ী</span>
              </div>
            </div>

            {/* Current Active Password Reference Card */}
            <div className="p-4 bg-[#10030A]/90 border border-amber-500/30 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-amber-300/80 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="size-3.5 text-amber-400" />
                  <span>বর্তমান সক্রিয় পাসওয়ার্ড</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
                >
                  {showCurrentPassword ? (
                    <>
                      <EyeOff className="size-3.5" />
                      <span>লুকান</span>
                    </>
                  ) : (
                    <>
                      <Eye className="size-3.5" />
                      <span>দেখুন</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-widest bg-[#18070F] px-3 py-2 rounded-xl border border-rose-900/40 inline-block">
                {showCurrentPassword ? (settings?.adminPassword || 'SameerXnjr10') : '••••••••••••'}
              </div>
            </div>

            {/* Feedback Alerts */}
            {passwordSuccessMsg && (
              <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="size-4 shrink-0 text-emerald-400" />
                <span>{passwordSuccessMsg}</span>
              </div>
            )}

            {passwordErrorMsg && (
              <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="size-4 shrink-0 text-rose-400" />
                <span>{passwordErrorMsg}</span>
              </div>
            )}

            {/* Password Change Form */}
            <form onSubmit={handleSavePassword} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                  নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="নতুন শক্তিশালী পাসওয়ার্ড লিখুন"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-3 pr-10 text-sm text-white font-mono outline-none focus:border-amber-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                  নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password) *
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="পুনরায় একই পাসওয়ার্ড লিখুন"
                  value={confirmAdminPassword}
                  onChange={(e) => setConfirmAdminPassword(e.target.value)}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-3 text-sm text-white font-mono outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="size-4" />
                  <span>{isSavingPassword ? 'সেভ হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন ও সেভ করুন'}</span>
                </button>
              </div>

              <p className="text-[11px] text-rose-200/50 text-center leading-relaxed">
                পাসওয়ার্ড পরিবর্তন করার সাথে সাথে তা নিরাপদে ফায়ারবেস ক্লাউডে সেভ হয়ে যাবে।
              </p>
            </form>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODAL 1: ADD NEW PRODUCT
         ========================================================================= */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#18070F] border border-rose-900/50 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-slate-100 max-h-[90vh] overflow-y-auto shadow-2xl shadow-rose-950/80">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/30 mb-4">
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <Plus className="size-5 text-rose-400" />
                <span>নতুন প্রোডাক্ট যোগ করুন</span>
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">ইংরেজি নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Embroidered Cotton Bed Sheet"
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">বাংলা শিরোনাম</label>
                  <input
                    type="text"
                    placeholder="যেমন: প্রিমিয়াম কটন বেডশিট সেট"
                    value={newProductForm.nameBn}
                    onChange={(e) => setNewProductForm({ ...newProductForm, nameBn: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">অফার মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1450"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">রেগুলার মূল্য (৳)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1850"
                    value={newProductForm.regularPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, regularPrice: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">ক্যাটাগরি *</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameBn} ({cat.nameEn})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1.5 flex items-center justify-between">
                  <span>প্রোডাক্টের ছবি আপলোড করুন *</span>
                  <span className="text-[11px] text-amber-400 font-normal">PC ফাইল অথবা মোবাইল গ্যালারি / ক্যামেরা</span>
                </label>
                
                <div className="bg-[#10030A] border-2 border-dashed border-rose-900/40 hover:border-rose-500/60 rounded-2xl p-4 transition-all">
                  {newProductForm.image ? (
                    <div className="flex items-center gap-4">
                      <div className="relative size-20 sm:size-24 rounded-xl bg-black border border-rose-900/40 overflow-hidden shrink-0 shadow-lg">
                        <img src={newProductForm.image} alt="Preview" className="size-full object-contain p-1" />
                      </div>
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            ✓ ছবি রেডি (WebP {newProductForm.image.startsWith('data:image/') ? `~${getImageDataSizeKB(newProductForm.image)} KB` : 'অপ্টিমাইজড'})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <label className="cursor-pointer bg-[#1A0A12] hover:bg-[#250D1B] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-rose-900/40 transition inline-flex items-center gap-1.5 active:scale-95">
                            <Upload className="size-3.5" />
                            <span>ছবি পরিবর্তন করুন</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleNewProductImageUpload}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setNewProductForm({ ...newProductForm, image: '' })}
                            className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500/10 transition"
                          >
                            মুছে ফেলুন
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-4 text-center group">
                      <div className="size-12 rounded-2xl bg-rose-500/10 group-hover:bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2.5 transition">
                        <Upload className="size-6 group-hover:scale-110 transition" />
                      </div>
                      <span className="text-xs font-bold text-white group-hover:text-rose-300 transition">
                        {isProductImageUploading ? 'ছবি আপলোড হচ্ছে...' : 'PC ফাইল বা ফোনের গ্যালারি/ক্যামেরা থেকে ছবি দিন'}
                      </span>
                      <span className="text-[11px] text-rose-200/50 mt-1">
                        ক্লিক করে ছবি সিলেক্ট করুন (JPG, PNG, WEBP)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleNewProductImageUpload}
                      />
                    </label>
                  )}
                </div>

                <div className="mt-1.5">
                  <input
                    type="text"
                    placeholder="অথবা সরাসরি ছবির URL বা পাথ দিন (/assets/products/...)"
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl px-3 py-1.5 text-[11px] text-rose-200/70 outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">স্টক পরিমাণ</label>
                  <input
                    type="number"
                    value={newProductForm.stockCount}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stockCount: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">ডিসকাউন্ট %</label>
                  <input
                    type="number"
                    placeholder="e.g. 25"
                    value={newProductForm.discountPercent}
                    onChange={(e) => setNewProductForm({ ...newProductForm, discountPercent: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">
                  সংক্ষিপ্ত বিবরণ (Short Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: প্রিমিয়াম কোয়ালিটি ১০০% সফট কটন বেডশিট..."
                  value={newProductForm.shortDescBn || ''}
                  onChange={(e) => setNewProductForm({ ...newProductForm, shortDescBn: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                />
              </div>

              {/* Key Features / Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-rose-200/90 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span>প্রধান বৈশিষ্ট্যসমূহ (Bullet Points)</span>
                  </label>
                  <span className="text-[11px] text-rose-200/50 font-normal">প্রতি লাইনে ১টি করে পয়েন্ট</span>
                </div>
                <textarea
                  rows={3}
                  placeholder={"যেমন:\n১০০% পাকা রং ও প্রিমিয়াম কোয়ালিটি।\nনওগাঁ সদর সহ সারা দেশে হোম ডেলিভারি।\nপছন্দ না হলে সহজ রিপ্লেসমেন্ট সুবিধা।"}
                  value={newProductForm.bulletPointsText || ''}
                  onChange={(e) => setNewProductForm({ ...newProductForm, bulletPointsText: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400 font-mono leading-relaxed"
                />
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-[#10030A] border border-rose-900/40 rounded-2xl p-3 sm:p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="size-3.5 text-rose-400" />
                      <span>টেকনিক্যাল স্পেসিফিকেশন (Specifications)</span>
                    </h4>
                    <p className="text-[10px] text-rose-200/60">প্রোডাক্টের ফেব্রিক, সাইজ, ডেলিভারি ইত্যাদি টেবিল আকারে দেখাবে</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNewSpecRow}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition active:scale-95 cursor-pointer"
                  >
                    <Plus className="size-3" />
                    <span>রো যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(newProductForm.specRows || []).map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="বিষয়/নাম (যেমন: ফেব্রিক)"
                        value={row.key}
                        onChange={(e) => handleUpdateNewSpecRow(idx, 'key', e.target.value)}
                        className="w-2/5 bg-[#1A0A12] border border-rose-900/40 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-rose-400"
                      />
                      <input
                        type="text"
                        placeholder="মান/বিবরণ (যেমন: ১০০% সফট কটন)"
                        value={row.value}
                        onChange={(e) => handleUpdateNewSpecRow(idx, 'value', e.target.value)}
                        className="flex-1 bg-[#1A0A12] border border-rose-900/40 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-rose-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewSpecRow(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {(newProductForm.specRows || []).length === 0 && (
                    <p className="text-[11px] text-rose-200/50 text-center py-2">
                      কোনো স্পেসিফিকেশন রো নেই। "+ রো যোগ করুন" বাটনে ক্লিক করুন।
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-rose-950/50"
                >
                  প্রোডাক্ট তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: EDIT PRODUCT DETAILS
         ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#18070F] border border-rose-900/50 rounded-2xl sm:rounded-3xl max-w-xl w-full p-4 sm:p-6 text-slate-100 max-h-[90vh] overflow-y-auto shadow-2xl shadow-rose-950/80">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/30 mb-4">
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <Edit3 className="size-5 text-rose-400" />
                <span>প্রোডাক্ট এডিট করুন</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">নাম</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">বাংলা নাম</label>
                <input
                  type="text"
                  value={editingProduct.nameBn || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, nameBn: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">ক্যাটাগরি</label>
                <select
                  value={editingProduct.category || 'bedding'}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nameBn} ({cat.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Image upload & preview for Edit Product */}
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1.5 flex items-center justify-between">
                  <span>প্রোডাক্টের ছবি (PC বা মোবাইল গ্যালারি)</span>
                  <span className="text-[11px] text-amber-400 font-normal">ক্লিক করে ছবি পরিবর্তন করুন</span>
                </label>
                <div className="bg-[#10030A] border border-rose-900/40 rounded-2xl p-3 flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
                  <img
                    src={editingProduct.image || editingProduct.images?.[0] || '/assets/logo.webp'}
                    alt={editingProduct.name}
                    decoding="async"
                    className="size-14 rounded-xl object-contain bg-black border border-rose-900/40 shrink-0 p-1"
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <label className="cursor-pointer bg-[#1A0A12] hover:bg-[#250D1B] text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-rose-900/40 transition inline-flex items-center gap-1.5 active:scale-95">
                        <Upload className="size-3.5" />
                        <span>{isEditImageUploading ? 'আপলোড হচ্ছে...' : 'ছবি পরিবর্তন (PC/গ্যালারি)'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleEditProductImageUpload}
                        />
                      </label>
                      {editingProduct.image && (
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                          WebP {editingProduct.image.startsWith('data:image/') ? `~${getImageDataSizeKB(editingProduct.image)} KB` : 'রেডি'}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="অথবা ছবির URL দিন"
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full bg-[#1A0A12] border border-rose-900/40 rounded-lg px-2.5 py-1 text-[11px] text-rose-200/70 outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">অফার মূল্য (৳)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">রেগুলার মূল্য (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.regularPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, regularPrice: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">স্টক কাউন্ট</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-rose-200/90 mb-1">ডিসকাউন্ট %</label>
                  <input
                    type="number"
                    value={editingProduct.discountPercent || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, discountPercent: e.target.value })}
                    className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-rose-200/90 mb-1">
                  সংক্ষিপ্ত বিবরণ (Short Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="যেমন: প্রিমিয়াম কোয়ালিটি সফট ফেব্রিক..."
                  value={editingProduct.shortDescBn || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescBn: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400"
                />
              </div>

              {/* Key Features / Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-rose-200/90 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span>প্রধান বৈশিষ্ট্যসমূহ (Bullet Points)</span>
                  </label>
                  <span className="text-[11px] text-rose-200/50 font-normal">প্রতি লাইনে ১টি করে পয়েন্ট</span>
                </div>
                <textarea
                  rows={3}
                  placeholder={"যেমন:\n১০০% পাকা রং ও প্রিমিয়াম কোয়ালিটি।\nনওগাঁ সদর সহ সারা দেশে হোম ডেলিভারি।\nপছন্দ না হলে সহজ রিপ্লেসমেন্ট সুবিধা।"}
                  value={editingProduct.bulletPointsText || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, bulletPointsText: e.target.value })}
                  className="w-full bg-[#10030A] border border-rose-900/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-rose-400 font-mono leading-relaxed"
                />
              </div>

              {/* Technical Specifications Table */}
              <div className="bg-[#10030A] border border-rose-900/40 rounded-2xl p-3 sm:p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="size-3.5 text-rose-400" />
                      <span>টেকনিক্যাল স্পেসিফিকেশন (Specifications)</span>
                    </h4>
                    <p className="text-[10px] text-rose-200/60">প্রোডাক্টের ফেব্রিক, সাইজ ইত্যাদি টেবিল আকারে দেখাবে</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEditSpecRow}
                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition active:scale-95 cursor-pointer"
                  >
                    <Plus className="size-3" />
                    <span>রো যোগ করুন</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(editingProduct.specRows || []).map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="বিষয়/নাম (যেমন: ফেব্রিক)"
                        value={row.key}
                        onChange={(e) => handleUpdateEditSpecRow(idx, 'key', e.target.value)}
                        className="w-2/5 bg-[#1A0A12] border border-rose-900/40 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-rose-400"
                      />
                      <input
                        type="text"
                        placeholder="মান/বিবরণ (যেমন: ১০০% সফট কটন)"
                        value={row.value}
                        onChange={(e) => handleUpdateEditSpecRow(idx, 'value', e.target.value)}
                        className="flex-1 bg-[#1A0A12] border border-rose-900/40 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-rose-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveEditSpecRow(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                  {(editingProduct.specRows || []).length === 0 && (
                    <p className="text-[11px] text-rose-200/50 text-center py-2">
                      কোনো স্পেসিফিকেশন রো নেই। "+ রো যোগ করুন" বাটনে ক্লিক করুন।
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Link to Color Variant for this product */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVariantProductId(editingProduct.id);
                    setEditingProduct(null);
                    setActiveTab('variants');
                  }}
                  className="w-full bg-[#10030A] hover:bg-[#1A0A12] border border-rose-900/50 text-rose-300 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <Palette className="size-4 text-rose-400" />
                  <span>এই প্রোডাক্টের কালার ভ্যারিয়েন্ট পেজে যান ({editingProduct.colors?.length || 0} টি কালার) →</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-rose-950/50"
                >
                  সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
