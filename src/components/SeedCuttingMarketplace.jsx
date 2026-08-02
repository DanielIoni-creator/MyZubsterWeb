import React, { useState } from 'react';

/**
 * Seed & Cutting Exchange Marketplace Component
 * Resolves Issue #14 & #12 (Frontend for Seed & Cutting Exchange listings with P2P chat)
 */
export const SeedCuttingMarketplace = () => {
  const [plantFilter, setPlantFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [exchangeFilter, setExchangeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [chatModalItem, setChatModalItem] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const listings = [
    {
      id: 'LST-01',
      plant: 'Pomodoro San Marzano DOP',
      variety: 'Antico Campano Bio',
      type: 'semi',
      quantity: '25 Semi / Busta',
      exchangeType: 'barter',
      location: 'Milano, Lombardia',
      owner: 'Marco_G',
      ownerAddress: '4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t',
      image: '🍅'
    },
    {
      id: 'LST-02',
      title: 'Talee di Rosmarino Prostrato',
      plant: 'Rosmarino Prostrato',
      variety: 'Aromatico Resistente',
      type: 'talee',
      quantity: '5 Talee Radicate',
      exchangeType: 'free',
      location: 'Roma, Lazio',
      owner: 'Elena_R',
      ownerAddress: '4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t',
      image: '🌿'
    },
    {
      id: 'LST-03',
      title: 'Piantine Zucchino Trombetta d\'Albenga',
      plant: 'Zucchino Trombetta',
      variety: 'Liguria Bio',
      type: 'piantine',
      quantity: '4 Piantine Vaso 10cm',
      exchangeType: 'donation',
      location: 'Torino, Piemonte',
      owner: 'Giuseppe_T',
      ownerAddress: '4Ap5qdQU5YHbdJEpU6Fr3b9VEr1uYeEr5XvbNDdcksvPfySD7dFEvFsD5Lmo9wWJhjWDrcTVrXgP6CBHxAgjfoBTMF9HK7t',
      image: '🥒'
    }
  ];

  const filteredListings = listings.filter((item) => {
    const matchesPlant = item.plant.toLowerCase().includes(plantFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesExchange = exchangeFilter === 'all' || item.exchangeType === exchangeFilter;
    const matchesLocation = locationFilter === 'all' || item.location.includes(locationFilter);
    return matchesPlant && matchesType && matchesExchange && matchesLocation;
  });

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage) return;
    setSentMessages([...sentMessages, { id: Date.now(), text: chatMessage, time: new Date().toLocaleTimeString() }]);
    setChatMessage('');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#a855f7', margin: 0 }}>🌱 Mercato Scambio Semi & Talee (P2P Exchange)</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Visualizza e filtra annunci di semi, talee e piantine bio. Contatta direttamente il proprietario via chat.
        </p>
      </header>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '10px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', border: '1px solid #334155' }}>
        <input
          type="text"
          placeholder="🔍 Filtra per nome pianta..."
          value={plantFilter}
          onChange={(e) => setPlantFilter(e.target.value)}
          style={{ flex: '2', minWidth: '180px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ flex: '1', minWidth: '140px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#a855f7', fontWeight: 'bold' }}
        >
          <option value="all">Tutti i Tipi</option>
          <option value="semi">🌱 Semi</option>
          <option value="talee">🌿 Talee</option>
          <option value="piantine">🪴 Piantine</option>
        </select>

        <select
          value={exchangeFilter}
          onChange={(e) => setExchangeFilter(e.target.value)}
          style={{ flex: '1', minWidth: '140px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#4ade80', fontWeight: 'bold' }}
        >
          <option value="all">Tutti gli Scambi</option>
          <option value="barter">Baratto</option>
          <option value="free">Gratuito</option>
          <option value="donation">Donazione</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{ flex: '1', minWidth: '140px', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#38bdf8', fontWeight: 'bold' }}
        >
          <option value="all">Tutte le Città</option>
          <option value="Milano">Milano</option>
          <option value="Roma">Roma</option>
          <option value="Torino">Torino</option>
        </select>
      </div>

      {/* Grid of Listings */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredListings.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '48px', textAlign: 'center', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
              {item.image}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', background: '#581c87', color: '#e9d5ff', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {item.type}
              </span>
              <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 'bold' }}>
                {item.exchangeType.toUpperCase()}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', margin: '10px 0 4px 0', color: '#f8fafc' }}>{item.plant}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Varietà: {item.variety}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1' }}>📦 {item.quantity}</p>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #334155', fontSize: '12px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>👤 {item.owner}</span>
              <span>📍 {item.location}</span>
            </div>

            <button
              onClick={() => setChatModalItem(item)}
              style={{
                width: '100%',
                marginTop: '14px',
                padding: '10px',
                backgroundColor: '#38bdf8',
                color: '#0f172a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px'
              }}
            >
              💬 Contatta Proprietario (Chat P2P)
            </button>
          </div>
        ))}
      </div>

      {/* P2P Chat Modal */}
      {chatModalItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#1e293b', width: '440px', padding: '24px', borderRadius: '12px', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#38bdf8' }}>💬 Chat P2P con {chatModalItem.owner}</h3>
              <button onClick={() => setChatModalItem(null)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
              Oggetto: {chatModalItem.plant} ({chatModalItem.quantity}) | Payout XMR Supportato
            </div>

            {/* Chat Messages */}
            <div style={{ height: '180px', overflowY: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Chat avviata con {chatModalItem.owner}...</div>
              {sentMessages.map((msg) => (
                <div key={msg.id} style={{ textAlign: 'right', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#38bdf8', color: '#0f172a', padding: '6px 12px', borderRadius: '12px', fontSize: '13px', display: 'inline-block' }}>
                    {msg.text}
                  </span>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{msg.time}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Scrivi un messaggio..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              />
              <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Invia
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeedCuttingMarketplace;
