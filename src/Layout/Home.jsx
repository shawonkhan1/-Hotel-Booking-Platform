import React from "react";
import Banner from "../Page/Banner";
import FeaturedRoom from "../Page/FeaturedRooms";
import AllReview from "../Page/AllReview";
import Faq from "../Page/Faq";
import Services from "../Page/Services";
import SpecialOffer from "../Page/SpecialOffer";
import { Helmet } from "react-helmet";
import Maps from "../Page/Maps";
import { motion } from "framer-motion";
import DancePage from "../Page/DancePage";
import WhyChoosUs from "../Page/WhyChoosUs";

const Home = () => {
  return (
    <>
      <div className="relative">
        <Helmet>
          <title>Home</title>
        </Helmet>
        <SpecialOffer />
        <Banner />

        <div className="mt-5">
          <FeaturedRoom />
        </div>

        <div>
          <WhyChoosUs></WhyChoosUs>
        </div>

        <div className="">
          <Faq />
        </div>

        <div>
          <AllReview />
        </div>

        {/* Maps */}
        <div className="mt-10">
          <h2 className="text-4xl heading font-bold text-center text-blue-600 mb-15 tracking-wide leading-tight drop-shadow-sm">
            Our Location
          </h2>

          <div style={{ height: "400px", width: "100%" }}>
            <Maps />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
