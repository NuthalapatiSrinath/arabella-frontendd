import React from "react";
import styles from "./SearchSummary.module.css";

const SearchSummary = ({ searchData, onEdit }) => {
  const { checkIn, checkOut, guests, rooms } = searchData;

  // Helpers to format dates like "19 Dec"
  const formatDate = (date) => date.getDate();
  const formatMonth = (date) =>
    date.toLocaleString("default", { month: "short" });
  const formatDay = (date) =>
    date.toLocaleString("default", { weekday: "long" });

  const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.summaryCard}>
      <div className={styles.header}>You have searched for</div>

      <div className={styles.body}>
        <div className={styles.datesRow}>
          {/* Check In Box */}
          <div className={styles.dateBox}>
            <div className={styles.boxLabel}>Check-in</div>
            <div className={styles.boxContent}>
              <span className={styles.dayNum}>{formatDate(checkIn)}</span>
              <span className={styles.monthName}>{formatMonth(checkIn)}</span>
              <span className={styles.dayName}>{formatDay(checkIn)}</span>
            </div>
          </div>

          {/* Check Out Box */}
          <div className={styles.dateBox}>
            <div className={styles.boxLabel}>Check-out</div>
            <div className={styles.boxContent}>
              <span className={styles.dayNum}>{formatDate(checkOut)}</span>
              <span className={styles.monthName}>{formatMonth(checkOut)}</span>
              <span className={styles.dayName}>{formatDay(checkOut)}</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsList}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Number of nights:</span>
            <span className={styles.value}>{nights} nights</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Number of rooms:</span>
            <span className={styles.value}>
              {rooms} rooms, {guests} guests
            </span>
          </div>
        </div>

        <button className={styles.changeBtn} onClick={onEdit}>
          CHANGE SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchSummary;
