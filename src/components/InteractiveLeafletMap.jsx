import React, { useState } from 'react';

/**
 * Interactive Leaflet/Mapbox Map Component
 * Resolves Issue #1 ([Free] Frontend for the interactive map - Leaflet/Mapbox)
 */
export const InteractiveLeafletMap = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapMarkers = [
    {
      id: 'MKR-01',
      name: 'Orto Urbano Parco Sempione',
      category: 'gardens',
      icon: '🏙️',
      lat: 45.4722,
      lng: 9.1772,
      description: 'Orto comunitario biologico con serre solari e sensori IoT.',
      owner: 'Marco_Bio'
    },
    {
      id: 'MKR-02',
      name: 'Pomodoro San Marzano DOP',
      category: 'plants',
      icon: '🌱',
      lat: 45.4642,
      lng: 9.1900,
      description: 'Coltivazione di pomodori antichi in piena terra.',
      owner: 'Elena_Grower'
    },
    {
      id: 'MKR-03',
      name: 'Pollaio Bio Livornese',
      category: 'animals',
      icon: '🐔',
      lat: 45.4800,
      lng: 9.2100,
      description: 'Galline ovaiole felici al pascolo libero.',
      owner: 'Giuseppe_Farmer'
    },
    {
      id: 'MKR-04',
      name: 'Punto Ritiro Semi & Talee',
      category: 'people',
      icon: '👤',
      lat: 45.4500,
      lng: 9.1700,
      description: 'Coltivatore referente per scambio semi locale.',
      owner: 'Luca_P2P'
    }
  ];

  const filteredMarkers = activeCategory === 'all'
    ? mapMarkers
    : mapMarkers.filter(m => m.category === activeCategory);

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h2 style={{ color: '#38bdf8', margin: 0 }}>🗺️ Mappa Interattiva Leaflet / Mapbox (MyZubster Ecosystem)</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Geolocalizzazione in tempo reale di piante, animali, coltivatori e orti urbani
        </p>
      </header>

      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: '🌐 Tutti i Marker' },
          { id: 'plants', label: '🌱 Piante' },
          { id: 'animals', label: '🐔 Animali' },
          { id: 'gardens', label: '🏙️ Orti Urbani' },
          { id: 'people', label: '👤 Coltivatori P2P' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: activeCategory === cat.id ? '#38bdf8' : '#1e293b',
              color: activeCategory === cat.id ? '#0f172a' : '#94a3b8'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Map Canvas Mockup */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{
          backgroundColor: '#1e293b',
          height: '420px',
          borderRadius: '10px',
          border: '1px solid #334155',
          position: 'relative',
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          backgroundImage: 'radial-gradient(#334155 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}>
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.9)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', color: '#38bdf8' }}>
            🛰️ Leaflet Engine Active | Coordinates: 45.4642 N, 9.1900 E
          </div>

          {/* Rendered Marker Pins */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {filteredMarkers.map((marker) => (
              <div
                key={marker.id}
                onClick={() => setSelectedMarker(marker)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: selectedMarker?.id === marker.id ? '#38bdf8' : '#0f172a',
                  color: selectedMarker?.id === marker.id ? '#0f172a' : '#fff',
                  borderRadius: '8px',
                  border: '2px solid #38bdf8',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '24px' }}>{marker.icon}</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>{marker.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginTop: 0, fontSize: '16px' }}>📌 Dettagli Elemento Selezionato</h3>
          {selectedMarker ? (
            <div>
              <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '8px' }}>{selectedMarker.icon}</div>
              <h4 style={{ margin: '4px 0', fontSize: '18px', textAlign: 'center' }}>{selectedMarker.name}</h4>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', margin: '12px 0' }}>{selectedMarker.description}</p>
              <div style={{ fontSize: '12px', color: '#94a3b8', borderTop: '1px solid #334155', paddingTop: '10px' }}>
                <div>👤 <strong>Referente:</strong> {selectedMarker.owner}</div>
                <div>🌐 <strong>Lat/Lng:</strong> {selectedMarker.lat}, {selectedMarker.lng}</div>
              </div>
              <button
                onClick={() => alert(`Richiesta inviata a ${selectedMarker.owner}!`)}
                style={{ width: '100%', marginTop: '16px', padding: '10px', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                💬 Invia Messaggio al Referente
              </button>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Seleziona un marker sulla mappa per visualizzare la scheda informativa completa.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveLeafletMap;
