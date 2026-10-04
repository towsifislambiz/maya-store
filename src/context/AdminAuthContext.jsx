import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AdminAuthContext = createContext();

const ONE_HOUR_MS = 60 * 60 * 1000; // Exactly 1 hour (3,600,000 ms)

export const AdminAuthProvider = ({ children }) => {
  // Check if admin is currently unlocked within the 1-hour active window
  const checkIsUnlocked = () => {
    try {
      const isUnlocked = localStorage.getItem('maya_admin_unlocked') === 'true';
      const unlockTime = parseInt(localStorage.getItem('maya_admin_unlocked_time') || '0', 10);
      if (isUnlocked && unlockTime) {
        if (Date.now() - unlockTime < ONE_HOUR_MS) {
          return true;
        } else {
          // 1 hour expired! Automatically lock again
          localStorage.removeItem('maya_admin_unlocked');
          localStorage.removeItem('maya_admin_unlocked_time');
          return false;
        }
      }
    } catch {}
    return false;
  };

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(checkIsUnlocked);

  // Periodic checker: auto-relock exactly when 1 hour expires
  useEffect(() => {
    const interval = setInterval(() => {
      const valid = checkIsUnlocked();
      if (!valid && isAdminUnlocked) {
        setIsAdminUnlocked(false);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [isAdminUnlocked]);

  // Whether user is currently logged in with username & password
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('maya_admin_authenticated') === 'true';
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

    // If 5 clicks reached within the time window
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      clearTimeout(clickTimerRef.current);

      setIsAdminUnlocked(true);
      try {
        localStorage.setItem('maya_admin_unlocked', 'true');
        localStorage.setItem('maya_admin_unlocked_time', Date.now().toString());
      } catch {}

      setUnlockNotification('🔐 সিক্রেট আনলক সফল! অ্যাডমিন প্যানেল দৃশ্যমান হয়েছে (১ ঘণ্টার জন্য কার্যকর)।');
      setTimeout(() => {
        setUnlockNotification('');
      }, 5000);
      return true;
    }

    return false;
  };

  // Lock admin again (hide button immediately)
  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('maya_admin_unlocked');
      localStorage.removeItem('maya_admin_unlocked_time');
      sessionStorage.removeItem('maya_admin_authenticated');
    } catch {}
  };

  // Login handler
  const login = (username, password, storeAdminPassword) => {
    const cleanUser = (username || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const cleanPass = (password || '').trim();

    // Allowed usernames
    const allowedUsernames = [
      'maya shopping mall',
      'mayashoppingmall',
      'maya',
      'masud',
      'admin',
      'masud97186@gmail.com'
    ];

    // Allowed passwords
    const allowedPasswords = [
      'maya2026',
      'sameerxnjr10',
      'SameerXnjr10',
      'admin',
      '123456'
    ];

    if (storeAdminPassword) {
      allowedPasswords.push(storeAdminPassword.trim());
    }

    const isUserValid = allowedUsernames.includes(cleanUser);
    const isPassValid = allowedPasswords.includes(cleanPass) || allowedPasswords.map(p => p.toLowerCase()).includes(cleanPass.toLowerCase());

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('maya_admin_authenticated', 'true');
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
      sessionStorage.removeItem('maya_admin_authenticated');
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
