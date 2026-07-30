import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useStore from '../src/store/store';

describe('Store', () => {
  beforeEach(() => {
    // Reset store
    act(() => {
      useStore.setState({
        token: null, user: null, orders: [], payments: [],
        users: [], webhooks: [], activeView: 'dashboard',
      });
    });
  });

  it('should set and clear auth', () => {
    act(() => useStore.getState().setAuth('token123', { name: 'Test' }));
    expect(useStore.getState().token).toBe('token123');
    expect(useStore.getState().user).toEqual({ name: 'Test' });

    act(() => useStore.getState().clearAuth());
    expect(useStore.getState().token).toBeNull();
  });

  it('should switch active view', () => {
    act(() => useStore.getState().setView('orders'));
    expect(useStore.getState().activeView).toBe('orders');
  });

  it('should have initial empty state', () => {
    expect(useStore.getState().orders).toEqual([]);
    expect(useStore.getState().payments).toEqual([]);
    expect(useStore.getState().webhooks).toEqual([]);
  });
});
