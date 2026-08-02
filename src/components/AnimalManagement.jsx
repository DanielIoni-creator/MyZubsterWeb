import React, { useState } from 'react';

/**
 * Gestione Animali Component
 * Resolves Issue #39 (Gestione Animali - Lista, registrazione, dettaglio e verifica degli animali)
 */
export const AnimalManagement = () => {
  const [animals, setAnimals] = useState([
    {
      id: 'ANM-001',
      tagId: 'GALL-LIV-01',
      species: 'Gallina',
      breed: 'Livornese Bianca',
      location: 'Pollaio Principale',
      healthStatus: 'Ottimo',
      dailyYield: '1 Uovo / giorno',
      verified: true,
      icon: '🐔'
    },
    {
      id: 'ANM-002',
      tagId: 'CONI-NANO-02',
      species: 'Coniglio',
      breed: 'Ariete Nano',
      location: 'Conigliera Est',
      healthStatus: 'Ottimo',
      dailyYield: 'Riproduzione',
      verified: true,
      icon: '🐇'
    },
    {
      id: 'ANM-003',
      tagId: 'APE-LIG-03',
      species: 'Ape',
      breed: 'Apis mellifera ligustica',
      location: 'Arnia 1 (Apiario Sud)',
      healthStatus: 'In Produzione Miele',
      dailyYield: '15kg Miele / stagione',
      verified: true,
      icon: '🐝'
    }
  ]);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    species: 'Gallina',
    breed: '',
    tagId: '',
    location: '',
    dailyYield: ''
  });

  const handleAddAnimal = (e) => {
    e.preventDefault();
    if (!newAnimal.breed) return;

    const created = {
      id: `ANM-00${animals.length + 1}`,
      tagId: newAnimal.tagId || `TAG-${Date.now().toString().slice(-4)}`,
      species: newAnimal.species,
      breed: newAnimal.breed,
      location: newAnimal.location || 'Fattoria',
      healthStatus: 'Ottimo',
      dailyYield: newAnimal.dailyYield || 'Attivo',
      verified: true,
      icon: newAnimal.species === 'Gallina' ? '🐔' : newAnimal.species === 'Ape' ? '🐝' : '🐇'
    };

    setAnimals([created, ...animals]);
    setShowAddForm(false);
    setNewAnimal({ species: 'Gallina', breed: '', tagId: '', location: '', dailyYield: '' });
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#f59e0b', margin: 0 }}>🐔 Gestione Animali da Fattoria</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Registro animali, stato di salute, tracciabilità prodotti e produzione bio
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '10px 18px',
            backgroundColor: '#f59e0b',
            color: '#0f172a',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {showAddForm ? 'Annulla' : '+ Nuovo Animale'}
        </button>
      </header>

      {/* Add New Animal Form */}
      {showAddForm && (
        <form onSubmit={handleAddAnimal} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', marginBottom: '24px', border: '1px solid #f59e0b' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#f59e0b' }}>Registra Nuovo Animale nel Registro</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <select
              value={newAnimal.species}
              onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            >
              <option value="Gallina">Gallina</option>
              <option value="Coniglio">Coniglio</option>
              <option value="Ape">Ape / Arnia</option>
              <option value="Capra">Capra</option>
            </select>
            <input
              placeholder="Razza (es. Livornese)"
              value={newAnimal.breed}
              onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              required
            />
            <input
              placeholder="Codice Tag / Anello"
              value={newAnimal.tagId}
              onChange={(e) => setNewAnimal({ ...newAnimal, tagId: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            />
            <input
              placeholder="Posizione / Pollaio"
              value={newAnimal.location}
              onChange={(e) => setNewAnimal({ ...newAnimal, location: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#f59e0b', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Salva Animale nel Registro
          </button>
        </form>
      )}

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => setSelectedAnimal(animal)}
              style={{
                backgroundColor: '#1e293b',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '8px' }}>{animal.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
                <span>TAG: {animal.tagId}</span>
                <span style={{ color: '#4ade80' }}>● {animal.healthStatus}</span>
              </div>
              <h4 style={{ margin: '8px 0 4px 0', fontSize: '16px' }}>{animal.species} ({animal.breed})</h4>
              <div style={{ fontSize: '12px', color: '#f59e0b' }}>📍 {animal.location}</div>
            </div>
          ))}
        </div>

        {/* Selected Animal Detail Panel */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '16px', color: '#f59e0b', marginTop: 0 }}>📋 Scheda Dettaglio Animale</h3>
          {selectedAnimal ? (
            <div>
              <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>{selectedAnimal.icon}</div>
              <h4 style={{ margin: '4px 0', fontSize: '20px', textAlign: 'center' }}>{selectedAnimal.species}</h4>
              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>Razza: {selectedAnimal.breed}</div>

              <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#cbd5e1', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <div>🏷️ <strong>Codice Identificativo:</strong> {selectedAnimal.tagId}</div>
                <div>📍 <strong>Alloggio / Pollaio:</strong> {selectedAnimal.location}</div>
                <div>🥚 <strong>Produzione Giornaliera:</strong> {selectedAnimal.dailyYield}</div>
                <div>Verifica Sanitaria: {selectedAnimal.verified ? '✅ Certificato ASL / Bio' : '⏳ In sospeso'}</div>
              </div>
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Seleziona un animale dalla lista per visualizzarne lo stato sanitario e la produzione giornaliera.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalManagement;
