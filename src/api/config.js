const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

export async function apiFetch(endpoint, options = {}) {
  const url = `${apiConfig.baseURL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}
