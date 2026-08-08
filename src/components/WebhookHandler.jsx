import { useEffect } from 'react';
import { useStore } from '../store/store.js';
import { on, WEBHOOK_EVENTS } from '../api/webhooks.js';

// Invisible component that wires webhook event listeners to the store.
// Mount inside StoreProvider to listen for order/payment updates.
export function WebhookHandler() {
  const { actions } = useStore();
  useEffect(() => {
    const unsubs = [
      on(WEBHOOK_EVENTS.ORDER_UPDATED, (payload) => {
        actions.fetchOrders();
      }),
      on(WEBHOOK_EVENTS.PAYMENT_VERIFIED, (payload) => {
        if (payload.orderId) actions.fetchPaymentHistory(payload.orderId);
      }),
    ];
    return () => unsubs.forEach((u) => u && u());
  }, []);
  return null;
}