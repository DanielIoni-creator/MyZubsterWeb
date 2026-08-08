import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store/store.js';
import { WebhookHandler } from './components/WebhookHandler.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <WebhookHandler />
        <App />
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);