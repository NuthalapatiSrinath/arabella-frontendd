import React from "react";
import ClientStoriesCard from "../../../components/ClientStoriesCard/ClientStoriesCard";
import styles from "./Testimonials.module.css";

const stories = [
  {
    name: "Varun Kota",
    // Ensure these images exist in public/images/ or change paths
    image: "/images/review2.webp",
    text: "Arabella helped us streamline our stay, giving our family more time to focus on enjoying the vacation.",
  },
  {
    name: "Tejaswi Velivala",
    image: "/images/review3.webp",
    text: "Thanks to the staff, our business trip ran smoother than ever. The efficiency gains saved us both time and money.",
  },
  {
    name: "Darshan Kotla",
    image: "/images/review2.webp",
    text: "Fantastic service and quick turnaround time. Highly recommended for any business traveler looking to relax.",
  },
  // Added duplicates to demonstrate scrolling if you only have 3
  {
    name: "Anil Kumar",
    image: "/images/review3.webp",
    text: "Fantastic service and quick turnaround time. Highly recommended for any business looking to scale.",
  },
];
const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Client Stories</h2>

        <div className={styles.scrollContainer}>
          {stories.map((story, idx) => (
            <ClientStoriesCard
              key={idx}
              name={story.name}
              image={story.image}
              text={story.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
