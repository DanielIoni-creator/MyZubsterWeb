import { useEffect, useState } from 'react';
import { useStore } from '../store/store.js';

export function PaymentView({ orderId }) {
  const { state, actions } = useStore();
  const [createMsg, setCreateMsg] = useState('');
  const [verifyMsg, setVerifyMsg] = useState('');

  useEffect(() => {
    if (orderId) actions.fetchPaymentHistory(orderId);
  }, [orderId]);

  const handleCreate = async () => {
    const result = await actions.createPayment(orderId);
    setCreateMsg(result ? 'Payment created: ' + (result.id || result.paymentId || 'OK') : 'Failed');
    if (result) actions.fetchPaymentHistory(orderId);
  };

  const handleVerify = async (pid) => {
    const result = await actions.verifyPayment(pid);
    setVerifyMsg(result ? 'Verified: ' + (result.status || 'OK') : 'Failed');
    if (result) actions.fetchPaymentHistory(orderId);
  };

  if (state.loading && !state.payments.length) return <p aria-busy="true">Loading payments...</p>;
  if (state.error) return <p role="alert">Error: {state.error}</p>;

  return (
    <section aria-labelledby="payments-heading">
      <header>
        <h1 id="payments-heading">Payments</h1>
        <button onClick={handleCreate} disabled={!orderId}>Create Payment</button>
      </header>
      {createMsg && <p role="status">{createMsg}</p>}
      {verifyMsg && <p role="status">{verifyMsg}</p>}
      {!state.payments.length ? (
        <p>No payment history.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.payments.map((p) => (
              <tr key={p.id || p.paymentId}>
                <td>{p.id || p.paymentId}</td>
                <td>{p.orderId || orderId}</td>
                <td>{p.amount != null ? p.amount : '-'}</td>
                <td data-testid={'payment-status-' + (p.id || p.paymentId)}>{p.status}</td>
                <td>
                  <button onClick={() => handleVerify(p.id || p.paymentId)}>Verify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}