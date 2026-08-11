import apiClient from '../api/apiClient';

const departmentService = {
  // 1. Fetch all payments (supports 'today', 'week', 'month', or 'all')
  getAll: async (type = 'all') => {
    // We send the type as a query parameter
    // const response = await apiClient.get(`/departments?type=${type}`);
    const response = await apiClient.get(`/department`);
    return response.data; // Expected: { success: true, data: [...], totalAmount: 1000 }
  },

  // 2. Record a new payment
  create: async (payload) => {
    const response = await apiClient.post('/department', payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await apiClient.put(`/department/${id}`, payload);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/department/${id}`);
    return response.data;
  }
};

export default departmentService;
