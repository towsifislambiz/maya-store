import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Maya Shopping Mall - Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-dzTfWqHX4AIjM8blP_172PcRpJazrEs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "maya-store-fd1d0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "maya-store-fd1d0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "maya-store-fd1d0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "862650817710",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:862650817710:web:48fb63bd8b17bb6a82213f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GGB59FXVB0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Safe Analytics init (runs only in browser environment)
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
