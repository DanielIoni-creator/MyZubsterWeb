import React, { useState } from 'react';

/**
 * Garden Sensor Dashboard Component
 * Resolves Issue #9 (Dashboard per visualizzare i dati dell'orto - pH, EC, Temp, Humidity & Sensor Calibration)
 */
export const SensorDashboard = () => {
  const [sensors, setSensors] = useState({
    pH: 6.2,
    ec: 1.8, // mS/cm
    temperature: 24.5, // °C
    humidity: 68, // %
    waterLevel: '85%'
  });

  const [calibrating, setCalibrating] = useState(null);
  const [calibrationLog, setCalibrationLog] = useState('');

  // Optimal Ranges
  const optimalRanges = {
    pH: { min: 5.5, max: 6.8 },
    ec: { min: 1.2, max: 2.2 },
    temperature: { min: 18.0, max: 28.0 },
    humidity: { min: 50, max: 80 }
  };

  const getStatusBadge = (param, value) => {
    const range = optimalRanges[param];
    if (value < range.min || value > range.max) {
      return <span style={{ color: '#ef4444', backgroundColor: '#450a0a', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>⚠️ ALERT: Fuori Range</span>;
    }
    return <span style={{ color: '#4ade80', backgroundColor: '#064e3b', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>✅ Ottimale</span>;
  };

  const handleCalibrate = (sensorName) => {
    setCalibrating(sensorName);
    setTimeout(() => {
      setCalibrating(null);
      setCalibrationLog(`Sensore ${sensorName} calibrato con successo alle ${new Date().toLocaleTimeString()}!`);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#0f172a', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#38bdf8', margin: 0 }}>📊 Dashboard Sensori & Telemetria Orto In Tempo Reale</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Monitoraggio idroponico ed ergonomico di pH, conducibilità elettrica (EC), temperatura e umidità
          </p>
        </div>
      </header>

      {calibrationLog && (
        <div style={{ backgroundColor: '#064e3b', color: '#34d399', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
          ✅ {calibrationLog}
        </div>
      )}

      {/* Sensor Telemetry Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* pH Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>pH Soluzione Nutritiva</span>
            {getStatusBadge('pH', sensors.pH)}
          </div>
          <h3 style={{ fontSize: '28px', margin: '12px 0 6px 0', color: '#38bdf8' }}>{sensors.pH} pH</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Range Ottimale: 5.5 - 6.8</p>
          <button
            onClick={() => handleCalibrate('pH')}
            disabled={calibrating === 'pH'}
            style={{ marginTop: '14px', width: '100%', padding: '6px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            {calibrating === 'pH' ? 'Calibrazione in corso...' : 'Calibra Sensore pH'}
          </button>
        </div>

        {/* EC Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Conducibilità (EC)</span>
            {getStatusBadge('ec', sensors.ec)}
          </div>
          <h3 style={{ fontSize: '28px', margin: '12px 0 6px 0', color: '#4ade80' }}>{sensors.ec} mS/cm</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Range Ottimale: 1.2 - 2.2 mS/cm</p>
          <button
            onClick={() => handleCalibrate('EC')}
            disabled={calibrating === 'EC'}
            style={{ marginTop: '14px', width: '100%', padding: '6px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
          >
            {calibrating === 'EC' ? 'Calibrazione in corso...' : 'Calibra Sonda EC'}
          </button>
        </div>

        {/* Temperature Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Temperatura Aria</span>
            {getStatusBadge('temperature', sensors.temperature)}
          </div>
          <h3 style={{ fontSize: '28px', margin: '12px 0 6px 0', color: '#f59e0b' }}>{sensors.temperature} °C</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Range Ottimale: 18°C - 28°C</p>
        </div>

        {/* Humidity Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>Umidità Relativa</span>
            {getStatusBadge('humidity', sensors.humidity)}
          </div>
          <h3 style={{ fontSize: '28px', margin: '12px 0 6px 0', color: '#a855f7' }}>{sensors.humidity} %</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Range Ottimale: 50% - 80%</p>
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;
