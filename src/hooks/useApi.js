import { useState, useCallback } from 'react';

/**
 * Custom hook for API calls with loading/error state management.
 * @param {Function} apiFunction - The API function to call
 * @returns {{ data, loading, error, execute, reset }}
 */
export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for fetching data on mount.
 */
export function useFetch(apiFunction, deps = []) {
  const { data, loading, error, execute } = useApi(apiFunction);
  
  useState(() => {
    execute();
  }, deps);

  return { data, loading, error, refetch: execute };
}
