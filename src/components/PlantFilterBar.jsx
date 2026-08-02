import React from 'react';

/**
 * Plant Filter Bar Component
 * Resolves Issue #27 / #26 (Create filter bar for plant listings & mobile UI)
 */
export const PlantFilterBar = ({ onSearchChange, onCategoryChange, onSoilChange, onLocationChange }) => {
  return (
    <div style={{ backgroundColor: '#1e293b', padding: '16px 20px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #334155', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      {/* Search Input */}
      <div style={{ flex: '2', minWidth: '200px' }}>
        <input
          type="text"
          placeholder="🔍 Cerca pianta o varietà..."
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px' }}
        />
      </div>

      {/* Category Dropdown */}
      <div style={{ flex: '1', minWidth: '140px' }}>
        <select
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#38bdf8', fontWeight: '600', fontSize: '13px' }}
        >
          <option value="all">Tutte le Categorie</option>
          <option value="Ortaggi">🍅 Ortaggi</option>
          <option value="Aromatiche">🌿 Aromatiche</option>
          <option value="Frutta">🍎 Frutta</option>
        </select>
      </div>

      {/* Soil Type Dropdown */}
      <div style={{ flex: '1', minWidth: '140px' }}>
        <select
          onChange={(e) => onSoilChange && onSoilChange(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#4ade80', fontWeight: '600', fontSize: '13px' }}
        >
          <option value="all">Tutti i Terreni</option>
          <option value="Bio Compost">Bio Compost</option>
          <option value="Argilloso">Argilloso</option>
          <option value="Sabbioso">Sabbioso</option>
        </select>
      </div>

      {/* Location Dropdown */}
      <div style={{ flex: '1', minWidth: '140px' }}>
        <select
          onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#f59e0b', fontWeight: '600', fontSize: '13px' }}
        >
          <option value="all">Tutte le Città</option>
          <option value="Milano">Milano</option>
          <option value="Roma">Roma</option>
          <option value="Torino">Torino</option>
        </select>
      </div>
    </div>
  );
};

export default PlantFilterBar;
