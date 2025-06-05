import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router'; 

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    axios.get(`http://localhost:3000/bookings/${user.email}`)
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch bookings:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = (id) => {
    const confirmCancel = confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    axios.delete(`http://localhost:3000/bookings/${id}`)
      .then(() => {
        fetchBookings(); // Refresh booking list
      })
      .catch(err => console.error('Error canceling booking:', err));
  };

  if (loading) return <p>Loading your bookings...</p>;

  if (!bookings.length) return <div className='text-center rounded-2xl bg-amber-300 space-y-3 py-3'>
    <p>No bookings  found.</p>
    <Link to='/allRoom'><button className='btn btn-p'>Booking Rooms</button></Link>
  </div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id} className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{booking.roomTitle}</h2>
            <p>Price: ৳{booking.price}</p>
            <p>Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>

            <div className="flex gap-4 mt-3">
              <Link to={`/details/${booking.roomId}`} className="mt-auto">
                            <button className="btn-p w-full">Details</button>
                          </Link>
              <button
                onClick={() => handleCancel(booking._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Cancel Booking
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBooking;
