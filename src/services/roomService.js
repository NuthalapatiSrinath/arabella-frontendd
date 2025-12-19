import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const getAllRooms = async () => {
  const response = await apiClient.get(API_ROUTES.ROOMS.GET_ALL);
  return response.data.data;
};

export const searchRooms = async (params) => {
  // params: { checkIn, checkOut, guests }
  const response = await apiClient.get(API_ROUTES.ROOMS.SEARCH, { params });
  return response.data.data;
};
