import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Auth
  token: localStorage.getItem('auth_token') || null,
  user: null,
  setAuth: (token, user) => {
    localStorage.setItem('auth_token', token);
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, user: null });
  },

  // Orders
  orders: [],
  ordersLoading: false,
  fetchOrders: async () => {
    set({ ordersLoading: true });
    try {
      const { api } = await import('../api/client');
      const data = await api.get('/api/orders');
      set({ orders: data.orders || data, ordersLoading: false });
    } catch {
      set({ ordersLoading: false });
    }
  },

  // Payments
  payments: [],
  fetchPayments: async () => {
    try {
      const { api } = await import('../api/client');
      const data = await api.get('/api/payments');
      set({ payments: data.payments || data });
    } catch {}
  },

  // Users
  users: [],
  usersLoading: false,
  fetchUsers: async () => {
    set({ usersLoading: true });
    try {
      const { api } = await import('../api/client');
      const data = await api.get('/api/users');
      set({ users: data.users || data, usersLoading: false });
    } catch {
      set({ usersLoading: false });
    }
  },

  // Webhooks
  webhooks: [],
  createWebhook: async (webhook) => {
    const { api } = await import('../api/client');
    const data = await api.post('/api/webhooks', webhook);
    set((s) => ({ webhooks: [...s.webhooks, data.webhook || data] }));
  },
  fetchWebhooks: async () => {
    try {
      const { api } = await import('../api/client');
      const data = await api.get('/api/webhooks');
      set({ webhooks: data.webhooks || data });
    } catch {}
  },

  // Navigation
  activeView: 'dashboard',
  setView: (view) => set({ activeView: view }),
}));

export default useStore;
