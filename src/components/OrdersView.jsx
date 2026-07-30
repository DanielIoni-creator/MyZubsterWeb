import { useEffect } from 'react';
import useStore from '../store/store';

export default function OrdersView() {
  const { orders, ordersLoading, fetchOrders } = useStore();

  useEffect(() => { fetchOrders(); }, []);

  if (ordersLoading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="view orders-view">
      <h2>📦 Orders</h2>
      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        <ul className="item-list">
          {orders.map((o) => (
            <li key={o.id || o._id} className="item">
              <span className="item-id">#{o.id || o._id?.slice(-6)}</span>
              <span className="item-status">{o.status || 'pending'}</span>
              <span className="item-amount">USD {o.amount || o.total || '—'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
