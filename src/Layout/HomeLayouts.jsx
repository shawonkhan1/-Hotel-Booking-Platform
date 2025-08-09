import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const HomeLayouts = () => {
  return (
    <div>
      <div className="mt-20">
        <Navbar></Navbar>
      </div>
      <div className="lg:min-h-[calc(100vh-290px)] min-h-[calc(100vh-310px)]  md:min-h-[calc(100vh-300px)] lg:mr-[100px]  ml-[20px] mr-[20px] lg:ml-[100px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HomeLayouts;
