import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../api/admin.js';

// Live statistics cards shown at the top of the admin dashboard.
function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    getDashboardStats()
      .then((data) => { if (active) { setStats(data); setLoading(false); } })
      .catch(() => { if (active) { setError('Impossibile caricare le statistiche'); setLoading(false); } });
    return () => { active = false; };
  }, []);

  if (loading) return <div className="admin-stats" aria-busy="true"><p>Caricamento statistiche…</p></div>;
  if (error) return <div className="admin-stats"><p className="admin-error" role="alert">{error}</p></div>;

  const cards = [
    { label: 'Utenti attivi', value: stats?.activeUsers ?? 0, icon: '👥' },
    { label: 'Transazioni totali', value: stats?.totalTransactions ?? 0, icon: '🧾' },
    { label: 'Volume XMR', value: `${stats?.totalXMR ?? '0.00'} XMR`, icon: '💰' },
    { label: 'Ordini pendenti', value: stats?.pendingOrders ?? 0, icon: '📦' },
  ];

  return (
    <div className="admin-stats">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <span className="stat-card-icon" aria-hidden="true">{c.icon}</span>
          <div className="stat-card-body">
            <span className="stat-card-label">{c.label}</span>
            <span className="stat-card-value">{c.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminStats;