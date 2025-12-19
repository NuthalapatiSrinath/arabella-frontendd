import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const createBooking = async (bookingData) => {
  const response = await apiClient.post(
    API_ROUTES.BOOKINGS.CREATE,
    bookingData
  );
  return response.data.data;
};
