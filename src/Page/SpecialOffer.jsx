import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const SpecialOffer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
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

        <motion.h2
          id="specialOfferTitle"
          className="text-2xl font-bold text-center mb-4 text-blue-600"
          animate={{
            scale: [1, 1.05, 1],
            color: [
              "rgb(37, 99, 235)",
              "rgb(59, 130, 246)",
              "rgb(99, 102, 241)",
              "rgb(37, 99, 235)",
            ],
            textShadow: [
              "0 0 8px rgb(37, 99, 235)",
              "0 0 12px rgb(59, 130, 246)",
              "0 0 16px rgb(99, 102, 241)",
              "0 0 8px rgb(37, 99, 235)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          🎉Special Offers & Promotions🎉
        </motion.h2>

        <motion.img
  src="https://i.ibb.co/MxkBcGhw/pexels-fotoaibe-1743231.jpg"
  alt="Special Offer"
  className="rounded-lg mx-auto mb-4 shadow-md max-h-60 object-cover cursor-pointer"
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>

        <p className="text-center text-gray-700 mb-6 leading-relaxed">
          Book your stay now and enjoy up to{" "}
          <span className="font-bold text-indigo-600 underline">25% OFF</span>{" "}
          for bookings longer than 3 days! Don’t miss out on this limited-time
          offer to experience luxury & comfort.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/allRoom">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-blue-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Book Now
            </button>
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="border border-blue-600 text-indigo-600 px-6 py-2 rounded-md font-semibold hover:bg-indigo-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
