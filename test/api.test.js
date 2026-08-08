import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock axios so API modules get a controllable client.
const mockAdapter = vi.fn();
vi.mock('axios', () => ({
  default: { create: () => ({ get: mockAdapter, post: mockAdapter, patch: mockAdapter, interceptors: { request: { use: () => {} }, response: { use: () => {} } } }) },
}));

import * as ordersApi from '../src/api/orders.js';
import * as paymentsApi from '../src/api/payments.js';
import * as usersApi from '../src/api/users.js';

beforeEach(() => mockAdapter.mockReset());

describe('orders API', () => {
  it('createOrder calls POST /orders with skillId', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 1, skillId: 's1', status: 'pending' } });
    const result = await ordersApi.createOrder({ skillId: 's1' });
    expect(mockAdapter).toHaveBeenCalledWith('post', '/orders', { skillId: 's1' });
    expect(result).toEqual({ id: 1, skillId: 's1', status: 'pending' });
  });

  it('listMyOrders calls GET /orders/my-orders', async () => {
    mockAdapter.mockResolvedValue({ data: [{ id: 1 }] });
    const result = await ordersApi.listMyOrders();
    expect(mockAdapter).toHaveBeenCalledWith('get', '/orders/my-orders');
    expect(result).toEqual([{ id: 1 }]);
  });

  it('getOrder calls GET /orders/:id', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 5, status: 'paid' } });
    const result = await ordersApi.getOrder(5);
    expect(mockAdapter).toHaveBeenCalledWith('get', '/orders/5');
    expect(result).toEqual({ id: 5, status: 'paid' });
  });

  it('updateOrderStatus calls PATCH /orders/:id/status', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 3, status: 'completed' } });
    const result = await ordersApi.updateOrderStatus(3, 'completed');
    expect(mockAdapter).toHaveBeenCalledWith('patch', '/orders/3/status', { status: 'completed' });
    expect(result).toEqual({ id: 3, status: 'completed' });
  });

  it('exports all valid order statuses', () => {
    expect(ordersApi.ORDER_STATUSES).toContain('pending');
    expect(ordersApi.ORDER_STATUSES).toContain('completed');
    expect(ordersApi.ORDER_STATUSES).toHaveLength(6);
  });
});

describe('payments API', () => {
  it('createPayment calls POST /payments', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 'p1', status: 'pending' } });
    const result = await paymentsApi.createPayment(1);
    expect(mockAdapter).toHaveBeenCalledWith('post', '/payments', { orderId: 1 });
    expect(result).toEqual({ id: 'p1', status: 'pending' });
  });

  it('verifyPayment calls POST /payments/:id/verify', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 'p1', status: 'confirmed' } });
    const result = await paymentsApi.verifyPayment('p1');
    expect(mockAdapter).toHaveBeenCalledWith('post', '/payments/p1/verify');
    expect(result).toEqual({ id: 'p1', status: 'confirmed' });
  });

  it('getPaymentHistory calls GET /payments/history/:orderId', async () => {
    mockAdapter.mockResolvedValue({ data: [{ id: 'p1' }] });
    const result = await paymentsApi.getPaymentHistory(1);
    expect(mockAdapter).toHaveBeenCalledWith('get', '/payments/history/1');
    expect(result).toEqual([{ id: 'p1' }]);
  });
});

describe('users API', () => {
  it('getProfile calls GET /users/me', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 1, name: 'A' } });
    const result = await usersApi.getProfile();
    expect(mockAdapter).toHaveBeenCalledWith('get', '/users/me');
    expect(result).toEqual({ id: 1, name: 'A' });
  });

  it('updateProfile calls PATCH /users/me with data', async () => {
    mockAdapter.mockResolvedValue({ data: { id: 1, name: 'B' } });
    const result = await usersApi.updateProfile({ name: 'B' });
    expect(mockAdapter).toHaveBeenCalledWith('patch', '/users/me', { name: 'B' });
    expect(result).toEqual({ id: 1, name: 'B' });
  });

  it('getSettings calls GET /users/me/settings', async () => {
    mockAdapter.mockResolvedValue({ data: { email: true } });
    const result = await usersApi.getSettings();
    expect(mockAdapter).toHaveBeenCalledWith('get', '/users/me/settings');
    expect(result).toEqual({ email: true });
  });

  it('updateSettings calls PATCH /users/me/settings', async () => {
    mockAdapter.mockResolvedValue({ data: { orderUpdates: false } });
    const result = await usersApi.updateSettings({ orderUpdates: false });
    expect(mockAdapter).toHaveBeenCalledWith('patch', '/users/me/settings', { orderUpdates: false });
    expect(result).toEqual({ orderUpdates: false });
  });
});