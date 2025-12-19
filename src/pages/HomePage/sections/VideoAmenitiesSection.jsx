import React from "react";
import styles from "../HomePage.module.css";

// Data with your local file paths
const videoItems = [
  {
    id: 1,
    title: "Lean Luxe",
    desc: "Experience minimalist luxury designed for the modern traveler.",
    videoSrc: "/videos/dining.mp4",
  },
  {
    id: 2,
    title: "Vibrant Spaces",
    desc: "Socialize and relax in our artistically designed common areas.",
    videoSrc: "/videos/wellness.mp4",
  },
  {
    id: 3,
    title: "All Day Dining",
    desc: "Savor a variety of delicious cuisines served fresh any time.",
    videoSrc: "/videos/rooms.mp4",
  },
  {
    id: 4,
    title: "High Energy",
    desc: "Intuitive service meets a high-energy atmosphere.",
    videoSrc: "/videos/events.mp4",
  },
  {
    id: 5,
    title: "Wellness",
    desc: "Rejuvenate your senses at our world-class spa facility.",
    videoSrc: "/videos/pool.mp4",
  },
];

// Single Item Component (Auto-playing vertical pill)
const AmenityPill = ({ item }) => {
  return (
    <div className={styles.amenityWrapper}>
      {/* The Vertical Pill Shape */}
      <div className={styles.mediaShape}>
        <video
          className={styles.amenityVideo}
          src={item.videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Text Content Below */}
      <div className={styles.textContent}>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <p className={styles.itemDesc}>{item.desc}</p>
      </div>
    </div>
  );
};

// Main Section Component
const VideoAmenitiesSection = () => {
  return (
    <section className={styles.videoAmenitiesSection}>
      {/* Header Section */}
      <div className={styles.amenitiesHeader}>
        <h2 className={styles.amenitiesTitle}>
          Make room <span className={styles.playText}>for play</span>
        </h2>
        <p className={styles.amenitiesSub}>
          Getting the best of both worlds is simply better, isn't it?
        </p>
        <button className={styles.exploreBtn}>Explore More</button>
      </div>

      {/* The Row of Pills */}
      <div className={styles.amenitiesRow}>
        {videoItems.map((item) => (
          <AmenityPill key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default VideoAmenitiesSection;
