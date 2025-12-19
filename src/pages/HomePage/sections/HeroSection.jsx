import React from "react";
import styles from "../HomePage.module.css";

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      {/* Video Background */}
      <video autoPlay loop muted playsInline className={styles.heroVideo}>
        {/* Using a hosted video link instead of a local file.
           This video is royalty-free (Luxury Hotel Vibe).
           You can replace this string with your own Cloudinary/S3 link later.
        */}
        <source
          src="https://res.cloudinary.com/da7dv6lio/video/upload/v1766135097/taj-homepage-video_1_xbk3r6.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay to dim video */}
      <div
        className={styles.heroOverlay}
        style={{ background: "rgba(0,0,0,0.3)" }} // Slightly darker for text readability
      ></div>

      <div className={styles.heroContent}>
        <span className={styles.subtitle}>Welcome to</span>
        <h1>
          ARABELLA <span className={styles.highlight}>MOTOR INN</span>
        </h1>
        <p>Experience the perfect blend of coastal luxury and comfort.</p>
        <a href="/rooms" className={styles.ctaBtn}>
          Book Your Stay
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
