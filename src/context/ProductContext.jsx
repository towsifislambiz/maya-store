import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('maya_shopping_mall_products');
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_PRODUCTS;
  });
  const [loading, setLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('maya_shopping_mall_products', JSON.stringify(products));
  }, [products]);

  // Optional Firestore real-time sync with fallback
  useEffect(() => {
    try {
      const colRef = collection(db, 'products');
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        setLoading(false);
        if (!snapshot.empty) {
          const list = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          setProducts(list);
        }
      }, (err) => {
        setLoading(false);
        console.warn('Firestore products sync fallback to local:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase error, using local catalog:', e);
    }
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  // Add new product
  const addProduct = async (productData) => {
    const id = productData.id || `product-${Date.now()}`;
    const cleanImg = productData.image || productData.images?.[0] || '/assets/logo.svg';
    const cleanImgs = Array.isArray(productData.images) && productData.images.length > 0
      ? productData.images
      : [cleanImg];

    const newProd = {
      ...productData,
      id,
      image: cleanImg,
      images: cleanImgs
    };
    setProducts(prev => [newProd, ...prev]);

    try {
      await setDoc(doc(db, 'products', id), newProd);
    } catch (err) {
      console.warn('Firestore write error:', err);
    }
    return newProd;
  };

  // Update existing product
  const updateProduct = async (id, fields) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, ...fields };
      const cleanImg = updated.image || updated.images?.[0] || '/assets/logo.svg';
      const cleanImgs = Array.isArray(updated.images) && updated.images.length > 0
        ? updated.images
        : [cleanImg];
      return { ...updated, image: cleanImg, images: cleanImgs };
    }));
    try {
      await updateDoc(doc(db, 'products', id), fields);
    } catch (err) {
      console.warn('Firestore update error:', err);
    }
  };

  // Dynamic Color Variant Management
  const addColorVariant = async (productId, colorObj) => {
    const prod = getProductById(productId);
    if (!prod) return;
    const existing = prod.colors || [];
    const exists = existing.some(c => c.name.toLowerCase() === colorObj.name.toLowerCase());
    const updatedColors = exists
      ? existing.map(c => c.name.toLowerCase() === colorObj.name.toLowerCase() ? { ...c, ...colorObj } : c)
      : [...existing, colorObj];
    await updateProduct(productId, { colors: updatedColors });
  };

  const removeColorVariant = async (productId, colorName) => {
    const prod = getProductById(productId);
    if (!prod) return;
    const updatedColors = (prod.colors || []).filter(c => c.name !== colorName);
    await updateProduct(productId, { colors: updatedColors });
  };

  const toggleColorVariantStock = async (productId, colorName) => {
    const prod = getProductById(productId);
    if (!prod) return;
    const updatedColors = (prod.colors || []).map(c => 
      c.name === colorName ? { ...c, inStock: !c.inStock } : c
    );
    await updateProduct(productId, { colors: updatedColors });
  };

  const updateProductColors = async (productId, newColors) => {
    await updateProduct(productId, { colors: newColors });
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.warn('Firestore delete error:', err);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      addColorVariant,
      removeColorVariant,
      toggleColorVariantStock,
      updateProductColors
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
