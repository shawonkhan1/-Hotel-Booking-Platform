import React from "react";
import { Links } from "./Navbar";

const Footer = () => {
  return (
    <div className="mt-10 bg-base-200 text-base-content">
      <footer className="p-6 max-w-6xl mx-auto">
        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
          {Links}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {/* Twitter */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M23.954 4.569c-0.885 0.392-1.83 0.656-2.825 0.775 1.014-0.609 1.794-1.574 2.163-2.723-0.949 0.564-2.005 0.974-3.127 1.195-0.897-0.956-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 0.39 0.045 0.765 0.127 1.124-4.087-0.205-7.713-2.164-10.141-5.144-0.423 0.722-0.666 1.561-0.666 2.457 0 1.694 0.863 3.192 2.175 4.068-0.802-0.025-1.56-0.246-2.223-0.616v0.061c0 2.367 1.683 4.342 3.918 4.786-0.41 0.111-0.841 0.171-1.287 0.171-0.315 0-0.622-0.03-0.922-0.086 0.623 1.944 2.432 3.361 4.576 3.4-1.676 1.314-3.792 2.098-6.088 2.098-0.395 0-0.785-0.023-1.17-0.069 2.174 1.394 4.757 2.207 7.548 2.207 9.054 0 14.002-7.498 14.002-13.986 0-0.21 0-0.42-0.015-0.63 0.962-0.695 1.796-1.562 2.457-2.549z" />
            </svg>
          </a>

          {/* YouTube  */}
          <a
            href="https://youtu.be/d-0IN2pt2kI?si=FUvzvPkmxbZwYGK_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l0.358-4h-4v-1.667c0-0.955 0.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.709-5.192 4.981v3.019z" />
            </svg>
          </a>
        </div>

        <div className="text-center text-sm">
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
