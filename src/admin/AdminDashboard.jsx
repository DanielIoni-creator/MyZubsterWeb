import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ADMIN_PERMISSIONS,
  ADMIN_ROLES,
  getAdminStats,
  listAdminUsers,
  listAuditLogs,
  listXmrTransactions,
  updateUserAccess,
} from '../api/admin.js';
import { collectionFrom, compactHash, errorMessage, metric, timestamp } from './format.js';

const REFRESH_INTERVAL_MS = 15_000;
const userId = (user) => user.id ?? user._id;

function SectionState({ error, empty, children }) {
  if (error) return <p className="admin-error" role="alert">{error}</p>;
  if (empty) return <p className="admin-empty">Nessun dato disponibile.</p>;
  return children;
}

function Status({ value }) {
  const status = String(value || 'unknown').toLowerCase();
  return <span className={`status status-${status.replace(/[^a-z0-9_-]/g, '')}`}>{status}</span>;
}

function StatCards({ stats, error }) {
  const cards = [
    ['Utenti attivi', stats?.activeUsers ?? stats?.usersActive],
    ['Transazioni', stats?.totalTransactions ?? stats?.transactions],
    ['Volume XMR', stats?.totalXMR ?? stats?.totalXmr, ' XMR'],
    ['XMR in attesa', stats?.pendingTransactions ?? stats?.xmrPending],
  ];

  return (
    <section aria-labelledby="stats-title">
      <div className="section-heading">
        <div><p className="eyebrow">Panoramica</p><h2 id="stats-title">Statistiche in tempo reale</h2></div>
      </div>
      <SectionState error={error} empty={!stats}>
        <div className="stat-grid">
          {cards.map(([label, value, suffix]) => (
            <article className="stat-card" key={label}>
              <p>{label}</p>
              <strong>{metric(value, suffix)}</strong>
            </article>
          ))}
        </div>
      </SectionState>
    </section>
  );
}

function UserManagement({ users, error, onSaved }) {
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDrafts(Object.fromEntries(users.map((user) => [userId(user), {
      role: user.role || 'viewer',
      permissions: Array.isArray(user.permissions) ? user.permissions : [],
    }])));
  }, [users]);

  const setRole = (id, role) => setDrafts((current) => ({
    ...current,
    [id]: { ...current[id], role },
  }));

  const togglePermission = (id, permission) => setDrafts((current) => {
    const permissions = new Set(current[id]?.permissions || []);
    if (permissions.has(permission)) permissions.delete(permission);
    else permissions.add(permission);
    return { ...current, [id]: { ...current[id], permissions: [...permissions] } };
  });

  const save = async (user) => {
    const id = userId(user);
    setSaving(id);
    setMessage('');
    try {
      await updateUserAccess(id, drafts[id]);
      setMessage(`Permessi aggiornati per ${user.email || user.username || id}.`);
      await onSaved();
    } catch (saveError) {
      setMessage(errorMessage(saveError));
    } finally {
      setSaving(null);
    }
  };

  return (
    <section aria-labelledby="users-title">
      <div className="section-heading">
        <div><p className="eyebrow">Controllo accessi</p><h2 id="users-title">Utenti e permessi</h2></div>
      </div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <SectionState error={error} empty={!users.length}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Utente</th><th>Ruolo</th><th>Permessi</th><th><span className="sr-only">Azioni</span></th></tr></thead>
            <tbody>
              {users.map((user) => {
                const id = userId(user);
                const draft = drafts[id] || { role: 'viewer', permissions: [] };
                const permissionOptions = [...new Set([...ADMIN_PERMISSIONS, ...draft.permissions])];
                return (
                  <tr key={id}>
                    <td><strong>{user.name || user.username || 'Utente'}</strong><small>{user.email || id}</small></td>
                    <td>
                      <select aria-label={`Ruolo di ${user.email || id}`} value={draft.role} onChange={(event) => setRole(id, event.target.value)}>
                        {[...new Set([...ADMIN_ROLES, draft.role])].map((role) => <option key={role}>{role}</option>)}
                      </select>
                    </td>
                    <td><div className="permission-list">
                      {permissionOptions.map((permission) => (
                        <label key={permission}>
                          <input type="checkbox" checked={draft.permissions.includes(permission)} onChange={() => togglePermission(id, permission)} />
                          {permission}
                        </label>
                      ))}
                    </div></td>
                    <td><button className="secondary-button" disabled={saving === id} onClick={() => save(user)}>{saving === id ? 'Salvataggio…' : 'Salva'}</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionState>
    </section>
  );
}

function TransactionMonitor({ transactions, error }) {
  return (
    <section aria-labelledby="transactions-title">
      <div className="section-heading">
        <div><p className="eyebrow">Monero</p><h2 id="transactions-title">Monitoraggio transazioni XMR</h2></div>
      </div>
      <SectionState error={error} empty={!transactions.length}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Hash</th><th>Importo</th><th>Conferme</th><th>Stato</th><th>Data</th></tr></thead>
            <tbody>{transactions.map((transaction, index) => {
              const hash = transaction.txHash || transaction.hash || transaction.id;
              return (
                <tr key={hash || index}>
                  <td><code title={hash}>{compactHash(hash)}</code></td>
                  <td>{metric(transaction.amountXmr ?? transaction.amount, ' XMR')}</td>
                  <td>{metric(transaction.confirmations)}</td>
                  <td><Status value={transaction.status} /></td>
                  <td>{timestamp(transaction.createdAt || transaction.timestamp)}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </SectionState>
    </section>
  );
}

function AuditTrail({ logs, error }) {
  return (
    <section aria-labelledby="audit-title">
      <div className="section-heading">
        <div><p className="eyebrow">Sicurezza</p><h2 id="audit-title">Log e audit trail</h2></div>
      </div>
      <SectionState error={error} empty={!logs.length}>
        <ol className="audit-list">
          {logs.map((log, index) => (
            <li key={log.id || index}>
              <div><strong>{log.action || 'Evento'}</strong><span>{log.resource || log.target || '—'}</span></div>
              <div><span>{log.actor?.email || log.actor || log.user || 'Sistema'}</span><time>{timestamp(log.createdAt || log.timestamp)}</time></div>
            </li>
          ))}
        </ol>
      </SectionState>
    </section>
  );
}

export function AdminDashboard() {
  const [data, setData] = useState({ stats: null, users: [], transactions: [], logs: [] });
  const [errors, setErrors] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  const loaders = useMemo(() => ({
    stats: getAdminStats,
    users: listAdminUsers,
    transactions: listXmrTransactions,
    logs: listAuditLogs,
  }), []);

  const refresh = useCallback(async (keys = Object.keys(loaders)) => {
    setRefreshing(true);
    const results = await Promise.allSettled(keys.map((key) => loaders[key]()));
    const nextErrors = {};
    const nextValues = {};
    results.forEach((result, index) => {
      const key = keys[index];
      if (result.status === 'fulfilled') {
        nextValues[key] = key === 'stats' ? result.value : collectionFrom(result.value, key);
      } else nextErrors[key] = errorMessage(result.reason);
    });
    setData((current) => ({ ...current, ...nextValues }));
    setErrors((current) => ({ ...current, ...Object.fromEntries(keys.map((key) => [key, nextErrors[key] || null])) }));
    setUpdatedAt(new Date());
    setRefreshing(false);
  }, [loaders]);

  useEffect(() => {
    refresh();
    const interval = window.setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refresh]);

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><p className="eyebrow">MyZubster ecosystem</p><h1>Admin control room</h1><p>Dati operativi dal backend, aggiornati automaticamente ogni 15 secondi.</p></div>
        <div className="refresh-box">
          <span>Ultimo aggiornamento<br /><strong>{updatedAt ? updatedAt.toLocaleTimeString('it-IT') : 'In attesa'}</strong></span>
          <button onClick={() => refresh()} disabled={refreshing}>{refreshing ? 'Aggiornamento…' : 'Aggiorna ora'}</button>
        </div>
      </header>
      <StatCards stats={data.stats} error={errors.stats} />
      <div className="admin-grid">
        <UserManagement users={data.users} error={errors.users} onSaved={() => refresh(['users', 'logs'])} />
        <TransactionMonitor transactions={data.transactions} error={errors.transactions} />
      </div>
      <AuditTrail logs={data.logs} error={errors.logs} />
    </main>
  );
}
