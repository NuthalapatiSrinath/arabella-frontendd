export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  ROOMS: {
    SEARCH: "/rooms/search", // GET: Search with dates & guests
    GET_BY_ID: (id) => `/rooms/${id}`, // GET: Single Room Details
  },
  BOOKING: {
    INITIATE: "/bookings/initiate", // POST: Calculate Price & Tax
    CONFIRM: "/bookings/confirm", // POST: Save Booking after Payment
    GET_INVOICE: (id) => `/bookings/${id}/invoice`, // GET: View Invoice
  },
  ADMIN: {
    ROOMS: "/admin/rooms", // POST: Create Room
    ROOM_BY_ID: (id) => `/admin/rooms/${id}`, // PUT/DELETE
    BOOKINGS: "/admin/bookings", // GET: All Bookings
    BOOKING_BY_ID: (id) => `/admin/bookings/${id}`, // PUT (Update Status)
    NOTIFY: (id) => `/admin/bookings/${id}/notify`, // POST: Send Custom SMS
    STATS: "/admin/dashboard/stats", // GET: Dashboard Data
    BACKUP: "/admin/dashboard/backup", // GET: Download JSON
  },
};
