import React from 'react';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Error from '../assets/Lottie/error222.json';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
      
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-[#1E3A8A] mb-6 drop-shadow-lg"
      >
        Oops! Page Not Found
      </motion.h1>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <Lottie animationData={Error} loop={true} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8"
      >
        <Link to="/">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-6 py-3 text-lg rounded-md shadow-lg hover:scale-105 transition-transform duration-300">
            🔙 Back To Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
