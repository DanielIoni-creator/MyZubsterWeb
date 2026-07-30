import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contribute from './pages/Contribute';
import Map from './pages/Map';
import NFT from './pages/NFT';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/map" element={<Map />} />
          <Route path="/nft" element={<NFT />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
