import { apiFetch } from './config';

/**
 * Order management API service.
 */
export const ordersApi = {
  /**
   * Fetch all orders with optional filters.
   */
  async list(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    return apiFetch(`/orders${params ? '?' + params : ''}`);
  },

  /**
   * Get a single order by ID.
   */
  async get(orderId) {
    return apiFetch(`/orders/${orderId}`);
  },

  /**
   * Create a new order.
   */
  async create(orderData) {
    return apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  /**
   * Update an existing order's status.
   */
  async updateStatus(orderId, status) {
    return apiFetch(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Get order history for a user.
   */
  async history(userAddress) {
    return apiFetch(`/orders/history/${userAddress}`);
  },
};
