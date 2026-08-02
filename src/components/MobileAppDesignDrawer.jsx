import React, { useState } from 'react';

/**
 * Mobile App UI & Responsive PWA Navigation Drawer
 * Resolves Issue #31 ([FREE] Mobile App UI Design / PWA Responsive Drawer)
 */
export const MobileAppDesignDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', backgroundColor: '#0f172a', minHeight: '80vh', color: '#ffffff', fontFamily: 'sans-serif', borderRadius: '16px', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
      {/* Mobile Top App Bar */}
      <header style={{ padding: '16px', backgroundColor: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#38bdf8', fontSize: '24px', cursor: 'pointer' }}
        >
          ☰
        </button>
        <span style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '16px' }}>🌱 MyZubster Mobile</span>
        <span style={{ fontSize: '20px' }}>🔔</span>
      </header>

      {/* PWA Install Banner */}
      {!pwaInstalled && (
        <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '10px 14px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>📱 Installa l'App PWA per notifiche in tempo reale</span>
          <button
            onClick={() => setPwaInstalled(true)}
            style={{ padding: '4px 10px', backgroundColor: '#34d399', color: '#064e3b', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Installa
          </button>
        </div>
      )}

      {/* Main Touch Content Area */}
      <main style={{ padding: '16px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid #334155' }}>
          <h4 style={{ color: '#38bdf8', marginTop: 0 }}>📊 Telemetria Orto Veloce</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
            <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px' }}>pH: <strong style={{ color: '#38bdf8' }}>6.3 pH</strong></div>
            <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px' }}>EC: <strong style={{ color: '#4ade80' }}>1.8 mS</strong></div>
          </div>
        </div>
      </main>

      {/* Slide-Out Navigation Drawer Modal */}
      {drawerOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex' }}>
          <div style={{ width: '280px', backgroundColor: '#1e293b', height: '100%', padding: '20px', borderRight: '1px solid #38bdf8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ color: '#38bdf8', margin: 0 }}>🌱 Menu Navigazione</h3>
                <button onClick={() => setDrawerOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={() => setDrawerOpen(false)} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🌱 Gestione Piante</button>
                <button onClick={() => setDrawerOpen(false)} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🐔 Gestione Animali</button>
                <button onClick={() => setDrawerOpen(false)} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🏙️ Orti Urbani</button>
                <button onClick={() => setDrawerOpen(false)} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>📦 Mercato Semi</button>
                <button onClick={() => setDrawerOpen(false)} style={{ textAlign: 'left', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🟠 Monero Wallet</button>
              </nav>
            </div>

            <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
              MyZubster PWA Mobile v1.4.0
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileAppDesignDrawer;
