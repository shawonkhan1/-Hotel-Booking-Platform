import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assigment-11-server-side.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-4">
      <h2 className="text-4xl mt-5 heading font-bold text-center text-blue-600 mb-12 tracking-wide leading-tight drop-shadow-sm">
        User Reviews
      </h2>

      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            className="mx-4 bg-gray-100 p-4 rounded shadow-md min-w-[250px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-semibold text-black heading">
              {review.username}
            </p>
            <p className="text-yellow-500 description">
              Rating: {"⭐".repeat(review.rating)}
            </p>
            <p className="italic description text-gray-700 mt-2">
              "{review.comment}"
            </p>
            <p className="text-xs description text-gray-500  mt-2">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
