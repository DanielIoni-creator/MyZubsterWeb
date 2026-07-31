import React, { useState } from 'react';

const SensitiveDataConsent = ({ onConsent }) => {
  const [agreed, setAgreed] = useState(false);
  const [read, setRead] = useState(false);

  const handleSubmit = () => {
    if (agreed && read) {
      localStorage.setItem('sensitive-data-consent', 'true');
      if (onConsent) onConsent(true);
    }
  };

  return (
    <div className="sensitive-data-consent">
      <h3>Consenso per il trattamento di dati sensibili</h3>
      <p>
        Per utilizzare alcune funzionalità (geolocalizzazione, NFC), abbiamo bisogno
        del tuo consenso esplicito per il trattamento di dati sensibili.
      </p>
      
      <div className="consent-section">
        <p>
          <a href="/legal/sensitive-data" target="_blank" rel="noopener noreferrer">
            📄 Leggi il modulo di consenso completo
          </a>
        </p>
        <label className="consent-check">
          <input 
            type="checkbox" 
            checked={read} 
            onChange={(e) => setRead(e.target.checked)} 
          />
          Ho letto e compreso il modulo di consenso
        </label>
        <label className="consent-check">
          <input 
            type="checkbox" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
          />
          Acconsento al trattamento dei miei dati sensibili come descritto
        </label>
      </div>

      <button 
        className="consent-submit" 
        onClick={handleSubmit} 
        disabled={!agreed || !read}
      >
        {agreed && read ? 'Conferma consenso' : 'Accetta per continuare'}
      </button>
    </div>
  );
};

export default SensitiveDataConsent;
