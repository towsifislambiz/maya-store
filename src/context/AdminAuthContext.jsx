import React, { createContext, useContext, useState, useRef } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  // Whether the admin button is revealed (persisted across sessions so owner doesn't lose it)
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    try {
      return localStorage.getItem('galaxy_admin_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Whether user is currently logged in with username & password
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('galaxy_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  // Temporary toast notification when 5-click unlock happens
  const [unlockNotification, setUnlockNotification] = useState('');

  // Click tracker for Navbar logo
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const recordLogoClick = () => {
    clickCountRef.current += 1;

    // Reset counter if too slow (3.5 seconds window)
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3500);

    // If 5 clicks reached
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      clearTimeout(clickTimerRef.current);

      setIsAdminUnlocked(true);
      try {
        localStorage.setItem('galaxy_admin_unlocked', 'true');
      } catch {}

      setUnlockNotification('🔐 সিক্রেট আনলক সফল! অ্যাডমিন প্যানেল বাটন দৃশ্যমান হয়েছে।');
      setTimeout(() => {
        setUnlockNotification('');
      }, 5000);
      return true;
    }

    return false;
  };

  // Lock admin again (hide button)
  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('galaxy_admin_unlocked');
      sessionStorage.removeItem('galaxy_admin_authenticated');
    } catch {}
  };

  // Login handler
  const login = (username, password, storeAdminPassword) => {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const allowedUsernames = [
      'admin',
      'gadgetsgalaxy',
      'gadgetsgalaxy2026gg@gmail.com'
    ];

    const allowedPasswords = [
      'admin',
      'galaxy2026',
      'admin123',
      '123456'
    ];

    if (storeAdminPassword) {
      allowedPasswords.push(storeAdminPassword.trim());
    }

    const isUserValid = allowedUsernames.includes(cleanUser);
    const isPassValid = allowedPasswords.includes(cleanPass);

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('galaxy_admin_authenticated', 'true');
      } catch {}
      return { success: true };
    }

    return {
      success: false,
      error: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিয়ে চেষ্টা করুন।'
    };
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('galaxy_admin_authenticated');
    } catch {}
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminUnlocked,
      isAuthenticated,
      unlockNotification,
      setUnlockNotification,
      recordLogoClick,
      lockAdmin,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
