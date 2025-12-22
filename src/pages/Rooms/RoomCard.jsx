import React, { useState } from "react";
import {
  Bed,
  User,
  Maximize,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./RoomCard.module.css";
import { Link } from "react-router-dom";

const RoomCard = ({ room, isSearched, searchData }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Handle Images
  const images =
    room.images && room.images.length > 0
      ? room.images
      : ["https://via.placeholder.com/800x500?text=No+Image"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // --- PRICING DISPLAY LOGIC ---

  // 1. Default (Before Search): Show Discounted Base Price
  // This matches the "1 Person" price from our new backend logic.
  let startPrice = room.basePrice;
  if (room.discountPercentage > 0) {
    startPrice = Math.round(
      room.basePrice * (1 - room.discountPercentage / 100)
    );
  }

  let displayPrice = startPrice;
  let label = "/ night";
  let discountText = "";
  let showStrikeThrough = false;

  // 2. Search Result (After Search): Use backend calculated total
  if (isSearched && room.rateOptions && room.rateOptions.length > 0) {
    const bestRate = room.rateOptions[0]; // Backend sorted/calculated rate
    displayPrice = bestRate.totalPrice; // Total for N nights & People
    label = `for ${searchData.nights} nights`;

    if (bestRate.discountText) discountText = bestRate.discountText;
  } else {
    // Not searched yet: Show "Save X%" tag and Original Price strike-through
    if (room.discountPercentage > 0) {
      discountText = `Save ${room.discountPercentage}%`;
      showStrikeThrough = true;
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img
          src={images[currentImgIndex]}
          alt={room.name}
          className={styles.roomImage}
        />
        {images.length > 1 && (
          <>
            <button className={styles.navBtnLeft} onClick={prevImage}>
              <ChevronLeft size={20} />
            </button>
            <button className={styles.navBtnRight} onClick={nextImage}>
              <ChevronRight size={20} />
            </button>
            <div className={styles.dotsContainer}>
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`${styles.dot} ${
                    idx === currentImgIndex ? styles.activeDot : ""
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.contentSection}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{room.name}</h2>

          <div className={styles.priceInfo}>
            <strong>From ₹{displayPrice}</strong> {label}
            {/* Show Original Price crossed out if discounted & not searched */}
            {showStrikeThrough && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  fontSize: "0.85rem",
                  marginLeft: "8px",
                }}
              >
                ₹{room.basePrice}
              </span>
            )}
            {discountText && (
              <div
                style={{
                  color: "green",
                  fontSize: "0.9rem",
                  marginTop: "4px",
                  fontWeight: "600",
                }}
              >
                {discountText}
              </div>
            )}
          </div>

          <p className={styles.desc}>
            {room.description?.substring(0, 100)}...
          </p>

          <div className={styles.iconsRow}>
            <span title="Bed Type">
              <Bed size={16} /> {room.bedType}
            </span>
            <span title="Room Size">
              <Maximize size={16} /> {room.size} m²
            </span>
            <span title="Max Guests">
              <User size={16} /> Max {room.maxOccupancy}
            </span>
          </div>

          <div className={styles.btnRow}>
            {/* Pass search data to next page */}
            <Link
              to={`/rooms/${room._id}`}
              state={{ searchParams: searchData, isSearched: isSearched }}
              className={styles.outlineBtn}
            >
              MORE INFO
            </Link>

            {isSearched && (
              <Link
                to={`/rooms/${room._id}`}
                state={{ searchParams: searchData, isSearched: isSearched }}
                className={styles.chooseBtn}
              >
                CHOOSE <ChevronDown size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
