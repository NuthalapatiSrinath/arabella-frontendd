import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Wifi,
  Car,
  Briefcase,
  Stethoscope,
  Coffee,
  Check,
  MapPin,
} from "lucide-react";
import styles from "./RoomShowcase.module.css";
import { roomService } from "../../../services/room.service";

// ---------- Amenity Icon Helper ----------
const getAmenityIcon = (amenity) => {
  const name =
    typeof amenity === "string"
      ? amenity.toLowerCase()
      : amenity?.name?.toLowerCase() || "";

  if (name.includes("wifi") || name.includes("internet"))
    return <Wifi size={16} />;
  if (name.includes("park") || name.includes("valet")) return <Car size={16} />;
  if (name.includes("business") || name.includes("meeting"))
    return <Briefcase size={16} />;
  if (
    name.includes("doctor") ||
    name.includes("medical") ||
    name.includes("spa")
  )
    return <Stethoscope size={16} />;
  if (
    name.includes("breakfast") ||
    name.includes("dining") ||
    name.includes("bar")
  )
    return <Coffee size={16} />;

  return <Check size={16} />;
};

const RoomShowcase = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // ---------- Cache-first load ----------
  const cachedRooms = roomService.getCachedSearch({});

  const [rooms, setRooms] = useState(cachedRooms || []);
  const [loading, setLoading] = useState(!cachedRooms);

  // ---------- Fetch ALL rooms ----------
  useEffect(() => {
    let mounted = true;

    const fetchRooms = async () => {
      if (!rooms.length) setLoading(true);

      try {
        const res = await roomService.searchRooms({});
        if (!mounted || !res.success) return;

        const isDifferent =
          res.data.length !== rooms.length ||
          res.data.some((r, i) => r._id !== rooms[i]?._id);

        if (isDifferent) {
          setRooms(res.data);
        }
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRooms();
    return () => (mounted = false);
    // eslint-disable-next-line
  }, []);

  // ---------- Scroll ----------
  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = 400;
    sliderRef.current.scrollLeft += direction === "left" ? -amount : amount;
  };

  const handleNavigate = (id) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className={styles.roomShowcase}>
      {/* LEFT CONTENT */}
      <div className={styles.leftTextCol}>
        <h2 className={styles.bigHeadline}>
          ALL THAT'S <span>NEW!</span>
        </h2>
        <p className={styles.leftDesc}>
          These newly-opened suites bring in a fresh burst of energy and luxury
          to your favorite destinations.
        </p>
        <Link to="/rooms" className={styles.readMoreLink}>
          VIEW ALL <ChevronDown size={16} />
        </Link>
      </div>

      {/* RIGHT SLIDER */}
      <div className={styles.sliderContainer}>
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

        <div className={styles.cardStrip} ref={sliderRef}>
          {loading
            ? [1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={styles.hotelCard}
                  style={{ opacity: 0.5 }}
                >
                  <div style={{ height: 250, background: "#f3f3f3" }} />
                  <div className={styles.cardContent}>
                    <div style={{ height: 20, background: "#eee" }} />
                  </div>
                </div>
              ))
            : rooms.map((room) => {
                // ❌ NO fallback image used
                const imageUrl =
                  typeof room.images?.[0] === "string"
                    ? room.images[0]
                    : room.images?.[0]?.url;

                if (!imageUrl) return null; // ❗ skip cards without image

                const amenityList =
                  room.amenities
                    ?.map((a) => (typeof a === "string" ? { name: a } : a))
                    .slice(0, 4) || [];

                return (
                  <div key={room._id} className={styles.hotelCard}>
                    <img
                      src={imageUrl}
                      alt={room.name}
                      className={styles.cardImage}
                    />

                    <div className={styles.cardContent}>
                      <span className={styles.cardLocation}>
                        <MapPin size={12} /> Luxury Suite
                      </span>

                      <h3 className={styles.cardTitle}>{room.name}</h3>

                      <p className={styles.cardDesc}>
                        {room.description?.slice(0, 80)}…
                        <span
                          onClick={() => handleNavigate(room._id)}
                          style={{
                            color: "#4a148c",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginLeft: 5,
                          }}
                        >
                          Read More
                        </span>
                      </p>

                      <div className={styles.amenitiesGrid}>
                        {amenityList.map((am, idx) => (
                          <div key={idx} className={styles.amenityItem}>
                            {getAmenityIcon(am)} <span>{am.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.cardFooter}>
                        <span
                          className={styles.knowMore}
                          onClick={() => handleNavigate(room._id)}
                        >
                          KNOW MORE
                        </span>

                        <button
                          className={styles.bookBtn}
                          onClick={() => handleNavigate(room._id)}
                        >
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default RoomShowcase;
