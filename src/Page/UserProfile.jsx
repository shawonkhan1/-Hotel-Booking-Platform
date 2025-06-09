import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import Lottie from "lottie-react";
import profile from "../assets/Lottie/UserProfile.json";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="mt-[80px] lg:mt-[120px] px-4">
      {/* Layout: Profile + Animation */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {/* Profile Card */}
        <div className="bg-white shadow-[0px_0px_20px_0px_rgba(37,99,235,0.8)] rounded-2xl p-6 w-full max-w-sm text-center">
          <h1 className="text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4">
            Your Profile
          </h1>

          <img
            src={
              user?.photoURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJxYx_5I3nVr3oJdVp8jpvvELUKjK1PtL1G6hCRyNPK1QNptgSkIxpEeXmiCdQIY8yMI&usqp=CAU"
            }
            alt="User"
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl font-semibold text-black mt-4">
            {user?.displayName}
          </h2>
          <p className="text-gray-500">{user?.email}</p>

          <Link to="/updateprofile">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
              Update
            </button>
          </Link>
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
          <Lottie animationData={profile} loop={true} />
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-10">
        <Link to="/">
          <button className="btn btn-p hover:shadow-[0_0_8px_2px_#97F9FF] transition-all">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
