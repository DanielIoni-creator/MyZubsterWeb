import { api } from './client.js';

export const ADMIN_ROLES = [
  'viewer',
  'support',
  'operator',
  'admin',
];

export const ADMIN_PERMISSIONS = [
  'users:read',
  'users:write',
  'transactions:read',
  'audit:read',
];

export async function getAdminStats() {
  const response = await api.get('/admin/stats');
  return response.data;
}

export async function getDashboardStats() {
  return getAdminStats();
}

export async function listAdminUsers() {
  const response = await api.get('/admin/users');
  return response.data;
}

export async function getUsers({
  page = 1,
  limit = 20,
  search = '',
} = {}) {
  const response = await api.get('/admin/users', {
    params: { page, limit, search },
  });
  return response.data;
}

export async function updateUserAccess(userId, access) {
  const response = await api.patch(
    `/admin/users/${encodeURIComponent(userId)}/permissions`,
    access,
  );
  return response.data;
}

export async function updateUserRole(userId, role) {
  const response = await api.patch(
    `/admin/users/${encodeURIComponent(userId)}/role`,
    { role },
  );
  return response.data;
}

export async function toggleUserStatus(userId) {
  const response = await api.post(
    `/admin/users/${encodeURIComponent(userId)}/toggle-status`,
  );
  return response.data;
}

export async function listXmrTransactions() {
  const response = await api.get('/admin/transactions/xmr');
  return response.data;
}

export async function getTransactions({
  page = 1,
  limit = 20,
  status = '',
} = {}) {
  const response = await api.get('/admin/transactions', {
    params: { page, limit, status },
  });
  return response.data;
}

export async function listAuditLogs() {
  const response = await api.get('/admin/audit-logs');
  return response.data;
}

export async function getAuditLogs({
  page = 1,
  limit = 50,
  level = '',
} = {}) {
  const response = await api.get('/admin/audit-logs', {
    params: { page, limit, level },
  });
  return response.data;
}

export async function getRealtimeFeed() {
  const response = await api.get('/admin/realtime');
  return response.data;
}
