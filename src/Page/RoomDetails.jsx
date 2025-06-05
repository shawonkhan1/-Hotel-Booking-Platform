import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const RoomDetails = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  console.log(user.email);
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);



  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching room:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-400"></div>
    </div>
  );

  if (!room) return (
    <div className="text-center text-red-600 text-xl mt-20">
      Sorry, room not found.
    </div>
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const confirmBooking = () => {
  

    axios.post("http://localhost:3000/bookings", {
      roomId: room._id,
      email: user.email,
    })
      .then(() => {
        alert(`Booking confirmed for room: ${room.title}`);
        setRoom({ ...room, availability: false });
        setModalOpen(false);
      navigate('/myBooking')
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Booking failed. Try again.");
      });
  };

  return (
    <section className="max-w-4xl mx-auto bg-pink-50 p-8 rounded-3xl shadow-lg my-16 relative font-poppins">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-pink-300 w-full md:w-1/2">
          <img
            src={room.cover || "https://via.placeholder.com/600x400?text=No+Image"}
            alt={room.title}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold text-pink-600 mb-4">{room.title}</h1>
          <p className="text-lg mb-3 text-pink-800"><strong>Price:</strong> ৳{room.price} / night</p>
          <p className="text-lg mb-3 text-pink-800"><strong>Max Guests:</strong> {room.maxGuests}</p>
          <p className="mb-3 text-pink-700 italic">{room.description || "No description available."}</p>

          {room.facilities && room.facilities.length > 0 && (
            <div className="mb-4">
              <h3 className="text-pink-600 font-semibold mb-2">Facilities:</h3>
              <ul className="list-disc list-inside text-pink-700">
                {room.facilities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mb-4 text-pink-800 font-semibold">
            <span className={room.availability ? "text-green-600" : "text-red-600"}>
              {room.availability ? "Available" : "Currently Booked"}
            </span>
          </p>

          <button
            onClick={openModal}
            disabled={!room.availability}
            className={`w-full py-3 rounded-xl font-bold shadow-md transition-colors duration-300
              ${room.availability
                ? "bg-pink-600 hover:bg-pink-700 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-600"}`}
          >
            {room.availability ? "Book This Room Now" : "Room Unavailable"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-pink-200 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={closeModal}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 p-6">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl relative">
              <h2 className="text-3xl font-extrabold text-pink-600 mb-5 text-center">Confirm Booking</h2>

              <p className="mb-2 text-pink-700"><strong>Room:</strong> {room.title}</p>
              <p className="mb-2 text-pink-700"><strong>Price per night:</strong> ৳{room.price}</p>
              <p className="mb-4 text-pink-700"><strong>Max Guests:</strong> {room.maxGuests}</p>

            <input
  type="email"
  placeholder="Enter your email"
  value={user.email}
  readOnly
  className="w-full border-2 border-pink-400 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-pink-600"
/>

              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-300 rounded-xl text-pink-700 font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="px-6 py-3 bg-pink-600 rounded-xl text-white font-bold hover:bg-pink-700 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default RoomDetails;
