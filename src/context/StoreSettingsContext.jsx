import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const DEFAULT_SETTINGS = {
  storeName: 'Galaxy Gadgets',
  tagline: 'প্রিমিয়াম গ্যাজেট ও ইলেকট্রনিক্স স্টোর',
  address: 'অনলাইন স্টোর, বাংলাদেশ',
  email: 'gadgetsgalaxy2026gg@gmail.com',
  bkashNumber: '01749765271',
  whatsappNumber: '+880 1322-302319',
  hotline: '+880 1322-302319',
  deliveryFeeInside: 80,
  deliveryFeeOutside: 150,
  lastOrderResetMonth: new Date().toISOString().slice(0, 7)
};

const StoreSettingsContext = createContext();

export const StoreSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('galaxy_gadgets_store_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('galaxy_gadgets_store_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync with Firestore settings doc
  useEffect(() => {
    try {
      const settingsRef = doc(db, 'settings', 'store_config');
      const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings(prev => ({ ...prev, ...data }));
        }
      }, (err) => {
        console.warn('Firestore settings listener fallback:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error for settings:', e);
    }
  }, []);

  // Update settings in state, localStorage, and Firestore
  const updateSettings = async (newValues) => {
    setSettings(prev => {
      const updated = { ...prev, ...newValues };
      localStorage.setItem('galaxy_gadgets_store_settings', JSON.stringify(updated));
      return updated;
    });

    try {
      const settingsRef = doc(db, 'settings', 'store_config');
      await setDoc(settingsRef, newValues, { merge: true });
    } catch (err) {
      console.warn('Firestore settings write error:', err);
    }
  };

  return (
    <StoreSettingsContext.Provider value={{
      settings,
      updateSettings
    }}>
      {children}
    </StoreSettingsContext.Provider>
  );
};

export const useStoreSettings = () => useContext(StoreSettingsContext);
