import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAdapter } = vi.hoisted(() => ({ mockAdapter: vi.fn() }));
vi.mock('axios', () => ({
  default: { create: () => ({ get: mockAdapter, patch: mockAdapter, interceptors: { request: { use: () => {} }, response: { use: () => {} } } }) },
}));

import { getAdminStats, listAdminUsers, listAuditLogs, listXmrTransactions, updateUserAccess } from '../src/api/admin.js';
import { collectionFrom, compactHash, errorMessage, metric, timestamp } from '../src/admin/format.js';

beforeEach(() => mockAdapter.mockReset());

describe('admin API', () => {
  it.each([
    [getAdminStats, '/admin/stats'],
    [listAdminUsers, '/admin/users'],
    [listXmrTransactions, '/admin/transactions/xmr'],
    [listAuditLogs, '/admin/audit-logs'],
  ])('loads an admin resource', async (loader, endpoint) => {
    mockAdapter.mockResolvedValue({ data: { ok: true } });
    await expect(loader()).resolves.toEqual({ ok: true });
    expect(mockAdapter).toHaveBeenCalledWith(endpoint);
  });

  it('updates only the selected user access policy', async () => {
    const access = { role: 'operator', permissions: ['users:read'] };
    mockAdapter.mockResolvedValue({ data: { id: 'a/b', ...access } });
    await updateUserAccess('a/b', access);
    expect(mockAdapter).toHaveBeenCalledWith('/admin/users/a%2Fb/permissions', access);
  });
});

describe('admin data formatting', () => {
  it('accepts plain, named and data-wrapped collections', () => {
    expect(collectionFrom([1], 'users')).toEqual([1]);
    expect(collectionFrom({ users: [2] }, 'users')).toEqual([2]);
    expect(collectionFrom({ data: [3] }, 'users')).toEqual([3]);
    expect(collectionFrom({}, 'users')).toEqual([]);
  });

  it('does not invent missing metrics', () => {
    expect(metric(null, ' XMR')).toBe('—');
    expect(metric(0, ' XMR')).toBe('0 XMR');
  });

  it('compacts hashes and keeps the full short value', () => {
    expect(compactHash('1234567890abcdefghij', 4)).toBe('1234…ghij');
    expect(compactHash('1234', 4)).toBe('1234');
  });

  it('normalises errors and timestamps', () => {
    expect(errorMessage({ status: 403 })).toContain('non autorizzato');
    expect(timestamp('not-a-date')).toBe('not-a-date');
  });
});
