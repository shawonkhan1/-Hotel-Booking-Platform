import React from "react";
import { Links } from "./Navbar";
import youtube from "../assets/Lottie/Youtube.json";
import Lottie from "lottie-react";
import facebook from "../assets/Lottie/facebook22.json";
import twitter from "../assets/Lottie/twter22.json";

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
    className="w-10 h-10 hover:scale-110 transition-transform duration-300 lottie-icon"
  >
    <Lottie animationData={twitter} loop autoplay />
  </a>

  {/* YouTube */}
  <a
    href="https://youtu.be/1OAjeECW90E?si=mita7BvUeQJaQ0QX"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="w-10 h-10 hover:scale-110 transition-transform duration-300 lottie-icon"
  >
    <Lottie animationData={youtube} loop autoplay />
  </a>

  {/* Facebook */}
  <a
    href="https://web.facebook.com/MD1Shawon"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="w-10 h-10 hover:scale-110 transition-transform duration-300 lottie-icon"
  >
    <Lottie animationData={facebook} loop autoplay />
  </a>
</div>

        <div className="text-center heading text-sm">
          {/* Contact info */}
          <p className="text-center text-sm mb-2">
            📧{" "}
            <a
              href="mailto:support@easystay.com"
              className=" hover:underline"
            >
              shawon505214@gmail.com
            </a>{" "}
            | | 📞{" "}
            <a
              href="tel:+8801234567890"
              className=" hover:underline"
            >
              +880 1883717078
            </a>
          </p>

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
