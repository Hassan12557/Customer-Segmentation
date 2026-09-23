// src/components/Navbar.jsx
import React, { useState } from 'react';

export default function Navbar({ onOpenAuth, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            🧠
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CustomerPredictor</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about-us')}
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            How it Works
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onOpenAuth('login')}
            className="text-slate-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => onOpenAuth('signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => { scrollToSection('about-us'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-slate-600 font-medium"
          >
            About Us
          </button>
          <button
            onClick={() => { scrollToSection('how-it-works'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-slate-600 font-medium"
          >
            How it Works
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
              className="w-full text-center py-2 text-slate-700 font-medium border border-slate-200 rounded-xl"
            >
              Log In
            </button>
            <button
              onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
              className="w-full text-center py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}