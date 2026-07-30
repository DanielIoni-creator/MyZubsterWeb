import React, { useState } from 'react';

export const GardenDashboard: React.FC = () => {
  const [moistureLevel] = useState<number>(68);
  const [temperatureC] = useState<number>(24.5);

  return (
    <div className="p-6 bg-emerald-950 text-white rounded-xl shadow-md border border-emerald-800">
      <h2 className="text-xl font-bold mb-3 text-emerald-400">🌱 Orto Urbano Data Dashboard</h2>
      <div className="flex gap-4">
        <div className="p-3 bg-emerald-900 rounded-lg">
          <p className="text-xs text-gray-300">Umidità Terreno</p>
          <p className="text-lg font-bold">{moistureLevel}%</p>
        </div>
        <div className="p-3 bg-emerald-900 rounded-lg">
          <p className="text-xs text-gray-300">Temperatura Ambientale</p>
          <p className="text-lg font-bold">{temperatureC} °C</p>
        </div>
      </div>
    </div>
  );
};
