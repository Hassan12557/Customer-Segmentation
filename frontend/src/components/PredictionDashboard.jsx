import React from 'react';

export default function PredictionDashboard({ onOpenAuth = () => {} }) {
  return (
    <section id="prediction-dashboard" className="py-12 sm:py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Blue Banner Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-white shadow-2xl shadow-blue-600/20 border border-blue-500/30">
          
          {/* Background Glow Accents */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase text-blue-100 border border-white/20">
                ⚡ Instant AI Predictions
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Ready to understand your customers?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
                Sign up free today to leverage machine learning behavioral segmentation and start running predictions in under a minute.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-700 active:scale-95 font-black text-sm rounded-2xl shadow-xl transition-all duration-200 cursor-pointer text-center"
              >
                Get Started Free →
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-8 py-3.5 bg-blue-800/40 hover:bg-blue-800/60 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all cursor-pointer text-center"
              >
                Already have an account? Log In
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}