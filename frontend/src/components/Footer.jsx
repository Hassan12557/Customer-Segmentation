import React, { useState } from 'react';

export default function Footer({ scrollToSection = () => {}, onOpenAboutMe = () => {}, onOpenAuth = () => {} }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const blogspotUrl = "https://machinecivilization.blogspot.com";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top Bar: Brand & Newsletter Search Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-slate-800">
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              🧠
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight block">
                CustomerPredictor
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Machine Learning Intelligence Platform
              </span>
            </div>
          </div>

          {/* Newsletter / Quick Search Box */}
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email for AI updates..."
              className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-72 transition"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer shrink-0"
            >
              {subscribed ? 'Subscribed! ✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Middle Grid: 4 Clean Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              PLATFORM
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-white transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('prediction-dashboard')} className="hover:text-white transition cursor-pointer">
                  Live Predictor
                </button>
              </li>
              <li>
                <button onClick={onOpenAboutMe} className="text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer">
                  About Developer ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li className="hover:text-white transition cursor-default">Behavioral Segmentation</li>
              <li className="hover:text-white transition cursor-default">Churn Risk Analytics</li>
              <li className="hover:text-white transition cursor-default">Actionable Marketing</li>
              <li className="hover:text-white transition cursor-default">Real-time ML API</li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              RESOURCES
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <a href={blogspotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">
                  Machine Civilization Blog ↗
                </a>
              </li>
              <li className="hover:text-white transition cursor-default">Documentation</li>
              <li className="hover:text-white transition cursor-default">Scikit-learn Model Docs</li>
              <li className="hover:text-white transition cursor-default">Docker Application</li>
            </ul>
          </div>

          {/* Col 4: Join Us & Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              JOIN US
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              Follow our AI updates and research.
            </p>
            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Sign Up Account
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 transition cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>
            CustomerPredictor © 2026. Built by{' '}
            <strong className="text-white font-bold">Muhammad Hassan Raza</strong> (Sukkur IBA University).
          </p>
          <div className="flex items-center gap-5">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition cursor-pointer">Home</button>
            <button onClick={onOpenAboutMe} className="hover:text-white transition cursor-pointer">About</button>
            <a href={blogspotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Blog</a>
          </div>
        </div>

      </div>
    </footer>
  );
}