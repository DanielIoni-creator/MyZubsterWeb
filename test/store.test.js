import { describe, it, expect } from 'vitest';
import { reducer, initialState } from '../src/store/store.js';

describe('store reducer', () => {
  it('sets loading flag', () => {
    const s = reducer(initialState, { type: 'SET_LOADING', value: true });
    expect(s.loading).toBe(true);
  });

  it('clears error and sets loading false', () => {
    const before = { ...initialState, loading: true, error: 'bad' };
    const s = reducer(before, { type: 'SET_ERROR', error: null });
    expect(s.error).toBeUndefined();
    expect(s.loading).toBe(false);
  });

  it('sets orders', () => {
    const s = reducer(initialState, { type: 'SET_ORDERS', orders: [{ id: 1 }] });
    expect(s.orders).toEqual([{ id: 1 }]);
    expect(s.loading).toBe(false);
  });

  it('sets current order', () => {
    const s = reducer(initialState, { type: 'SET_ORDER', order: { id: 2 } });
    expect(s.currentOrder).toEqual({ id: 2 });
  });

  it('sets payments', () => {
    const s = reducer(initialState, { type: 'SET_PAYMENTS', payments: [{ id: 'p1' }] });
    expect(s.payments).toEqual([{ id: 'p1' }]);
  });

  it('sets user profile', () => {
    const s = reducer(initialState, { type: 'SET_USER', user: { id: 1, name: 'A' } });
    expect(s.user).toEqual({ id: 1, name: 'A' });
  });

  it('sets settings', () => {
    const s = reducer(initialState, { type: 'SET_SETTINGS', settings: { email: true } });
    expect(s.settings).toEqual({ email: true });
  });

  it('adds webhook events and caps at 50', () => {
    let state = initialState;
    for (let i = 0; i < 55; i++) {
      state = reducer(state, { type: 'ADD_WEBHOOK_EVENT', event: { id: i } });
    }
    expect(state.webhookEvents).toHaveLength(50);
    expect(state.webhookEvents[0].id).toBe(5);
    expect(state.webhookEvents[49].id).toBe(54);
  });

  it('returns unchanged state for unknown action', () => {
    const s = reducer(initialState, { type: 'UNKNOWN' });
    expect(s).toBe(initialState);
  });

  it('clears error', () => {
    const before = { ...initialState, error: 'oops' };
    const s = reducer(before, { type: 'CLEAR_ERROR' });
    expect(s.error).toBeNull();
  });
});