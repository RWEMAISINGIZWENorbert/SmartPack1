import apiClient from '../api/apiClient';

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { username, password, confirmPassword }
   */
  signUp: async (userData) => {
    const payload = {
      email: userData.email, // mapping to backend field name
      password: userData.password,
      confirmPassword: userData.confirmPassword
    };
    const response = await apiClient.post('/auth/signUp', payload);
    return response.data;
  },

  /**
   * Log in an existing user
   * @param {Object} credentials - { username, password }
   */
  signIn: async (credentials) => {
    const payload = {
      email: credentials.email, // mapping to backend field name
      password: credentials.password
    };
    const response = await apiClient.post('/auth/signIn', payload);
    return response.data;
  }
};

export default authService;
