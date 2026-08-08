import { api } from './client.js';

// Payment service: create payment for an order, verify payment status,
// and fetch payment history.  These endpoints extend the marketplace order
// lifecycle (the backend assigns mock Monero addresses at order creation;
// "payment" here tracks verification +history against those mock records).

export async function createPayment(orderId) {
  const r = await api.post('/payments', { orderId });
  return r.data;
}

export async function verifyPayment(paymentId) {
  const r = await api.post('/payments/' + paymentId + '/verify');
  return r.data;
}

export async function getPaymentHistory(orderId) {
  const r = await api.get('/payments/history/' + orderId);
  return r.data;
}

export const PAYMENT_STATUSES = ['pending', 'confirming', 'confirmed', 'failed', 'refunded'];
