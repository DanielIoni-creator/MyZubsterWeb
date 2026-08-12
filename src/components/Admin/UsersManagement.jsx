import { useEffect, useState } from 'react';
import { getUsers, updateUserRole, toggleUserStatus } from '../../api/admin.js';

// User management table with role editing and account status toggle.
function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadUsers = () => {
    setLoading(true);
    setError(null);
    getUsers({ search })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.users ?? []);
        setUsers(list);
        setLoading(false);
      })
      .catch(() => { setError('Impossibile caricare gli utenti'); setLoading(false); });
  };

  useEffect(() => { loadUsers(); }, [search]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      loadUsers();
    } catch {
      setError('Errore nell\'aggiornamento del ruolo');
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      await toggleUserStatus(userId);
      loadUsers();
    } catch {
      setError('Errore nel cambio stato utente');
    }
  };

  return (
    <section className="admin-section" aria-labelledby="users-heading">
      <header className="admin-section-header">
        <h2 id="users-heading">👥 Gestione utenti</h2>
        <input
          type="text"
          className="admin-search-input"
          placeholder="Cerca utente…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cerca utente"
        />
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      {loading ? (
        <p aria-busy="true">Caricamento utenti…</p>
      ) : !users.length ? (
        <p className="admin-empty">Nessun utente trovato.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ruolo</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id || u._id}>
                  <td className="admin-cell-mono">{u.id || u._id}</td>
                  <td>{u.name || u.username || '-'}</td>
                  <td>{u.email || '-'}</td>
                  <td>
                    <select
                      value={u.role || 'user'}
                      onChange={(e) => handleRoleChange(u.id || u._id, e.target.value)}
                      aria-label={`Ruolo per ${u.name || u.id}`}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span className={`admin-badge ${u.active !== false ? 'badge-active' : 'badge-inactive'}`}>
                      {u.active !== false ? 'Attivo' : 'Disattivato'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-btn-small"
                      onClick={() => handleToggleStatus(u.id || u._id)}
                      aria-label={u.active !== false ? 'Disattiva utente' : 'Attiva utente'}
                    >
                      {u.active !== false ? '❌ Disattiva' : '✅ Attiva'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UsersManagement;