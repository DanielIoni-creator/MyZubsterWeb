import React from 'react';

/**
 * Garden Theme Design System Tokens & Showcase
 * Resolves Issue #29 ([FREE] Garden Theme Design System)
 */
export const GardenDesignSystem = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#4ade80', margin: 0 }}>🎨 Design System & Color Tokens Garden Theme</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Specifiche dei token di design CSS per la palette dell'orto, tipografia e componenti riutilizzabili
        </p>
      </header>

      {/* Color Palette Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#047857', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>Smeraldo Orto</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>#047857 (--garden-emerald)</div>
        </div>
        <div style={{ backgroundColor: '#d97706', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>Terra Ambra</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>#d97706 (--garden-amber)</div>
        </div>
        <div style={{ backgroundColor: '#0284c7', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>Acqua Irrigazione</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>#0284c7 (--garden-sky)</div>
        </div>
        <div style={{ backgroundColor: '#7e22ce', padding: '16px', borderRadius: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>Semi Violets</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>#7e22ce (--garden-violet)</div>
        </div>
      </div>

      {/* Reusable Badges & Component Tokens */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
        <h4 style={{ color: '#38bdf8', marginTop: 0 }}>🏷️ Component Tokens & Badges</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>✅ Bio Certificato</span>
          <span style={{ backgroundColor: '#450a0a', color: '#f87171', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>⚠️ Alert Irrigazione</span>
          <span style={{ backgroundColor: '#581c87', color: '#e9d5ff', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>📦 Scambio Semi</span>
        </div>
      </div>
    </div>
  );
};

export default GardenDesignSystem;
