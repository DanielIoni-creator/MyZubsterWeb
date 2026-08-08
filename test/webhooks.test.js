import { describe, it, expect, beforeEach } from 'vitest';
import {
  on, dispatch, clearListeners, listenerCount, classifyWebhook, handleWebhook,
  WEBHOOK_EVENTS,
} from '../src/api/webhooks.js';

describe('webhook event manager', () => {
  beforeEach(() => clearListeners());

  it('registers and dispatches handlers', () => {
    let received = null;
    const unsub = on(WEBHOOK_EVENTS.ORDER_CREATED, (e) => { received = e; });
    dispatch(WEBHOOK_EVENTS.ORDER_CREATED, { orderId: 42, type: 'order.created' });
    expect(received).toEqual({ orderId: 42, type: 'order.created' });
    expect(listenerCount(WEBHOOK_EVENTS.ORDER_CREATED)).toBe(1);
    unsub();
    expect(listenerCount(WEBHOOK_EVENTS.ORDER_CREATED)).toBe(0);
  });

  it('classifies payloads by explicit type field', () => {
    expect(classifyWebhook({ type: 'order.updated' })).toBe(WEBHOOK_EVENTS.ORDER_UPDATED);
    expect(classifyWebhook({ type: 'payment.verified' })).toBe(WEBHOOK_EVENTS.PAYMENT_VERIFIED);
  });

  it('classifies payloads by best-effort inference', () => {
    expect(classifyWebhook({ orderId: 1, status: 'paid' })).toBe(WEBHOOK_EVENTS.ORDER_UPDATED);
    expect(classifyWebhook({ paymentId: 1, status: 'confirmed' })).toBe(WEBHOOK_EVENTS.PAYMENT_VERIFIED);
    expect(classifyWebhook({ paymentId: 1 })).toBe(WEBHOOK_EVENTS.PAYMENT_CREATED);
    expect(classifyWebhook({ orderId: 1 })).toBe(WEBHOOK_EVENTS.ORDER_CREATED);
  });

  it('returns null for unknown payload shapes', () => {
    expect(classifyWebhook(null)).toBeNull();
    expect(classifyWebhook(undefined)).toBeNull();
    expect(classifyWebhook({})).toBeNull();
  });

  it('handleWebhook dispatches recognised events', () => {
    let called = false;
    on(WEBHOOK_EVENTS.PAYMENT_CREATED, () => { called = true; });
    const result = handleWebhook({ paymentId: 5, type: 'payment.created' });
    expect(result.dispatched).toBe(true);
    expect(result.eventType).toBe(WEBHOOK_EVENTS.PAYMENT_CREATED);
    expect(called).toBe(true);
  });

  it('handleWebhook does not dispatch unrecognised events', () => {
    const result = handleWebhook({ random: 'stuff' });
    expect(result.dispatched).toBe(false);
    expect(result.eventType).toBeNull();
  });

  it('collects handler errors without blocking other handlers', () => {
    on(WEBHOOK_EVENTS.ORDER_CREATED, () => { throw new Error('boom'); });
    let secondCalled = false;
    on(WEBHOOK_EVENTS.ORDER_CREATED, () => { secondCalled = true; });
    const result = handleWebhook({ orderId: 1, type: 'order.created' });
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBe('boom');
    expect(secondCalled).toBe(true);
  });
});