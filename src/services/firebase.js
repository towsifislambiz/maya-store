import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "galaxy-gadgets.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "galaxy-gadgets",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "galaxy-gadgets.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "47510533469",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:47510533469:web:528518644c9a94c847a4b4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-92J24X7BZS"
};

// Initialize Firebase only if apiKey is present or fallback
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Safe Analytics init
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export default app;
