import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Rating from "react-rating";
import moment from "moment";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import AdddataLottie from "../Components/AdddataLottie";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });

  const fetchBookings = () => {
    axios
      .get(`https://assigment-11-server-side.vercel.app/bookings/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const handleCancel = (booking) => {
    const cancelDeadline = moment(booking.bookedAt).subtract(1, "days");
    if (moment().isAfter(cancelDeadline)) {
      toast.error(" Booking can only be cancelled up to 1 day before.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assigment-11-server-side.vercel.app/bookings/${booking._id}`)
          .then(() => {
            fetchBookings();
            axios
              .patch(
                `https://assigment-11-server-side.vercel.app/rooms/available/${booking.roomId}`,
                {
                  available: true,
                }
              )
              .catch((err) =>
                console.error("Room availability update failed", err)
              );
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
          })
          .catch((err) => {
            console.error("Cancel error:", err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleEditClick = (booking) => {
    setEditingId(booking._id);
    setUpdatedDate(booking.bookedAt?.slice(0, 10));
  };

  const handleUpdate = (id) => {
    const selectedDate = moment(updatedDate);
    if (selectedDate.isBefore(moment().startOf("day"))) {
      toast.error(" You cannot select a past date.");
      return;
    }

    axios
      .patch(`https://assigment-11-server-side.vercel.app/booking/${id}`, {
        bookedAt: new Date(updatedDate),
      })
      .then(() => {
        toast.success("Booking updated!");
        setEditingId(null);
        fetchBookings();
      })
      .catch((err) => {
        toast.error("Update failed");
        console.error(err);
      });
  };

  const handleOpenReviewModal = (roomId) => {
    setSelectedRoomId(roomId);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    const review = {
      username: user.displayName,
      email: user.email,
      roomId: selectedRoomId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      timestamp: new Date(),
    };

    axios
      .post("https://assigment-11-server-side.vercel.app/reviews", review)
      .then(() => {
        toast.success(" Review submitted!");
        setShowModal(false);
        setReviewData({ rating: 0, comment: "" });
      })
      .catch(() => toast.error(" Failed to submit review."));
  };

  if (loading) return <Loading />;
  if (!bookings.length) return <AdddataLottie />;

  return (
    <>
      <Helmet>
        <title>My Booking</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.h2
          className="text-3xl  heading mt-10 font-bold text-blue-600 mb-12 "
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🛌 My Bookings
        </motion.h2>

        <div className="overflow-x-auto rounded shadow">
          <table className="table w-full min-w-[600px]">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th>Image</th>
                <th>Room</th>
                <th>Price</th>
                <th>Booked Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <img
                      src={booking.image}
                      alt="Room"
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-medium">{booking.roomTitle}</td>
                  <td>৳{booking.price}</td>
                  <td>
                    {editingId === booking._id ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                          type="date"
                          value={updatedDate}
                          onChange={(e) => setUpdatedDate(e.target.value)}
                          className="border px-2 py-1 rounded w-full sm:w-auto"
                          min={moment().format("YYYY-MM-DD")}
                        />
                        <button
                          onClick={() => handleUpdate(booking._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-red-600 hover:bg-gray-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      new Date(booking.bookedAt).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleCancel(booking)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleOpenReviewModal(booking.roomId)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleEditClick(booking)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                      >
                        Update Date
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Submit Your Review
                </h2>
                <p>
                  <strong>User: {user.displayName}</strong>
                </p>
                <div className="mt-4">
                  <label className="block font-medium mb-1">Rating</label>
                  <Rating
                    fractions={2}
                    initialRating={reviewData.rating}
                    onChange={(rate) =>
                      setReviewData({ ...reviewData, rating: rate })
                    }
                    emptySymbol={<span className="text-2xl">☆</span>}
                    fullSymbol={
                      <span className="text-yellow-400 text-2xl">★</span>
                    }
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-medium mb-1">Comment</label>
                  <textarea
                    rows="3"
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                    placeholder="Write your review"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MyBooking;
