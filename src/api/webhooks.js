import client from './client';

export const getWebhookEvents = async () => {
  const response = await client.get('/webhooks/events');
  return response.data;
};
