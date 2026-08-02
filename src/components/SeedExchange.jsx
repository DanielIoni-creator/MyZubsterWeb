import React, { useState } from 'react';

/**
 * Seed Exchange Marketplace Component
 * Resolves Issue #23 / #22 (Frontend for Seed Exchange listings)
 */
export const SeedExchange = () => {
  const [seedListings, setSeedListings] = useState([
    {
      id: 'SEED-001',
      title: 'Semi Pomodoro Cuore di Bue Antico',
      category: 'Ortaggi',
      quantity: '25 Semi / Busta',
      tradeOffer: 'Scambio con semi di Zucchino Trombetta o Peperoncino',
      seller: 'OrtoBio_Milano',
      location: 'Milano, Lombardia',
      verified: true
    },
    {
      id: 'SEED-002',
      title: 'Semi Zucca Mantovana BIO',
      category: 'Ortaggi',
      quantity: '15 Semi / Busta',
      tradeOffer: 'Scambio con semi di Erbe Aromatiche (Anice, Salvia)',
      seller: 'CascinaVerde',
      location: 'Mantova, Lombardia',
      verified: true
    },
    {
      id: 'SEED-003',
      title: 'Semi Peperoncino Habanero Chocolate',
      category: 'Piccanti',
      quantity: '20 Semi / Busta',
      tradeOffer: 'Scambio o Payout in XMR (0.02 XMR)',
      seller: 'ChiliMaster_ITA',
      location: 'Bologna, Emilia-Romagna',
      verified: true
    }
  ]);

  const [tradeMessage, setTradeMessage] = useState('');

  const handleRequestTrade = (id) => {
    setTradeMessage(`Richiesta di scambio inviata per l'annuncio ${id}! Ti contatteremo via messaggistica P2P.`);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#a855f7', margin: 0 }}>🌱 Seed Exchange — Mercato Scambio Semi Bio</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Piattaforma P2P per lo scambio di semi antichi, rarità orticole e varietà biologiche locali
        </p>
      </header>

      {tradeMessage && (
        <div style={{ backgroundColor: '#581c87', color: '#e9d5ff', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
          ✨ {tradeMessage}
        </div>
      )}

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {seedListings.map((seed) => (
          <div key={seed.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', background: '#581c87', color: '#e9d5ff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {seed.category}
              </span>
              <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: 'bold' }}>
                {seed.quantity}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', margin: '12px 0 6px 0', color: '#f8fafc' }}>{seed.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>
              🔄 <strong>Offerta Scambio:</strong> {seed.tradeOffer}
            </p>

            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px', borderTop: '1px solid #334155', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <span>👤 {seed.seller}</span>
              <span>📍 {seed.location}</span>
            </div>

            <button
              onClick={() => handleRequestTrade(seed.id)}
              style={{
                width: '100%',
                marginTop: '14px',
                padding: '10px',
                backgroundColor: '#a855f7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Richiedi Scambio Semi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeedExchange;
