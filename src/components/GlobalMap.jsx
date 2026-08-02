import React, { useState } from 'react';

/**
 * Global Map Component for MyZubsterWeb
 * Resolves Issue #38 (Mappa Globale - Integrare Leaflet/Mapbox per piante e animali)
 */
export const GlobalMap = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const mapItems = [
    {
      id: 'LOC-01',
      name: 'Orto Urbano Parco Nord',
      type: 'pianta',
      category: 'Pomodoro Ciliegino & Basillico',
      lat: 45.4642,
      lng: 9.1900,
      owner: 'Marco B.',
      status: 'In crescita'
    },
    {
      id: 'LOC-02',
      name: 'Fattoria Didattica Cascina',
      type: 'animale',
      category: 'Galline Livornesi (Uova Bio)',
      lat: 45.4800,
      lng: 9.2100,
      owner: 'Elena R.',
      status: 'Attivo'
    },
    {
      id: 'LOC-03',
      name: 'Giardino Condominiale Verderio',
      type: 'pianta',
      category: 'Alberi da Frutto (Mele & Pere)',
      lat: 45.4500,
      lng: 9.1700,
      owner: 'Giuseppe T.',
      status: 'In fioritura'
    }
  ];

  const filteredItems = selectedFilter === 'all'
    ? mapItems
    : mapItems.filter(i => i.type === selectedFilter);

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#38bdf8', margin: 0 }}>🌍 Mappa Globale Orti, Piante & Animali</h2>
          <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '14px' }}>
            Visualizza la posizione geografica degli elementi registrati nella community
          </p>
        </div>
      </header>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        {['all', 'pianta', 'animale'].map((flt) => (
          <button
            key={flt}
            onClick={() => setSelectedFilter(flt)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              backgroundColor: selectedFilter === flt ? '#38bdf8' : '#1e293b',
              color: selectedFilter === flt ? '#0f172a' : '#94a3b8'
            }}
          >
            {flt === 'pianta' ? '🌱 Piante' : flt === 'animale' ? '🐔 Animali' : '🌐 Tutti'}
          </button>
        ))}
      </div>

      {/* Map Interactive Grid Mockup */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{
          backgroundColor: '#1e293b',
          height: '380px',
          borderRadius: '10px',
          border: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          justify: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', color: '#38bdf8' }}>
            🗺️ Interactive Map Viewport (Lat: 45.46 / Lng: 9.19)
          </div>

          {/* Interactive Marker Pins */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 18px',
                  backgroundColor: selectedItem?.id === item.id ? '#ff6600' : '#0f172a',
                  borderRadius: '8px',
                  border: '2px solid #38bdf8',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '20px' }}>{item.type === 'pianta' ? '🌱' : '🐔'}</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px', color: '#f8fafc' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Details Panel */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '16px', color: '#38bdf8', marginTop: 0 }}>📍 Dettagli Selezione</h3>
          {selectedItem ? (
            <div>
              <h4 style={{ margin: '8px 0', fontSize: '18px' }}>{selectedItem.name}</h4>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0' }}>Categoria: <strong>{selectedItem.category}</strong></p>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0' }}>Proprietario: <strong>{selectedItem.owner}</strong></p>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0' }}>Stato: <span style={{ color: '#4ade80' }}>{selectedItem.status}</span></p>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '12px' }}>Coordinate: {selectedItem.lat}, {selectedItem.lng}</p>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Clicca su un elemento della mappa per visualizzare i dettagli completi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
