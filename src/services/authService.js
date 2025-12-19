import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const loginUser = async (credentials) => {
  const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post(API_ROUTES.AUTH.REGISTER, userData);
  return response.data;
};
