import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import hooks
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wifi,
  Car,
  Briefcase,
  Stethoscope,
} from "lucide-react";
import styles from "../HomePage.module.css";

const newArrivals = [
  {
    id: 1,
    location: "Thane, India",
    title: "Vivanta Thane, LBS Road",
    desc: "Experience the vibrant energy of Thane at Vivanta, where modern hospitality meets city buzz...",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: [
      { icon: <Wifi size={16} />, text: "Wi-Fi" },
      { icon: <Car size={16} />, text: "Valet parking" },
      { icon: <Briefcase size={16} />, text: "Multilingual staff" },
      { icon: <Stethoscope size={16} />, text: "Currency exchange" },
    ],
  },
  {
    id: 2,
    location: "Jamshedpur, India",
    title: "Vivanta Jamshedpur, Golmuri",
    desc: "Experience Jamshedpur's vibrant energy at Vivanta Jamshedpur, Golmuri. Immerse in local culture...",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    amenities: [
      { icon: <Wifi size={16} />, text: "Fast Wi-Fi" },
      { icon: <Car size={16} />, text: "Parking" },
      { icon: <Stethoscope size={16} />, text: "On-call Doctor" },
      { icon: <Briefcase size={16} />, text: "Business Center" },
    ],
  },
  {
    id: 3,
    location: "Katrop, India",
    title: "Vivanta Katrop, Main Ave",
    desc: "Discover luxury in the heart of Katrop. A perfect blend of business and leisure awaits you...",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    amenities: [
      { icon: <Wifi size={16} />, text: "Free Wi-Fi" },
      { icon: <Car size={16} />, text: "Airport Shuttle" },
      { icon: <Stethoscope size={16} />, text: "Spa & Wellness" },
      { icon: <Briefcase size={16} />, text: "Meeting Rooms" },
    ],
  },
];

const RoomShowcase = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // ✅ Hook for navigation

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = 400;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  // ✅ Handler for navigation
  const handleNavigate = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className={styles.roomShowcase}>
      {/* LEFT TEXT COLUMN */}
      <div className={styles.leftTextCol}>
        <h2 className={styles.bigHeadline}>
          ALL THAT'S <span>NEW!</span>
        </h2>
        <p className={styles.leftDesc}>
          These newly-opened hotels bring in a fresh burst of energy and luxury
          to your favorite destinations.
        </p>
        <Link to="/rooms" className={styles.readMoreLink}>
          READ MORE <ChevronDown size={16} />
        </Link>
      </div>

      {/* RIGHT SLIDER SECTION */}
      <div className={styles.sliderContainer}>
        {/* Nav Buttons */}
        <button
          className={`${styles.navBtn} ${styles.prevBtn}`}
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </button>

        {/* Scrollable Strip */}
        <div className={styles.cardStrip} ref={sliderRef}>
          {newArrivals.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <img
                src={hotel.image}
                alt={hotel.title}
                className={styles.cardImage}
              />

              <div className={styles.cardContent}>
                <span className={styles.cardLocation}>{hotel.location}</span>
                <h3 className={styles.cardTitle}>{hotel.title}</h3>

                <p className={styles.cardDesc}>
                  {hotel.desc}
                  {/* ✅ Read More Link */}
                  <span
                    onClick={() => handleNavigate(hotel.id)}
                    style={{
                      color: "#4a148c",
                      textDecoration: "none",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    Read More
                  </span>
                </p>

                <div className={styles.amenitiesGrid}>
                  {hotel.amenities.map((am, idx) => (
                    <div key={idx} className={styles.amenityItem}>
                      {am.icon} <span>{am.text}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  {/* ✅ Know More Button */}
                  <span
                    className={styles.knowMore}
                    onClick={() => handleNavigate(hotel.id)}
                  >
                    KNOW MORE
                  </span>

                  {/* ✅ Book Now Button */}
                  <button
                    className={styles.bookBtn}
                    onClick={() => handleNavigate(hotel.id)}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomShowcase;
