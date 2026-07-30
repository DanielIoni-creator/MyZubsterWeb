import React from 'react';

function Contribute() {
  return (
    <div className="contribute">
      <h1>🤝 Contribute to MyZubster</h1>
      <p>
        MyZubster is open source and welcomes every kind of contribution.
        Here's how you can help:
      </p>

      <h2>💻 Code</h2>
      <ul>
        <li><strong>Backend</strong> – Node.js, Express, Monero, MongoDB, SQLite</li>
        <li><strong>Frontend</strong> – React, Vite, React Native</li>
        <li><strong>AI & Bots</strong> – DeepSeek, OpenAI, autonomous agents</li>
        <li><strong>Security & Performance</strong> – audits, optimization, testing</li>
      </ul>
      <p>
        <a href="https://github.com/MyZubster-Ecosystem/MyZubsterGateway/issues">
          View open issues →
        </a>
      </p>

      <h2>🌿 Data & Mapping</h2>
      <ul>
        <li>Report plants and animals in your area</li>
        <li>Help verify submissions</li>
        <li>Import open datasets (GBIF, iNaturalist)</li>
      </ul>

      <h2>🗣️ Outreach</h2>
      <ul>
        <li>Write articles, make videos, talk about the project</li>
        <li>Bring MyZubster to meetups, hackathons, universities</li>
      </ul>

      <h2>💰 Donations</h2>
      <p>
        Support the project in Monero (XMR):<br />
        <code>45M4DW1ug8bdQowWpxucTpgsfjLbVxbYaAra79VewmBobuuhgqTjyD4R3DzpqLM2veiphcB16n24qN1QbLg3y2PYGK3Qkoe</code>
      </p>
    </div>
  );
}

export default Contribute;
