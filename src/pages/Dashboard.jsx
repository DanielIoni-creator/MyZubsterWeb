import React from 'react';
import GardenDashboard from '../components/Garden/GardenDashboard';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h1>📊 Dashboard Orti Urbani</h1>
      <p>Monitora in tempo reale i dati dei tuoi orti: pH, EC, temperatura e umidità.</p>
      <GardenDashboard />
    </div>
  );
}

export default Dashboard;
