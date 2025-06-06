import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")  // তোমার API URL
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
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="bg-gray-100 py-4">
      <h2 className="text-center text-2xl font-bold mb-4">User Reviews</h2>
      <Marquee pauseOnHover={true} gradient={false} speed={50}>
        {reviews.map((review) => (
          <div
            key={review._id}
            className="mx-4 bg-white p-4 rounded shadow-md min-w-[250px]"
          >
            <p className="font-semibold">{review.username}</p>
            <p className="text-yellow-500">Rating: {"⭐".repeat(review.rating)}</p>
            <p className="italic text-gray-600 mt-2">"{review.comment}"</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
