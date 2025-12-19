import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../redux/slices/modalSlice";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      // If they try to access a protected route, show the login modal
      dispatch(openModal({ type: "authModal", modalData: { mode: "login" } }));
    }
  }, [isAuthenticated, dispatch]);

  // If logged in, show the page. If not, redirect to Home.
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
