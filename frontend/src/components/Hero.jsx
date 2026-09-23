import React from 'react';

export default function Hero({
  onOpenAuth = () => {},
  scrollToSection = () => {}
}) {
  return (
    <section id="hero" className="w-full relative bg-slate-50/60 py-12 sm:py-16 lg:py-24 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-400/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide border border-blue-200/80">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            AI-Powered Customer Intelligence
          </div>

          {/* Cleaned Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Are you worried which{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent inline-block pb-1">
              marketing strategy
            </span>{' '}
            fits your customer?
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            An AI platform built by <strong className="text-slate-900 font-semibold">M. Hassan Raza</strong> to transform raw user metrics into actionable behavioral segments — instantly.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              Start Predicting Free
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200 cursor-pointer"
            >
              See How It Works
            </button>
          </div>

          {/* Highlights */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-semibold text-slate-500">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
              <span>🔐</span> Privacy First
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
              <span>⚡</span> Instant Results
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
              <span>🎯</span> 3-Metric AI Engine
            </div>
          </div>
        </div>

        {/* Right Column: Analytics Overview Card */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Live Segment Overview</h3>
                <p className="text-xs text-slate-400">Real-time model breakdown</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            </div>

            {/* Progress Indicators */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>VIP Customers</span>
                  <span className="text-emerald-600 font-bold">24%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Loyal Active</span>
                  <span className="text-blue-600 font-bold">41%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '41%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>At-Risk</span>
                  <span className="text-amber-600 font-bold">22%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Churned</span>
                  <span className="text-rose-600 font-bold">13%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 bg-slate-50/80 p-4 rounded-2xl">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Total Analyzed</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block mt-0.5">14,382</span>
                <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">+12% this month</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Avg. Accuracy</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 block mt-0.5">93.4%</span>
                <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">+2.1% this month</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}