import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import theme from './styles/theme';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Garden from './pages/garden/Garden';
import Marketplace from './pages/marketplace/Marketplace';
import Wallet from './pages/wallet/Wallet';
import Profile from './pages/profile/Profile';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/garden" element={<Garden />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
