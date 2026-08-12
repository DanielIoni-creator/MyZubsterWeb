import { useEffect, useState } from 'react';
import { getTransactions } from '../../api/admin.js';

// XMR transaction monitoring table with status filter.
function TransactionMonitor() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTransactions({ status: statusFilter })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.transactions ?? []);
        setTxns(list);
        setLoading(false);
      })
      .catch(() => { setError('Impossibile caricare le transazioni'); setLoading(false); });
  }, [statusFilter]);

  const statusBadge = (status) => {
    const cls = {
      pending: 'badge-pending',
      confirming: 'badge-confirming',
      confirmed: 'badge-confirmed',
      failed: 'badge-failed',
      refunded: 'badge-refunded',
    }[status] || 'badge-pending';
    return <span className={`admin-badge ${cls}`}>{status}</span>;
  };

  return (
    <section className="admin-section" aria-labelledby="tx-heading">
      <header className="admin-section-header">
        <h2 id="tx-heading">💰 Monitoraggio transazioni XMR</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filtra per stato"
        >
          <option value="">Tutti</option>
          <option value="pending">Pending</option>
          <option value="confirming">Confirming</option>
          <option value="confirmed">Confirmed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {loading ? (
        <p aria-busy="true">Caricamento transazioni…</p>
      ) : !txns.length ? (
        <p className="admin-empty">Nessuna transazione trovata.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Importo (XMR)</th>
                <th>Mittente</th>
                <th>Destinatario</th>
                <th>Stato</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((tx) => (
                <tr key={tx.id || tx._id || tx.txId}>
                  <td className="admin-cell-mono">{(tx.id || tx._id || tx.txId || '').slice(0, 16)}…</td>
                  <td>{tx.amount != null ? tx.amount : '-'}</td>
                  <td className="admin-cell-mono">{(tx.from || tx.sender || '').slice(0, 12)}…</td>
                  <td className="admin-cell-mono">{(tx.to || tx.recipient || '').slice(0, 12)}…</td>
                  <td>{statusBadge(tx.status)}</td>
                  <td>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionMonitor;