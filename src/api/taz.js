import { api } from './client.js';

export async function getTazSnapshot() {
  const response = await api.get('/taz/dashboard');
  return response.data;
}

// The backend owns Monero RPC credentials. The public browser receives only
// an aggregate and confirmed public transaction metadata.
export async function getXmrSummary() {
  const response = await api.get('/taz/xmr/summary');
  return response.data;
}
