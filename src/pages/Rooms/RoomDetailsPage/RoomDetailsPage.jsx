import React from "react";
import { useParams } from "react-router-dom";
import { Bed, Maximize, User } from "lucide-react";
import BookingSidebar from "../../Rooms/BookingSidebar";
import RateTable from "./RateTable"; // ✅ Import the new RateTable
import styles from "./RoomDetailsPage.module.css";

const RoomDetailsPage = () => {
  const { id } = useParams();

  // Mock Data
  const roomData = {
    name: "Single Room",
    image: "https://via.placeholder.com/1200x600",
    description:
      "The room is equipped with 1 single bed. It has an area of 11 square meters which allows you to comfortably pass your stay.",
    specs: [
      { icon: <Bed size={24} />, label: "Single bed" },
      { icon: <Maximize size={24} />, label: "11 mq" },
      { icon: <User size={24} />, label: "Max 1 pers." },
    ],
    capacity: [
      { label: "Size", value: "11 mq" },
      { label: "No. of persons in regular beds", value: "1" },
      { label: "Max no. of x-beds", value: "0" },
      { label: "Min no. of persons", value: "1" },
      { label: "Max no. of persons", value: "1" },
      { label: "Single bed", value: "" },
    ],
    amenities: [
      "Air conditioning",
      "Heating",
      "Safety deposit box",
      "Desk",
      "Bidet",
      "Bathroom",
      "Free toiletries",
      "Hairdryer",
      "Shower",
      "WC",
      "Flat screen TV",
      "Satellite TV",
      "Phone",
      "TV",
    ],
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* LEFT: Fixed Sidebar */}
        <aside className={styles.sidebarColumn}>
          <BookingSidebar />
        </aside>

        {/* RIGHT: Main Details */}
        <main className={styles.detailsColumn}>
          <img
            src={roomData.image}
            alt={roomData.name}
            className={styles.mainImage}
          />

          <h1 className={styles.title}>{roomData.name}</h1>

          <div className={styles.iconsRow}>
            {roomData.specs.map((spec, idx) => (
              <div key={idx} className={styles.iconItem}>
                {spec.icon}
                <span>{spec.label}</span>
              </div>
            ))}
          </div>

          <p className={styles.description}>{roomData.description}</p>

          {/* ✅ AVAILABLE RATES SECTION INSERTED HERE */}
          <RateTable />

          <h2 className={styles.sectionTitle}>Capacity</h2>
          <div className={styles.gridList}>
            {roomData.capacity.map((item, idx) => (
              <div key={idx} className={styles.gridItem}>
                <span className={styles.label}>{item.label}:</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Amenities</h2>
          <div className={styles.amenitiesList}>
            {roomData.amenities.map((amenity, idx) => (
              <div key={idx} className={styles.amenityItem}>
                <span style={{ color: "#ccc" }}>•</span> {amenity}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
