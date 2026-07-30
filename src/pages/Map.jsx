import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix per i marker di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Map() {
  const [gardens, setGardens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: chiamata API per ottenere gli orti urbani
    // Per ora usiamo dati di esempio
    setGardens([
      { id: 1, name: 'Orto di Daniel', lat: 44.0594, lng: 12.5683, description: 'Un orto urbano a Rimini' },
      { id: 2, name: 'Giardino Comune', lat: 44.0620, lng: 12.5700, description: 'Orto condiviso nel centro' },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading map...</p>;

  return (
    <div className="map-page">
      <h1>🗺️ Global Map</h1>
      <p>Explore urban gardens, plants, and seed exchanges around the world.</p>
      <MapContainer center={[44.0594, 12.5683]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {gardens.map((garden) => (
          <Marker key={garden.id} position={[garden.lat, garden.lng]}>
            <Popup>
              <strong>{garden.name}</strong><br />
              {garden.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
