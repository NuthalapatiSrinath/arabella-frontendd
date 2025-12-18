import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { MapPin, Mail, CalendarDays, Menu, X } from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Helper to check active state
  const isActive = (path) => location.pathname === path;

  // Handler for booking modal
  const handleQuickBooking = () => {
    dispatch(openModal({ type: "bookingModal" }));
  };

  return (
    <>
      {/* --- Top Strip --- */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <div className={styles.stripContent}>
            <div className={styles.locationPill}>
              <MapPin size={14} className={styles.icon} />
              <span>Hyderabad | Bengaluru | Vijayawada</span>
            </div>

            <div className={styles.rightStripGroup}>
              <div className={styles.emailGroup}>
                <a
                  href="mailto:info@arabella.com"
                  className={styles.contactLink}
                >
                  <Mail size={14} />
                  <span>info@arabella.com</span>
                </a>
              </div>

              <button
                className={styles.bookNowBtnSmall}
                onClick={handleQuickBooking}
              >
                <CalendarDays size={14} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Navigation Bar --- */}
      <div
        className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.navContent}>
            {/* Logo Group - Text removed, only image remains */}
            <Link to="/" className={styles.logoGroup}>
              <img
                src="/logo.png"
                alt="Arabella Logo"
                className={styles.logoImage}
              />
            </Link>

            {/* Desktop Links */}
            <nav className={styles.navLinks}>
              <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
                Home
              </Link>
              <Link
                to="/about"
                className={isActive("/about") ? styles.linkActive : ""}
              >
                About
              </Link>
              <Link
                to="/treatments"
                className={isActive("/treatments") ? styles.linkActive : ""}
              >
                Treatments
              </Link>
              <Link
                to="/gallery"
                className={isActive("/gallery") ? styles.linkActive : ""}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className={isActive("/contact") ? styles.linkActive : ""}
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className={styles.actions}>
              {/* Mobile Toggle */}
              <button
                className={styles.mobileMenuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={`${styles.mobileMenuContainer} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
        >
          <div className={styles.mobileLinks}>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={isActive("/") ? styles.linkActive : ""}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className={isActive("/about") ? styles.linkActive : ""}
            >
              About
            </Link>
            <Link
              to="/treatments"
              onClick={handleLinkClick}
              className={isActive("/treatments") ? styles.linkActive : ""}
            >
              Treatments
            </Link>
            <Link
              to="/gallery"
              onClick={handleLinkClick}
              className={isActive("/gallery") ? styles.linkActive : ""}
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={isActive("/contact") ? styles.linkActive : ""}
            >
              Contact
            </Link>

            <div className={styles.mobileBtnWrapper}>
              <button
                className={styles.contactBtnMobile}
                onClick={() => {
                  handleLinkClick();
                  handleQuickBooking();
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
