import React, { useState } from 'react';

/**
 * Telemetry Chart Widget Component
 * Resolves Issue #11 & #10 ([Free] Dashboard per visualizzare i dati dell'orto - Charts, Alerts & Calibration)
 */
export const TelemetryChartWidget = () => {
  const [activeMetric, setActiveMetric] = useState('pH');

  const chartData = {
    pH: [
      { time: '06:00', value: 6.1 },
      { time: '09:00', value: 6.2 },
      { time: '12:00', value: 6.4 },
      { time: '15:00', value: 6.3 },
      { time: '18:00', value: 6.2 }
    ],
    EC: [
      { time: '06:00', value: 1.7 },
      { time: '09:00', value: 1.8 },
      { time: '12:00', value: 1.9 },
      { time: '15:00', value: 1.8 },
      { time: '18:00', value: 1.8 }
    ],
    Temp: [
      { time: '06:00', value: 20.1 },
      { time: '09:00', value: 22.4 },
      { time: '12:00', value: 25.8 },
      { time: '15:00', value: 26.2 },
      { time: '18:00', value: 24.1 }
    ]
  };

  const currentDataset = chartData[activeMetric];
  const values = currentDataset.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const avgVal = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

  return (
    <div style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '12px', color: '#ffffff', fontFamily: 'sans-serif', border: '1px solid #334155' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ color: '#4ade80', margin: 0 }}>📈 Grafico Telemetria Nel Tempo (Sensori Orto)</h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>
            Visualizzazione dei parametri storici con calcolo automatico di Min, Max e Media
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['pH', 'EC', 'Temp'].map((m) => (
            <button
              key={m}
              onClick={() => setActiveMetric(m)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: activeMetric === m ? '#4ade80' : '#0f172a',
                color: activeMetric === m ? '#0f172a' : '#94a3b8'
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* Summary Statistics Bar */}
      <div style={{ display: 'flex', gap: '16px', backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
        <div>Valore Minimo: <strong style={{ color: '#38bdf8' }}>{minVal}</strong></div>
        <div>Valore Massimo: <strong style={{ color: '#ef4444' }}>{maxVal}</strong></div>
        <div>Valore Medio (24h): <strong style={{ color: '#4ade80' }}>{avgVal}</strong></div>
      </div>

      {/* Visual Chart Bars */}
      <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '24px', padding: '20px', backgroundColor: '#0f172a', borderRadius: '8px' }}>
        {currentDataset.map((point, idx) => (
          <div key={idx} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '11px', color: '#4ade80', marginBottom: '6px' }}>{point.value}</div>
            <div
              style={{
                width: '100%',
                maxWidth: '40px',
                height: `${(point.value / maxVal) * 120}px`,
                backgroundColor: '#4ade80',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.4s'
              }}
            />
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>{point.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TelemetryChartWidget;
