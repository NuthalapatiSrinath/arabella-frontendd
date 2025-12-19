import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import HomePage from "../pages/HomePage/HomePage";
import AboutUs from "../pages/AboutUs/AboutUs";
import RoomsPage from "../pages/Rooms/RoomsPage"; // ✅ Import the new page
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
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="invoice/:id" element={<InvoicePage />} />
            <Route path="confirmation" element={<ConfirmationPage />} />
            {/* ✅ FIX: Point this to RoomsPage, NOT HomePage */}
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="rooms/:id" element={<RoomDetailsPage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="payment-success" element={<PaymentSuccess />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/faq" element={<GuestFAQ />} />

            <Route element={<ProtectedRoute />}>{/* Protected routes */}</Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
