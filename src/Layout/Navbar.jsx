import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
// import users from "../assets/anime-girl-red-eyes-fantasy-4k-wallpaper-uhdpaper.com-716@2@b.jpg";


import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

export const Links = (
  <>
    <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/">
      Home
    </NavLink>
    <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/allRoom">
     Rooms
    </NavLink>
     <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/galary">
      Galary
    </NavLink>
    <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/myBooking">
      My Bookings
    </NavLink>
   
    <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/contact">
     ContactUs
    </NavLink>
    

    
  
  </>
);

const Navbar = () => {
  // theme ar jnno state
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "synthwave" ? "light" : "synthwave";
    setTheme(newTheme);
  };

  // end theme

  const { user, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
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

  // nav ar user ar jnno spnier

  return (
    <div className="fixed top-0 left-0 right-0 z-50 navbar lg:pl-[100px] lg:pr-[100px] bg-base-100 shadow-sm">
      <div className={`navbar-start ${theme === "synthwave" ? "text-white" : "text-base-content"}`}>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
             {/*admin This site maker*/}
    {user?.email === "shawon505214@gmail.com" && (
      <NavLink
        className="text-[20px] p-2 text-base-content hover:text-primary"
        to="/admin"
      >
        Admin
      </NavLink>
    )}
              {/*admin This site maker*/}
          </ul>
        </div>
       
        {/* logo */}
      
  <Link
  to="/"
  className={`text-3xl font-extrabold select-none ml-2 transition-all duration-300 ${
    theme === "synthwave"
      ? "text-white"
      : "bg-gradient-to-r heading from-blue-600 to-cyan-500 text-transparent bg-clip-text"
  } hidden md:flex`}
>
  EasyStay<span className={`${theme === "synthwave" ? "text-pink-500" : "text-blue-600"}`}></span>
</Link>
      </div>

      <div className="navbar-center  hidden lg:flex">
        {Links}

          {/*admin This site maker*/}
    {user?.email === "shawon505214@gmail.com" && (
      <NavLink
        className="text-[20px] p-2 text-base-content hover:text-primary"
        to="/admin"
      >
        Admin
      </NavLink>
    )}
       {/*admin This site maker*/}

      </div>

      <div className="navbar-end   gap-4">
        {/* dark mode ar jnno */}
        <label className="toggle  text-base-content">
          <input
            type="checkbox"
            onChange={handleTheme}
            checked={theme === "synthwave"}
            value="synthwave"
            className="theme-controller"
          />

          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
        {/* end dark mode */}
        {user ? (
          <button onClick={handleLogOut} className="btn btn-p">
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
            {" "}
            <Link to="/login">
              <button className="btn btn-p">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-p">Register</button>
            </Link>
          </div>
        )}

        {user ? (
          <div
            className="tooltip tooltip-right"
            data-tip={user?.displayName || "User"}
          >
            <Link to="/profile">
              <div className="avatar">
                <div className="ring-primary  ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} alt="User Avatar" />
                </div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
