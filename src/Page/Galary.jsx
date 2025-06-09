import React, { useState, useEffect } from "react";
import Loading from "../Components/Loading";
import { Link } from "react-router";
import { motion } from "framer-motion";
import DancePage from "./DancePage";

const Galary = () => {
  const [category, setCategory] = useState("hotel");
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Galary.json")
      .then((res) => res.json())
      .then((data) => {
        setGalleryData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading></Loading>;
  if (!galleryData) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-4xl heading md:text-4xl  tracking-tight  text-transparent select-none   drop-shadow-lg
        font-bold  bg-clip-text mb-12  text-center
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 "
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Hotel Gallery
      </motion.h1>

      {/* category buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {Object.keys(galleryData).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-md font-semibold ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        
        ))}
      </div>
       
      {/* images grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryData[category].map((imgUrl, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={imgUrl}
              alt={`${category} image ${idx + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>

        {/* extra colleciton */}
      <div className="mt-10 flex justify-center">
        <DancePage></DancePage>
        
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/">
          <button className="btn btn-p">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Galary;
