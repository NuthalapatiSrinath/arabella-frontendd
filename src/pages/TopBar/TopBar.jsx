import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import { Menu, X, User, LogOut } from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Check if we are on the Home Page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // --- HANDLERS ---
  const handleLoginClick = () =>
    dispatch(openModal({ type: "authModal", modalData: { mode: "login" } }));

  const handleSignupClick = () =>
    dispatch(openModal({ type: "authModal", modalData: { mode: "signup" } }));

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      dispatch(openModal({ type: "bookingModal" }));
    } else {
      dispatch(openModal({ type: "authModal", modalData: { mode: "login" } }));
    }
  };

  // 2. Logic: IF (Home Page AND Not Scrolled) -> Transparent; ELSE -> Solid Black
  const navBackgroundClass =
    isHomePage && !isScrolled ? styles.transparent : styles.solid;

  return (
    // 3. Apply both Layout class and Dynamic Background class
    <div className={`${styles.mainNav} ${navBackgroundClass}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* 1. TEXT LOGO */}
          <Link to="/" className={styles.logoGroup}>
            <span className={styles.logoText}>ARABELLA</span>
            <span className={styles.logoSub}>MOTOR INN</span>
          </Link>

          {/* 2. NAVIGATION LINKS */}
          <nav className={styles.navLinks}>
            <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
              Home
            </Link>
            <Link
              to="/about"
              className={isActive("/about") ? styles.linkActive : ""}
            >
              About Us
            </Link>
            <Link
              to="/rooms"
              className={isActive("/rooms") ? styles.linkActive : ""}
            >
              Rooms
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

          {/* 3. ACTIONS */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <div className={styles.userProfile}>
                <div className={styles.userName}>
                  <User size={16} />
                  <span>{user?.name?.split(" ")[0]}</span>
                </div>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <button className={styles.loginBtn} onClick={handleLoginClick}>
                  LOGIN
                </button>
                <button className={styles.loginBtn} onClick={handleSignupClick}>
                  SIGN UP
                </button>
              </div>
            )}

            {/* Book Now Button (Desktop) */}
            <button className={styles.bookBtn} onClick={handleBookNow}>
              BOOK NOW
            </button>

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

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenuContainer} ${
          isMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={styles.mobileLinks}>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/about" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link to="/rooms" onClick={handleLinkClick}>
            Rooms
          </Link>
          <Link to="/gallery" onClick={handleLinkClick}>
            Gallery
          </Link>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>

          {!isAuthenticated ? (
            <div className={styles.mobileAuthRow}>
              <button
                className={styles.mobileAuthBtn}
                onClick={() => {
                  handleLinkClick();
                  handleLoginClick();
                }}
              >
                LOGIN
              </button>
              <button
                className={styles.mobileAuthBtn}
                onClick={() => {
                  handleLinkClick();
                  handleSignupClick();
                }}
              >
                SIGN UP
              </button>
            </div>
          ) : (
            <button className={styles.mobileAuthBtn} onClick={handleLogout}>
              LOGOUT
            </button>
          )}

          <div className={styles.mobileBtnWrapper}>
            <button
              className={styles.contactBtnMobile}
              onClick={() => {
                handleLinkClick();
                handleBookNow();
              }}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
