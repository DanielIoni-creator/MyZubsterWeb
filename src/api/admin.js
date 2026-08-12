import { api } from './client.js';

// ─── Admin Dashboard API ───────────────────────────────────────────────
// All endpoints are prefixed with /api/admin (the central axios instance
// already sets baseURL to VITE_API_URL, so relative paths are fine).

/** Fetch live dashboard stats (total users, XMR volume, transactions, etc.) */
export async function getDashboardStats() {
  const r = await api.get('/admin/stats');
  return r.data;
}

/** Fetch paginated user list for admin management */
export async function getUsers({ page = 1, limit = 20, search = '' } = {}) {
  const r = await api.get('/admin/users', { params: { page, limit, search } });
  return r.data;
}

/** Update a user's role/permissions */
export async function updateUserRole(userId, role) {
  const r = await api.patch(`/admin/users/${userId}/role`, { role });
  return r.data;
}

/** Deactivate/activate a user account */
export async function toggleUserStatus(userId) {
  const r = await api.post(`/admin/users/${userId}/toggle-status`);
  return r.data;
}

/** Fetch recent XMR transactions */
export async function getTransactions({ page = 1, limit = 20, status = '' } = {}) {
  const r = await api.get('/admin/transactions', { params: { page, limit, status } });
  return r.data;
}

/** Fetch audit log entries */
export async function getAuditLogs({ page = 1, limit = 50, level = '' } = {}) {
  const r = await api.get('/admin/audit-logs', { params: { page, limit, level } });
  return r.data;
}

/** Fetch real-time feed (polled by the dashboard) */
export async function getRealtimeFeed() {
  const r = await api.get('/admin/realtime');
  return r.data;
}