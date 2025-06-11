import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie/contactus.json";
import { motion } from "framer-motion";

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      name: user?.displayName || "",
      email: user?.email || "",
      message,
    };

    fetch("https://assigment-11-server-side.vercel.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Thank you for contacting us!");
          setMessage("");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Error sending message.");
      });
  };

  return (
    <div className="  flex  items-center justify-center px-6 py-12">
      <div className=" rounded-2xl  grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full overflow-hidden">

        {/* Lottie Animation */}
        <div className="hidden md:flex items-center justify-center p-8 rounded-2xl">
          <Lottie animationData={animationData} loop={true} className="w-full max-w-sm" />
        </div>

        {/* Contact Form */}
        <div className="p-10 bg-[#EEF2FF] rounded-2xl ml-2">
           <motion.h2
      className="text-3xl heading font-semibold text-gray-800 mb-6 text-center"
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Contact Us
    </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5 ">
            {/* Name */}
            <div>
              <label className="block  text-gray-600 mb-1 font-medium">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg outline-none cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg outline-none cursor-not-allowed"
              />
            </div>

            {/* Message */}
            <div className="text-black">
              <label className="block text-gray-600 mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
