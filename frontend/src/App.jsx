import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PredictionDashboard from './components/PredictionDashboard';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { loginUser, signupUser, verifyOtp } from './services/api';

function MainLayout() {
  // Navigation views: 'home' | 'dashboard' | 'about'
  // Always defaults to 'home' so users land on the Hero page first
  const [activeView, setActiveView] = useState('home'); 
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  const { user, loginSession, logoutSession } = useAuth();

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleLoginRequest = async (credentials) => {
    const res = await loginUser(credentials);
    loginSession(res.data.access_token, res.data.user);
    handleCloseAuth();
    setActiveView('dashboard'); // Redirect to Dashboard after login
  };

  const handleSignupRequest = async (data) => {
    await signupUser(data);
  };

  const handleVerifyOtp = async (otpData) => {
    const res = await verifyOtp(otpData);
    loginSession(res.data.access_token, res.data.user);
    handleCloseAuth();
    setActiveView('dashboard'); // Redirect to Dashboard after OTP verification
  };

  const handleLogout = () => {
    logoutSession();
    setActiveView('home'); // Reset to Home page on logout
  };

  const scrollToSection = (id) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <Navbar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        scrollToSection={scrollToSection}
      />

      <main className="grow">
        {activeView === 'dashboard' && user ? (
          /* Render Dashboard ONLY when activeView is 'dashboard' AND user is logged in */
          <PredictionDashboard user={user} />
        ) : activeView === 'about' ? (
          /* Render About Me Page */
          <AboutMe onNavigateHome={() => setActiveView('home')} />
        ) : (
          /* Default Landing Page View */
          <>
            <Hero onOpenAuth={handleOpenAuth} scrollToSection={scrollToSection} />
            <HowItWorks />
          </>
        )}
      </main>

      <Footer
        scrollToSection={scrollToSection}
        onOpenAboutMe={() => { setActiveView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenAuth={handleOpenAuth}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={handleCloseAuth}
        onLoginRequest={handleLoginRequest}
        onSignupRequest={handleSignupRequest}
        onVerifyOtp={handleVerifyOtp}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}