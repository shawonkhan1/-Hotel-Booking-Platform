import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import Loading from "../Components/Loading";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
     <Loading></Loading>
    );
  }

  return (
    <div className="mt-[100px] lg:mt-[150px]">
      <h1 className="text-center font-bold text-2xl py-5"> Your Profile</h1>
      <div className=" flex justify-center items-center">
        <div className="bg-white shadow-[0px_0px_8px_2px_#2ee235,0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl p-6 w-[90%] md:w-[400px] text-center">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
          />
          <h2 className="text-xl text-black font-semibold mt-4">
            {user?.displayName}
          </h2>
          <p className="text-gray-500">{user?.email}</p>
          <Link to="/updateprofile">
            <button className="mt-4  px-4 py-2 bg-green-700 text-white rounded hover:bg-blue-600">
              Update
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center   mt-10">
        <Link to="/">
          <button
            className="btn hover:shadow-[0px_0px_8px_2px_#97F9FF,0px_4px_6px_-1px_rgba(0,0,0,0.1)]
                             transition-all btn-success"
          >
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
