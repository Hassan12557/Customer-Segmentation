import React, { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, initialMode = 'login', onClose = () => {} }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Successfully ${mode === 'login' ? 'logged in' : 'signed up'}!`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-fade-in overflow-y-auto">

      {/* Expanded Modal Card Container (max-w-xl for standard large desktop size) */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-8 sm:p-12 space-y-8 my-8">

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition cursor-pointer text-base"
        >
          ✕
        </button>

        {/* Header Titles */}
        <div className="space-y-2 text-left">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {mode === 'login' ? 'Welcome back!' : 'Get Started'}
          </h3>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {mode === 'login'
              ? 'Enter your credentials to access your account dashboard.'
              : 'Create an account to start analyzing your customers with AI.'}
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">

          {/* Name (Signup Only) */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              />
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Email address</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Password & Forgot Link */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800">Password</label>
              {mode === 'login' && (
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Checkbox Options */}
          <div className="flex items-center text-sm text-slate-600 pt-1">
            {mode === 'signup' ? (
              <label className="flex items-center gap-2.5 cursor-pointer font-medium text-xs sm:text-sm">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 accent-emerald-800"
                />
                <span>I agree to the terms & policy</span>
              </label>
            ) : (
              <label className="flex items-center gap-2.5 cursor-pointer font-medium text-xs sm:text-sm">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 accent-emerald-800"
                />
                <span>Remember for 30 days</span>
              </label>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-bold text-base rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center mt-2"
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-slate-200"></div>
          <span className="absolute bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Or
          </span>
        </div>

        {/* Social Logins Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Google Button */}
          <button
            type="button"
            className="py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] rounded-2xl text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            className="py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] rounded-2xl text-xs sm:text-sm font-bold text-slate-700 flex items-center justify-center gap-2.5 transition cursor-pointer shadow-sm"
          >
            <svg className="w-5 h-5 shrink-0 fill-current text-slate-900" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.33.13-9.13-1.9-14.4-6.07-3.81-3.03-7.83-7.83-12.08-14.39-7.3-11.23-13-23.75-17.1-37.55-4.1-13.8-6.15-26.69-6.15-38.67 0-14.73 3.69-26.83 11.08-36.31 7.39-9.48 16.65-14.35 27.79-14.61 4.58 0 9.69 1.18 15.34 3.53 5.65 2.36 9.54 3.54 11.66 3.54 1.83 0 5.86-1.24 12.09-3.72 6.22-2.48 11.47-3.6 15.74-3.37 11.83.65 21.41 4.88 28.74 12.7-10.46 6.32-15.56 15.11-15.3 26.37.26 8.78 3.54 16.19 9.84 22.23 6.3 6.04 13.93 9.77 22.89 11.19-2.35 7.02-5.32 13.91-8.91 20.67zM119.22 31.84c0-6.95 2.5-13.68 7.51-20.19 5.01-6.51 11.23-10.55 18.66-12.12.26 1.05.39 1.97.39 2.75 0 6.82-2.58 13.56-7.74 20.22-5.16 6.66-11.43 10.74-18.82 12.24-.26-.78-.39-1.74-.39-2.9z" />
            </svg>
            <span>Sign in with Apple</span>
          </button>
        </div>

        {/* Bottom Switch Link */}
        <div className="text-center text-xs sm:text-sm font-semibold text-slate-600 pt-2">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}