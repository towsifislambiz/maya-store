import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStoreSettings } from './StoreSettingsContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { settings } = useStoreSettings();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('galaxy_gadgets_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('galaxy_gadgets_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState('inside_dhaka'); // 'inside_dhaka' or 'outside_dhaka'

  useEffect(() => {
    localStorage.setItem('galaxy_gadgets_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('galaxy_gadgets_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Dynamic delivery charge from StoreSettings
  const feeInside = Number(settings?.deliveryFeeInside) || 80;
  const feeOutside = Number(settings?.deliveryFeeOutside) || 150;
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

  // Update item quantity
  const updateQuantity = (productId, selectedColor, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedColor === selectedColor) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const grandTotal = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      deliveryZone,
      setDeliveryZone,
      deliveryFee,
      feeInside,
      feeOutside,
      totalItemsCount,
      subtotal,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
