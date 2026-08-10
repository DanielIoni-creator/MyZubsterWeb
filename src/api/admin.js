import { api } from './client.js';

export const ADMIN_ROLES = ['viewer', 'support', 'operator', 'admin'];
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

export async function listAdminUsers() {
  const response = await api.get('/admin/users');
  return response.data;
}

export async function updateUserAccess(userId, access) {
  const response = await api.patch(`/admin/users/${encodeURIComponent(userId)}/permissions`, access);
  return response.data;
}

export async function listXmrTransactions() {
  const response = await api.get('/admin/transactions/xmr');
  return response.data;
}

export async function listAuditLogs() {
  const response = await api.get('/admin/audit-logs');
  return response.data;
}
