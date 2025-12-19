import navBarSlice from "./slices/navBarSlice";
import modalSlice from "./slices/modalSlice";
import authSlice from "./slices/authSlice"; // Import the new slice

const rootReducer = {
  navBar: navBarSlice,
  modal: modalSlice,
  auth: authSlice, // Add it here
};

export default rootReducer;
