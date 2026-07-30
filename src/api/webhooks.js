import { apiFetch } from './config';

/**
 * Webhook event handling service.
 */
export const webhooksApi = {
  /**
   * Register a webhook endpoint.
   */
  async register(eventType, callbackUrl) {
    return apiFetch('/webhooks/register', {
      method: 'POST',
      body: JSON.stringify({ eventType, callbackUrl }),
    });
  },

  /**
   * List registered webhooks.
   */
  async list() {
    return apiFetch('/webhooks');
  },

  /**
   * Delete a webhook registration.
   */
  async deregister(webhookId) {
    return apiFetch(`/webhooks/${webhookId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Process incoming webhook event (client-side handler).
   */
  async handleEvent(event) {
    const { type, data } = event;
    
    switch (type) {
      case 'order.updated':
        return { action: 'refresh_order', orderId: data.orderId, status: data.status };
      case 'payment.confirmed':
        return { action: 'payment_received', paymentId: data.paymentId };
      case 'escrow.funded':
        return { action: 'escrow_updated', escrowId: data.escrowId, status: 'funded' };
      case 'escrow.released':
        return { action: 'escrow_updated', escrowId: data.escrowId, status: 'released' };
      default:
        return { action: 'unknown', type };
    }
  },
};

/**
 * WebSocket-based live event subscription.
 */
export class WebSocketEvents {
  constructor(url) {
    this.url = url || import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws';
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    this.socket = new WebSocket(this.url);
    
    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const eventListeners = this.listeners.get(data.type) || [];
        eventListeners.forEach(cb => cb(data.payload));
      } catch (e) {
        console.error('WebSocket message error:', e);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected, reconnecting in 3s...');
      setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  }

  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  off(eventType, callback) {
    const cbs = this.listeners.get(eventType);
    if (cbs) {
      const idx = cbs.indexOf(callback);
      if (idx > -1) cbs.splice(idx, 1);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

// Singleton instance
export const wsEvents = new WebSocketEvents();
