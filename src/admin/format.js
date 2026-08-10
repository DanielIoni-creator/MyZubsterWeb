export function collectionFrom(payload, key) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export function metric(value, suffix = '') {
  if (value === null || value === undefined || value === '') return '—';
  return `${value}${suffix}`;
}

export function timestamp(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('it-IT');
}

export function compactHash(value, visible = 8) {
  if (!value) return '—';
  const text = String(value);
  if (text.length <= visible * 2 + 1) return text;
  return `${text.slice(0, visible)}…${text.slice(-visible)}`;
}

export function errorMessage(error) {
  if (error?.status === 401 || error?.status === 403) return 'Accesso admin non autorizzato.';
  return error?.message || 'Impossibile caricare i dati.';
}
