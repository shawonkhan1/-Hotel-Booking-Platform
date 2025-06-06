import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Rating from "react-rating";
import moment from "moment";
import Loading from "../Components/Loading";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });

  const fetchBookings = () => {
    axios
      .get(`http://localhost:3000/bookings/${user.email}`)
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
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  // Booking cancellation with date check
  const handleCancel = (booking) => {
    // বুকিংয়ের তারিখ থেকে ১ দিন আগে পর্যন্ত ক্যানসেল করতে পারবে
    const cancelDeadline = moment(booking.bookedAt).subtract(1, "days");
    const now = moment();

    if (now.isAfter(cancelDeadline)) {
      toast.error(
        "Sorry, booking can only be cancelled up to 1 day before the booked date."
      );
      return;
    }

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel the booking?"
    );
    if (!confirmCancel) return;

    axios
      .delete(`http://localhost:3000/bookings/${booking._id}`)
      .then(() => {
        toast.success("Booking cancelled!");
        fetchBookings();

        axios
          .patch(
            `http://localhost:3000/rooms/available/${booking.roomId}`,
            { available: true }
          )
          .catch((err) =>
            console.error("Failed to update room availability", err)
          );
      })
      .catch((err) => console.error("Error canceling booking:", err));
  };

  const handleEditClick = (booking) => {
    setEditingId(booking._id);
    setUpdatedDate(booking.bookedAt?.slice(0, 10));
  };

  const handleUpdate = (id) => {
    const today = moment().startOf('day');
    const selectedDate = moment(updatedDate);

    // Update only if selectedDate is today or later
    if (selectedDate.isBefore(today)) {
      toast.error("You cannot select a past date.");
      return;
    }

    axios
      .patch(`http://localhost:3000/booking/${id}`, {
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
      .post("http://localhost:3000/reviews", review)
      .then(() => {
        toast.success("Review submitted!");
        setShowModal(false);
        setReviewData({ rating: 0, comment: "" });
      })
      .catch(() => {
        toast.error("Failed to submit review.");
      });
  };

  if (loading) return <Loading></Loading>;

  if (!bookings.length)
    return (
      <div className="text-center mt-8 bg-amber-100 p-6 rounded-xl">
        <p>No bookings found.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🛌 My Bookings</h1>

      <table className="table w-full border shadow-md rounded-lg">
        <thead className="bg-gray-200 ">
          <tr className="text-black">
            <th>Image</th>
            <th>Room Name</th>
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
                  className="w-20 h-16 object-cover rounded"
                  alt="Room"
                />
              </td>
              <td>{booking.roomTitle}</td>
              <td>৳{booking.price}</td>
              <td>
                {editingId === booking._id ? (
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={updatedDate}
                      onChange={(e) => setUpdatedDate(e.target.value)}
                      className="border px-2 py-1 rounded"
                      min={moment().format('YYYY-MM-DD')} // Prevent past date selection
                    />
                    <button
                      onClick={() => handleUpdate(booking._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  new Date(booking.bookedAt).toLocaleDateString()
                )}
              </td>
              <td className="space-x-2 flex flex-wrap gap-2">
                <button
                  onClick={() => handleCancel(booking)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOpenReviewModal(booking.roomId)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Review
                </button>
                <button
                  onClick={() => handleEditClick(booking)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Update Date
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Submit Your Review
            </h2>
            <p>
              <strong className="text-black">User: {user.displayName}</strong>
            </p>
            <div className="my-3">
              <label className="block mb-1 font-medium text-black">Rating</label>
              <Rating
                fractions={2}
                initialRating={reviewData.rating}
                onChange={(rate) => setReviewData({ ...reviewData, rating: rate })}
                emptySymbol={<span className="text-black text-2xl">☆</span>}
                fullSymbol={<span className="text-yellow-400 text-2xl">★</span>}
              />
            </div>
            <div className="mb-3">
              <label className="block text-black mb-1 font-medium">Comment</label>
              <textarea
                rows="3"
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                className="w-full text-black border rounded px-2 py-1"
                placeholder="Write your review"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-black px-3 py-1 rounded"
              >
                Close
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
