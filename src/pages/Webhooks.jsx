import { useEffect } from 'react';
import useStore from '../store';

const Webhooks = () => {
  const { webhookEvents, fetchWebhookEvents, loading, error } = useStore();

  useEffect(() => {
    fetchWebhookEvents();
  }, [fetchWebhookEvents]);

  return (
    <div>
      <h2>Webhooks</h2>
      {loading && <p>Loading webhooks...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {webhookEvents.map((event, idx) => (
          <li key={idx}>
            Event: {event.type} - Data: {JSON.stringify(event.data)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Webhooks;
