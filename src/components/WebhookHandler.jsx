import { useState } from 'react';
import useStore from '../store/store';

export default function WebhookHandler() {
  const { webhooks, createWebhook } = useStore();
  const [url, setUrl] = useState('');
  const [events, setEvents] = useState(['order.created']);
  const [secret, setSecret] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWebhook({ url, events, secret });
      setMessage('Webhook registered successfully!');
      setUrl('');
      setSecret('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  const toggleEvent = (evt) => {
    setEvents((prev) =>
      prev.includes(evt) ? prev.filter((e) => e !== evt) : [...prev, evt]
    );
  };

  return (
    <div className="view webhook-view">
      <h2>🔗 Webhooks</h2>
      
      <form onSubmit={handleSubmit} className="webhook-form">
        <div className="form-group">
          <label>Endpoint URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-server.com/webhook"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Events</label>
          <div className="checkbox-group">
            {['order.created', 'order.updated', 'payment.received', 'user.registered', 'webhook.test'].map((evt) => (
              <label key={evt} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={events.includes(evt)}
                  onChange={() => toggleEvent(evt)}
                />
                {evt}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Secret (for HMAC verification)</label>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="whsec_..."
          />
        </div>
        
        <button type="submit" className="btn primary">Register Webhook</button>
        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      </form>

      {webhooks.length > 0 && (
        <div className="webhook-list">
          <h3>Registered Webhooks ({webhooks.length})</h3>
          <ul className="item-list">
            {webhooks.map((w) => (
              <li key={w.id || w._id} className="item">
                <span className="item-url">{w.url}</span>
                <span className="item-events">{(w.events || []).join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
