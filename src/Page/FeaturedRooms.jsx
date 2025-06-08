import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";

const FeaturedRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [reviewsCount, setReviewsCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomsAndReviews = async () => {
      try {
        const res = await fetch("http://localhost:3000/rooms");
        const data = await res.json();

        const counts = {};

        await Promise.all(
          data.map(async (room) => {
            try {
              const res = await fetch(
                `http://localhost:3000/reviews/${room._id}`
              );
              const reviews = await res.json();
              counts[room._id] = reviews.length;
            } catch {
              counts[room._id] = 0;
            }
          })
        );

        const sortedRooms = data
          .sort((a, b) => (counts[b._id] || 0) - (counts[a._id] || 0))
          .slice(0, 6);

        setRooms(sortedRooms);
        setReviewsCount(counts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setLoading(false);
      }
    };

    fetchRoomsAndReviews();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center font-bold text-4xl mb-8 text-[#1E3A8A]"
      >
        Our{" "}
        <motion.span
          animate={{
            color: ["#1E3A8A", "#3B82F6", "#60A5FA", "#2563EB"],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        >
          Featured
        </motion.span>{" "}
        Room
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link
            to={`/details/${room._id}`}
            key={room._id}
            className="border rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={room.cover}
              alt={room.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{room.title}</h2>
            <p>Price: ৳{room.price}</p>
            <p>Category: {room.category}</p>
            <p>Guests: {room.maxGuests}</p>
            <p>Bed: {room.bedType}</p>
            <p className="mt-2 mb-4 flex-grow">{room.description}</p>

            <p>
              <strong>Reviews: </strong>
              {reviewsCount[room._id] ?? 0}
            </p>
            <button className="btn-p btn my-5">Book Now</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
