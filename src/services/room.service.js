import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const roomService = {
  // 1. Search Rooms (dates, guests)
  searchRooms: async (params) => {
    // params = { checkIn, checkOut, adults, children }
    const response = await apiClient.get(API_ROUTES.ROOMS.SEARCH, { params });
    return response.data;
  },

  // 2. Get Single Room Details
  getRoomDetails: async (id) => {
    const response = await apiClient.get(API_ROUTES.ROOMS.GET_BY_ID(id));
    return response.data;
  },
};
