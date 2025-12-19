import React, { useState } from "react";
import styles from "./SignatureDining.module.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const SignatureDining = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Full list of items (Added new ones from your screenshots)
  const diningItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
      label: "CELEBRATED CHEFS",
      description:
        "A distinguished roster of world-class talent embodying culinary excellence with expertise, creativity and precision.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      label: "LEGENDARY RESTAURANTS",
      description:
        "A collection of restaurants recognized for unparalleled dining experiences showcasing culinary prowess and attentive service.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
      label: "SIGNATURE RECIPES",
      description:
        "Culinary mastery shines as each dish highlights a medley of flavours and textures for an unforgettable dining experience.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
      label: "PREMIER GLOBAL CUISINES",
      description:
        "Experience the best of local and world flavours where authentic ingredients and techniques blend seamlessly.",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=600&q=80",
      label: "BEYOND THE ORDINARY",
      description:
        "Elegant and intricately crafted experiences unfold into bespoke service and opulent settings.",
    },
  ];

  // Logic to determine visible items (Show 3 at a time)
  // We effectively slide the "window" over the array
  const visibleItems = [];
  for (let i = 0; i < 3; i++) {
    // This modulo logic (%) allows the carousel to loop infinitely
    const itemIndex = (currentIndex + i) % diningItems.length;
    visibleItems.push(diningItems[itemIndex]);
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % diningItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + diningItems.length) % diningItems.length
    );
  };

  return (
    <section className={styles.diningSection}>
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleWrapper}>
            <span className={styles.dashLine}>—</span>
            <h2 className={styles.mainTitle}>
              SIGNATURE <br /> DINING
            </h2>
          </div>
          <div className={styles.headerContent}>
            <p className={styles.headerDesc}>
              Embark on a journey of exquisite experiences, encompassing
              impeccable service, sophisticated ambience and masterful culinary
              artistry.
            </p>
            <a href="/dining" className={styles.exploreLink}>
              EXPLORE <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Carousel Row with Buttons */}
        <div className={styles.carouselWrapper}>
          {/* Left Button */}
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Grid (Visible 3) */}
          <div className={styles.cardsGrid}>
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className={`${styles.card} ${styles.fadeCard}`}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h4 className={styles.cardLabel}>
                    <span className={styles.smallDash}>—</span> {item.label}
                  </h4>
                  <p className={styles.cardText}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignatureDining;
