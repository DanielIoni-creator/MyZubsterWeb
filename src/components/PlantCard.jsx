import React from 'react';

/**
 * Reusable PlantCard Component
 * Resolves Issue #23 / #26 (Create reusable plant card component)
 */
export const PlantCard = ({ name, variety, category, location, image, healthStatus, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '10px',
        padding: '16px',
        border: '1px solid #334155',
        cursor: 'pointer',
        transition: 'transform 0.2s, border-color 0.2s',
        color: '#f8fafc'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = '#38bdf8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#334155';
      }}
    >
      <div style={{ height: '140px', backgroundColor: '#0f172a', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
        {image || '🌱'}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', background: '#0f172a', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
          {category || 'Generico'}
        </span>
        <span style={{ fontSize: '11px', color: healthStatus === 'Ottimo' ? '#4ade80' : '#f59e0b' }}>
          ● {healthStatus || 'Attivo'}
        </span>
      </div>

      <h4 style={{ margin: '10px 0 4px 0', fontSize: '16px' }}>{name}</h4>
      <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Varietà: <strong>{variety}</strong></p>
      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>📍 {location}</p>
    </div>
  );
};

export default PlantCard;
