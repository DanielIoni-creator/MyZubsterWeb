import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import Stats from './components/Stats';
import { OrdersView } from './components/OrdersView.jsx';
import { PaymentView } from './components/PaymentView.jsx';
import { ProfileView } from './components/ProfileView.jsx';
import './App.css';

// Preserves maintainer's landing page (Stats) while wiring the marketplace
// routes added for issue #2 (orders, payments, profile + webhook wiring).
function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MyZubster Ecosystem</h1>
      <Stats />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/" className="nav-link" end>Home</NavLink>
        <NavLink to="/orders" className="nav-link">Orders</NavLink>
        <NavLink to="/payments" className="nav-link">Payments</NavLink>
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
      </nav>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<OrdersView />} />
          <Route path="/payments" element={<PaymentView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </main>
    </div>
  );
}
