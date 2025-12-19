import React, { useState } from "react";
import styles from "./ExperienceLeanLuxe.module.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const ExperienceLeanLuxe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // People working/socializing
      title: "Business meets comfort",
      desc: "Spaces that seamlessly combine productivity and relaxation, perfect for the modern traveler.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80", // Vibrant lounge
      title: "Vibrant Stays",
      desc: "Smart design, modern elegance—everything you need for a stay that feels alive and refreshing.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", // Hotel room/Relax
      title: "Relax & Recharge",
      desc: "Our rooms deliver an elevated stay experience with the perfect mix of aesthetics and functionality.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80", // Bedroom
      title: "Sleep & Shower",
      desc: "Signature sleep-and-shower experiences that ensure you leave feeling completely renewed.",
    },
  ];

  // Logic to show 2 slides at a time (as per screenshot layout)
  const itemsPerPage = 2;
  const maxIndex = slides.length - itemsPerPage;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className={styles.luxeSection}>
      <div className={styles.container}>
        {/* Title Section */}
        <h2 className={styles.scriptTitle}>Experience Lean - Luxe</h2>
        <p className={styles.description}>
          The Reimagined ARABELLA experience brings together attractive public
          areas as well as spots designed for solitude, allowing the smooth
          transition from one to the other. Our spaces come alive with vivacious
          high energy global local music and unique artwork installations. The
          rooms deliver an elevated stay experience with the perfect mix of
          aesthetics and functionality.
        </p>

        {/* Navigation Arrows (Top Right) */}
        <div className={styles.navRow}>
          <button className={styles.navBtn} onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>
          <button className={styles.navBtn} onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slider */}
        <div className={styles.sliderWindow}>
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className={styles.slideCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={styles.slideImage}
                  />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.slideTitle}>{slide.title}</h3>
                  <p className={styles.slideDesc}>{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className={styles.dotsContainer}>
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${
                idx === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(idx)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceLeanLuxe;
