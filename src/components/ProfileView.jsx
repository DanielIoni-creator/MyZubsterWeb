import { useEffect, useState } from 'react';
import { useStore } from '../store/store.js';

export function ProfileView() {
  const { state, actions } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState({});

  useEffect(() => { actions.fetchProfile(); }, []);
  useEffect(() => { actions.fetchSettings(); }, []);

  useEffect(() => {
    if (state.user) { setName(state.user.name || ''); setEmail(state.user.email || ''); }
  }, [state.user]);

  useEffect(() => {
    if (state.settings) setSettings(state.settings);
  }, [state.settings]);

  const saveProfile = (e) => {
    e.preventDefault();
    actions.updateProfile({ name: name, email: email });
  };

  const toggleSetting = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    actions.updateSettings(updated);
  };

  if (state.loading && !state.user) return <p aria-busy="true">Loading profile...</p>;
  if (state.error) return <p role="alert">Error: {state.error}</p>;

  return (
    <section aria-labelledby="profile-heading">
      <header>
        <h1 id="profile-heading">User Profile</h1>
      </header>
      <form onSubmit={saveProfile}>
        <label>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
        </label>
        <label>
          Email: <input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
        </label>
        <button type="submit">Save Profile</button>
      </form>

      <hr />

      <h2>Settings</h2>
      {state.settings ? (
        <fieldset>
          <legend>Notification preferences</legend>
          <label>
            <input
              type="checkbox"
              checked={!!settings.emailNotifications}
              onChange={() => toggleSetting('emailNotifications')}
            />
            {' '}Email notifications
          </label>
          <label>
            <input
              type="checkbox"
              checked={!!settings.orderUpdates}
              onChange={() => toggleSetting('orderUpdates')}
            />
            {' '}Order update alerts
          </label>
        </fieldset>
      ) : (
        <p>Loading settings...</p>
      )}
    </section>
  );
}