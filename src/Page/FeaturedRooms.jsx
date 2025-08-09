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
        const res = await fetch(
          "https://assigment-11-server-side.vercel.app/rooms"
        );
        const data = await res.json();

        const counts = {};

        await Promise.all(
          data.map(async (room) => {
            try {
              const res = await fetch(
                `https://assigment-11-server-side.vercel.app/reviews/${room._id}`
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
          .slice(0, 8);

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
      <h1 className="text-center heading mt-10 font-bold text-4xl mb-14 text-blue-600">
        Our Featured Room
      </h1>

      <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <Link to={`/details/${room._id}`} key={room._id} className="block">
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white   border border-gray-200 rounded-2xl p-5 shadow-md flex flex-col h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer `}
            >
              <img
                src={room.cover}
                alt={room.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-all duration-300 ease-in-out hover:brightness-105 hover:contrast-105"
              />

              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {room.title}
              </h2>
              <p className="text-gray-700 text-sm mb-1">Price: ৳{room.price}</p>
              <p className="text-gray-700 text-sm mb-1">
                Category: {room.category}
              </p>
              <p className="text-gray-700 text-sm mb-1">
                Guests: {room.maxGuests}
              </p>
              <p className="text-gray-700 text-sm mb-1">Bed: {room.bedType}</p>

              <p className="mt-2 mb-4 text-sm text-gray-600 flex-grow">
                {room.description}
              </p>

              <p className="text-sm text-gray-800 font-medium mb-4">
                <strong>Reviews:</strong> {reviewsCount[room._id] ?? 0}
              </p>

              <button className="btn-p btn my-5">Book Now</button>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
