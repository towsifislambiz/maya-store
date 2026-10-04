import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useStoreSettings } from '../context/StoreSettingsContext';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const { settings } = useStoreSettings();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(username, password, settings?.adminPassword);
      setIsLoading(false);

      if (res.success) {
        navigate('/admin');
      } else {
        setErrorMsg(res.error || 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#18070F] via-[#0E0308] to-[#0A0205] flex flex-col justify-center items-center px-4 py-12 text-rose-100 relative overflow-hidden select-none">
      
      {/* Background Luxury Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-rose-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 size-60 bg-rose-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/30 to-amber-500/30 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <img
              src="/assets/logo.svg"
              alt="Maya Shopping Mall Logo"
              decoding="async"
              className="relative size-20 sm:size-24 mx-auto object-contain rounded-3xl bg-[#1C0812] border border-rose-800/50 shadow-2xl p-2.5"
            />
            <span className="absolute -bottom-1 -right-1 size-6 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full flex items-center justify-center shadow-lg border border-rose-400/40">
              <ShieldCheck className="size-3.5 stroke-[3]" />
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-950/70 border border-rose-800/40 px-3.5 py-1 rounded-full text-[11px] font-extrabold text-amber-300 mb-2 shadow-sm">
              <Sparkles className="size-3 fill-amber-300 text-amber-300" />
              <span>MAYA SHOPPING MALL SECURITY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
              অ্যাডমিন সিকিউরিটি লগইন
            </h1>
            <p className="text-xs text-rose-300/70 mt-1">
              মাস্টার কন্ট্রোল প্যানেলে প্রবেশ করতে সঠিক ক্রেডেনশিয়াল দিন
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#1C0913]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-rose-800/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] space-y-5">
          
          {errorMsg && (
            <div className="bg-rose-950/90 border border-rose-500/60 rounded-2xl p-3.5 text-xs text-rose-200 flex items-start gap-2.5 animate-shake shadow-lg">
              <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1 font-medium">
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                অ্যাডমিন ইউজারনেম
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400/60">
                  <User className="size-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="admin অথবা masud97186@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#12050B] border border-rose-900/60 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition placeholder:text-rose-300/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-rose-200/90 mb-1.5">
                সিকিউরিটি পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-rose-400/60">
                  <Lock className="size-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="পাসওয়ার্ড লিখুন..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#12050B] border border-rose-900/60 rounded-xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition placeholder:text-rose-300/30 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-rose-400/60 hover:text-rose-200 cursor-pointer transition"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 disabled:opacity-50 text-white font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-900/50 transition-all active:scale-95 cursor-pointer border border-rose-400/30 hover:shadow-rose-600/30"
            >
              {isLoading ? (
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-rose-300/70 hover:text-amber-300 transition inline-flex items-center gap-1 font-medium"
          >
            ← লাইভ শপ পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}
