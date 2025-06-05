import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";

//this route goes to main.jsx and cover company details

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  // find user click path to location
  const location = useLocation();

  // page relod then this site heat the data base and find
  // fo this mini secon no data found/null so this time
  // ui to show a loading

  if (loading) {
    return (
      <span className="loading mt-[100px] loading-spinner loading-xl"></span>
    );
  }

  //if -> use?  childer retun hobe
  if (user && user?.email) {
    return children;
  }
  // else ->  goes to login page and user click this company goes to this compay

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
