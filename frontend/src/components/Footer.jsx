import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Brand & Copyright */}
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-black text-lg tracking-tight">
            <span className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-xs">🧠</span>
            CustomerPredictor AI
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CustomerPredictor AI. All rights reserved.
          </p>
        </div>

        {/* Clean Footer Navigation (No Join, Login, or Account links) */}
        <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="https://machinecivilization.blogspot.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
            Blog
          </a>
          <a href="#privacy" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition">
            Terms of Service
          </a>
        </nav>

      </div>
    </footer>
  );
}