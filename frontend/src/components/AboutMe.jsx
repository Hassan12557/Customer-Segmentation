import React from 'react';

export default function AboutMe({ onNavigateHome = () => {} }) {
  // 1. UPLOAD YOUR IMAGE:
  // Option A: Put your photo file named "profile.jpg" into your project's "public" folder and set:
  // const profileImageUrl = "/profile.jpg";
  // Option B: Paste a direct URL to your photo below:
  const profileImageUrl = "/profile.jfif"; 

  // 2. YOUR BLOGSPOT LINK:
  const blogspotUrl = "https://machinecivilizationmhr.blogspot.com"; 

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-blue-100/50 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:text-blue-600 hover:border-blue-400 shadow-sm transition-all cursor-pointer"
          >
            ← Back to Main App
          </button>

          <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">
            Developer Profile
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Profile Card & Quick Stats */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 text-center space-y-6 relative overflow-hidden">

              {/* Profile Image Container */}
              <div className="relative w-44 h-44 mx-auto rounded-3xl p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md">
                <div className="w-full h-full rounded-[20px] bg-slate-100 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={profileImageUrl}
                    alt="Muhammad Hassan Raza"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Automatic fallback avatar if local image hasn't been placed in /public yet
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                </div>
              </div>

              {/* Name & Primary Role */}
              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Muhammad Hassan Raza
                </h2>
                <p className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                  Data Scientist & ML Engineer
                </p>
                <p className="text-xs text-slate-600 font-semibold">
                  Sukkur IBA University Alumnus
                </p>
              </div>

              {/* Founder of Machine Civilization with Blogspot Link */}
              <a
                href={blogspotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 text-xs font-bold border border-blue-200/80 transition-all cursor-pointer shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Founder of Machine Civilization ↗
              </a>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-center">
                {['Data Science', 'Machine Learning', 'Artificial Intelligence', 'Django Backend', 'Docker'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Specializations Card (Fixed High-Contrast Styling) */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
                Core Specializations
              </h4>
              <div className="space-y-2.5 text-xs font-bold text-slate-800">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span>Data Science</span>
                  <span className="text-blue-600 font-extrabold">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span>Machine Learning (ML)</span>
                  <span className="text-blue-600 font-extrabold">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span>Artificial Intelligence (AI)</span>
                  <span className="text-blue-600 font-extrabold">Advanced</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span>Backend & API Architecture</span>
                  <span className="text-indigo-600 font-extrabold">Django / FastAPI</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span>Containerized Deployment</span>
                  <span className="text-emerald-600 font-extrabold">Docker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Bio & Vision */}
          <div className="lg:col-span-8 space-y-6">

            {/* Header Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-200 space-y-6">

              {/* Headline Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300">
                  Computer Science Graduate
                </span>
                <a
                  href={blogspotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold border border-indigo-200 transition"
                >
                  Founder of Machine Civilization ↗
                </a>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Data Scientist
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  ML Engineer
                </span>
              </div>

              {/* Crisp High-Contrast Tagline */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                Production ML, Django Backend & Docker —{' '}
                <span className="text-blue-600 font-black">
                  Deploying End-to-End AI Systems
                </span>
              </h1>

              {/* Primary Intro Paragraph */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-slate-900 text-base leading-relaxed font-medium">
                My name is <strong className="text-slate-950 font-bold">Muhammad Hassan Raza</strong>, a Computer Science Graduate at <strong className="text-slate-950 font-bold">Sukkur IBA University</strong> | Exploring the Future of AI, Machine Learning & Data Science 🚀
              </div>

              {/* Extended Biography */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  I am a passionate student with a strong focus on machine learning, deep learning, data analysis, and data science. I’m driven by curiosity and a commitment to mastering the core technologies shaping the future of artificial intelligence.
                </p>
                <p>
                  I actively pursue knowledge in cutting-edge AI developments, and I'm engaged in exploring real-world applications of intelligent systems. My journey includes hands-on projects, research, and continuous learning to stay ahead in the evolving landscape of AI and data-driven innovation.
                </p>
                <p className="font-bold text-slate-900 pt-2">
                  Let’s connect and shape the future of intelligent technologies together!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  Explore CustomerPredictor Live Demo
                  <span>→</span>
                </button>
                <a
                  href={blogspotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 transition-all cursor-pointer flex items-center gap-2"
                >
                  Visit Machine Civilization Blog ↗
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}