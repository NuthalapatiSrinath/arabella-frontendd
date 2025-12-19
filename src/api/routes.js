export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  ROOMS: {
    GET_ALL: "/rooms",
    SEARCH: "/rooms/search", // ?checkIn=...&checkOut=...&guests=...
    GET_ONE: (id) => `/rooms/${id}`,
  },
  BOOKINGS: {
    CREATE: "/bookings",
    MY_BOOKINGS: "/bookings/my-bookings",
  },
};
