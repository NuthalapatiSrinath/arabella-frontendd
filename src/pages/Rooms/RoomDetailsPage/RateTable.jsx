import React from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import styles from "./RateTable.module.css";

const RateTable = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/checkout");
  };

  const rates = [
    {
      id: 1,
      name: "Non Refundable - Pay Now - Room Only",
      includes: "Wi-Fi",
      terms: "Non refundable",
      price: 227,
      oldPrice: 252,
      discount: "Direct Booking Discount - You save 10%",
    },
    {
      id: 2,
      name: "Non Refundable - Pay Now - Breakfast Included",
      includes: "Wi-Fi, Breakfast",
      terms: "Non refundable",
      price: 259,
      oldPrice: 288,
      discount: "Direct Booking Discount - You save 10%",
    },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Available rates</h3>
      <p className={styles.dateSub}>
        Sat Dec 27 - Mon Dec 29, 2 nights, 2 guests
      </p>

      {/* Table Header */}
      <div className={styles.tableHeader}>
        <div className={styles.colName}>Rate</div>
        <div className={styles.colTerms}>Terms</div>
        <div className={styles.colPrice}>Today's price</div>
      </div>

      {/* Rates Rows */}
      {rates.map((rate) => (
        <div key={rate.id} className={styles.rateRow}>
          {/* Rate Info */}
          <div className={styles.colName}>
            <div className={styles.rateName}>{rate.name}</div>
            <div className={styles.includes}>Includes: {rate.includes}</div>
            <div className={styles.discount}>
              <ThumbsUp size={14} /> {rate.discount}
            </div>
          </div>

          {/* Terms */}
          <div className={styles.colTerms}>
            <span className={styles.termsText}>{rate.terms}</span>
            <span className={styles.conditionsLink}>See conditions</span>
          </div>

          {/* Price & Book */}
          <div className={styles.colPrice}>
            <div className={styles.priceGroup}>
              <span className={styles.oldPrice}>{rate.oldPrice} EUR</span>
              <span className={styles.currPrice}>{rate.price} EUR</span>
              <span className={styles.priceNote}>for 2 adults</span>
            </div>
            <button className={styles.bookBtn} onClick={handleBook}>
              BOOK
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RateTable;
