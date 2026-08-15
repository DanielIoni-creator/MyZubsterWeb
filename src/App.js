import React from 'react';
import CouponsList from "./pages/coupons/CouponsList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CouponsList from "./pages/coupons/CouponsList";
import { ThemeProvider } from '@mui/material/styles';
import CouponsList from "./pages/coupons/CouponsList";
import CssBaseline from '@mui/material/CssBaseline';
import CouponsList from "./pages/coupons/CouponsList";
import { Toaster } from 'react-hot-toast';
import CouponsList from "./pages/coupons/CouponsList";
import theme from './styles/theme';
import CouponsList from "./pages/coupons/CouponsList";
import Layout from './components/layout/Layout';
import CouponsList from "./pages/coupons/CouponsList";
import Dashboard from './pages/dashboard/Dashboard';
import CouponsList from "./pages/coupons/CouponsList";
import Garden from './pages/garden/Garden';
import CouponsList from "./pages/coupons/CouponsList";
import Marketplace from './pages/marketplace/Marketplace';
import CouponsList from "./pages/coupons/CouponsList";
import Wallet from './pages/wallet/Wallet';
import CouponsList from "./pages/coupons/CouponsList";
import Profile from './pages/profile/Profile';
import CouponsList from "./pages/coupons/CouponsList";
import Admin from './pages/admin/Admin';
import CouponsList from "./pages/coupons/CouponsList";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
        <Layout>
          <Routes>
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/" element={<Dashboard />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/garden" element={<Garden />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/wallet" element={<Wallet />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/profile" element={<Profile />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
            <Route path="/admin" element={<Admin />} />
        <Route path="/coupons" element={<CouponsList userId="DanielIoni-creator" />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
