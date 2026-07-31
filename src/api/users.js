import client from './client';

export const getUserProfile = async () => {
  const response = await client.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await client.put('/users/profile', profileData);
  return response.data;
};

export const getUserSettings = async () => {
  const response = await client.get('/users/settings');
  return response.data;
};

export const updateUserSettings = async (settingsData) => {
  const response = await client.put('/users/settings', settingsData);
  return response.data;
};
