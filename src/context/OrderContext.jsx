import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('galaxy_gadgets_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'GG-84920',
          customerName: 'তানভীর আহমেদ',
          phone: '01712345678',
          address: 'বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা',
          deliveryZone: 'inside_dhaka',
          deliveryFee: 80,
          paymentMethod: 'cod',
          items: [
            {
              product: {
                id: 'airpods-pro-2',
                name: 'Apple AirPods Pro (2nd Generation)',
                price: 899,
                images: ['/assets/products/airpods_pro_2_open_case.webp']
              },
              quantity: 1,
              selectedColor: 'Pure White'
            }
          ],
          totalAmount: 979,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('galaxy_gadgets_orders', JSON.stringify(orders));
  }, [orders]);

  // Firestore sync for admin
  useEffect(() => {
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const list = [];
          snapshot.forEach((d) => {
            const data = d.data();
            list.push({
              id: d.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
            });
          });
          setOrders(list);
        }
      }, (err) => {
        console.warn('Firestore orders sync notice:', err.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase order listener fallback:', e);
    }
  }, []);

  // Place a new order
  const placeOrder = async (orderData) => {
    setLoading(true);
    const orderId = `GG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...orderData,
      orderTrackingId: orderId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    // Update local state immediately
    setOrders(prev => [newOrder, ...prev]);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'orders'), {
        ...newOrder,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Failed saving order to Firestore (saved locally):', err);
    } finally {
      setLoading(false);
    }

    return newOrder;
  };

  // Update order status (Admin)
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId || o.orderTrackingId === orderId) ? { ...o, status: newStatus } : o));
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (e) {
      console.warn('Status update local only:', e);
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId && o.orderTrackingId !== orderId));
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (e) {
      console.warn('Order delete error:', e);
    }
  };

  // Monthly Reset logic: clear state, archive to localStorage, wipe Firestore orders
  const resetMonthlyOrders = async () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    try {
      // Archive current orders before wiping
      const archiveKey = `galaxy_gadgets_archive_${currentMonth}`;
      localStorage.setItem(archiveKey, JSON.stringify(orders));
      
      // Clear state and active storage
      setOrders([]);
      localStorage.removeItem('galaxy_gadgets_orders');

      // Delete from Firestore
      const ordersRef = collection(db, 'orders');
      const snap = await getDocs(ordersRef);
      const deletePromises = [];
      snap.forEach((d) => {
        deletePromises.push(deleteDoc(doc(db, 'orders', d.id)));
      });
      await Promise.all(deletePromises);
      
      localStorage.setItem('galaxy_gadgets_last_reset_month', currentMonth);
    } catch (e) {
      console.warn('Monthly reset error:', e);
    }
  };

  // Calculate days remaining in current month
  const { daysLeftInMonth, isMonthEndingSoon } = React.useMemo(() => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysLeft = Math.max(0, lastDay - today.getDate());
    return {
      daysLeftInMonth: daysLeft,
      isMonthEndingSoon: daysLeft <= 3
    };
  }, []);

  // Auto-reset check when month transitions
  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastReset = localStorage.getItem('galaxy_gadgets_last_reset_month');
    if (lastReset && lastReset !== currentMonth) {
      console.log('New month detected. Auto resetting orders...');
      resetMonthlyOrders();
    } else if (!lastReset) {
      localStorage.setItem('galaxy_gadgets_last_reset_month', currentMonth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      placeOrder,
      updateOrderStatus,
      deleteOrder,
      resetMonthlyOrders,
      daysLeftInMonth,
      isMonthEndingSoon
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
