import React from "react";
import styles from "../HomePage.module.css";

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline className={styles.heroVideo}>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Optional: Lighter overlay just to dim video slightly */}
      <div
        className={styles.heroOverlay}
        style={{ background: "rgba(0,0,0,0.2)" }}
      ></div>
    </div>
  );
};

export default HeroSection;
