import React, { useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, User, Mail, Phone, Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";

import { closeModal } from "../../redux/slices/modalSlice";
import apiClient from "../../api/apiClient";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { createBooking } from "../../services/bookingService";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingModal.module.css";

/* =========================
   Custom Date Input
========================= */
const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className={styles.inputWrapper} onClick={onClick} ref={ref}>
    <CalendarIcon size={16} className={styles.icon} />
    <input
      type="text"
      readOnly
      value={value || ""}
      placeholder={placeholder}
      className={styles.customDateDisplay}
    />
  </div>
));

/* =========================
   Booking Modal
========================= */
const BookingModal = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.modal.modalData);
  const user = useSelector((state) => state.auth.user);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const [dates, setDates] = useState({
    checkIn: null,
    checkOut: null,
  });

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    guests: 1,
  });

  /* =========================
     Helpers
  ========================= */
  const calculateSummary = () => {
    if (!dates.checkIn || !dates.checkOut) {
      return { nights: 0, total: 0 };
    }

    const diff = dates.checkOut.getTime() - dates.checkIn.getTime();

    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const validNights = nights > 0 ? nights : 0;

    const total = (validNights * (room?.pricePerNight || 0)).toFixed(2);

    return { nights: validNights, total };
  };

  const { nights, total } = calculateSummary();

  /* =========================
     Handlers
  ========================= */
  const handleProceed = async (e) => {
    e.preventDefault();
    setError("");

    if (!dates.checkIn || !dates.checkOut || !formData.phone) {
      setError("Please select dates and fill required fields.");
      return;
    }

    if (nights <= 0) {
      setError("Check-out must be after check-in.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post("/payment/create-intent", {
        roomId: room._id,
        nights,
      });

      if (res.data?.success) {
        setClientSecret(res.data.clientSecret);
        setStep(2);
      }
    } catch {
      setError("Failed to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      setLoading(true);

      await createBooking({
        roomId: room._id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests: formData.guests,
        guestDetails: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        paymentId,
        paymentStatus: "paid",
      });

      alert("Booking Confirmed!");
      dispatch(closeModal());
    } catch {
      setError("Booking creation failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!room) return null;

  /* =========================
     JSX
  ========================= */
  return (
    <div className={styles.modalContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h2>{step === 1 ? "Guest Details" : "Payment"}</h2>
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(closeModal())}
        >
          <X size={24} />
        </button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* =========================
         STEP 1 — DETAILS
      ========================= */}
      {step === 1 && (
        <form onSubmit={handleProceed} className={styles.formContent}>
          {/* Dates */}
          <div className={styles.sectionTitle}>Stay Dates</div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Check-in</label>
              <DatePicker
                selected={dates.checkIn}
                onChange={(date) =>
                  setDates((prev) => ({
                    checkIn: date,
                    checkOut:
                      prev.checkOut && date > prev.checkOut
                        ? null
                        : prev.checkOut,
                  }))
                }
                minDate={new Date()}
                selectsStart
                startDate={dates.checkIn}
                endDate={dates.checkOut}
                placeholderText="Select Check-in"
                customInput={<CustomDateInput />}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Check-out</label>
              <DatePicker
                selected={dates.checkOut}
                onChange={(date) => setDates({ ...dates, checkOut: date })}
                minDate={
                  dates.checkIn
                    ? new Date(dates.checkIn.getTime() + 86400000)
                    : new Date()
                }
                selectsEnd
                startDate={dates.checkIn}
                endDate={dates.checkOut}
                placeholderText="Select Check-out"
                customInput={<CustomDateInput />}
                disabled={!dates.checkIn}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className={styles.sectionTitle}>Contact Information</div>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <div className={styles.inputWrapper}>
              <User size={16} className={styles.icon} />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={16} className={styles.icon} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Phone</label>
              <div className={styles.inputWrapper}>
                <Phone size={16} className={styles.icon} />
                <input
                  type="tel"
                  required
                  placeholder="+91 ..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className={styles.priceBreakdown}>
            <div className={styles.lineItem}>
              <span>
                {nights} Nights × {room.name}
              </span>
              <span>AUD {total}</span>
            </div>
            <div className={`${styles.lineItem} ${styles.totalLine}`}>
              <span>Total Due</span>
              <span>AUD {total}</span>
            </div>
          </div>

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      )}

      {/* =========================
         STEP 2 — PAYMENT
      ========================= */}
      {step === 2 && (
        <div className={styles.paymentContainer}>
          <PaymentForm
            clientSecret={clientSecret}
            room={room}
            dates={{
              checkIn: dates.checkIn?.toISOString(),
              checkOut: dates.checkOut?.toISOString(),
            }}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default BookingModal;
