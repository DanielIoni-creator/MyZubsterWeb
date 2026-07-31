import { create } from 'zustand';
import * as orderApi from '../api/orders';
import * as paymentApi from '../api/payments';
import * as userApi from '../api/users';
import * as webhookApi from '../api/webhooks';

const useStore = create((set) => ({
  orders: [],
  payments: [],
  userProfile: null,
  userSettings: null,
  webhookEvents: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await orderApi.getOrders();
      set({ orders, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const newOrder = await orderApi.createOrder(orderData);
      set((state) => ({ orders: [...state.orders, newOrder], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const updatedOrder = await orderApi.updateOrderStatus(id, status);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updatedOrder : o)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPayments: async () => {
    set({ loading: true, error: null });
    try {
      const payments = await paymentApi.getPaymentHistory();
      set({ payments, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createPayment: async (paymentData) => {
    set({ loading: true, error: null });
    try {
      const payment = await paymentApi.createPayment(paymentData);
      set((state) => ({ payments: [...state.payments, payment], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchUserProfile: async () => {
    set({ loading: true, error: null });
    try {
      const userProfile = await userApi.getUserProfile();
      set({ userProfile, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchWebhookEvents: async () => {
    set({ loading: true, error: null });
    try {
      const webhookEvents = await webhookApi.getWebhookEvents();
      set({ webhookEvents, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
