import { apiFetch } from './config';

/**
 * User management API service.
 */
export const usersApi = {
  /**
   * Get user profile.
   */
  async profile(userAddress) {
    return apiFetch(`/users/${userAddress}`);
  },

  /**
   * Update user profile settings.
   */
  async updateProfile(userAddress, profileData) {
    return apiFetch(`/users/${userAddress}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  /**
   * Get user settings/preferences.
   */
  async settings(userAddress) {
    return apiFetch(`/users/${userAddress}/settings`);
  },

  /**
   * Update user settings.
   */
  async updateSettings(userAddress, settings) {
    return apiFetch(`/users/${userAddress}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },

  /**
   * Get user dashboard data.
   */
  async dashboard(userAddress) {
    return apiFetch(`/users/${userAddress}/dashboard`);
  },
};
