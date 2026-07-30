import React, { useEffect, useState } from 'react';

function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: chiamata API per le ultime attività (es. GitHub events)
    setActivities([
      { id: 1, repo: 'MyZubsterGateway', message: 'feat: add Arduino API', date: '2026-07-30', link: 'https://github.com/MyZubster-Ecosystem/MyZubsterGateway/pull/99' },
      { id: 2, repo: 'MyZubsterWeb', message: 'docs: add Telegram channel', date: '2026-07-30', link: 'https://github.com/MyZubster-Ecosystem/MyZubsterWeb/commit/...' },
      { id: 3, repo: 'myzubster-docs', message: 'docs: update README', date: '2026-07-29', link: 'https://github.com/MyZubster-Ecosystem/myzubster-docs' },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading recent activity...</p>;

  return (
    <ul className="activity-list">
      {activities.map((item) => (
        <li key={item.id}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <strong>{item.repo}</strong>: {item.message}
          </a>
          <span className="date">{item.date}</span>
        </li>
      ))}
    </ul>
  );
}

export default RecentActivity;
