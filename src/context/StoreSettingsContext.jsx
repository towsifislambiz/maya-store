import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const DEFAULT_SETTINGS = {
  storeName: 'Maya Shopping Mall',
  storeNameBn: 'মায়া শপিং মল',
  tagline: 'নওগাঁর বিশ্বস্ত লাইফস্টাইল ও এক্সক্লুসিভ ফ্যাশন শপ',
  address: 'নওগাঁ সদর, নওগাঁ',
  email: 'masud97186@gmail.com',
  bkashNumber: '01821067277',
  whatsappNumber: '01814741111',
  hotline: '01814741111',
  facebookPage: 'https://facebook.com',
  adminUsername: 'admin',
  adminPassword: 'MayaShopping2026@',
  deliveryFeeInside: 60,
  deliveryFeeOutside: 120,
  freeDeliveryThreshold: 2500,
  lastOrderResetMonth: new Date().toISOString().slice(0, 7)
};

const StoreSettingsContext = createContext();

export const StoreSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('maya_shopping_mall_store_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('maya_shopping_mall_store_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync with Firestore settings doc
  useEffect(() => {
    try {
      const settingsRef = doc(db, 'settings', 'store_config');
      const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // If hotline was set to old placeholder, sanitize to official hotline
          if (data.hotline && data.hotline.includes('1322')) {
            data.hotline = '01814741111';
          }
          if (data.whatsappNumber && data.whatsappNumber.includes('1322')) {
            data.whatsappNumber = '01814741111';
          }
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

  // Also ensure current state doesn't have stale 1322 hotline from old localStorage
  useEffect(() => {
    if (settings?.hotline && settings.hotline.includes('1322')) {
      updateSettings({ hotline: '01814741111', whatsappNumber: '01814741111' });
    }
  }, [settings?.hotline]);

  // Update settings in state, localStorage, and Firestore
  const updateSettings = async (newValues) => {
    setSettings(prev => {
      const updated = { ...prev, ...newValues };
      localStorage.setItem('maya_shopping_mall_store_settings', JSON.stringify(updated));
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
