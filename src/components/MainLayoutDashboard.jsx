import React, { useState } from 'react';
import SensorDashboard from './SensorDashboard';

/**
 * Main Layout & Profile Dashboard Component
 * Resolves Issue #36 (Dashboard e Layout con Sidebar, Header e Profilo Utente)
 */
export const MainLayoutDashboard = () => {
  const [activeTab, setActiveTab] = useState('sensors');
  const [userProfile, setUserProfile] = useState({
    username: 'Grower_Zero',
    email: 'grower@myzubster.org',
    xmrAddress: '4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t',
    role: 'Pioneer Cultivator'
  });

  return (
    <div style={{ display: 'flex', minHeight: '80vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '240px', backgroundColor: '#1e293b', padding: '20px', borderRight: '1px solid #334155' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '24px' }}>
          🌱 MyZubster Control
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'sensors', label: '📊 Telemetria Sensori' },
            { id: 'profile', label: '👤 Profilo Utente & Wallet' },
            { id: 'settings', label: '⚙️ Impostazioni Dashboard' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                backgroundColor: activeTab === tab.id ? '#38bdf8' : 'transparent',
                color: activeTab === tab.id ? '#0f172a' : '#94a3b8'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px' }}>
        {activeTab === 'sensors' && <SensorDashboard />}

        {activeTab === 'profile' && (
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '10px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>👤 Profilo Utente & Configurazione Monero</h3>
            <div style={{ marginTop: '16px', lineHeight: '2' }}>
              <div><strong>Nome Utente:</strong> {userProfile.username}</div>
              <div><strong>Email:</strong> {userProfile.email}</div>
              <div><strong>Ruolo Community:</strong> <span style={{ color: '#4ade80' }}>{userProfile.role}</span></div>
              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8' }}>Indirizzo Payout Monero (XMR):</label>
                <input
                  type="text"
                  value={userProfile.xmrAddress}
                  onChange={(e) => setUserProfile({ ...userProfile, xmrAddress: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontFamily: 'monospace' }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '10px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>⚙️ Impostazioni Layout Dashboard</h3>
            <p style={{ color: '#94a3b8' }}>Personalizza l'interfaccia utente, frequenza di aggiornamento sensori ed esportazione dati.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainLayoutDashboard;
