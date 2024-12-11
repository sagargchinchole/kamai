import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the SessionContext
export const SessionContext = createContext(null);

// Custom hook to use the SessionContext
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

// Create a provider component
export function SessionProvider({ children }) {
  const [session, setSession] = useState(() => {
    // Retrieve session from localStorage if it exists
    const storedSession = localStorage.getItem('session');
    return storedSession ? JSON.parse(storedSession) : {};
  });

  // Update localStorage whenever the session changes
  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
  }, [session]);

  const value = {
    session,
    setSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}