import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contribute from './pages/Contribute';
import Map from './pages/Map';
import NFT from './pages/NFT';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import BountySystem from './components/BountySystem';
import GlobalMap from './components/GlobalMap';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/map" element={<GlobalMap />} />
          <Route path="/bounty" element={<BountySystem />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
