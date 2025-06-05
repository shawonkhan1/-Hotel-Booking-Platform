import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
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
          <div key={room._id} className='border rounded-lg shadow-md p-4 flex flex-col'>
            <img src={room.cover} alt={room.title} className='w-full h-48 object-cover rounded-md mb-4' />
            <h2 className='text-xl font-semibold'>{room.title}</h2>
            <p className=''>Price: ৳{room.price}</p>
            <p className=''>Category: {room.category}</p>
            <p className=''>Guests: {room.maxGuests}</p>
            <p className=''>Bed: {room.bedType}</p>
            <p className=' mt-2 mb-4 flex-grow'>{room.description}</p>

            {/* Details Button */}
          <Link to={`/details/${room._id}`} className="mt-auto">
  <button className="btn-p w-full">Details</button>
</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
