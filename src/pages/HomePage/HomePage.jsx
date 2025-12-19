import React from "react";
import styles from "./HomePage.module.css";

// Import sections
import HeroSection from "./sections/HeroSection";
import VideoAmenitiesSection from "./sections/VideoAmenitiesSection"; // The video pills
import OwnJourneySection from "./sections/OwnJourneySection"; // ✅ NEW SECTION
import RoomShowcase from "./sections/RoomShowcase";
import StatsParallax from "./sections/StatsParallax";
import Testimonials from "./sections/Testimonials";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <HeroSection />

      {/* Video Pills */}
      <VideoAmenitiesSection />

      {/* ✅ NEW: Own Your Journey (Purple Section) */}
      <OwnJourneySection />

      {/* Room Slider */}
      <RoomShowcase />

      <StatsParallax />
      <Testimonials />
    </div>
  );
};

export default HomePage;
