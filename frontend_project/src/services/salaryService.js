import apiClient from '../api/apiClient';

const salaryService = {
  // 1. Fetch all stalls
  getAll: async () => {
    const response = await apiClient.get('/salary');
    return response.data; // Expected: { success: true, data: [...] }
  },

  // 2. Register a new stall
  create: async (data) => {
    const response = await apiClient.post('/salary', data);
    return response.data;
  },

  // 3. Update an existing stall
  update: async (id, data) => {
    const response = await apiClient.put(`/salary/${id}`, data);
    return response.data;
  },

  // 4. Remove a stall
  delete: async (id) => {
    const response = await apiClient.delete(`/salary/${id}`);
    return response.data;
  }
};

export default salaryService;