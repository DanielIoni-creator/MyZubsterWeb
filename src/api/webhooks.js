// Webhook event manager: subscribe to order/payment updates from the
// marketplace backend webhook endpoint, dispatch events to listeners,
// and provide a programmatic API for components to register handlers.

const listeners = new Map();

// Subscription type constants.
export const WEBHOOK_EVENTS = {
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  PAYMENT_CREATED: 'payment.created',
  PAYMENT_VERIFIED: 'payment.verified',
};

// Register a handler for a webhook event type.  Returns an unsubscribe function.
export function on(eventType, handler) {
  if (!listeners.has(eventType)) listeners.set(eventType, new Set());
  listeners.get(eventType).add(handler);
  return () => listeners.get(eventType).delete(handler);
}

// Remove all listeners (used in tests and teardown).
export function clearListeners() {
  listeners.clear();
}

// Dispatch an event to all registered handlers for that type.
// Any handler throwing does not block the others; errors are collected.
export function dispatch(eventType, payload) {
  const handlers = listeners.get(eventType);
  if (!handlers) return [];
  const errors = [];
  for (const h of handlers) {
    try { h(payload); } catch (e) { errors.push(e instanceof Error ? e.message : String(e)); }
  }
  return errors;
}

// Get the count of listeners for a type (mainly for testing).
export function listenerCount(eventType) {
  const s = listeners.get(eventType);
  return s ? s.size : 0;
}

// Map an inbound webhook payload to the appropriate event type, or null if
// the payload shape is not recognised.
export function classifyWebhook(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const t = payload.type || '';
  if (Object.values(WEBHOOK_EVENTS).includes(t)) return t;
  // Best-effort inference from payload keys.
  if (payload.orderId && payload.status) return WEBHOOK_EVENTS.ORDER_UPDATED;
  if (payload.paymentId && payload.status === 'confirmed') return WEBHOOK_EVENTS.PAYMENT_VERIFIED;
  if (payload.paymentId) return WEBHOOK_EVENTS.PAYMENT_CREATED;
  if (payload.orderId) return WEBHOOK_EVENTS.ORDER_CREATED;
  return null;
}

// Handle an inbound webhook payload: classify, dispatch, return result.
export function handleWebhook(payload) {
  const eventType = classifyWebhook(payload);
  if (!eventType) return { dispatched: false, eventType: null, errors: [] };
  const errors = dispatch(eventType, payload);
  return { dispatched: true, eventType, errors };
}
