// import React, { createContext, useContext, useState } from 'react';
//
// const AuthContext = createContext(null);
//
// export function AuthProvider({ children }) {
//   // Read saved user or default to null so user lands on Hero section first
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
//
//   const [token, setToken] = useState(() => localStorage.getItem('token') || null);
//
//   const loginSession = (newToken, newUser) => {
//     setToken(newToken);
//     setUser(newUser);
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('user', JSON.stringify(newUser));
//   };
//
//   const logoutSession = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   };
//
//   return (
//     <AuthContext.Provider value={{ user, token, loginSession, logoutSession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
//
// export function useAuth() {
//   return useContext(AuthContext);
// }
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Always default user and token to null if clear or not set
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const loginSession = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logoutSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginSession, logoutSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}