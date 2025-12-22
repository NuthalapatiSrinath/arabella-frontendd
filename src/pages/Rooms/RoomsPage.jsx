import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import BookingSidebar from "./BookingSidebar";
import SearchSummary from "./SearchSummary";
import RoomCard from "./RoomCard";
import styles from "./RoomsPage.module.css";
import { roomService } from "../../services/room.service";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const RoomsPage = () => {
  const location = useLocation();

  const [isSearched, setIsSearched] = useState(
    location.state?.isSearched || false
  );
  const [searchParams, setSearchParams] = useState(() => {
    if (location.state?.searchParams) return location.state.searchParams;

    // Default: Today to Tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      checkIn: today,
      checkOut: tomorrow,
      guests: 1,
      children: 0,
      rooms: 1,
      nights: 1,
    };
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateNights = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.abs(e - s);
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  // --- FETCH ROOMS (API) ---
  const fetchRooms = async (params) => {
    console.log("🚀 RoomsPage: Calling API with...", params);
    setLoading(true);
    setError("");

    try {
      const query = {
        checkIn: new Date(params.checkIn).toISOString(),
        checkOut: new Date(params.checkOut).toISOString(),
        adults: params.guests,
        children: params.children || 0,
      };

      const res = await roomService.searchRooms(query);
      console.log(
        "✅ RoomsPage: Response received:",
        res.data?.length,
        "rooms"
      );

      if (res.success) {
        setRooms(res.data);
      } else {
        setRooms([]);
      }
    } catch (err) {
      console.error("❌ RoomsPage: Fetch Error", err);
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchRooms(searchParams);
    // eslint-disable-next-line
  }, []);

  // --- HANDLE SEARCH ---
  const handleSearch = (criteria) => {
    console.log("⚡ RoomsPage: Handle Search triggered");

    if (criteria) {
      const nights = calculateNights(criteria.checkIn, criteria.checkOut);
      const updatedParams = { ...criteria, nights };

      setSearchParams(updatedParams);
      setIsSearched(true);

      // 🔥 FORCE RE-FETCH ON SEARCH CLICK
      fetchRooms(updatedParams);
    }

    // Scroll to results
    setTimeout(() => {
      document
        .getElementById("room-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles.pageContainer}>
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
            ACCOMMODATION
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Experience comfort and elegance.
          </motion.p>
        </div>
      </motion.div>

      <div id="room-content" className={styles.contentWrapper}>
        <aside className={styles.sidebarColumn}>
          {!isSearched ? (
            <BookingSidebar
              onSearch={handleSearch}
              initialData={searchParams}
            />
          ) : (
            <SearchSummary
              searchData={searchParams}
              onEdit={() => setIsSearched(false)}
            />
          )}
        </aside>

        <main className={styles.roomsColumn}>
          <div className={styles.roomsHeader}>
            {isSearched ? (
              <>
                <h1>Choose a room type</h1>
                <p>
                  Searching for{" "}
                  <strong>{formatDate(searchParams.checkIn)}</strong> -{" "}
                  <strong>{formatDate(searchParams.checkOut)}</strong>,{" "}
                  {searchParams.nights} night(s), {searchParams.guests}{" "}
                  Adult(s), {searchParams.children} Child(ren)
                </p>
              </>
            ) : (
              <>
                <h1>Our Rooms</h1>
                <p>Choose the perfect space for your stay.</p>
              </>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Loader className="spin" size={30} />
            </div>
          ) : error ? (
            <div className={styles.errorMsg}>{error}</div>
          ) : rooms.length === 0 ? (
            <div className={styles.noResults}>
              No rooms found matching your dates/guests.
            </div>
          ) : (
            <div className={styles.roomsList}>
              {rooms.map((room) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  isSearched={isSearched}
                  searchData={searchParams}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RoomsPage;
