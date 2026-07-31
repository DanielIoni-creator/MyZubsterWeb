import client from './client';

export const getOrders = async () => {
  const response = await client.get('/orders');
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await client.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await client.post('/orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await client.patch(`/orders/${id}`, { status });
  return response.data;
};
