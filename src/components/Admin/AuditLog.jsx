import { useEffect, useState } from 'react';
import { getAuditLogs } from '../../api/admin.js';

// Audit log viewer with level filter.
function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAuditLogs({ level: levelFilter })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.logs ?? []);
        setLogs(list);
        setLoading(false);
      })
      .catch(() => { setError('Impossibile caricare i log'); setLoading(false); });
  }, [levelFilter]);

  const levelBadge = (level) => {
    const cls = {
      info: 'badge-info',
      warn: 'badge-warn',
      error: 'badge-error',
      debug: 'badge-debug',
    }[level] || 'badge-info';
    return <span className={`admin-badge ${cls}`}>{level}</span>;
  };

  return (
    <section className="admin-section" aria-labelledby="audit-heading">
      <header className="admin-section-header">
        <h2 id="audit-heading">📋 Log e audit trail</h2>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          aria-label="Filtra per livello"
        >
          <option value="">Tutti</option>
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {loading ? (
        <p aria-busy="true">Caricamento log…</p>
      ) : !logs.length ? (
        <p className="admin-empty">Nessun log trovato.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table admin-table-logs">
            <thead>
              <tr>
                <th>Livello</th>
                <th>Azioni</th>
                <th>Utente</th>
                <th>Dettagli</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id || log._id || i}>
                  <td>{levelBadge(log.level)}</td>
                  <td>{log.action || log.event || '-'}</td>
                  <td>{log.user || log.userId || '-'}</td>
                  <td className="admin-cell-mono admin-cell-sm">
                    {(log.details || log.message || '').slice(0, 80)}
                  </td>
                  <td>{log.createdAt ? new Date(log.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AuditLog;