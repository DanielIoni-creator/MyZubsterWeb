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
import PlantManagement from './components/PlantManagement';
import AnimalManagement from './components/AnimalManagement';
import SeedExchange from './components/SeedExchange';
import SensorDashboard from './components/SensorDashboard';
import MainLayoutDashboard from './components/MainLayoutDashboard';
import UrbanGardenDashboard from './components/UrbanGardenDashboard';
import CreateSeedListingForm from './components/CreateSeedListingForm';
import DarkModeToggle from './components/DarkModeToggle';
import AuthSystem from './components/AuthSystem';
import MapLegendDesign from './components/MapLegendDesign';
import PlantDetailPage from './components/PlantDetailPage';
import SeedCuttingMarketplace from './components/SeedCuttingMarketplace';
import SeedSwapPublisherForm from './components/SeedSwapPublisherForm';
import InteractiveLeafletMap from './components/InteractiveLeafletMap';
import TelemetryChartWidget from './components/TelemetryChartWidget';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/map" element={<InteractiveLeafletMap />} />
          <Route path="/bounty" element={<BountySystem />} />
          <Route path="/piante" element={<PlantManagement />} />
          <Route path="/plant-detail" element={<PlantDetailPage />} />
          <Route path="/animali" element={<AnimalManagement />} />
          <Route path="/seed-exchange" element={<SeedCuttingMarketplace />} />
          <Route path="/create-seed" element={<SeedSwapPublisherForm />} />
          <Route path="/urban-garden" element={<UrbanGardenDashboard />} />
          <Route path="/sensors" element={<SensorDashboard />} />
          <Route path="/telemetry-chart" element={<TelemetryChartWidget />} />
          <Route path="/layout" element={<MainLayoutDashboard />} />
          <Route path="/auth" element={<AuthSystem />} />
          <Route path="/map-legend" element={<MapLegendDesign />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
