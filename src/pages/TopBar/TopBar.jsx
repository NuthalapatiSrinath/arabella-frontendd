import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { useDispatch, useSelector } from "react-redux";
// import { openModal } from "../../redux/slices/modalSlice"; // ❌ No longer needed for auth
import { logout } from "../../redux/slices/authSlice";
import { Menu, X, User, LogOut } from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialize hook
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  // --- NEW HANDLERS ---

  const handleLoginClick = () => {
    navigate("/login"); // ✅ Go to Login Page
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate("/signup"); // ✅ Go to Signup Page
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/");
  };

  // ✅ UPDATED BOOK NOW LOGIC
  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate("/rooms"); // If logged in -> Go to Rooms
    } else {
      navigate("/login"); // If not logged in -> Go to Login
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logoGroup}>
            <span className={styles.logoText}>ARABELLA</span>
            <span className={styles.logoSub}>MOTOR INN</span>
          </Link>

          {/* Nav Links */}
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

          {/* Actions */}
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
                {/* Changed to use handleLoginClick/handleSignupClick */}
                <button className={styles.loginBtn} onClick={handleLoginClick}>
                  LOGIN
                </button>
                <button
                  className={styles.signupBtn}
                  onClick={handleSignupClick}
                >
                  SIGN UP
                </button>
              </div>
            )}

            {/* Book Now Button */}
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
                onClick={handleLoginClick}
              >
                LOGIN
              </button>
              <button
                className={styles.mobileAuthBtn}
                onClick={handleSignupClick}
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
            <button className={styles.contactBtnMobile} onClick={handleBookNow}>
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
