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

        <div className="mt-10">
          <Services />
        </div>

        <div className="mt-10">
          <Faq />
        </div>

        

        <div>
          <AllReview />
        </div>

    {/* Maps */}
        <div className="mt-10">
          <motion.h2
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.5,
              rotate: -10,
              color: "#4F46E5",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              color: "#2563EB",
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            whileHover={{ scale: 1.1, rotate: 5, color: "#1E40AF" }}
            className="text-3xl heading font-extrabold mb-6 text-center select-none cursor-pointer"
          >
            Our Location
          </motion.h2>

          <div style={{ height: "400px", width: "100%" }}>
            <Maps />
          </div>
        </div>



      </div>
    </>
  );
};

export default Home;
