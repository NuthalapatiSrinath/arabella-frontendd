import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import HomePage from "../pages/HomePage/HomePage";
import AboutUs from "../pages/AboutUs/AboutUs";
import RoomsPage from "../pages/Rooms/RoomsPage";
import Gallery from "../pages/Gallery/Gallery";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import ProtectedRoute from "./ProtectedRoute";
import RoomDetailsPage from "../pages/Rooms/RoomDetailsPage/RoomDetailsPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import ConfirmationPage from "../pages/Checkout/ConfirmationPage";
import InvoicePage from "../pages/Checkout/InvoicePage";
import ContactUs from "../pages/ContactUs/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions/TermsConditions";
import GuestFAQ from "../pages/GuestFAQ/GuestFAQ";

// ✅ Import New Auth Pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* DashboardLayout contains Navbar & Footer */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />

            <Route path="about" element={<AboutUs />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="rooms/:id" element={<RoomDetailsPage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<ContactUs />} />

            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="invoice/:id" element={<InvoicePage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
            <Route path="payment-success" element={<PaymentSuccess />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/faq" element={<GuestFAQ />} />

            <Route element={<ProtectedRoute />}>{/* Protected routes */}</Route>
          </Route>

          {/* ✅ Auth Pages (Outside DashboardLayout to hide Navbar/Footer if desired, 
              OR move them inside if you want Navbar on login page) 
              Currently placing them OUTSIDE so they take full screen as per design.
          */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
