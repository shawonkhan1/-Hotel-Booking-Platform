import React from 'react';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import Error from '../assets/Lottie/Error.json';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
      <div className="w-full max-w-lg mx-auto">
        <Lottie animationData={Error} loop={true} />
      </div>
      <div className="mt-8">
        <Link to="/">
          <button className="btn btn-primary px-6 py-3 text-lg rounded-md hover:bg-blue-700 transition">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
