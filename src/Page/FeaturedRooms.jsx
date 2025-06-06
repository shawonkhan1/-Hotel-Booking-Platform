import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';  // react-router এর 'react-router-dom' ইউজ করো

const FeaturedRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [reviewsCount, setReviewsCount] = useState({}); // { roomId: count }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);

        // এখন প্রতিটি রুমের জন্য রিভিউ সংখ্যা ফেচ করো
        data.forEach(room => {
          fetch(`http://localhost:3000/reviews/${room._id}`)
            .then(res => res.json())
            .then(reviews => {
              setReviewsCount(prev => ({
                ...prev,
                [room._id]: reviews.length
              }));
            })
            .catch(() => {
              setReviewsCount(prev => ({
                ...prev,
                [room._id]: 0
              }));
            });
        });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className='text-center font-bold text-4xl mb-8'>Our Featured Rooms</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {rooms.map(room => (
          <Link to={`/details/${room._id}`} key={room._id} className='border rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition cursor-pointer'>
            <img src={room.cover} alt={room.title} className='w-full h-48 object-cover rounded-md mb-4' />
            <h2 className='text-xl font-semibold'>{room.title}</h2>
            <p>Price: ৳{room.price}</p>
            <p>Category: {room.category}</p>
            <p>Guests: {room.maxGuests}</p>
            <p>Bed: {room.bedType}</p>
            <p className='mt-2 mb-4 flex-grow'>{room.description}</p>

            <p><strong>Reviews: </strong>{reviewsCount[room._id] ?? 0}</p> {/* রিভিউ সংখ্যা দেখাবে */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
