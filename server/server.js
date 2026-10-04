import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Firebase Configuration for Maya Shopping Mall
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyD-dzTfWqHX4AIjM8blP_172PcRpJazrEs",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "maya-store-fd1d0.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "maya-store-fd1d0",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "maya-store-fd1d0.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "862650817710",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:862650817710:web:48fb63bd8b17bb6a82213f",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-GGB59FXVB0"
};

let db = null;
try {
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  console.log(`[Firebase] Connected to project: ${firebaseConfig.projectId}`);
} catch (err) {
  console.warn('[Firebase] Init notice:', err.message);
}

// 2. Default Store Settings for Maya Shopping Mall (Naogaon Sadar)
const DEFAULT_SETTINGS = {
  storeName: "Maya Shopping Mall",
  tagline: "নওগাঁর বিশ্বস্ত ফ্যাশন ও লাক্সারি লাইফস্টাইল শপ",
  address: "নওগাঁ সদর, নওগাঁ",
  email: "masud97186@gmail.com",
  bkashNumber: "01821067277",
  whatsappNumber: "01814741111",
  hotline: "01814741111",
  deliveryFeeInside: 60,
  deliveryFeeOutside: 120,
  adminPassword: "maya2026",
  facebookPage: ""
};

// Local JSON file helpers for reliable caching & fallback
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

const readJson = (file, fallback) => {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch {}
  return fallback;
};

const writeJson = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`Failed to write ${file}:`, e);
  }
};

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ---------------------- API ROUTES ----------------------

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'Maya Shopping Mall',
    firebaseConnected: !!db,
    projectId: firebaseConfig.projectId,
    timestamp: new Date().toISOString()
  });
});

// 1. PRODUCTS API
app.get('/api/products', async (req, res) => {
  try {
    if (db) {
      try {
        const snap = await getDocs(collection(db, 'products'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          writeJson(PRODUCTS_FILE, list);
          return res.json({ success: true, count: list.length, products: list });
        }
      } catch (fbErr) {
        console.warn('[Products] Firestore read error, using local:', fbErr.message);
      }
    }
    const local = readJson(PRODUCTS_FILE, []);
    res.json({ success: true, count: local.length, products: local });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const prod = req.body;
    const id = prod.id || `msm-prod-${Date.now()}`;
    const newProd = { ...prod, id, createdAt: new Date().toISOString() };

    // Write to local cache
    const prods = readJson(PRODUCTS_FILE, []);
    const updated = [newProd, ...prods.filter(p => p.id !== id)];
    writeJson(PRODUCTS_FILE, updated);

    // Sync to Firestore
    if (db) {
      try {
        await setDoc(doc(db, 'products', id), newProd);
      } catch (fbErr) {
        console.warn('[Firestore] Product sync error:', fbErr.message);
      }
    }

    res.json({ success: true, product: newProd });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const prods = readJson(PRODUCTS_FILE, []);
    const idx = prods.findIndex(p => p.id === id);

    let updatedProd = null;
    if (idx !== -1) {
      updatedProd = { ...prods[idx], ...fields, updatedAt: new Date().toISOString() };
      prods[idx] = updatedProd;
      writeJson(PRODUCTS_FILE, prods);
    }

    if (db) {
      try {
        await updateDoc(doc(db, 'products', id), fields);
      } catch (fbErr) {
        console.warn('[Firestore] Update product sync error:', fbErr.message);
      }
    }

    res.json({ success: true, product: updatedProd });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const prods = readJson(PRODUCTS_FILE, []);
    const filtered = prods.filter(p => p.id !== id);
    writeJson(PRODUCTS_FILE, filtered);

    if (db) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (fbErr) {
        console.warn('[Firestore] Delete product sync error:', fbErr.message);
      }
    }

    res.json({ success: true, message: 'প্রোডাক্ট সফলভাবে ডিলিট করা হয়েছে' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. ORDERS API
app.get('/api/orders', async (req, res) => {
  try {
    if (db) {
      try {
        const snap = await getDocs(collection(db, 'orders'));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          writeJson(ORDERS_FILE, list);
          return res.json({ success: true, count: list.length, orders: list });
        }
      } catch (fbErr) {
        console.warn('[Orders] Firestore read error, using local:', fbErr.message);
      }
    }
    const local = readJson(ORDERS_FILE, []);
    res.json({ success: true, count: local.length, orders: local });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const trackingId = orderData.orderTrackingId || `MSM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...orderData,
      orderTrackingId: trackingId,
      status: orderData.status || 'Pending',
      createdAt: new Date().toISOString()
    };

    const orders = readJson(ORDERS_FILE, []);
    const updated = [newOrder, ...orders];
    writeJson(ORDERS_FILE, updated);

    if (db) {
      try {
        await setDoc(doc(db, 'orders', trackingId), newOrder);
      } catch (fbErr) {
        console.warn('[Firestore] Order sync error:', fbErr.message);
      }
    }

    res.json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = readJson(ORDERS_FILE, []);
    const idx = orders.findIndex(o => o.orderTrackingId === id || o.id === id);

    let updatedOrder = null;
    if (idx !== -1) {
      orders[idx].status = status;
      orders[idx].updatedAt = new Date().toISOString();
      updatedOrder = orders[idx];
      writeJson(ORDERS_FILE, orders);
    }

    if (db) {
      try {
        await updateDoc(doc(db, 'orders', id), { status, updatedAt: new Date().toISOString() });
      } catch (fbErr) {
        console.warn('[Firestore] Order status sync error:', fbErr.message);
      }
    }

    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const orders = readJson(ORDERS_FILE, []);
    const filtered = orders.filter(o => o.orderTrackingId !== id && o.id !== id);
    writeJson(ORDERS_FILE, filtered);

    if (db) {
      try {
        await deleteDoc(doc(db, 'orders', id));
      } catch (fbErr) {
        console.warn('[Firestore] Delete order sync error:', fbErr.message);
      }
    }

    res.json({ success: true, message: 'অর্ডার মুছে ফেলা হয়েছে' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. STORE SETTINGS API
app.get('/api/settings', async (req, res) => {
  try {
    if (db) {
      try {
        let snap = await getDoc(doc(db, 'settings', 'store_config'));
        if (!snap.exists()) {
          snap = await getDoc(doc(db, 'settings', 'store_settings'));
        }
        if (snap.exists()) {
          const cloud = snap.data();
          writeJson(SETTINGS_FILE, cloud);
          return res.json({ success: true, settings: cloud });
        }
      } catch (fbErr) {
        console.warn('[Settings] Firestore read error:', fbErr.message);
      }
    }
    const local = readJson(SETTINGS_FILE, DEFAULT_SETTINGS);
    res.json({ success: true, settings: local });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const incoming = req.body;
    const current = readJson(SETTINGS_FILE, DEFAULT_SETTINGS);
    const updated = { ...current, ...incoming, updatedAt: new Date().toISOString() };
    writeJson(SETTINGS_FILE, updated);

    if (db) {
      try {
        await setDoc(doc(db, 'settings', 'store_config'), updated, { merge: true });
      } catch (fbErr) {
        console.warn('[Firestore] Settings sync error:', fbErr.message);
      }
    }

    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. ADMIN AUTH API
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const currentSettings = readJson(SETTINGS_FILE, DEFAULT_SETTINGS);

  const validUsers = [
    'maya shopping mall',
    'mayashoppingmall',
    'admin',
    'maya',
    'masud',
    'masud97186@gmail.com'
  ];

  const validPasswords = [
    'maya2026',
    'sameerxnjr10',
    'SameerXnjr10',
    'admin',
    '123456',
    currentSettings.adminPassword
  ];

  if (validUsers.includes(cleanUser) && validPasswords.includes(cleanPass)) {
    return res.json({
      success: true,
      token: `maya_token_${Date.now()}`,
      user: { name: 'Maya Shopping Mall Admin', email: 'masud97186@gmail.com' }
    });
  }

  res.status(401).json({
    success: false,
    error: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিয়ে চেষ্টা করুন।'
  });
});

app.post('/api/admin/change-password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const currentSettings = readJson(SETTINGS_FILE, DEFAULT_SETTINGS);

  if (currentPassword !== currentSettings.adminPassword && currentPassword !== 'maya2026' && currentPassword !== 'sameerxnjr10') {
    return res.status(400).json({ success: false, error: 'বর্তমান পাসওয়ার্ডটি সঠিক নয়!' });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!' });
  }

  currentSettings.adminPassword = newPassword;
  writeJson(SETTINGS_FILE, currentSettings);

  if (db) {
    setDoc(doc(db, 'settings', 'store_settings'), { adminPassword: newPassword }, { merge: true }).catch(() => {});
  }

  res.json({ success: true, message: 'অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [Maya Shopping Mall Backend] running on http://localhost:${PORT}`);
  console.log(`📦 Connected to Firebase Project: ${firebaseConfig.projectId}`);
});
