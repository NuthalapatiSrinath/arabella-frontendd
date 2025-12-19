import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Import Animation Library
import BookingSidebar from "./BookingSidebar";
import SearchSummary from "./SearchSummary";
import RoomCard from "./RoomCard";
import styles from "./RoomsPage.module.css";

// Helper to format dates
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const RoomsPage = () => {
  const location = useLocation();

  // --- STATE ---
  const [isSearched, setIsSearched] = useState(() => {
    return location.state?.isSearched || false;
  });

  const [searchParams, setSearchParams] = useState(() => {
    if (location.state?.searchParams) {
      return location.state.searchParams;
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      checkIn: today,
      checkOut: tomorrow,
      guests: 2,
      rooms: 1,
      nights: 1,
    };
  });

  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleSearch = (criteria) => {
    if (criteria) {
      const nights = calculateNights(criteria.checkIn, criteria.checkOut);
      setSearchParams({ ...criteria, nights });
    }
    setIsSearched(true);
    // Scroll to the content part, not top of hero, so they see results
    document
      .getElementById("room-content")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleEditSearch = () => {
    setIsSearched(false);
  };

  // Mock Data
  const rooms = [
    {
      id: 1,
      name: "Single Room",
      description:
        "The room is equipped with 1 single bed. It has an area of 11 square meters, creating a cozy atmosphere.",
      bedType: "Single bed",
      size: "11 mq",
      guests: 1,
      price: 233,
      image: "https://via.placeholder.com/800x500",
    },
    {
      id: 2,
      name: "Double Room",
      description:
        "Perfect for couples, this room offers a king-sized bed and a stunning view of the city.",
      bedType: "Double bed",
      size: "24 mq",
      guests: 2,
      price: 350,
      image: "https://via.placeholder.com/800x500",
    },
    {
      id: 3,
      name: "Deluxe Suite",
      description:
        "Luxury living with a separate lounge area, balcony, and premium amenities.",
      bedType: "King bed",
      size: "45 mq",
      guests: 3,
      price: 550,
      image: "https://via.placeholder.com/800x500",
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* --- HERO SECTION (New) --- */}
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
            Experience comfort and elegance in every detail.
          </motion.p>
        </div>
      </motion.div>

      {/* --- MAIN CONTENT (Sidebar + List) --- */}
      <div id="room-content" className={styles.contentWrapper}>
        {/* LEFT COLUMN */}
        <aside className={styles.sidebarColumn}>
          {!isSearched ? (
            <BookingSidebar
              onSearch={handleSearch}
              initialData={searchParams}
            />
          ) : (
            <SearchSummary
              searchData={searchParams}
              onEdit={handleEditSearch}
            />
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className={styles.roomsColumn}>
          <div className={styles.roomsHeader}>
            {isSearched ? (
              <>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 400 }}>
                  Choose a room type
                </h1>
                <p style={{ fontSize: "0.9rem", color: "#777" }}>
                  You have searched for{" "}
                  <strong>{formatDate(searchParams.checkIn)}</strong> -{" "}
                  <strong>{formatDate(searchParams.checkOut)}</strong>,{" "}
                  {searchParams.nights} night{searchParams.nights > 1 && "s"},{" "}
                  {searchParams.rooms} room{searchParams.rooms > 1 && "s"},{" "}
                  {searchParams.guests} guest{searchParams.guests > 1 && "s"}
                </p>
              </>
            ) : (
              <>
                <h1>Our Rooms</h1>
                <p>Choose the perfect space for your stay.</p>
              </>
            )}
          </div>

          <div className={styles.roomsList}>
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isSearched={isSearched}
                searchData={searchParams}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomsPage;
