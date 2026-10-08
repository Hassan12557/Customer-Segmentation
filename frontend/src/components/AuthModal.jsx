// // import React, { useState } from 'react';
// // import { signupUser, loginUser } from '../services/api';
// // import { useAuth } from '../context/AuthContext';
// //
// // export default function AuthModal({ isOpen, onClose, initialMode = 'signup' }) {
// //   const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //
// //   const { loginSession } = useAuth();
// //
// //   if (!isOpen) return null;
// //
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);
// //
// //     try {
// //       if (isSignUp) {
// //         // Send payload matching backend expected keys (full_name, email, password)
// //         const response = await signupUser({
// //           full_name: fullName,
// //           email: email,
// //           password: password,
// //         });
// //
// //         // Save auth state upon successful registration
// //         if (response.data && response.data.access_token) {
// //           loginSession(response.data.access_token, response.data.user || { email, full_name: fullName });
// //           onClose();
// //         } else {
// //           // If signup requires login step next
// //           setIsSignUp(false);
// //           setError('Account created! Please sign in with your credentials.');
// //         }
// //       } else {
// //         const response = await loginUser({ email, password });
// //         loginSession(response.data.access_token, response.data.user);
// //         onClose();
// //       }
// //     } catch (err) {
// //       // Extract exact error detail from FastAPI response
// //       const detail = err.response?.data?.detail;
// //       if (typeof detail === 'string') {
// //         setError(detail);
// //       } else if (Array.isArray(detail)) {
// //         setError(detail[0]?.msg || 'Validation error');
// //       } else if (err.code === 'ERR_NETWORK') {
// //         setError('Cannot reach backend server. Ensure FastAPI is running on port 8000.');
// //       } else {
// //         setError('Authentication failed. Please check your credentials.');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
// //       <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
// //         <button
// //           type="button"
// //           onClick={onClose}
// //           className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold text-lg"
// //         >
// //           ✕
// //         </button>
// //
// //         <h3 className="text-2xl font-black text-slate-900">
// //           {isSignUp ? 'Get Started Free' : 'Welcome Back'}
// //         </h3>
// //         <p className="text-xs text-slate-500 font-medium mt-1 mb-6">
// //           {isSignUp ? 'Start predicting customer behavior with AI in seconds.' : 'Log in to your account.'}
// //         </p>
// //
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {isSignUp && (
// //             <div>
// //               <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={fullName}
// //                 onChange={(e) => setFullName(e.target.value)}
// //                 placeholder="John Doe"
// //                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-medium"
// //               />
// //             </div>
// //           )}
// //
// //           <div>
// //             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
// //             <input
// //               type="email"
// //               required
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="name@company.com"
// //               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-medium"
// //             />
// //           </div>
// //
// //           <div>
// //             <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
// //             <input
// //               type="password"
// //               required
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="••••••••"
// //               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 font-medium"
// //             />
// //           </div>
// //
// //           {error && (
// //             <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">
// //               {error}
// //             </p>
// //           )}
// //
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
// //           >
// //             {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
// //           </button>
// //         </form>
// //
// //         <div className="mt-6 text-center text-xs text-slate-500 font-medium">
// //           {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
// //           <button
// //             type="button"
// //             onClick={() => {
// //               setIsSignUp(!isSignUp);
// //               setError('');
// //             }}
// //             className="text-blue-600 font-bold underline cursor-pointer"
// //           >
// //             {isSignUp ? 'Log in' : 'Sign up free'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from 'react';
//
// export default function AuthModal({ isOpen, initialMode = 'login', onClose, onLoginSuccess, onSignupRequest, onLoginRequest, onVerifyOtp }) {
//   const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'signup' | 'otp'
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otpCode, setOtpCode] = useState('');
//
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//
//   if (!isOpen) return null;
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//
//     try {
//       if (activeTab === 'login') {
//         await onLoginRequest({ email, password });
//       } else if (activeTab === 'signup') {
//         await onSignupRequest({ name: fullName, email, password });
//         setActiveTab('otp'); // Transition to OTP view
//       } else if (activeTab === 'otp') {
//         await onVerifyOtp({ email, otp_code: otpCode });
//       }
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
//       <div className="relative w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl border border-slate-100">
//
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition p-1"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//
//         {/* Brand Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 text-xl font-black">
//             🧠
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
//               {activeTab === 'login' ? 'Welcome back' : activeTab === 'signup' ? 'Create your account' : 'Verify your email'}
//             </h2>
//             <p className="text-xs font-semibold text-slate-400">
//               CustomerPredictor · M. Hassan Raza
//             </p>
//           </div>
//         </div>
//
//         {/* Segmented Tab Switcher */}
//         {activeTab !== 'otp' && (
//           <div className="bg-slate-100 p-1 rounded-2xl flex mb-6">
//             <button
//               type="button"
//               onClick={() => { setActiveTab('login'); setError(''); }}
//               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
//                 activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
//               }`}
//             >
//               Log In
//             </button>
//             <button
//               type="button"
//               onClick={() => { setActiveTab('signup'); setError(''); }}
//               className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
//                 activeTab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>
//         )}
//
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {activeTab === 'signup' && (
//             <div>
//               <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 required
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Muhammad Hassan Raza"
//                 className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
//               />
//             </div>
//           )}
//
//           {(activeTab === 'login' || activeTab === 'signup') && (
//             <>
//               <div>
//                 <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="hello@example.com"
//                   className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
//                 />
//               </div>
//
//               <div>
//                 <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
//                 />
//               </div>
//             </>
//           )}
//
//           {activeTab === 'otp' && (
//             <div>
//               <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl mb-3 text-xs text-blue-800">
//                 An email with your 6-digit verification code was sent to <strong>{email}</strong>. (Use default code: <strong>123456</strong>)
//               </div>
//               <label className="block text-xs font-bold text-slate-700 mb-1">6-Digit Verification Code</label>
//               <input
//                 type="text"
//                 required
//                 maxLength={6}
//                 value={otpCode}
//                 onChange={(e) => setOtpCode(e.target.value)}
//                 placeholder="123456"
//                 className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-center text-xl font-mono tracking-widest focus:ring-2 focus:ring-blue-600 outline-none"
//               />
//             </div>
//           )}
//
//           {error && (
//             <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">
//               {error}
//             </p>
//           )}
//
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition shadow-lg shadow-blue-600/25 mt-2"
//           >
//             {loading ? 'Processing...' : activeTab === 'login' ? 'Log In' : activeTab === 'signup' ? 'Create Account' : 'Verify OTP'}
//           </button>
//         </form>
//
//         {activeTab !== 'otp' && (
//           <>
//             <div className="relative my-5 text-center">
//               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
//               <span className="relative bg-white px-3 text-xs font-semibold text-slate-400">or</span>
//             </div>
//
//             {/* Google Social Button */}
//             <button
//               type="button"
//               className="w-full py-3 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2.5 hover:bg-slate-50 transition"
//             >
//               <svg className="w-4 h-4" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
//               </svg>
//               Continue with Google
//             </button>
//
//             <p className="text-center text-xs font-medium text-slate-500 mt-5">
//               {activeTab === 'login' ? (
//                 <>Don't have an account? <button onClick={() => setActiveTab('signup')} className="text-blue-600 font-bold hover:underline">Create account</button></>
//               ) : (
//                 <>Already have an account? <button onClick={() => setActiveTab('login')} className="text-blue-600 font-bold hover:underline">Log in</button></>
//               )}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function AuthModal({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
  onSignupRequest,
  onLoginRequest,
  onVerifyOtp
}) {
  const [activeTab, setActiveTab] = useState(initialMode); // 'login' | 'signup' | 'otp'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await onLoginRequest({ email, password });
      } else if (activeTab === 'signup') {
        await onSignupRequest({ name: fullName, email, password });
        setActiveTab('otp'); // Transition to OTP view
      } else if (activeTab === 'otp') {
        await onVerifyOtp({ email, otp_code: otpCode });
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-7 shadow-2xl border border-slate-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 text-xl font-black">
            🧠
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {activeTab === 'login' ? 'Welcome back' : activeTab === 'signup' ? 'Create your account' : 'Verify your email'}
            </h2>
            <p className="text-xs font-semibold text-slate-400">
              CustomerPredictor · M. Hassan Raza
            </p>
          </div>
        </div>

        {/* Segmented Tab Switcher */}
        {activeTab !== 'otp' && (
          <div className="bg-slate-100 p-1 rounded-2xl flex mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Muhammad Hassan Raza"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
              />
            </div>
          )}

          {(activeTab === 'login' || activeTab === 'signup') && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
              </div>
            </>
          )}

          {activeTab === 'otp' && (
            <div>
              <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-2xl mb-3 text-xs text-blue-800 font-medium leading-relaxed">
                A 6-digit verification code was sent to <strong className="text-blue-950 font-bold">{email}</strong>. Please check your inbox or spam folder.
              </div>
              <label className="block text-xs font-bold text-slate-700 mb-1">6-Digit Verification Code</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="• • • • • •"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-center text-xl font-mono tracking-widest focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition shadow-lg shadow-blue-600/25 mt-2 cursor-pointer"
          >
            {loading ? 'Processing...' : activeTab === 'login' ? 'Log In' : activeTab === 'signup' ? 'Create Account' : 'Verify OTP'}
          </button>
        </form>

        {activeTab !== 'otp' && (
          <>
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative bg-white px-3 text-xs font-semibold text-slate-400">or</span>
            </div>

            {/* Google Social Button */}
            <button
              type="button"
              className="w-full py-3 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2.5 hover:bg-slate-50 transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs font-medium text-slate-500 mt-5">
              {activeTab === 'login' ? (
                <>Don't have an account? <button onClick={() => setActiveTab('signup')} className="text-blue-600 font-bold hover:underline cursor-pointer">Create account</button></>
              ) : (
                <>Already have an account? <button onClick={() => setActiveTab('login')} className="text-blue-600 font-bold hover:underline cursor-pointer">Log in</button></>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}