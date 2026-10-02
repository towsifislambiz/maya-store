import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { StoreSettingsProvider } from './context/StoreSettingsContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { LanguageProvider } from './context/LanguageContext';

import Header from './components/Header';
import Footer from './components/Footer';
import MobileDock from './components/MobileDock';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminGuard from './components/AdminGuard';
import WebcraftGuard from './components/WebcraftGuard';

import HomePage from './pages/HomePage';

// Route-level Code Splitting for ultra-fast initial page loads
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));

// Helper to scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Lightweight Suspense Loader
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] py-16">
      <div className="flex flex-col items-center gap-3">
        <div className="size-9 border-3 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-400">লোড হচ্ছে...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreSettingsProvider>
      <LanguageProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <AdminAuthProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
                    <Header />
                    <CartDrawer />
                    
                    <main className="grow">
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/product/:id" element={<ProductDetailsPage />} />
                          <Route path="/shop" element={<ShopPage />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-success/:trackingId" element={<OrderSuccessPage />} />
                          <Route path="/admin/login" element={<AdminLoginPage />} />
                          <Route
                            path="/admin"
                            element={
                              <AdminGuard>
                                <AdminDashboard />
                              </AdminGuard>
                            }
                          />
                        </Routes>
                      </Suspense>
                    </main>

                    <Footer />
                    <FloatingWhatsApp />
                    <MobileDock />
                    {/* WebCraft Guard Remote Anti-Theft & Kill-Switch */}
                    <WebcraftGuard projectId="wg_galaxygadgets" />
                  </div>
                </BrowserRouter>
              </AdminAuthProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </LanguageProvider>
    </StoreSettingsProvider>
  );
}
