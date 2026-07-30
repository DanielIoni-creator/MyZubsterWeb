import React from 'react';
import { Link } from 'react-router-dom';
import RecentActivity from '../components/RecentActivity';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>🌱 MyZubster</h1>
        <p>Decentralized ecosystem for plant mapping, Monero payments, and human‑centered AI.</p>
        <div className="hero-buttons">
          <a href="https://github.com/MyZubster-Ecosystem" className="btn btn-primary">GitHub</a>
          <a href="https://t.me/myzubster" className="btn btn-secondary">Telegram</a>
        </div>
      </section>

      <section className="features">
        <h2>🌍 What we offer</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🌿 Global Plant Map</h3>
            <p>Participatory and verified map of plants around the world.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Monero Payments</h3>
            <p>Privacy‑first, feeless microtransactions for everyone.</p>
          </div>
          <div className="feature-card">
            <h3>🤖 Human‑Controlled AI</h3>
            <p>AI as a tool, not a master — transparent and auditable.</p>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <h2>📈 Recent Activity</h2>
        <RecentActivity />
      </section>
    </div>
  );
}

export default Home;
