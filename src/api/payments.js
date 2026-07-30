import client from './client';

export const createPayment = async (paymentData) => {
  const response = await client.post('/payments', paymentData);
  return response.data;
};

export const verifyPayment = async (paymentId) => {
  const response = await client.post(`/payments/${paymentId}/verify`);
  return response.data;
};

export const getPaymentHistory = async () => {
  const response = await client.get('/payments/history');
  return response.data;
};
