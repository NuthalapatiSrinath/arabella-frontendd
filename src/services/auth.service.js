import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const authService = {
  login: async (credentials) => {
    // credentials = { email, password }
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);

    // Auto-save token and user data
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  register: async (userData) => {
    return await apiClient.post(API_ROUTES.AUTH.REGISTER, userData);
  },

  verifyEmail: async (token) => {
    return await apiClient.post(API_ROUTES.AUTH.VERIFY_EMAIL, { token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optional: window.location.reload();
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
};
