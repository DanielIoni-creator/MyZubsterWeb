import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('API Client', () => {
  beforeEach(() => {
    fetch.mockReset();
    localStorage.clear();
  });

  it('should make GET requests', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: 'test' }),
    });

    const { api } = await import('../src/api/client');
    const result = await api.get('/api/test');
    expect(result).toEqual({ data: 'test' });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/test'),
      expect.objectContaining({ method: undefined })
    );
  });

  it('should make POST requests with body', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: '1' }),
    });

    const { api } = await import('../src/api/client');
    const result = await api.post('/api/orders', { amount: 100 });
    expect(result).toEqual({ id: '1' });
  });

  it('should include auth token when present', async () => {
    localStorage.setItem('auth_token', 'test-token');
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const { api } = await import('../src/api/client');
    await api.get('/api/protected');
    
    const callArgs = fetch.mock.calls[0][1];
    expect(callArgs.headers.Authorization).toBe('Bearer test-token');
  });

  it('should throw on HTTP errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' }),
    });

    const { api } = await import('../src/api/client');
    await expect(api.get('/api/missing')).rejects.toThrow('Not found');
  });
});
