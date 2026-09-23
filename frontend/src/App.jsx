// // src/App.jsx
// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import PredictionDashboard from './components/PredictionDashboard';
//
// export default function App() {
//   const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'login' });
//
//   // Open Modal Handler
//   const handleOpenAuth = (mode = 'login') => {
//     setAuthModalState({ isOpen: true, mode });
//   };
//
//   // Smooth Scroll Handler
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
//
//   return (
//    <div className="min-h-screen w-full bg-slate-50/50 text-slate-900 antialiased">
//
//       {/* Navbar Wrapper */}
//       <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
//           {/* Navigation Items */}
//         </div>
//       </header>
//
//       {/* Main Content Area */}
//       <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         {/* Hero Grid & Interactive Cards */}
//       </main>
//     </div>
//   );
// }
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionDashboard from './components/PredictionDashboard';

export default function App() {
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    mode: 'login',
  });

  // Open Modal Handler
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };

  // Smooth Scroll Handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        scrollToSection={scrollToSection}
      />

      {/* Main Page Content */}
      <main>
        <Hero
          onOpenAuth={handleOpenAuth}
          scrollToSection={scrollToSection}
        />

        <div id="prediction-dashboard">
          <PredictionDashboard />
        </div>
      </main>

      {/* Auth Modal overlay */}
      {authModalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setAuthModalState({ ...authModalState, isOpen: false })}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold p-1 rounded-full hover:bg-slate-100 transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-1">
              {authModalState.mode === 'login' ? 'Welcome Back' : 'Get Started Free'}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {authModalState.mode === 'login'
                ? 'Sign in to access your customer segmentation dashboard.'
                : 'Start predicting customer behavior with AI in seconds.'}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-600/20"
              >
                {authModalState.mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}