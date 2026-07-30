import { useEffect } from 'react';
import useStore from '../store/store';

export default function PaymentView() {
  const { payments, fetchPayments } = useStore();

  useEffect(() => { fetchPayments(); }, []);

  return (
    <div className="view payment-view">
      <h2>💳 Payments</h2>
      {payments.length === 0 ? (
        <p className="empty">No payments recorded</p>
      ) : (
        <ul className="item-list">
          {payments.map((p) => (
            <li key={p.id || p._id} className="item">
              <span className="item-method">{p.method || p.currency || 'XMR'}</span>
              <span className="item-amount">USD {p.amount || '—'}</span>
              <span className={`item-status ${p.status}`}>{p.status || 'pending'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
