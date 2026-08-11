import { describe, expect, it, vi } from 'vitest';
import { applyFeedEvent, compactHash, displayMetric, initialFeedState, normalizeSnapshot, parseFeedMessage } from '../src/taz/feed.js';

describe('TAZ live feed', () => {
  it('normalises backend snapshot without inventing missing values', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-10T10:00:00Z'));
    const snapshot = normalizeSnapshot({ metrics: { drinksServed: 12 }, robot: { status: 'serving' } });
    expect(snapshot.drinksServed).toBe(12);
    expect(snapshot.xmrReceived).toBeNull();
    expect(snapshot.robot.status).toBe('serving');
    vi.useRealTimers();
  });

  it('parses supported envelopes and rejects malformed payloads', () => {
    expect(parseFeedMessage('{"type":"robot.status","data":{"status":"idle"}}').type).toBe('robot.status');
    expect(parseFeedMessage('not-json')).toBeNull();
    expect(parseFeedMessage({ data: {} })).toBeNull();
    expect(parseFeedMessage({ type: 'metrics.updated', data: null })).toBeNull();
  });

  it('applies metric and robot events', () => {
    const metrics = applyFeedEvent(initialFeedState, { type: 'metrics.updated', data: { drinksServed: 0, xmrReceived: 1.25 } });
    const robot = applyFeedEvent(metrics, { type: 'robot.status', data: { status: 'mixing', name: 'TAZ-01' } });
    expect(robot.drinksServed).toBe(0);
    expect(robot.xmrReceived).toBe(1.25);
    expect(robot.robot).toMatchObject({ status: 'mixing', name: 'TAZ-01' });
  });

  it('deduplicates transaction updates by hash', () => {
    const first = applyFeedEvent(initialFeedState, { type: 'xmr.transaction', data: { txHash: 'abc', amount: 1 } });
    const second = applyFeedEvent(first, { type: 'xmr.transaction', data: { txHash: 'abc', amount: 2 } });
    expect(second.transactions).toHaveLength(1);
    expect(second.transactions[0].amount).toBe(2);
  });

  it('formats zero and missing values honestly', () => {
    expect(displayMetric(0, ' XMR')).toBe('0 XMR');
    expect(displayMetric(null, ' XMR')).toBe('—');
    expect(normalizeSnapshot({ metrics: { xmrReceived: null } }).xmrReceived).toBeNull();
    expect(compactHash('1234567890abcdefghij', 4)).toBe('1234…ghij');
  });
});
