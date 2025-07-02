import React, { useState, useContext } from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const DashBordLayout = () => {
const {user,Logout} = useContext(AuthContext)
  const [sidebarOpen, setSidebarOpen] = useState(false);

 const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/dashbord/mybooking", label: "My Booking", icon: "📦" },
  { to: "/allRoom", label: "All Rooms", icon: "💒" },
  { to: "/dashbord/contactus", label: "Contact Us", icon: "☎️" },
  // Admin route only for specific user
  ...(user?.email === "shawon505214@gmail.com"
    ? [{ to: "/dashbord/admin", label: "Admin", icon: "🛠️" }]
    : [])
];


  //  Logout Function
   const navigate = useNavigate();
  const handleLogout = () => {
    Logout()
      .then((result) => {
        console.log(result);
        toast.success("Logout Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`
          z-40 w-64 bg-white border-r border-gray-200 shadow-lg
          md:static md:translate-x-0
          fixed inset-y-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:flex flex-col
        `}
      >
        {/* Profile section */}
        <div className="flex flex-col items-center gap-2 p-6 border-b border-gray-200">
          <Link to="/dashbord/profile">
            <img
              src={
                user?.photoURL ||
                user?.photo ||
                "https://static.vecteezy.com/system/resources/previews/032/176/191/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg"
              }
              alt="user"
              className="w-20 h-20 rounded-full object-cover"
            />
          </Link>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.displayName || user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email || "youremail@example.com"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-4 py-6 space-y-3 flex-1 ">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : ""
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-base">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ✅ Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full gap-2 px-4  py-2 text-sm  hover:bg-blue-600 hover:text-white
            bg-red-600 rounded-[8px] text-white font-bold
            transition-colors text-center"
          >
             Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 shadow-sm md:justify-end">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBordLayout;
