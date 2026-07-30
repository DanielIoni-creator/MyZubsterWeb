import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Stats from './components/Stats';
import OrdersView from './components/OrdersView';
import PaymentView from './components/PaymentView';
import ProfileView from './components/ProfileView';
import WebhookHandler from './components/WebhookHandler';
import useStore from './store/store';

const NAV_ITEMS = [
  { key: 'dashboard', label: '📊 Dashboard', component: null },
  { key: 'orders',    label: '📦 Orders',    component: OrdersView },
  { key: 'payments',  label: '💳 Payments',  component: PaymentView },
  { key: 'profile',   label: '👤 Profile',   component: ProfileView },
  { key: 'webhooks',  label: '🔗 Webhooks',  component: WebhookHandler },
];

function App() {
  const { activeView, setView } = useStore();
  const [count, setCount] = useState(0);
  
  const ActiveComponent = NAV_ITEMS.find((n) => n.key === activeView)?.component;

  return (
    <>
      <nav className="top-nav">
        <div className="brand">
          <a href="https://vite.dev" target="_blank">
            <img src={reactLogo} className="logo" alt="React logo" />
          </a>
          <strong>MyZubster Marketplace</strong>
        </div>
        <div className="nav-links">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              className={`btn nav-btn ${activeView === key ? 'active' : ''}`}
              onClick={() => setView(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
      
      <main className="app-main">
        {activeView === 'dashboard' ? (
          <>
            <h1>MyZubster Ecosystem</h1>
            <Stats />
            <div className="card">
              <button onClick={() => setCount((c) => c + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> to get started
              </p>
            </div>
            <p className="tip">
              Click the navigation tabs above to browse orders, payments, profile, and webhooks
            </p>
          </>
        ) : ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <p>Coming soon</p>
        )}
      </main>
    </>
  );
}

export default App;
