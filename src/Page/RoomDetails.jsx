import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:3000/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axios
      .get(`http://localhost:3000/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]));
  }, [id]);

  if (loading) return <Loading />;
  if (!room)
    return (
      <div className="text-center text-red-600 text-xl mt-20">
        Sorry, room not found.
      </div>
    );
  // open modal ar jnno strt
  // const openModal = () => setModalOpen(true);
  const openModal = () => {
    if (!user) {
      toast.warning("You must be logged in to book a room.");
      return;
    }
    setModalOpen(true);
  };
  // open modal ar jnno  end
  const closeModal = () => setModalOpen(false);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  const confirmBooking = () => {
    if (!bookingDate) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please select a booking date.",
        confirmButtonColor: "#1E3A8A",
      });
      return;
    }

    axios
      .post("http://localhost:3000/bookings", {
        roomId: room._id,
        email: user.email,
        date: bookingDate.toISOString(),
        image: room.cover,
      })
      .then(() => {
        Swal.fire({
          title: "Booking Confirmed!",
          html: ` Your booking for <strong>${
            room.title
          }</strong> on <strong>${bookingDate.toLocaleDateString()}</strong> is confirmed.`,
          icon: "success",
          confirmButtonColor: "#1E3A8A",
        });
        setRoom({
          ...room,
          features: { ...room.features, availability: false },
        });
        setModalOpen(false);
        navigate("/myBooking");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || " Booking failed. Try again.");
      });
  };

  return (
    <>
    <Helmet>
      <title>Room Details</title>
    </Helmet>
    <section className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-md my-16 font-poppins">
      {/* Room Main */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border-2 border-[#1E3A8A] shadow-md">
          <img
            src={
              room.cover || "https://via.placeholder.com/600x400?text=No+Image"
            }
            alt={room.title}
            className="w-full h-64 object-cover hover:scale-105 transition-transform"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
        
          <h2 className="text-4xl font-bold text-blue-600">{room.title}</h2>


          <span className="bg-blue-100 text-[#1E3A8A] px-3 py-1 rounded-full text-sm font-medium">
            🏷️ {room.category || "Standard"}
          </span>

          <p className="text-lg text-gray-700">
            {room.description || "No description available."}
          </p>
          <p className="text-xl text-black font-semibold">
            ৳{room.price} / night
          </p>

          <div className="space-y-1 text-black">
            <p>
              <strong>Guests:</strong> {room.features.maxGuests}
            </p>
            <p>
              <strong>Room Size:</strong> {room.features.size || "N/A"}
            </p>
            <p>
              <strong>Bed Type:</strong> {room.features.bedType || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  room.features.availability ? "text-green-600" : "text-red-500"
                }
              >
                {room.features.availability ? "Available" : "Booked"}
              </span>
            </p>
            {room.cancellationPolicy && (
              <p className="text-sm italic text-gray-500">
                {room.cancellationPolicy}
              </p>
            )}
          </div>

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="mt-2">
              <h4 className="font-bold text-[#1E3A8A]">✅ Amenities:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {room.amenities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={openModal}
            disabled={!room.features.availability}
            className={`w-full py-3 mt-4 rounded-xl font-semibold transition duration-300 ${
              room.features.availability
                ? "bg-blue-600  hover:bg-[#163570] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {room.features.availability ? "Book This Room" : "Not Available"}
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-12 border-t-2 border-gray-200" />

      {/* Reviews */}
    <div>
  <h3 className="text-3xl font-bold mb-2 text-blue-600">
    Guest Reviews ({reviews.length})
  </h3>
  {averageRating && (
    <p className="text-lg font-semibold text-yellow-500 mb-4">
      ⭐ Average Rating: {averageRating}/5
    </p>
  )}

  {reviews.length === 0 ? (
    <p className="text-gray-500 italic">No reviews for this room yet.</p>
  ) : (
    <motion.ul
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      {reviews.map((review) => (
        <motion.li
          key={review._id}
          className="p-4 border border-[#1E3A8A] rounded-xl shadow-sm bg-blue-50"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 15px rgba(30, 58, 138, 0.3)" }}
        >
          <p className="font-semibold text-[#1E3A8A]">{review.username}</p>
          <p>
            Rating:{" "}
            <span className="font-bold text-yellow-500">
              {"⭐".repeat(review.rating)}{" "}
              <small className="text-gray-600">({review.rating})</small>
            </span>
          </p>
          <p className="italic text-gray-700 mt-2">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  )}
</div>

      {/* Booking Modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={closeModal}
            aria-hidden="true"
          ></div>

          <div
            className="fixed inset-0 flex justify-center items-center z-50 p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl relative">
              <h2
                id="booking-modal-title"
                className="text-3xl font-extrabold text-[#1E3A8A] mb-5 text-center"
              >
                Confirm Booking
              </h2>

              <p className="mb-2 text-[#1E3A8A]">
                <strong>Room:</strong> {room.title}
              </p>
              <p className="mb-2 text-[#1E3A8A]">
                <strong>Price per night:</strong> ৳{room.price}
              </p>
              <p className="mb-2 text-[#1E3A8A]">
                <strong>Your Email:</strong> {user.email}
              </p>

              <div className="mb-6">
                <label
                  htmlFor="bookingDate"
                  className="block mb-2 text-[#1E3A8A] font-semibold"
                >
                  Select Booking Date:
                </label>
                <DatePicker
                  id="bookingDate"
                  selected={bookingDate}
                  onChange={(date) => setBookingDate(date)}
                  minDate={new Date()}
                  className="w-full text-black border-2 border-[#1E3A8A] rounded-xl px-4 py-3 focus:outline-none focus:border-[#163570]"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-300 rounded-xl text-[#1E3A8A] font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="px-6 py-3 bg-blue-600  rounded-xl text-white font-bold hover:bg-[#163570] transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </section>
    </>
  );
};

export default RoomDetails;
