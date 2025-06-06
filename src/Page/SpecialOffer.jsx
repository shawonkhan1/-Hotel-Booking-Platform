import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const SpecialOffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000); // ২ সেকেন্ড পরে modal open হবে
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="specialOfferTitle"
    >
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2
          id="specialOfferTitle"
          className="text-2xl font-extrabold text-center mb-4 text-indigo-700"
        >
          🎉 Special Offers & Promotions 🎉
        </h2>

        <img
          src="https://i.ibb.co/MxkBcGhw/pexels-fotoaibe-1743231.jpg"
          alt="Special Offer"
          className="rounded-lg mx-auto mb-4 shadow-md max-h-60 object-cover"
        />

        <p className="text-center text-gray-700 mb-6 leading-relaxed">
          Book your stay now and enjoy up to{' '}
          <span className="font-bold text-indigo-600 underline">25% OFF</span>{' '}
          for bookings longer than 3 days! Don’t miss out on this limited-time
          offer to experience luxury & comfort.
        </p>

        <div className="flex justify-center gap-4">
         <Link to='/allRoom'>
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Book Now
          </button>
         </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md font-semibold hover:bg-indigo-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
