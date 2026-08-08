import { api } from './client.js';

// Order service: create, list, detail, status update.
// All endpoints mirror MyZubster-Marketplace /routes/orders.js.

export async function createOrder({ skillId }) {
  const r = await api.post('/orders', { skillId });
  return r.data;
}

export async function listMyOrders() {
  const r = await api.get('/orders/my-orders');
  return r.data;
}

export async function getOrder(id) {
  const r = await api.get('/orders/' + id);
  return r.data;
}

export async function updateOrderStatus(id, status) {
  const r = await api.patch('/orders/' + id + '/status', { status });
  return r.data;
}

export const ORDER_STATUSES = ['pending', 'paid', 'in_progress', 'completed', 'cancelled', 'disputed'];
