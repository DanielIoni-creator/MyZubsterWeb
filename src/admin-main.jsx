import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdminDashboard } from './admin/AdminDashboard.jsx';
import './admin/admin.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminDashboard />
  </StrictMode>,
);
