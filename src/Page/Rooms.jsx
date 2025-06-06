import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const priceRanges = [
  { label: "All", min: "", max: "" },
  { label: "৳0 - ৳1000", min: 0, max: 1000 },
  { label: "৳1000 - ৳2000", min: 1000, max: 2000 },
  { label: "৳2000 - ৳3000", min: 2000, max: 3000 },
  { label: "৳3000 - ৳4000", min: 3000, max: 4000 },
  { label: "৳5000+ ", min: 4000, max: 50000 },
];

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

  const fetchRooms = (minPrice, maxPrice) => {
    setLoading(true);
    let url = "http://localhost:3000/rooms";

    // যদি min এবং max প্রাইস থাকে, তাহলে query add করব
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
    // প্রথমে ডিফল্ট রুমস নিয়ে আসা
    fetchRooms("", "");
  }, []);

  // Dropdown পরিবর্তন হলে
  const handleFilterChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selected = priceRanges[selectedIndex];
    setSelectedRange(selected);
    fetchRooms(selected.min, selected.max);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-4xl mb-6">Rooms</h1>

      {/* Filter Dropdown */}
      <div className="mb-8 flex justify-center">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="border rounded-lg shadow-md p-4 flex flex-col"
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

            <Link to={`/details/${room._id}`} className="mt-auto">
              <button className="btn-p w-full">Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
