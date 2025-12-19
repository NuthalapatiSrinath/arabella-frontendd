import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./InvoicePage.module.css";

const InvoicePage = () => {
  const { id } = useParams(); // Get Booking ID

  // Auto-trigger print when opened
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.invoicePaper}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>Arabella</h1>
            <p>MOTOR INN</p>
          </div>
          <div className={styles.hotelInfo}>
            <strong>Arabella Motor Inn</strong>
            <br />
            123 Luxury Avenue
            <br />
            Hyderabad, Telangana 500081
            <br />
            +91 86868 18384 | info@arabella.com
          </div>
        </header>

        {/* Invoice Info */}
        <section className={styles.invoiceInfo}>
          <div className={styles.billTo}>
            <h3>Bill To:</h3>
            <strong>John Doe</strong>
            <br />
            john.doe@example.com
            <br />
            +91 98765 43210
          </div>
          <div className={styles.metaTable}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Invoice #:</span>
              <span>{id || "ARA-88294X"}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Date:</span>
              <span>December 18, 2025</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Status:</span>
              <span style={{ color: "green", fontWeight: "bold" }}>PAID</span>
            </div>
          </div>
        </section>

        {/* Items Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th className={styles.textRight}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Twin Room (2 Adults)</strong>
                <br />
                <small>Night of Dec 27, 2025</small>
              </td>
              <td>1</td>
              <td>113.00 EUR</td>
              <td className={styles.textRight}>113.00 EUR</td>
            </tr>
            <tr>
              <td>
                <strong>Twin Room (2 Adults)</strong>
                <br />
                <small>Night of Dec 28, 2025</small>
              </td>
              <td>1</td>
              <td>113.00 EUR</td>
              <td className={styles.textRight}>113.00 EUR</td>
            </tr>
            <tr>
              <td>City Tax (25 EUR per stay)</td>
              <td>1</td>
              <td>25.00 EUR</td>
              <td className={styles.textRight}>25.00 EUR</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className={styles.totalsSection}>
          <div className={styles.totalsTable}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>226.00 EUR</span>
            </div>
            <div className={styles.totalRow}>
              <span>Taxes & Fees</span>
              <span>25.00 EUR</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total Paid</span>
              <span>251.00 EUR</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            Thank you for choosing Arabella Motor Inn. We look forward to
            welcoming you.
          </p>
          <p>
            For any queries, please contact us quoting the invoice number above.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default InvoicePage;
