import React, { useState } from "react";
import Lottie from "lottie-react";
import dance from "../assets/Lottie/Dance.json";
import { motion } from "framer-motion";

const DanceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 font-bold text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h3 className="text-2xl heading font-semibold mb-4 text-center text-blue-600">
         🙋 I'm Tawhid Hasan Bijoy
        </h3>

        <div className="w-full">
          <Lottie animationData={dance} loop={true} />
        </div>
        <h1 className="text-2xl font-semibold mb-4 text-center heading text-blue-600">A dedicated dancer</h1>
      </div>
      
    </div>
  );
};

const DancePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-transparent">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 heading  text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
      >
       View the dancer’s performance
      </button>

      <DanceModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default DancePage;
