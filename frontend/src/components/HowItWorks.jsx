import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Input Customer Metrics',
      description: 'Enter basic behavioral metrics—Recency, Frequency, and Monetary value—or upload a bulk dataset CSV.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'AI Behavioral Analysis',
      description: 'Our trained Machine Learning pipeline evaluates user vectors against pre-clustered behavioral patterns in milliseconds.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Automated Strategy Output',
      description: 'Receive instant segment classifications (VIP, At-Risk, Churned) along with targeted marketing playbooks for each user.',
      icon: (
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 inline-block px-3 py-1 rounded-full border border-blue-200/60">
            Workflow Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CustomerPredictor Delivers Results
          </h3>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Eliminate guesswork in marketing. Transform raw user behavioral data into hyper-targeted marketing decisions in three simple steps.
          </p>
        </div>

        {/* 3 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/70 hover:border-blue-300 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Learn process details</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}