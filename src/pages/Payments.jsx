import { useEffect } from 'react';
import useStore from '../store';

const Payments = () => {
  const { payments, fetchPayments, createPayment, loading, error } = useStore();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleCreate = () => {
    createPayment({ amount: 100, method: 'credit_card' });
  };

  return (
    <div>
      <h2>Payments</h2>
      {loading && <p>Loading payments...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleCreate}>Create Dummy Payment</button>
      <ul>
        {payments.map((payment, idx) => (
          <li key={idx}>
            Payment: ${payment.amount} - Status: {payment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
