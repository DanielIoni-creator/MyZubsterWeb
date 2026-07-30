import { useEffect } from 'react';
import useStore from '../store';

const Orders = () => {
  const { orders, fetchOrders, createOrder, loading, error } = useStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreate = () => {
    createOrder({ item: 'New Item', quantity: 1, price: 100 });
  };

  return (
    <div>
      <h2>Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p>Error: {error}</p>}
      <button onClick={handleCreate}>Create Dummy Order</button>
      <ul>
        {orders.map((order, idx) => (
          <li key={idx}>
            {order.id ? `Order #${order.id}` : 'Order'} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
