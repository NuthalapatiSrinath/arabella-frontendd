import React from "react";
import { Bed, User, Maximize, ChevronDown } from "lucide-react";
import styles from "./RoomCard.module.css";
import { Link } from "react-router-dom";
const RoomCard = ({ room, isSearched, searchData }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img src={room.image} alt={room.name} />
      </div>

      <div className={styles.contentSection}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{room.name}</h2>

          {/* CONDITIONAL: Show Price info if searched */}
          {isSearched ? (
            <div className={styles.priceInfo}>
              <strong>From {room.price} EUR</strong> for {searchData.nights}{" "}
              nights, {room.guests} guest
              <br /> and you save 10%
            </div>
          ) : null}

          <p className={styles.desc}>{room.description}</p>

          <div className={styles.iconsRow}>
            <span title="Bed Type">
              <Bed size={16} /> {room.bedType}
            </span>
            <span title="Room Size">
              <Maximize size={16} /> {room.size}
            </span>
            <span title="Max Guests">
              <User size={16} /> Max {room.guests} pers.
            </span>
          </div>

          <div className={styles.btnRow}>
            {/* MORE INFO Link */}
            <Link to={`/rooms/${room.id}`} className={styles.outlineBtn}>
              MORE INFO
            </Link>

            {/* CONDITIONAL: Show CHOOSE button if searched */}
            {isSearched && (
              /* Changed <button> to <Link> and added the 'to' prop */
              <Link to={`/rooms/${room.id}`} className={styles.chooseBtn}>
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
