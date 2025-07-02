import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const Links = () => {
  const { user } = useContext(AuthContext);

  return (
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
      {user && (
        <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/myBooking">
          My Bookings
        </NavLink>
      )}
      {user && (
        <NavLink className="text-[20px] p-2 text-base-content hover:text-primary" to="/contact">
        Contact Us
      </NavLink>
      )}
      
    </>
  );
};

export default Links;
