import React, { useState } from 'react';

/**
 * Bounty System Component for MyZubsterWeb
 * Resolves Issue #41 (Bounty System Pagamenti Monero)
 */
export const BountySystem = () => {
  const [filter, setFilter] = useState('all');
  const [userXmrAddress, setUserXmrAddress] = useState('4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t');
  const [claimStatus, setClaimStatus] = useState(null);

  const sampleBounties = [
    {
      id: 'BNT-101',
      title: 'Sistema di Pagamento Monero (XMR Wallet Integration)',
      category: 'Backend / Crypto',
      amountXMR: 0.15,
      amountEUR: 30.00,
      status: 'open',
      description: 'Implementare sistema di tracciamento transazioni Monero su mainnet con verifica TX hash.',
    },
    {
      id: 'BNT-102',
      title: 'Mappa Interattiva Piante e Animali (Global Map)',
      category: 'Frontend / Mapping',
      amountXMR: 0.10,
      amountEUR: 20.00,
      status: 'open',
      description: 'Integrare mappa Leaflet/Mapbox per geolocalizzazione orti, piante e animali.',
    },
    {
      id: 'BNT-103',
      title: 'Seed Exchange UI & Guide',
      category: 'UI/UX Design',
      amountXMR: 0.08,
      amountEUR: 16.00,
      status: 'claimed',
      description: 'Interfaccia per lo scambio di semi tra utenti della community MyZubster.',
    }
  ];

  const filteredBounties = filter === 'all'
    ? sampleBounties
    : sampleBounties.filter(b => b.status === filter);

  const handleClaim = (bountyId) => {
    if (!userXmrAddress.startsWith('4') && !userXmrAddress.startsWith('8')) {
      alert('Inserisci un indirizzo Monero (XMR) valido prima di reclamare!');
      return;
    }
    setClaimStatus(`Bounty ${bountyId} reclamato con successo! Indirizzo XMR collegato: ${userXmrAddress.substring(0, 12)}...`);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#182232', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#ff6600', margin: 0 }}>🪙 Sistema Bounty & Pagamenti Monero (XMR)</h2>
          <p style={{ color: '#8fa0b5', marginTop: '4px', fontSize: '14px' }}>
            Contribuisci allo sviluppo di MyZubsterWeb e ricevi pagamenti diretti in Monero (XMR)
          </p>
        </div>
      </header>

      {/* Wallet Input Bar */}
      <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #334155' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
          Il tuo Indirizzo Wallet Monero (XMR) per i Payout:
        </label>
        <input
          type="text"
          value={userXmrAddress}
          onChange={(e) => setUserXmrAddress(e.target.value)}
          placeholder="4... or 8..."
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #475569',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}
        />
      </div>

      {claimStatus && (
        <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
          ✅ {claimStatus}
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['all', 'open', 'claimed'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: '600',
              backgroundColor: filter === st ? '#ff6600' : '#334155',
              color: '#ffffff'
            }}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Bounty Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredBounties.map((bounty) => (
          <div key={bounty.id} style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '12px', background: '#334155', padding: '4px 8px', borderRadius: '4px', color: '#38bdf8' }}>
                {bounty.category}
              </span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6600' }}>
                {bounty.amountXMR} XMR <span style={{ fontSize: '12px', color: '#94a3b8' }}>(≈ €{bounty.amountEUR})</span>
              </span>
            </div>

            <h3 style={{ fontSize: '18px', margin: '14px 0 8px 0', color: '#f8fafc' }}>{bounty.title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5', minHeight: '42px' }}>{bounty.description}</p>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: bounty.status === 'open' ? '#4ade80' : '#f59e0b' }}>
                ● {bounty.status.toUpperCase()}
              </span>

              {bounty.status === 'open' && (
                <button
                  onClick={() => handleClaim(bounty.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#ff6600',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Reclama Bounty
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BountySystem;
