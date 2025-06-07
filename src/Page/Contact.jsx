import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    fetch("http://localhost:3000/contact", {
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
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message here..."
            rows="5"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 resize-y transition"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
        >
          Send Message
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
