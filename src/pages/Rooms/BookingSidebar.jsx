import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Plus,
  Minus,
  X,
} from "lucide-react";
import styles from "./BookingSidebar.module.css";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BookingSidebar = ({ onSearch }) => {
  // --- STATE ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  // Active dropdown state
  const [activeDatePopup, setActiveDatePopup] = useState(null);
  const [expandedStay, setExpandedStay] = useState(false);

  // Guest State
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [rooms, setRooms] = useState([{ id: 1, adults: 2, children: 0 }]);

  // --- LOGIC ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBeforeToday = (date) => date < today;

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => {
    let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (isBeforeToday(clickedDate)) return;

    setSelectedDate(clickedDate);
    setCheckoutDate(null);
    setExpandedStay(false);

    if (activeDatePopup === clickedDate.getTime()) {
      setActiveDatePopup(null);
    } else {
      setActiveDatePopup(clickedDate.getTime());
    }
  };

  const handleStaySelect = (nights) => {
    if (!selectedDate) return;
    const end = new Date(selectedDate);
    end.setDate(selectedDate.getDate() + nights);
    setCheckoutDate(end);
    setActiveDatePopup(null);
  };

  // --- GUEST LOGIC ---
  const updateRoom = (index, field, value) => {
    const newRooms = [...rooms];
    newRooms[index][field] = Math.max(0, value);
    setRooms(newRooms);
  };
  const addRoom = () =>
    setRooms([...rooms, { id: rooms.length + 1, adults: 1, children: 0 }]);
  const removeRoom = (index) => setRooms(rooms.filter((_, i) => i !== index));
  const totalGuests = rooms.reduce((acc, r) => acc + r.adults + r.children, 0);

  // --- HELPER: Booking Summary Text ---
  const getSummaryText = () => {
    if (!selectedDate || !checkoutDate) return "No date selected";

    const startStr = selectedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endStr = checkoutDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const nights = Math.round(
      (checkoutDate - selectedDate) / (1000 * 60 * 60 * 24)
    );

    return `${startStr} - ${endStr}, ${nights} nights`;
  };

  // --- INTEGRATION HELPER (NEW) ---
  const handleSearchClick = () => {
    // 1. Determine Start Date (Default to today if null)
    const start = selectedDate || new Date();

    // 2. Determine End Date (Default to tomorrow if null)
    let end = checkoutDate;
    if (!end) {
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    }

    // 3. Calculate Totals
    const totalAdults = rooms.reduce((acc, r) => acc + r.adults, 0);
    const totalChildren = rooms.reduce((acc, r) => acc + r.children, 0);
    const totalPeople = totalAdults + totalChildren;

    // 4. Pass Data to Parent (RoomsPage)
    onSearch({
      checkIn: start,
      checkOut: end,
      guests: totalPeople > 0 ? totalPeople : 1, // Ensure at least 1 guest
      rooms: rooms.length,
    });
  };

  // --- RENDER HELPERS ---
  const renderStayPopup = (baseDate) => {
    const options = [];
    for (let i = 1; i <= 30; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      const dateStr = tempDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      options.push({
        nights: i,
        label: `${i} night${i > 1 ? "s" : ""} (${dateStr})`,
      });
    }
    const initialOptions = options.slice(0, 5);
    const moreOptions = options.slice(5);

    return (
      <div className={styles.stayPopup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.stayHeader}>Available length of stay</div>
        <div className={styles.stayList}>
          {initialOptions.map((opt) => (
            <button
              key={opt.nights}
              className={styles.stayOption}
              onClick={() => handleStaySelect(opt.nights)}
            >
              {opt.label}
            </button>
          ))}
          {!expandedStay && (
            <button
              className={styles.moreOptionsBtn}
              onClick={() => setExpandedStay(true)}
            >
              More options <ChevronDown size={14} />
            </button>
          )}
          {expandedStay &&
            moreOptions.map((opt) => (
              <button
                key={opt.nights}
                className={styles.stayOption}
                onClick={() => handleStaySelect(opt.nights)}
              >
                {opt.label}
              </button>
            ))}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentDate);
    const startDay = getFirstDayOfMonth(currentDate);

    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className={`${styles.dayCell} ${styles.empty}`}
        ></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const thisDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isPast = isBeforeToday(thisDate);
      const isSelected =
        selectedDate && thisDate.getTime() === selectedDate.getTime();
      const isActivePopup = activeDatePopup === thisDate.getTime();

      let className = styles.dayCell;
      if (isPast) className += ` ${styles.disabled}`;
      else if (isSelected) className += ` ${styles.selected}`;
      else if (checkoutDate && thisDate.getTime() === checkoutDate.getTime())
        className += ` ${styles.selected}`;
      else if (
        selectedDate &&
        checkoutDate &&
        thisDate > selectedDate &&
        thisDate < checkoutDate
      )
        className += ` ${styles.inRange}`;

      days.push(
        <div
          key={day}
          className={className}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {isActivePopup && renderStayPopup(thisDate)}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.header}>Search & book</div>

      <div className={styles.calendarWrapper}>
        <div className={styles.monthNav}>
          <button className={styles.navBtn} onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </button>
          <span>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button className={styles.navBtn} onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.daysGrid}>
          {daysOfWeek.map((d) => (
            <div key={d} className={styles.dayName}>
              {d}
            </div>
          ))}
          {renderDays()}
        </div>

        {/* Summary Row inside Calendar Wrapper */}
        <div className={styles.summaryRow}>
          <span>{getSummaryText()}</span>
          <span>Prices in EUR</span>
        </div>
        <div className={styles.checkInInfo}>
          <span className={styles.stripedIcon}></span>
          <span>No check-in</span>
        </div>
      </div>

      <div className={styles.infoSection}>
        <button
          className={styles.guestInput}
          onClick={() => setShowGuestPopup(true)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <User size={18} />
            {rooms.length} room{rooms.length > 1 ? "s" : ""}, {totalGuests}{" "}
            guest{totalGuests > 1 ? "s" : ""}
          </div>
          <ChevronDown size={16} />
        </button>

        {/* --- RIGHT SIDE GUEST POPUP --- */}
        {showGuestPopup && (
          <div className={styles.guestPopup}>
            <div className={styles.popupHeaderRow}>
              <span className={styles.popupTitle}>
                Choose no. of rooms and guests
              </span>
              <button
                className={styles.closePopupBtn}
                onClick={() => setShowGuestPopup(false)}
              >
                <X size={14} />
              </button>
            </div>

            {rooms.map((room, index) => (
              <div key={index} className={styles.roomBlock}>
                <div className={styles.roomHeader}>
                  <span>Room {index + 1}:</span>
                  {index > 0 && (
                    <X
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeRoom(index)}
                    />
                  )}
                </div>
                <div className={styles.counterRow}>
                  <span>Adults</span>
                  <div className={styles.counterControls}>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "adults", room.adults - 1)
                      }
                    >
                      <Minus size={12} />
                    </button>
                    <span>{room.adults}</span>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "adults", room.adults + 1)
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className={styles.counterRow}>
                  <span>Children</span>
                  <div className={styles.counterControls}>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "children", room.children - 1)
                      }
                    >
                      <Minus size={12} />
                    </button>
                    <span>{room.children}</span>
                    <button
                      className={styles.roundBtn}
                      onClick={() =>
                        updateRoom(index, "children", room.children + 1)
                      }
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className={styles.addRoomBtn} onClick={addRoom}>
              <Plus size={16} /> Add an additional room?
            </button>

            <button
              className={styles.saveBtn}
              onClick={() => setShowGuestPopup(false)}
            >
              SAVE
            </button>
          </div>
        )}
        {/* UPDATED: onClick now calls handleSearchClick */}
        <button className={styles.searchBtn} onClick={handleSearchClick}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default BookingSidebar;
