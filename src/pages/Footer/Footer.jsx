import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* --- Column 1: Brand Info --- */}
          <div className={styles.brandColumn}>
            <div className={styles.logoRow}>
              <img
                src="/logo.png"
                alt="Arabella Logo"
                className={styles.logoImage}
              />
              <h2 className={styles.brandName}>ARABELLA</h2>
            </div>
            <p className={styles.tagline}>
              Redefining beauty with advanced aesthetic treatments and
              personalized care. Experience world-class dermatology and wellness
              services.
            </p>
            <div className={styles.socialRow}>
              <a href="#s" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/treatments">Treatments</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 3: Help & Support --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Support</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Book Appointment</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Treatments (Placeholder) --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Our Treatments</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/treatments/skin">Skin Care</Link>
              </li>
              <li>
                <Link to="/treatments/hair">Hair Treatments</Link>
              </li>
              <li>
                <Link to="/treatments/laser">Laser Therapy</Link>
              </li>
              <li>
                <Link to="/treatments/body">Body Contouring</Link>
              </li>
              <li>
                <Link to="/treatments/anti-aging">Anti-Aging</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 5: Contact Us --- */}
          <div className={styles.contactColumn}>
            <h3 className={styles.heading}>Contact Us</h3>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={20} />
              <span>Hyderabad | Bengaluru | Vijayawada</span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={20} />
              <a href="tel:+918686818384">+91 86868 18384</a>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={20} />
              <a href="mailto:info@arabella.com">info@arabella.com</a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            © 2025 Arabella. All rights reserved. Designed & Developed By
            Panacea IT Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
