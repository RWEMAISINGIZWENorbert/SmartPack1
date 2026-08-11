import apiClient from '../api/apiClient';

const employeeService = {
  // 1. Fetch all current allocations
  getAll: async () => {
    const response = await apiClient.get('/employee');
    return response.data; // Expected: { success: true, data: [...] }
  },

  // 2. Assign a vendor to a stall
  create: async (payload) => {
    const response = await apiClient.post('/employee', payload);
    return response.data;
  },

  update: async (id, payload) => {
    const response = await apiClient.put(`/employee/${id}`, payload);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/employee/${id}`);
    return response.data;
  }
};

export default employeeService;
