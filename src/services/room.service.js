import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const adminService = {
  // --- DASHBOARD ---
  getStats: async () => {
    const response = await apiClient.get(API_ROUTES.ADMIN.STATS);
    return response.data;
  },

  // --- ROOMS ---
  createRoom: async (formData) => {
    // Important: Pass FormData object directly for file uploads
    return await apiClient.post(API_ROUTES.ADMIN.ROOMS, formData);
  },

  updateRoom: async (id, formData) => {
    return await apiClient.put(API_ROUTES.ADMIN.ROOM_BY_ID(id), formData);
  },

  deleteRoom: async (id) => {
    return await apiClient.delete(API_ROUTES.ADMIN.ROOM_BY_ID(id));
  },

  // --- BOOKINGS ---
  getAllBookings: async () => {
    const response = await apiClient.get(API_ROUTES.ADMIN.BOOKINGS);
    return response.data;
  },

  updateBookingStatus: async (id, status) => {
    return await apiClient.put(API_ROUTES.ADMIN.BOOKING_BY_ID(id), { status });
  },

  // --- BACKUP ---
  downloadBackup: async () => {
    const response = await apiClient.get(API_ROUTES.ADMIN.BACKUP, {
      responseType: "blob", // Important for file download
    });
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
  },
};
