import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isInitialAuthCheckComplete, setIsInitialAuthCheckComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user || null);
      setLoading(false);
      setIsInitialAuthCheckComplete(true);
    });
    return unsubscribe;
  }, []);

  if (currentUser === undefined || loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, isInitialAuthCheckComplete }}>
      {children}
    </AuthContext.Provider>
  );
};
