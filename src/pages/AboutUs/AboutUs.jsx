import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import styles from "./AboutUs.module.css";
import SignatureDining from "./SignatureDining";
import ExperienceLeanLuxe from "./ExperienceLeanLuxe";

const AboutUs = () => {
  return (
    <div className={styles.pageContainer}>
      {/* --- NEW HERO SECTION (Matches Gallery/Contact Style) --- */}
      <motion.div
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.heroOverlay}>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ABOUT US
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover the story of elegance, comfort, and hospitality at
            Arabella.
          </motion.p>
        </div>
      </motion.div>

      {/* --- ORIGINAL CONTENT BELOW --- */}

      {/* HEADER SECTION (Our Culture) */}
      <section className={`${styles.section} ${styles.fadeIn}`}>
        <h1 className={styles.mainTitle}>OUR CULTURE</h1>
        <p className={styles.mainDescription}>
          Arabella is where creativity leads, agility drives and every
          experience is charged with effortless charisma. A vibrant blend of
          lifestyle and luxury.
        </p>
        <button className={styles.readMoreBtn}>READ MORE</button>
      </section>

      {/* TOP TEXT COLUMNS */}
      <section className={`${styles.gridThree} ${styles.slideUp}`}>
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>Experience-driven</h3>
          <p className={styles.blockText}>
            From rooftop soirées and live performances to curated local tours,
            each stay is designed to help you come alive.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>Inclusive and Open</h3>
          <p className={styles.blockText}>
            Arabella thrives on diversity and inclusivity, welcoming guests from
            all walks of life. Our culture fosters a sense of belonging, where
            everyone is encouraged to be their authentic selves.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>Cosmopolitan and Contemporary</h3>
          <p className={styles.blockText}>
            Arabella isn't just a place; it's a pulse, a vibrant rhythm that
            resonates with a lifestyle on the go. Here, the ordinary fades away
            and the extraordinary takes centre stage.
          </p>
        </div>
      </section>

      {/* IMAGE COLLAGE */}
      <section className={`${styles.imageGrid} ${styles.delayAnimation}`}>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
            alt="Lounge"
            className={styles.gridImage}
          />
        </div>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
            alt="Spa"
            className={styles.gridImage}
          />
        </div>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80"
            alt="Bar"
            className={styles.gridImage}
          />
        </div>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
            alt="Dining"
            className={styles.gridImage}
          />
        </div>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=600&q=80"
            alt="Yoga"
            className={styles.gridImage}
          />
        </div>
        <div className={styles.imgWrapper}>
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
            alt="Pool"
            className={styles.gridImage}
          />
        </div>
      </section>

      {/* BOTTOM TEXT COLUMNS */}
      <section
        className={`${styles.gridThree} ${styles.slideUp} ${styles.delayMore}`}
      >
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>Vibrance in Motion</h3>
          <p className={styles.blockText}>
            Arabella thrives on energy, movement and a dynamic spirit that keeps
            up with you, always evolving, never static. Here, you'll find
            everything you need to stay connected, inspired and refreshed.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>For every side of you</h3>
          <p className={styles.blockText}>
            Work, play or unwind—it's all within reach at Arabella. We blend
            business with leisure, offering spaces that fuel both creativity and
            relaxation.
          </p>
        </div>
        <div className={styles.textBlock}>
          <h3 className={styles.blockTitle}>Where You're Front and Centre</h3>
          <p className={styles.blockText}>
            At Arabella, everything is designed around you—your pace, your
            preferences, your experience. No distractions, no compromises. Just
            you, at the heart of it all.
          </p>
        </div>
      </section>

      {/* NEW SECTIONS */}
      <SignatureDining />
      <ExperienceLeanLuxe />
    </div>
  );
};

export default AboutUs;
