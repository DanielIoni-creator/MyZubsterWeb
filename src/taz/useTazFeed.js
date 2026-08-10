import { useCallback, useEffect, useReducer, useState } from 'react';
import { getTazSnapshot, getXmrSummary } from '../api/taz.js';
import { applyFeedEvent, initialFeedState, parseFeedMessage } from './feed.js';

const websocketUrl = () => {
  if (import.meta.env.VITE_TAZ_WS_URL) return import.meta.env.VITE_TAZ_WS_URL;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/api/taz/live`;
};

export function useTazFeed() {
  const [state, dispatch] = useReducer(applyFeedEvent, initialFeedState);
  const [connection, setConnection] = useState('connecting');
  const [error, setError] = useState('');

  const loadSnapshot = useCallback(async () => {
    const results = await Promise.allSettled([getTazSnapshot(), getXmrSummary()]);
    if (results[0].status === 'fulfilled') {
      dispatch({ type: 'dashboard.snapshot', data: results[0].value });
    }
    if (results[1].status === 'fulfilled') {
      dispatch({ type: 'xmr.summary', data: results[1].value });
    }
    if (results.every((result) => result.status === 'rejected')) {
      setError('Dati iniziali non disponibili. Nuovo tentativo tramite feed live.');
    } else setError('');
  }, []);

  useEffect(() => {
    loadSnapshot();
    let socket;
    let retryTimer;
    let cancelled = false;
    let attempts = 0;

    const connect = () => {
      setConnection('connecting');
      socket = new WebSocket(websocketUrl());
      socket.addEventListener('open', () => {
        attempts = 0;
        setConnection('live');
        setError('');
      });
      socket.addEventListener('message', (message) => {
        const event = parseFeedMessage(message.data);
        if (event) dispatch(event);
      });
      socket.addEventListener('error', () => setConnection('degraded'));
      socket.addEventListener('close', () => {
        if (cancelled) return;
        setConnection('reconnecting');
        attempts += 1;
        retryTimer = window.setTimeout(connect, Math.min(30_000, 1_000 * (2 ** attempts)));
      });
    };

    connect();
    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
      socket?.close();
    };
  }, [loadSnapshot]);

  return { state, connection, error, refresh: loadSnapshot };
}
