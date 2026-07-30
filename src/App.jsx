import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Profile from './pages/Profile';
import Webhooks from './pages/Webhooks';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="webhooks" element={<Webhooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
