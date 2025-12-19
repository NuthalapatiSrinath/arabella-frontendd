import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CareFeedback.module.css";
import { MessageSquare } from "lucide-react";

const CareFeedback = () => {
  const [activeType, setActiveType] = useState("feedback");

  return (
    <section className={styles.careSection}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.careTitle}>CARE@ARABELLA</h2>
          <p className={styles.careDesc}>
            Share your thoughts, feedback and suggestions through our
            easy-to-use online form designed to capture your Arabella
            experience.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tabs */}
          <div className={styles.tabsRow}>
            <button
              className={`${styles.tabBtn} ${
                activeType === "feedback" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveType("feedback")}
            >
              FEEDBACK
            </button>
            <button
              className={`${styles.tabBtn} ${
                activeType === "suggestion" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveType("suggestion")}
            >
              SUGGESTIONS
            </button>
          </div>

          <form className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>NAME*</label>
              <input
                type="text"
                placeholder="Enter name"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>EMAIL*</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>MOBILE NUMBER*</label>
              <div className={styles.phoneInputWrapper}>
                <select className={styles.countrySelect}>
                  <option>+61 (AU)</option>
                  <option>+91 (IN)</option>
                  <option>+1 (US)</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className={styles.phoneInput}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>HOTEL*</label>
              <input
                type="text"
                value="Arabella Motor Inn"
                readOnly
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>DATE OF STAY</label>
              <input type="date" className={styles.input} />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>COMMENTS</label>
              <textarea
                placeholder="Tell us about your stay..."
                className={styles.textarea}
              ></textarea>
            </div>

            <div className={`${styles.checkboxRow} ${styles.fullWidth}`}>
              <input type="checkbox" id="privacy" className={styles.checkbox} />
              <label htmlFor="privacy">
                I have read and agree to the{" "}
                <a href="/privacy">Privacy Policy</a> and{" "}
                <a href="/terms">Terms & Conditions</a>
              </label>
            </div>

            <div className={`${styles.submitRow} ${styles.fullWidth}`}>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT
              </button>
            </div>
          </form>
        </motion.div>

        <div className={styles.chatIcon}>
          <MessageSquare size={24} color="white" />
        </div>
      </div>
    </section>
  );
};

export default CareFeedback;
