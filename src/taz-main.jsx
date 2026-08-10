import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TazDashboard } from './taz/TazDashboard.jsx';
import './taz/taz.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TazDashboard />
  </StrictMode>,
);
