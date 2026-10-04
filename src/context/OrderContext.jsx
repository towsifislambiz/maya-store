import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('maya_shopping_mall_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'MSM-84920',
          orderTrackingId: 'MSM-84920',
          customerName: 'মাসুম রানা',
          phone: '01814741111',
          address: 'নওগাঁ সদর, নওগাঁ',
          deliveryZone: 'inside_dhaka',
          deliveryFee: 60,
          paymentMethod: 'cod',
          items: [
            {
              product: {
                id: 'luxury-bedding-combo-maroon',
                name: 'Luxury Floral Cotton Bedding Combo Set',
                nameBn: 'লাক্সারি ফ্লোরাল বেডিং কম্বো সেট',
                price: 1350,
                images: ['/assets/products/bedding-1.webp']
              },
              quantity: 1,
              selectedColor: 'Maroon Floral'
            }
          ],
          totalAmount: 1410,
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
    localStorage.setItem('maya_shopping_mall_orders', JSON.stringify(orders));
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

  // Place a new order with MSM- prefix
  const placeOrder = async (orderData) => {
    setLoading(true);
    const orderId = `MSM-${Math.floor(100000 + Math.random() * 900000)}`;
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

  // Monthly Reset logic
  const resetMonthlyOrders = async () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    try {
      const archiveKey = `maya_shopping_mall_archive_${currentMonth}`;
      localStorage.setItem(archiveKey, JSON.stringify(orders));
      
      setOrders([]);
      localStorage.removeItem('maya_shopping_mall_orders');

      const ordersRef = collection(db, 'orders');
      const snap = await getDocs(ordersRef);
      const deletePromises = [];
      snap.forEach((d) => {
        deletePromises.push(deleteDoc(doc(db, 'orders', d.id)));
      });
      await Promise.all(deletePromises);
      
      localStorage.setItem('maya_shopping_mall_last_reset_month', currentMonth);
    } catch (e) {
      console.warn('Monthly reset error:', e);
    }
  };

  const { daysLeftInMonth, isMonthEndingSoon } = React.useMemo(() => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const daysLeft = Math.max(0, lastDay - today.getDate());
    return {
      daysLeftInMonth: daysLeft,
      isMonthEndingSoon: daysLeft <= 3
    };
  }, []);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const lastReset = localStorage.getItem('maya_shopping_mall_last_reset_month');
    if (lastReset && lastReset !== currentMonth) {
      console.log('New month detected. Auto resetting orders...');
      resetMonthlyOrders();
    } else if (!lastReset) {
      localStorage.setItem('maya_shopping_mall_last_reset_month', currentMonth);
    }
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
