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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 text-slate-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 size-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <img
              src="/assets/logo.webp"
              alt="Galaxy Gadgets Logo"
              decoding="async"
              className="size-20 mx-auto object-contain rounded-3xl bg-black border border-slate-800 shadow-2xl p-1.5"
            />
            <span className="absolute -bottom-1 -right-1 size-6 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center shadow">
              <ShieldCheck className="size-3.5 stroke-[3]" />
            </span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[11px] font-bold text-cyan-400 mb-2">
              <Sparkles className="size-3" />
              <span>GALAXY GADGETS SECURITY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              অ্যাডমিন সিকিউরিটি লগইন
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              মাস্টার কন্ট্রোল প্যানেলে প্রবেশ করতে সঠিক ক্রেডেনশিয়াল দিন
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          
          {errorMsg && (
            <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-3.5 text-xs text-rose-300 flex items-start gap-2.5 animate-shake">
              <AlertCircle className="size-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1">
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                অ্যাডমিন ইউজারনেম
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="size-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 transition placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                সিকিউরিটি পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="size-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="পাসওয়ার্ড লিখুন..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-10 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 transition placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              {isLoading ? (
                <div className="size-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Help Box */}
          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="block font-bold text-slate-300">🔑 অ্যাডমিন লগইন তথ্য:</span>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-mono text-slate-300 space-y-0.5">
              <div>Username: <strong className="text-cyan-400">admin</strong></div>
              <div>Password: <strong className="text-amber-400">admin</strong> (অথবা <strong>galaxy2026</strong>)</div>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-cyan-400 transition inline-flex items-center gap-1"
          >
            ← লাইভ শপ পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}
