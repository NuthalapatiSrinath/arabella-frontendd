import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const roomService = {
  // params = { checkIn, checkOut, adults, children }
  searchRooms: async (params) => {
    const response = await apiClient.get(API_ROUTES.ROOMS.SEARCH, { params });
    return response.data;
  },

  getRoomDetails: async (id) => {
    const response = await apiClient.get(API_ROUTES.ROOMS.GET_BY_ID(id));
    return response.data;
  },
};
