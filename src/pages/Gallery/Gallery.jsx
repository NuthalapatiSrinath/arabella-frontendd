import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import styles from "./Gallery.module.css";

// --- Expanded Mock Data (26 Images) ---
const galleryImages = [
  // --- ROOMS ---
  {
    id: 1,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    title: "Luxury King Suite",
  },
  {
    id: 2,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    title: "Deluxe Ocean View",
  },
  {
    id: 3,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    title: "Family Interconnecting Room",
  },
  {
    id: 4,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    title: "Executive Suite Living Area",
  },
  {
    id: 5,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    title: "Modern Twin Room",
  },
  {
    id: 6,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    title: "Suite Balcony View",
  },
  {
    id: 7,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    title: "Premium Queen Room",
  },
  {
    id: 8,
    category: "Rooms",
    src: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
    title: "Spa Bathroom Detail",
  },

  // --- DINING ---
  //   {
  //     id: 9,
  //     category: "Dining",
  //     src: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&w=800&q=80",
  //     title: "The Arabella Bar",
  //   },
  {
    id: 10,
    category: "Dining",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    title: "Signature Restaurant",
  },
  //   {
  //     id: 11,
  //     category: "Dining",
  //     src: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&w=800&q=80",
  //     title: "Breakfast Spread",
  //   },
  {
    id: 12,
    category: "Dining",
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80",
    title: "Alfresco Dining Patio",
  },
  {
    id: 13,
    category: "Dining",
    src: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=800&q=80",
    title: "Gourmet Plating",
  },
  {
    id: 14,
    category: "Dining",
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
    title: "Evening Cocktails",
  },
  //   {
  //     id: 15,
  //     category: "Dining",
  //     src: "https://images.unsplash.com/photo-1525266343566-9919350c4223?auto=format&fit=crop&w=800&q=80",
  //     title: "Private Dining Area",
  //   },

  // --- SURROUNDINGS ---
  {
    id: 16,
    category: "Surroundings",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    title: "Hotel Exterior Dusk",
  },
  {
    id: 17,
    category: "Surroundings",
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    title: "Resort Poolside",
  },
  //   {
  //     id: 18,
  //     category: "Surroundings",
  //     src: "https://images.unsplash.com/photo-1572331165267-854da2b00ca1?auto=format&fit=crop&w=800&q=80",
  //     title: "Infinity Pool View",
  //   },
  //   {
  //     id: 19,
  //     category: "Surroundings",
  //     src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2c?auto=format&fit=crop&w=800&q=80",
  //     title: "Lobby Entrance",
  //   },
  {
    id: 20,
    category: "Surroundings",
    src: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?auto=format&fit=crop&w=800&q=80",
    title: "Lush Garden Pathways",
  },
  {
    id: 21,
    category: "Surroundings",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Nearby Coastal Beach",
  },

  // --- EVENTS ---
  {
    id: 22,
    category: "Events",
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    title: "Grand Banquet Hall",
  },
  {
    id: 23,
    category: "Events",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "Wedding Aisle Setup",
  },
  //   {
  //     id: 24,
  //     category: "Events",
  //     src: "https://images.unsplash.com/photo-1505373877841-8d13f5d6681f?auto=format&fit=crop&w=800&q=80",
  //     title: "Corporate Meeting Room",
  //   },
  //   {
  //     id: 25,
  //     category: "Events",
  //     src: "https://images.unsplash.com/photo-1469371670807-013ccf25f164?auto=format&fit=crop&w=800&q=80",
  //     title: "Outdoor Event Lawn",
  //   },
  //   {
  //     id: 26,
  //     category: "Events",
  //     src: "https://images.unsplash.com/photo-1551810335-81e029433608?auto=format&fit=crop&w=800&q=80",
  //     title: "Conference Setup",
  //   },
];

const categories = ["All", "Rooms", "Dining", "Events", "Surroundings"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); // For Lightbox

  // Filter Logic
  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className={styles.pageWrapper}>
      {/* --- HERO HEADER --- */}
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
            OUR GALLERY
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A visual journey through the elegance of Arabella.
          </motion.p>
        </div>
      </motion.div>

      <div className={styles.container}>
        {/* --- FILTER TABS --- */}
        <div className={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                activeCategory === cat ? styles.activeBtn : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- IMAGE GRID --- */}
        <motion.div layout className={styles.galleryGrid}>
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                className={styles.imageCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(img)}
              >
                <div className={styles.imgWrapper}>
                  <img src={img.src} alt={img.title} loading="lazy" />
                  <div className={styles.overlay}>
                    <ZoomIn size={32} color="white" />
                    <span>{img.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)} // Close on click outside
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on image click
            >
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.title} />
              <h3>{selectedImage.title}</h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
