import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const priceRanges = [
  { label: "All", min: "", max: "" },
  { label: "৳0 - ৳1000", min: 0, max: 1000 },
  { label: "৳1000 - ৳2000", min: 1000, max: 2000 },
  { label: "৳2000 - ৳3000", min: 2000, max: 3000 },
  { label: "৳3000 - ৳4000", min: 3000, max: 4000 },
  { label: "৳4000+", min: 4000, max: 50000 },
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

  const fetchRooms = (minPrice, maxPrice) => {
    setLoading(true);
    let url = "https://assigment-11-server-side.vercel.app/rooms";

    if (minPrice !== "" && maxPrice !== "") {
      url += `?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRooms("", "");
  }, []);

  const handleFilterChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selected = priceRanges[selectedIndex];
    setSelectedRange(selected);
    fetchRooms(selected.min, selected.max);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
    <Helmet>
      <title>All Rooms</title>
    </Helmet>
    <div className="p-4 md:p-8">
      {/* Heading */}
      <motion.h1
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-center heading text-4xl lg:text-5xl font-extrabold mb-10 bg-[linear-gradient(-45deg,#0ea5e9,#6366f1,#10b981,#ec4899)] bg-[length:300%_300%] bg-clip-text text-transparent tracking-tight leading-tight"
      >
        Find the Perfect Room for Your Stay
      </motion.h1>

      {/* Filter Dropdown */}
      <div className="flex justify-end items-center gap-2 mb-6">
        <label className="text-blue-600 font-medium text-lg">Price Range:</label>
        <select
          className="select select-bordered w-48"
          onChange={handleFilterChange}
          value={selectedRange.label}
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {rooms.map((room) => (
          <Link
            key={room._id}
            to={`/details/${room._id}`}
            className="group block h-full"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg flex flex-col h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:shadow-xl">
  <img
    src={room.cover}
    alt={room.title}
    className="w-full h-48 object-cover rounded-xl mb-4 transition-all duration-500 ease-in-out group-hover:brightness-105 group-hover:contrast-110"
  />
  
  <h2 className="text-2xl font-bold text-gray-800 mb-1">{room.title}</h2>

  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Price:</span> ৳{room.price}
  </p>
  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Category:</span> {room.category}
  </p>
  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Guests:</span> {room.features.maxGuests}
  </p>
  <p className="text-gray-600 text-sm mb-1">
    <span className="font-medium text-gray-700">Bed:</span> {room.features.bedType}
  </p>

  <p className="text-sm text-gray-500 mt-2 mb-4 flex-grow">
    {room.description}
  </p>

  <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition duration-200">
    Details
  </button>
</div>

          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Rooms;
