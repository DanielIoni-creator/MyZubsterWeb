import { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/stats')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStats({});
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      padding: '1rem',
      background: '#f5f5f5',
      borderRadius: '8px',
      marginTop: '2rem'
    }}>
      <div>
        <strong>Total Transactions</strong><br />
        <span style={{ fontSize: '1.5rem' }}>{stats.totalTransactions || 0}</span>
      </div>
      <div>
        <strong>Total XMR Volume</strong><br />
        <span style={{ fontSize: '1.5rem' }}>{stats.totalXMR || '0.00'}</span>
      </div>
      <div>
        <strong>Active Users</strong><br />
        <span style={{ fontSize: '1.5rem' }}>{stats.activeUsers || 0}</span>
      </div>
    </div>
  );
}

export default Stats;
