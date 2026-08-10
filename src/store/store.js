import { createContext, createElement, useContext, useReducer, useCallback } from 'react';
import * as ordersApi from '../api/orders.js';
import * as paymentsApi from '../api/payments.js';
import * as usersApi from '../api/users.js';
import * as webhooksApi from '../api/webhooks.js';

// Reducer-based global store for orders, payments, user, and webhook events.

const initialState = {
  orders: [],
  currentOrder: null,
  payments: [],
  user: null,
  settings: null,
  loading: false,
  error: null,
  webhookEvents: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.value };
    case 'SET_ERROR':   return { ...state, error: action.error, loading: false };
    case 'CLEAR_ERROR': return { ...state, error: null };
    case 'SET_ORDERS':  return { ...state, orders: action.orders, loading: false };
    case 'SET_ORDER':   return { ...state, currentOrder: action.order, loading: false };
    case 'SET_PAYMENTS':return { ...state, payments: action.payments, loading: false };
    case 'SET_USER':    return { ...state, user: action.user, loading: false };
    case 'SET_SETTINGS':return { ...state, settings: action.settings, loading: false };
    case 'ADD_WEBHOOK_EVENT': return { ...state, webhookEvents: [...state.webhookEvents, action.event].slice(-50) };
    default: return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = useCallback((v) => dispatch({ type: 'SET_LOADING', value: v }), []);
  const setError = useCallback((e) => dispatch({ type: 'SET_ERROR', error: e }), []);
  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERROR' }), []);

  // Orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try { const orders = await ordersApi.listMyOrders(); dispatch({ type: 'SET_ORDERS', orders }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const fetchOrder = useCallback(async (id) => {
    setLoading(true);
    try { const order = await ordersApi.getOrder(id); dispatch({ type: 'SET_ORDER', order }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const createOrder = useCallback(async (skillId) => {
    setLoading(true);
    try { const order = await ordersApi.createOrder({ skillId }); dispatch({ type: 'SET_ORDER', order }); return order; }
    catch (e) { setError(e.message || String(e)); return null; }
  }, [setLoading, setError]);

  const updateOrderStatus = useCallback(async (id, status) => {
    setLoading(true);
    try { const order = await ordersApi.updateOrderStatus(id, status); dispatch({ type: 'SET_ORDER', order }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  // Payments
  const fetchPaymentHistory = useCallback(async (orderId) => {
    setLoading(true);
    try { const payments = await paymentsApi.getPaymentHistory(orderId); dispatch({ type: 'SET_PAYMENTS', payments }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const createPayment = useCallback(async (orderId) => {
    setLoading(true);
    try { return await paymentsApi.createPayment(orderId); }
    catch (e) { setError(e.message || String(e)); return null; }
  }, [setLoading, setError]);

  const verifyPayment = useCallback(async (paymentId) => {
    setLoading(true);
    try { return await paymentsApi.verifyPayment(paymentId); }
    catch (e) { setError(e.message || String(e)); return null; }
  }, [setLoading, setError]);

  // User
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try { const user = await usersApi.getProfile(); dispatch({ type: 'SET_USER', user }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try { const user = await usersApi.updateProfile(data); dispatch({ type: 'SET_USER', user }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try { const settings = await usersApi.getSettings(); dispatch({ type: 'SET_SETTINGS', settings }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  const updateSettings = useCallback(async (data) => {
    setLoading(true);
    try { const settings = await usersApi.updateSettings(data); dispatch({ type: 'SET_SETTINGS', settings }); }
    catch (e) { setError(e.message || String(e)); }
  }, [setLoading, setError]);

  // Webhook: handle inbound events and push to state + listeners.
  const handleWebhookEvent = useCallback((payload) => {
    dispatch({ type: 'ADD_WEBHOOK_EVENT', event: payload });
    return webhooksApi.handleWebhook(payload);
  }, []);

  const value = {
    state, actions: {
      setLoading, setError, clearError,
      fetchOrders, fetchOrder, createOrder, updateOrderStatus,
      fetchPaymentHistory, createPayment, verifyPayment,
      fetchProfile, updateProfile, fetchSettings, updateSettings,
      handleWebhookEvent,
    },
  };

  return createElement(StoreContext.Provider, { value }, children);
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// Export reducer and initialState for testing.
export { reducer, initialState, StoreContext };
