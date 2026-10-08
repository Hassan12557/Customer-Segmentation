import React from 'react';

export default function Navbar({ user, activeView, setActiveView, onOpenAuth, onLogout, scrollToSection }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const displayName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Clicking resets to Home */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setActiveView('home')}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-md shadow-blue-500/20">
            🧠
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            CustomerPredictor
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button 
            onClick={() => setActiveView('home')} 
            className={`transition cursor-pointer ${activeView === 'home' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('about')} 
            className={`transition cursor-pointer ${activeView === 'about' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
          >
            About Me
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="hover:text-blue-600 transition cursor-pointer"
          >
            How it Works
          </button>

          {/* Show Dashboard tab when authenticated */}
          {user && (
            <button
              onClick={() => setActiveView('dashboard')}
              className={`transition cursor-pointer ${activeView === 'dashboard' ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`}
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            /* Logged-in Profile Pill */
            <div className="flex items-center gap-3 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/60">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {initial}
              </div>
              <span className="text-sm font-bold text-slate-800 capitalize">{displayName}</span>
              <button
                onClick={onLogout}
                className="ml-2 text-xs text-red-600 hover:text-red-700 font-bold px-2 py-1 rounded-lg hover:bg-red-50 transition cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            /* Logged-out Auth Buttons */
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 transition cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-600/20 cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}