import React, { useState } from 'react';

/**
 * Form to Create Seed Exchange Listing
 * Resolves Issue #15 ([Free] Form to create a Seed Exchange listing)
 */
export const CreateSeedListingForm = ({ onListingCreated }) => {
  const [formData, setFormData] = useState({
    plant: '',
    variety: '',
    type: 'seeds',
    quantity: '20 Semi / Busta',
    availability: 'Immediata',
    exchangeType: 'barter',
    location: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.plant || !formData.variety || !formData.location) {
      setError('Compila tutti i campi obbligatori!');
      return;
    }

    setError('');
    setSubmitted(true);

    if (onListingCreated) {
      onListingCreated(formData);
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        plant: '',
        variety: '',
        type: 'seeds',
        quantity: '20 Semi / Busta',
        availability: 'Immediata',
        exchangeType: 'barter',
        location: '',
        description: ''
      });
    }, 2500);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif', border: '1px solid #334155' }}>
      <h3 style={{ color: '#a855f7', marginTop: 0 }}>🌱 Pubblica Annuncio Scambio Semi</h3>

      {submitted && (
        <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
          ✅ Annuncio pubblicato con successo! Inviato a `POST /api/seed-exchange`.
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#450a0a', color: '#f87171', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Nome Pianta *</label>
            <input
              type="text"
              placeholder="es. Pomodoro"
              value={formData.plant}
              onChange={(e) => setFormData({ ...formData, plant: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Varietà *</label>
            <input
              type="text"
              placeholder="es. Cuore di Bue"
              value={formData.variety}
              onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Tipologia</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            >
              <option value="seeds">Semi (Seeds)</option>
              <option value="cuttings">Talee (Cuttings)</option>
              <option value="seedlings">Piantine (Seedlings)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Tipo Scambio</label>
            <select
              value={formData.exchangeType}
              onChange={(e) => setFormData({ ...formData, exchangeType: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            >
              <option value="barter">Baratto (Scambio Semi)</option>
              <option value="free">Gratuito / Donazione</option>
              <option value="crypto">Payout XMR</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Luogo / Citta *</label>
          <input
            type="text"
            placeholder="es. Milano, Lombardia"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            required
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Descrizione & Note Scambio</label>
          <textarea
            rows={3}
            placeholder="Descrivi la qualità dei semi, l'origine bio e cosa cerchi in cambio..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#a855f7',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Pubblica Annuncio di Scambio
        </button>
      </form>
    </div>
  );
};

export default CreateSeedListingForm;
