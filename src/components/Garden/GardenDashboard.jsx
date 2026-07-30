import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function GardenDashboard() {
  const [gardenId, setGardenId] = useState('test-garden-001');
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Recupera le statistiche aggregate
        const statsRes = await axios.get(`${API_URL}/garden/${gardenId}/stats`);
        setStats(statsRes.data.stats);

        // 2. Recupera la cronologia (es. ultimi 20 record)
        // Nota: se non esiste un endpoint per la cronologia, possiamo saltare questo passo.
        // Per ora usiamo dati fittizi per testare il grafico.
        const historyRes = await axios.get(`${API_URL}/garden/${gardenId}/history?limit=20`);
        setHistory(historyRes.data || []);
      } catch (err) {
        console.error('Errore caricamento dati orto:', err);
        setError('Impossibile caricare i dati dell’orto. Verifica che il gateway sia in esecuzione.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gardenId, API_URL]);

  if (loading) return <div className="loading">Caricamento dati dell’orto...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div className="error">Nessun dato disponibile per questo orto.</div>;

  // Prepara i dati per il grafico (se abbiamo history)
  const chartData = history.length > 0 ? history : [
    { time: '2026-07-30 10:00', ph: 6.2, ec: 1.8, temperature: 22.5, humidity: 65 },
    { time: '2026-07-30 10:15', ph: 6.3, ec: 1.9, temperature: 22.8, humidity: 67 },
    { time: '2026-07-30 10:30', ph: 6.1, ec: 1.7, temperature: 22.2, humidity: 63 },
  ];

  return (
    <div className="garden-dashboard">
      <h2>🌱 Dashboard Orto: {gardenId}</h2>

      <div className="garden-selector">
        <label htmlFor="gardenSelect">Seleziona orto:</label>
        <select
          id="gardenSelect"
          value={gardenId}
          onChange={(e) => setGardenId(e.target.value)}
        >
          <option value="test-garden-001">Orto di Test #1</option>
          <option value="test-garden-002">Orto di Test #2</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>pH</h3>
          <p>Min: {stats.ph.min.toFixed(2)}</p>
          <p>Max: {stats.ph.max.toFixed(2)}</p>
          <p>Media: {stats.ph.avg.toFixed(2)}</p>
          <p>Conteggio: {stats.ph.count}</p>
        </div>
        <div className="stat-card">
          <h3>EC (μS/cm)</h3>
          <p>Min: {stats.ec.min.toFixed(2)}</p>
          <p>Max: {stats.ec.max.toFixed(2)}</p>
          <p>Media: {stats.ec.avg.toFixed(2)}</p>
          <p>Conteggio: {stats.ec.count}</p>
        </div>
        <div className="stat-card">
          <h3>Temperatura (°C)</h3>
          <p>Min: {stats.temperature.min.toFixed(1)}</p>
          <p>Max: {stats.temperature.max.toFixed(1)}</p>
          <p>Media: {stats.temperature.avg.toFixed(1)}</p>
          <p>Conteggio: {stats.temperature.count}</p>
        </div>
        <div className="stat-card">
          <h3>Umidità (%)</h3>
          <p>Min: {stats.humidity.min.toFixed(1)}</p>
          <p>Max: {stats.humidity.max.toFixed(1)}</p>
          <p>Media: {stats.humidity.avg.toFixed(1)}</p>
          <p>Conteggio: {stats.humidity.count}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Andamento nel tempo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" />
            <Line type="monotone" dataKey="ec" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temperature" stroke="#ffc658" />
            <Line type="monotone" dataKey="humidity" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GardenDashboard;
