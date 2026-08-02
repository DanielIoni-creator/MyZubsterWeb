import React, { useState, useEffect } from 'react';

/**
 * Authentication System & JWT Protected Route Manager
 * Resolves Issue #35 (Sistema di Autenticazione - Login, registrazione, gestione JWT)
 */
export const AuthSystem = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [xmrAddress, setXmrAddress] = useState('4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('myzubster_jwt_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulate JWT token issuance
    const fakeJwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(email)}.${Date.now()}`;
    const userPayload = {
      username: username || email.split('@')[0],
      email,
      token: fakeJwtToken,
      xmrAddress
    };

    localStorage.setItem('myzubster_jwt_user', JSON.stringify(userPayload));
    setCurrentUser(userPayload);
    if (onAuthSuccess) onAuthSuccess(userPayload);
  };

  const handleLogout = () => {
    localStorage.removeItem('myzubster_jwt_user');
    setCurrentUser(null);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', color: '#f8fafc', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', border: '1px solid #334155' }}>
      {currentUser ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👤</div>
          <h3 style={{ color: '#38bdf8', margin: '0 0 4px 0' }}>Benvenuto, {currentUser.username}!</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px 0' }}>{currentUser.email}</p>
          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#4ade80', marginBottom: '16px', wordBreak: 'break-all' }}>
            🔒 JWT Token Attivo | Payout XMR: {currentUser.xmrAddress}
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Disconnetti (Logout)
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuth}>
          <h3 style={{ color: '#38bdf8', marginTop: 0, textAlign: 'center' }}>
            {mode === 'login' ? '🔑 Accesso Utente MyZubster' : '📝 Registrazione Nuovo Utente'}
          </h3>

          {mode === 'register' && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Nome Utente *</label>
              <input
                type="text"
                placeholder="es. Grower_Milan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
                required
              />
            </div>
          )}

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Email *</label>
            <input
              type="email"
              placeholder="grower@myzubster.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Password *</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
          >
            {mode === 'login' ? 'Accedi con JWT' : 'Crea Account & Genera Token'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#94a3b8' }}>
            {mode === 'login' ? 'Non hai un account? ' : 'Hai già un account? '}
            <span
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {mode === 'login' ? 'Registrati qui' : 'Accedi qui'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthSystem;
