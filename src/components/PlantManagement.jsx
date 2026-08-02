import React, { useState } from 'react';
import PlantCard from './PlantCard';

/**
 * Gestione Piante Component
 * Resolves Issue #40 (Gestione Piante - Lista, registrazione, dettaglio e verifica)
 */
export const PlantManagement = () => {
  const [plants, setPlants] = useState([
    {
      id: 'PLT-001',
      name: 'Pomodoro San Marzano',
      variety: 'DOP Campania',
      category: 'Ortaggi',
      location: 'Serra A - Settore 2',
      healthStatus: 'Ottimo',
      plantingDate: '2026-04-15',
      wateringSchedule: 'Ogni 2 giorni',
      verified: true,
      image: '🍅'
    },
    {
      id: 'PLT-002',
      name: 'Basilico Genovese',
      variety: 'Foglia Larga',
      category: 'Aromatiche',
      location: 'Aiuola Est',
      healthStatus: 'Ottimo',
      plantingDate: '2026-05-01',
      wateringSchedule: 'Giornaliero',
      verified: true,
      image: '🌿'
    },
    {
      id: 'PLT-003',
      name: 'Zucchino Romano',
      variety: 'Fiorito',
      category: 'Ortaggi',
      location: 'Campo Aperto 1',
      healthStatus: 'In Fioritura',
      plantingDate: '2026-04-20',
      wateringSchedule: 'Ogni 3 giorni',
      verified: false,
      image: '🥒'
    }
  ]);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    variety: '',
    category: 'Ortaggi',
    location: '',
    wateringSchedule: 'Giornaliero'
  });

  const handleAddPlant = (e) => {
    e.preventDefault();
    if (!newPlant.name || !newPlant.variety) return;

    const created = {
      id: `PLT-00${plants.length + 1}`,
      name: newPlant.name,
      variety: newPlant.variety,
      category: newPlant.category,
      location: newPlant.location || 'Orto Principale',
      healthStatus: 'Ottimo',
      plantingDate: new Date().toISOString().split('T')[0],
      wateringSchedule: newPlant.wateringSchedule,
      verified: true,
      image: '🌱'
    };

    setPlants([created, ...plants]);
    setShowAddForm(false);
    setNewPlant({ name: '', variety: '', category: 'Ortaggi', location: '', wateringSchedule: 'Giornaliero' });
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#4ade80', margin: 0 }}>🌱 Gestione Piante & Orto</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Registro digitale, pianificazione irrigazione e tracciamento crescita
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '10px 18px',
            backgroundColor: '#4ade80',
            color: '#0f172a',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showAddForm ? 'Annulla' : '+ Nuova Pianta'}
        </button>
      </header>

      {/* Add New Plant Form */}
      {showAddForm && (
        <form onSubmit={handleAddPlant} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #4ade80' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#4ade80' }}>Registra Nuova Pianta</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <input
              placeholder="Nome Pianta (es. Pomodoro)"
              value={newPlant.name}
              onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
            <input
              placeholder="Varietà (es. San Marzano)"
              value={newPlant.variety}
              onChange={(e) => setNewPlant({ ...newPlant, variety: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
            <input
              placeholder="Posizione / Settore"
              value={newPlant.location}
              onChange={(e) => setNewPlant({ ...newPlant, location: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4ade80', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salva Pianta nel Registro
          </button>
        </form>
      )}

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              name={plant.name}
              variety={plant.variety}
              category={plant.category}
              location={plant.location}
              healthStatus={plant.healthStatus}
              image={plant.image}
              onSelect={() => setSelectedPlant(plant)}
            />
          ))}
        </div>

        {/* Selected Plant Detail Panel */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '16px', color: '#4ade80', marginTop: 0 }}>📋 Scheda Dettaglio Pianta</h3>
          {selectedPlant ? (
            <div>
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>{selectedPlant.image}</div>
              <h4 style={{ margin: '4px 0', fontSize: '20px', textAlign: 'center' }}>{selectedPlant.name}</h4>
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>Varietà: {selectedPlant.variety}</div>

              <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <div>📍 <strong>Posizione:</strong> {selectedPlant.location}</div>
                <div>📅 <strong>Data Semina:</strong> {selectedPlant.plantingDate}</div>
                <div>💧 <strong>Irrigazione:</strong> {selectedPlant.wateringSchedule}</div>
                <div>Verified Badge: {selectedPlant.verified ? '✅ Certificato Bio' : '⏳ In attesa'}</div>
              </div>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Seleziona una pianta dalla lista per vederne la scheda completa di irrigazione e tracciamento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantManagement;
