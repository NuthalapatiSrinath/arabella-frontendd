import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Bed, Maximize, User, Loader } from "lucide-react";
import BookingSidebar from "../BookingSidebar";
import RateTable from "./RateTable";
import styles from "./RoomDetailsPage.module.css";
import { roomService } from "../../../services/room.service";

const RoomDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();

  // 1. Retrieve passed search data
  const initialSearchState = location.state?.searchParams || null;

  const [roomData, setRoomData] = useState(null);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Function
  const fetchRoomData = async (searchCriteria) => {
    setLoading(true);
    try {
      let data = null;
      let fetchedRates = [];

      // A. If search criteria exist, use Search API for dynamic pricing
      if (searchCriteria && searchCriteria.checkIn) {
        const query = {
          checkIn: new Date(searchCriteria.checkIn).toISOString(),
          checkOut: new Date(searchCriteria.checkOut).toISOString(),
          adults: searchCriteria.guests,
          children: searchCriteria.children || 0,
        };
        const res = await roomService.searchRooms(query);

        if (res.success) {
          const foundRoom = res.data.find((r) => r._id === id);
          if (foundRoom) {
            data = foundRoom;
            fetchedRates = foundRoom.rateOptions; // Includes calculated totals
          }
        }
      }

      // B. Fallback to static details if not found/searched
      if (!data) {
        const res = await roomService.getRoomDetails(id);
        if (res.success) {
          data = res.data.room;
          fetchedRates = res.data.rates || [];
        }
      }

      if (data) {
        setRoomData({
          ...data,
          image: data.images?.[0] || "https://via.placeholder.com/1200x600",
          specs: [
            { icon: <Bed size={24} />, label: data.bedType },
            { icon: <Maximize size={24} />, label: `${data.size} m²` },
            { icon: <User size={24} />, label: `Max ${data.maxOccupancy}` },
          ],
          capacity: [
            { label: "Size", value: `${data.size} m²` },
            { label: "Max occupancy", value: data.maxOccupancy },
          ],
          amenities: data.amenities || [],
        });
        setRates(fetchedRates);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomData(initialSearchState);
    // eslint-disable-next-line
  }, [id]);

  // Handle Sidebar changes on this page
  const handleSidebarSearch = (criteria) => {
    fetchRoomData(criteria);
  };

  if (loading)
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <Loader className="spin" />
      </div>
    );
  if (!roomData)
    return (
      <div style={{ padding: 50, textAlign: "center" }}>Room not found</div>
    );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebarColumn}>
          {/* ✅ Pass initial data to prevent reset */}
          <BookingSidebar
            onSearch={handleSidebarSearch}
            initialData={initialSearchState}
          />
        </aside>

        <main className={styles.detailsColumn}>
          <img
            src={roomData.image}
            alt={roomData.name}
            className={styles.mainImage}
          />
          <h1 className={styles.title}>{roomData.name}</h1>

          {/* ... Icons, Description ... */}
          <div className={styles.iconsRow}>
            {roomData.specs.map((spec, i) => (
              <div key={i} className={styles.iconItem}>
                {spec.icon}
                <span>{spec.label}</span>
              </div>
            ))}
          </div>

          <p className={styles.description}>{roomData.description}</p>

          {/* ✅ RateTable displays dynamic prices */}
          <RateTable rates={rates} room={roomData} />

          {/* ... Amenities ... */}
          <h2 className={styles.sectionTitle}>Amenities</h2>
          <div className={styles.amenitiesList}>
            {roomData.amenities.map((item, i) => {
              const name = typeof item === "string" ? item : item.name;
              return (
                <div key={i} className={styles.amenityItem}>
                  • {name}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
