export const initialFeedState = {
  drinksServed: null,
  xmrReceived: null,
  robot: { name: null, status: 'unknown', lastSeen: null },
  transactions: [],
  updatedAt: null,
};

const finiteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export function normalizeSnapshot(payload = {}) {
  const metrics = payload.metrics || payload;
  const xmr = payload.xmr || {};
  const robot = payload.robot || {};
  return {
    drinksServed: finiteNumber(metrics.drinksServed ?? metrics.totalDrinks),
    xmrReceived: finiteNumber(xmr.received ?? metrics.xmrReceived ?? metrics.totalXmr),
    robot: {
      name: robot.name || null,
      status: robot.status || 'unknown',
      lastSeen: robot.lastSeen || robot.updatedAt || null,
    },
    transactions: Array.isArray(xmr.transactions)
      ? xmr.transactions.slice(0, 20)
      : Array.isArray(payload.transactions) ? payload.transactions.slice(0, 20) : [],
    updatedAt: payload.updatedAt || new Date().toISOString(),
  };
}

export function parseFeedMessage(raw) {
  try {
    const event = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!event || typeof event.type !== 'string' || !event.data || typeof event.data !== 'object' || Array.isArray(event.data)) return null;
    return event;
  } catch {
    return null;
  }
}

export function applyFeedEvent(state, event) {
  if (!event) return state;
  const data = event.data || {};
  switch (event.type) {
    case 'dashboard.snapshot':
      return normalizeSnapshot(data);
    case 'metrics.updated':
      return {
        ...state,
        drinksServed: finiteNumber(data.drinksServed) ?? state.drinksServed,
        xmrReceived: finiteNumber(data.xmrReceived) ?? state.xmrReceived,
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    case 'robot.status':
      return {
        ...state,
        robot: {
          name: data.name || state.robot.name,
          status: data.status || 'unknown',
          lastSeen: data.lastSeen || data.updatedAt || new Date().toISOString(),
        },
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    case 'xmr.summary':
      return {
        ...state,
        xmrReceived: finiteNumber(data.received ?? data.totalXmr) ?? state.xmrReceived,
        transactions: Array.isArray(data.transactions) ? data.transactions.slice(0, 20) : state.transactions,
        updatedAt: data.updatedAt || new Date().toISOString(),
      };
    case 'xmr.transaction':
      return {
        ...state,
        xmrReceived: finiteNumber(data.totalXmr) ?? state.xmrReceived,
        transactions: [data, ...state.transactions.filter((item) => (item.txHash || item.hash) !== (data.txHash || data.hash))].slice(0, 20),
        updatedAt: data.updatedAt || data.timestamp || new Date().toISOString(),
      };
    default:
      return state;
  }
}

export function displayMetric(value, suffix = '') {
  return value === null || value === undefined ? '—' : `${value}${suffix}`;
}

export function compactHash(value, visible = 7) {
  if (!value) return '—';
  const text = String(value);
  return text.length <= visible * 2 + 1 ? text : `${text.slice(0, visible)}…${text.slice(-visible)}`;
}
