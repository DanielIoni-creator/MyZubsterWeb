// Central axios instance for all MyZubster marketplace API calls.
import axios from 'axios';

const token = () => {
  try { return JSON.parse(localStorage.getItem('myzubster_token') || 'null'); }
  catch (_) { return null; }
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach bearer token on every request when available.
api.interceptors.request.use((config) => {
  const t = token();
  if (t) config.headers.Authorization = 'Bearer ' + t;
  return config;
});

// Normalise error shape so callers get { status, message, data } consistently.
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const payload = err.response && err.response.data;
    const message = (payload && payload.error) || err.message || 'Request failed';
    return Promise.reject({ status: err.response && err.response.status, message, data: payload });
  },
);

export function setToken(t) {
  if (t) localStorage.setItem('myzubster_token', JSON.stringify(t));
  else localStorage.removeItem('myzubster_token');
}
