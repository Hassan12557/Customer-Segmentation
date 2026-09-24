import React from 'react';

export default function Footer({ scrollToSection }) {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                🧠
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CustomerPredictor</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An end-to-end Machine Learning web application designed to segment customer bases and recommend targeted marketing actions in real time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition">How It Works</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('prediction-dashboard')} className="hover:text-white transition">Live Predictor</button>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Developer</h5>
            <p className="text-sm text-slate-300 font-semibold">M. Hassan Raza</p>
            <p className="text-xs text-slate-400">Data Science & AI/ML Engineer</p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300">
                React + FastAPI
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CustomerPredictor AI. All rights reserved.</p>
          <p className="text-slate-500">Built for production ML model serving.</p>
        </div>
      </div>
    </footer>
  );
}