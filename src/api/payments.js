import { apiFetch } from './config';

/**
 * Payment management API service.
 */
export const paymentsApi = {
  /**
   * Create a new payment.
   */
  async create(paymentData) {
    return apiFetch('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },

  /**
   * Verify a payment by transaction ID.
   */
  async verify(txId) {
    return apiFetch(`/payments/verify/${txId}`);
  },

  /**
   * Get payment history for a user.
   */
  async history(userAddress) {
    return apiFetch(`/payments/history/${userAddress}`);
  },

  /**
   * Get payment status by payment ID.
   */
  async status(paymentId) {
    return apiFetch(`/payments/${paymentId}`);
  },

  /**
   * Create escrow payment.
   */
  async createEscrow(escrowData) {
    return apiFetch('/escrow/create', {
      method: 'POST',
      body: JSON.stringify(escrowData),
    });
  },

  /**
   * Get escrow status for an order.
   */
  async escrowStatus(orderId) {
    return apiFetch(`/escrow/status/${orderId}`);
  },
};
