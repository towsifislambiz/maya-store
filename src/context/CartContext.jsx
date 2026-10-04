import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStoreSettings } from './StoreSettingsContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { settings } = useStoreSettings();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('maya_shopping_mall_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('maya_shopping_mall_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka'); // 'inside_dhaka' (Naogaon) or 'outside_dhaka'

  useEffect(() => {
    localStorage.setItem('maya_shopping_mall_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('maya_shopping_mall_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Dynamic delivery charge from StoreSettings
  const feeInside = Number(settings?.deliveryFeeInside) || 60;
  const feeOutside = Number(settings?.deliveryFeeOutside) || 120;
  const deliveryFee = deliveryZone === 'inside_dhaka' ? feeInside : feeOutside;

  // Add to cart
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const colorToUse = selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedColor === colorToUse);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: colorToUse }];
    });
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (productId, selectedColor) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedColor === selectedColor)));
  };

  // Update quantity
  const updateQuantity = (productId, selectedColor, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === selectedColor) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Grand total calculation
  const grandTotal = subtotal > 0 ? (subtotal + deliveryFee) : 0;

  // Total items count badge
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlist,
      toggleWishlist,
      isInWishlist,
      subtotal,
      deliveryFee,
      feeInside,
      feeOutside,
      grandTotal,
      totalItemsCount,
      deliveryZone,
      setDeliveryZone
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
