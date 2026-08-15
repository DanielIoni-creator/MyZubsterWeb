import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://188.213.161.186:5003/api';

const CouponsList = ({ userId }) => {
  const [coupons, setCoupons] = useState([]);
  const [balance, setBalance] = useState(0);
  const [newCoupon, setNewCoupon] = useState({
    discountType: 'percentage',
    discountValue: 10,
    minMYZ: 20
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const couponRes = await axios.get(`${API_URL}/coupons/user/${userId}`);
      setCoupons(couponRes.data.coupons || []);
      const balanceRes = await axios.get(`${API_URL}/user-balance/${userId}`);
      setBalance(balanceRes.data.myzBalance || 0);
    } catch (error) {
      console.error('❌ Errore caricamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await axios.post(`${API_URL}/coupons/create`, {
        userId,
        ...newCoupon
      });
      if (response.data.success) {
        setMessage(`✅ Coupon creato: ${response.data.coupon.code}`);
        loadData();
        setNewCoupon({
          discountType: 'percentage',
          discountValue: 10,
          minMYZ: 20
        });
      }
    } catch (error) {
      setMessage(`❌ Errore: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const redeemCoupon = async (code) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/coupons/redeem`, {
        code,
        userId
      });
      if (response.data.success) {
        setMessage(`✅ ${response.data.message}`);
        loadData();
      }
    } catch (error) {
      setMessage(`❌ Errore: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="coupons-container" style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>🎟️ I tuoi coupon</h1>
      <p>Saldo MYZ: <strong>{balance} MYZ</strong></p>

      {message && <div style={{ padding: '10px', margin: '10px 0', background: '#111', borderRadius: '8px' }}>{message}</div>}

      <div className="create-coupon" style={{ background: '#0a0a1a', border: '1px solid #00ffcc33', borderRadius: '10px', padding: '20px', margin: '20px 0' }}>
        <h3>🆕 Crea nuovo coupon</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={newCoupon.discountType}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
            style={{ padding: '8px', borderRadius: '5px', background: '#111', color: '#00ffcc', border: '1px solid #00ffcc33' }}
          >
            <option value="percentage">Percentuale</option>
            <option value="fixed">Importo fisso (XMR)</option>
            <option value="free_ride">Noleggio gratuito</option>
          </select>
          <input
            type="number"
            value={newCoupon.discountValue}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseFloat(e.target.value) })}
            placeholder="Valore sconto"
            style={{ padding: '8px', borderRadius: '5px', background: '#111', color: '#00ffcc', border: '1px solid #00ffcc33' }}
          />
          <input
            type="number"
            value={newCoupon.minMYZ}
            onChange={(e) => setNewCoupon({ ...newCoupon, minMYZ: parseFloat(e.target.value) })}
            placeholder="Costo in MYZ"
            style={{ padding: '8px', borderRadius: '5px', background: '#111', color: '#00ffcc', border: '1px solid #00ffcc33' }}
          />
          <button
            onClick={createCoupon}
            disabled={loading}
            style={{ padding: '8px 20px', borderRadius: '5px', background: '#00ffcc', color: '#0a0a0f', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loading ? '⏳' : '🎟️ Crea'}
          </button>
        </div>
      </div>

      <div className="coupons-list">
        <h3>📋 I tuoi coupon ({coupons.length})</h3>
        {loading ? (
          <p>Caricamento...</p>
        ) : coupons.length === 0 ? (
          <p style={{ color: '#66ffcc66' }}>Nessun coupon disponibile. Creane uno!</p>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon._id} style={{ background: '#0a0a1a', border: '1px solid #00ffcc33', borderRadius: '8px', padding: '15px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#00ffcc' }}>{coupon.code}</strong>
                <span style={{ marginLeft: '10px', color: '#66ffcc99' }}>
                  {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` :
                   coupon.discountType === 'fixed' ? `${coupon.discountValue} XMR` :
                   '🎁 Noleggio gratuito'}
                </span>
                <span style={{ marginLeft: '10px', fontSize: '12px', color: '#66ffcc66' }}>
                  Scade: {new Date(coupon.expiresAt).toLocaleDateString()}
                </span>
              </div>
              {coupon.usedCount < coupon.maxUses ? (
                <button
                  onClick={() => redeemCoupon(coupon.code)}
                  disabled={loading}
                  style={{ padding: '5px 15px', borderRadius: '5px', background: '#ffcc00', color: '#0a0a0f', border: 'none', cursor: 'pointer' }}
                >
                  Riscatta
                </button>
              ) : (
                <span style={{ color: '#ff004466' }}>✅ Usato</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponsList;
