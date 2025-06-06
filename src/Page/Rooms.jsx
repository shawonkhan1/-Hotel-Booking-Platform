import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import Loading from "../Components/Loading";

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
    let url = "http://localhost:3000/rooms";

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
    return (
     <Loading></Loading>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-4xl mb-6">Rooms</h1>

      {/* Filter Dropdown */}
      <div className="flex justify-end">
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
      </div>
     

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {rooms.map((room) => (
          <Link key={room._id} to={`/details/${room._id}`} className="block h-full">
            <div className="border rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition cursor-pointer h-full">
              <img
                src={room.cover}
                alt={room.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p>Price: ৳{room.price}</p>
              <p>Category: {room.category}</p>
              <p>Guests: {room.features.maxGuests}</p>
              <p>Bed: {room.features.bedType}</p>
              <p className="mt-2 mb-4 flex-grow">{room.description}</p>
              <button className="btn btn-p w-full mt-auto">Details</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
