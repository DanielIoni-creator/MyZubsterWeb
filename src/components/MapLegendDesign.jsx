import React, { useState } from 'react';

/**
 * Interactive Map Legend & Style Guide Component
 * Resolves Issue #30 ([FREE] Interactive Map UI Design & Map Legend)
 */
export const MapLegendDesign = () => {
  const [activeTab, setActiveTab] = useState('legend');

  const legendItems = [
    { type: 'pianta', icon: '🌱', label: 'Piante & Colture', count: 42, color: '#4ade80', desc: 'Orti urbani, pomodori, basilico, alberi da frutto' },
    { type: 'animale', icon: '🐔', label: 'Animali da Fattoria', count: 18, color: '#f59e0b', desc: 'Pollaio bio, conigliere, apiari e produzione miele' },
    { type: 'orto', icon: '🏙️', label: 'Orti Urbani Condivisi', count: 12, color: '#38bdf8', desc: 'Appezzamenti comunali, parchi e serre tecnologiche' },
    { type: 'semi', icon: '📦', label: 'Punti Scambio Semi', count: 25, color: '#a855f7', desc: 'Punti di ritiro e baratto semi locali' }
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', padding: '24px', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#38bdf8', margin: 0 }}>🗺️ Guida & Legenda Interattiva Mappa MyZubster</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Sistema di design dei marker, legenda categorie e controlli di filtraggio per la mappa globale
        </p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('legend')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 'legend' ? '#38bdf8' : '#1e293b',
            color: activeTab === 'legend' ? '#0f172a' : '#94a3b8'
          }}
        >
          🏷️ Legenda Marker
        </button>
        <button
          onClick={() => setActiveTab('controls')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 'controls' ? '#38bdf8' : '#1e293b',
            color: activeTab === 'controls' ? '#0f172a' : '#94a3b8'
          }}
        >
          🎛️ Controlli & Filtri
        </button>
      </div>

      {activeTab === 'legend' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {legendItems.map((item) => (
            <div key={item.type} style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '10px', borderLeft: `4px solid ${item.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span style={{ fontSize: '12px', background: '#0f172a', padding: '2px 8px', borderRadius: '10px', color: item.color, fontWeight: 'bold' }}>
                  {item.count} elementi
                </span>
              </div>
              <h4 style={{ margin: '4px 0', fontSize: '16px', color: '#f8fafc' }}>{item.label}</h4>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'controls' && (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
          <h4 style={{ color: '#38bdf8', marginTop: 0 }}>🎛️ Istruzioni Controlli Mappa</h4>
          <ul style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Filtro Categoria:</strong> Seleziona una o più categorie per isolare i marker di interesse.</li>
            <li><strong>Click su Marker:</strong> Apre la scheda popup con i dettagli e lo stato di salute dell'orto/pianta.</li>
            <li><strong>Zoom Automatico:</strong> Regola il livello di zoom in base alla densità geografica dei marker.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapLegendDesign;
