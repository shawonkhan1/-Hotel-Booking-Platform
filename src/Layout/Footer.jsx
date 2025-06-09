import React from "react";
import { Links } from "./Navbar";
import youtube from '../assets/Lottie/Youtube.json'
import Lottie from "lottie-react"; 
import facebook from '../assets/Lottie/facebook22.json'
import twitter from '../assets/Lottie/twter22.json'

const Footer = () => {
  return (
    <div className="mt-10 bg-base-200 text-base-content">
      <footer className="p-6 max-w-6xl  mx-auto">
        {/* Nav links */}
        <div className="flex  flex-wrap justify-center gap-4 mb-6 text-sm">
          {Links}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {/* Twitter */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="w-10 h-10 hover:scale-110 transition-transform duration-300"
          >
            <Lottie animationData={twitter} loop autoplay />
          </a>

          {/* YouTube  */}
          <a
            href="https://youtu.be/d-0IN2pt2kI?si=FUvzvPkmxbZwYGK_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 hover:scale-110 transition-transform duration-300"
          >
            <Lottie animationData={youtube} loop autoplay />
          </a>

          {/* Facebook */}
           <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 hover:scale-110 transition-transform duration-300"
          >
            <Lottie animationData={facebook} loop autoplay />
          </a>
        </div>

        <div className="text-center heading text-sm">
          <p>
            &copy; {new Date().getFullYear()} <strong>EasyStay</strong> — All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
