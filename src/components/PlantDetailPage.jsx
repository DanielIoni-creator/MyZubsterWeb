import React, { useState } from 'react';
import PlantFilterBar from './PlantFilterBar';

/**
 * Plant Detail Page Component
 * Resolves Issue #28 (Create plant detail page with breadcrumbs, carousel, reviews & related section)
 */
export const PlantDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const plantDetail = {
    id: 'PLT-DET-01',
    name: 'Pomodoro San Marzano DOP',
    variety: 'Coltivazione Biologica Campana',
    category: 'Ortaggi',
    location: 'Serra A - Settore 2 (Milano)',
    images: ['🍅', '🌿', '🌱'],
    description: 'Il Pomodoro San Marzano DOP è rinomato per la polpa soda e il sapore dolciastro, ideale per conserve e salse tradizionali. Coltivato con tecniche 100% biologiche e irrigazione goccia a goccia.',
    growingConditions: {
      sun: 'Pieno Sole (6-8 ore/giorno)',
      water: 'Irrigazione regolare ogni 2 giorni',
      temp: '20°C - 28°C',
      soil: 'Terreno ben drenato ricco di compost bio',
      harvestTime: '70 - 80 giorni'
    },
    reviews: [
      { author: 'Marco G.', rating: 5, comment: 'Semi eccellenti, germinazione al 95%!' },
      { author: 'Elena B.', rating: 5, comment: 'Pianta robusta e pomodori dolcissimi.' }
    ],
    related: [
      { name: 'Basilico Genovese DOP', variety: 'Foglia Larga', icon: '🌿' },
      { name: 'Zucchino Romanesco', variety: 'Fiorito Bio', icon: '🥒' }
    ]
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Breadcrumb Navigation */}
      <nav style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
        <span>Home</span> &gt; <span>Orti & Piante</span> &gt; <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{plantDetail.name}</span>
      </nav>

      <PlantFilterBar />

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Left: Image Carousel */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
          <div style={{ fontSize: '120px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', borderRadius: '10px', marginBottom: '16px' }}>
            {plantDetail.images[selectedImage]}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {plantDetail.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: selectedImage === idx ? '2px solid #38bdf8' : '1px solid #475569',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
              >
                {img}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Plant Info & Conditions */}
        <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '12px', background: '#0f172a', color: '#4ade80', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            {plantDetail.category} ● Certificato Bio
          </span>
          <h2 style={{ fontSize: '26px', margin: '12px 0 4px 0', color: '#f8fafc' }}>{plantDetail.name}</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 16px 0' }}>Varietà: {plantDetail.variety}</p>

          <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
            {plantDetail.description}
          </p>

          {/* Growing Conditions Box */}
          <div style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', lineHeight: '1.8' }}>
            <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>🌱 Condizioni di Coltivazione</h4>
            <div>☀️ <strong>Esposizione Sole:</strong> {plantDetail.growingConditions.sun}</div>
            <div>💧 <strong>Frequenza Irrigazione:</strong> {plantDetail.growingConditions.water}</div>
            <div>🌡️ <strong>Temperatura Ideale:</strong> {plantDetail.growingConditions.temp}</div>
            <div>🪴 <strong>Tipo Terreno:</strong> {plantDetail.growingConditions.soil}</div>
          </div>

          <button
            onClick={() => alert('Richiesta inviata al coltivatore!')}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px'
            }}
          >
            💬 Contatta Coltivatore per Scambio / Semi
          </button>
        </div>
      </div>

      {/* Reviews & Related Plants Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Reviews Section */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#f59e0b', marginTop: 0 }}>⭐ Recensioni Coltivatori</h3>
          {plantDetail.reviews.map((rev, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', color: '#f8fafc' }}>{rev.author} {'⭐'.repeat(rev.rating)}</div>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0 0' }}>"{rev.comment}"</p>
            </div>
          ))}
        </div>

        {/* Related Plants Section */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ color: '#4ade80', marginTop: 0 }}>🌿 Piante Correlate</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {plantDetail.related.map((rel, idx) => (
              <div key={idx} style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px' }}>{rel.icon}</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#f8fafc', marginTop: '4px' }}>{rel.name}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{rel.variety}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailPage;
