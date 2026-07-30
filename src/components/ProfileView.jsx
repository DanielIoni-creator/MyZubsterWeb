import { useEffect } from 'react';
import useStore from '../store/store';

export default function ProfileView() {
  const { user, users, usersLoading, fetchUsers } = useStore();

  useEffect(() => { fetchUsers(); }, []);

  if (usersLoading) return <div className="loading">Loading users...</div>;

  return (
    <div className="view profile-view">
      <h2>👤 Profile</h2>
      {user ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name || user.username || 'User'}</p>
          <p><strong>Email:</strong> {user.email || '—'}</p>
          <p><strong>Role:</strong> {user.role || 'user'}</p>
        </div>
      ) : (
        <p className="empty">Sign in to view your profile</p>
      )}
      
      {users.length > 0 && (
        <div className="users-section">
          <h3>All Users ({users.length})</h3>
          <ul className="item-list">
            {users.map((u) => (
              <li key={u.id || u._id} className="item">
                <span>{u.name || u.username || u.email || 'User'}</span>
                <span className="item-role">{u.role || 'user'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
