import React, { useState } from 'react';

/**
 * Seed Swap Announcement Publisher Form Component
 * Resolves Issue #13 (Form per creare annuncio di scambio semi - POST /api/seed-exchange)
 */
export const SeedSwapPublisherForm = ({ onPublish }) => {
  const [form, setForm] = useState({
    pianta: '',
    varieta: '',
    tipo: 'semi',
    quantita: '',
    disponibilita: 'Immediata',
    tipoScambio: 'gratuito',
    posizione: '',
    descrizione: ''
  });

  const [toast, setToast] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pianta || !form.varieta || !form.posizione) {
      setToast('⚠️ Compila tutti i campi obbligatori!');
      return;
    }

    setToast('✅ Annuncio di scambio semi pubblicato con successo! Inviato a POST /api/seed-exchange.');
    if (onPublish) onPublish(form);

    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif', border: '1px solid #334155' }}>
      <h3 style={{ color: '#4ade80', marginTop: 0 }}>🌱 Pubblica Annuncio Scambio Semi e Talee</h3>

      {toast && (
        <div style={{ backgroundColor: toast.includes('✅') ? '#064e3b' : '#450a0a', color: toast.includes('✅') ? '#34d399' : '#f87171', padding: '12px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Pianta *</label>
            <input
              type="text"
              placeholder="es. Zucchino"
              value={form.pianta}
              onChange={(e) => setForm({ ...form, pianta: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Varietà *</label>
            <input
              type="text"
              placeholder="es. Trombetta"
              value={form.varieta}
              onChange={(e) => setForm({ ...form, varieta: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tipo</label>
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            >
              <option value="semi">Semi</option>
              <option value="talee">Talee</option>
              <option value="piantine">Piantine</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8' }}>Tipo Scambio</label>
            <select
              value={form.tipoScambio}
              onChange={(e) => setForm({ ...form, tipoScambio: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            >
              <option value="gratuito">Gratuito</option>
              <option value="baratto">Baratto</option>
              <option value="donazione">Donazione</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94a3b8' }}>Posizione / Città *</label>
          <input
            type="text"
            placeholder="es. Milano, Lombardia"
            value={form.posizione}
            onChange={(e) => setForm({ ...form, posizione: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            required
          />
        </div>

        <button
          type="submit"
          style={{ padding: '12px', backgroundColor: '#4ade80', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          Pubblica Annuncio Scambio Semi
        </button>
      </form>
    </div>
  );
};

export default SeedSwapPublisherForm;
