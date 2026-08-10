import { api } from './client.js';

// User management: profile fetch/update and settings.

export async function getProfile() {
  const r = await api.get('/users/me');
  return r.data;
}

export async function updateProfile(data) {
  const r = await api.patch('/users/me', data);
  return r.data;
}

export async function getSettings() {
  const r = await api.get('/users/me/settings');
  return r.data;
}

export async function updateSettings(data) {
  const r = await api.patch('/users/me/settings', data);
  return r.data;
}
