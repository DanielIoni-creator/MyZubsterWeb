import { useEffect, useState } from 'react';
import { useStore } from '../store/store.js';
import { ORDER_STATUSES } from '../api/orders.js';

export function OrdersView() {
  const { state, actions } = useStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => { actions.fetchOrders(); }, []);

  if (state.loading && !state.orders.length) return <p aria-busy="true">Loading orders...</p>;
  if (state.error) return <p role="alert">Error: {state.error}</p>;

  const visible = filter === 'all' ? state.orders : state.orders.filter((o) => o.status === filter);

  return (
    <section aria-labelledby="orders-heading">
      <header>
        <h1 id="orders-heading">My Orders</h1>
        <label>
          Filter by status:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </header>
      {!visible.length ? <p>No orders found.</p> : (
        <table>
          <thead>
            <tr>{['ID', 'Skill', 'Amount', 'Currency', 'Status', 'Actions'].map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {visible.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.skillId}</td>
                <td>{order.amount != null ? order.amount : '-'}</td>
                <td>{order.currency || '-'}</td>
                <td data-testid={'order-status-' + order.id}>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => actions.updateOrderStatus(order.id, e.target.value)}
                    aria-label={'Update status for order ' + order.id}
                  >
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}