import React from "react";
import addData from "../assets/Lottie/add-data.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
const AdddataLottie = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-64 md:w-96">
        <h1 className="text-center text-3xl font-bold heading text-[#1E3A8A]">No bookings found.</h1>
        <Link to="/allRoom">
          <Lottie animationData={addData} loop={true} />
        </Link>
        
      </div>
      
    </div>
  );
};

export default AdddataLottie;
