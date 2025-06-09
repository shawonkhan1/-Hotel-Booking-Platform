import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import updateProfile from "../assets/Lottie/Update.json";

const UpdateProfile = () => {
  const { updateUserProfiles } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;

    updateUserProfiles(name, photoURL)
      .then(() => {
        toast.success("Successfully updated your profile");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Update Profile</title>
      </Helmet>

      {/* Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-20 px-4">
        {/* Form Section */}
        <div className="card w-full max-w-sm bg-base-100 shadow-[0px_0px_20px_0px_rgba(37,99,235,0.8)] shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleUpdateProfile}>
              <h1 className="text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-4">
                Update Your Profile
              </h1>

              {/* Name Input */}
              <label className="label">Name</label>
              <input
                required
                name="name"
                type="text"
                className="input input-bordered"
                placeholder="Your Name"
              />

              {/* Photo URL Input */}
              <label className="label mt-2">Photo URL</label>
              <input
                required
                name="photo"
                type="text"
                className="input input-bordered"
                placeholder="Your Photo URL"
              />

              {/* Submit Button */}
              <button type="submit" className="btn btn-p mt-4 w-full">
                Update
              </button>
            </form>
          </div>
        </div>

        {/* Lottie Animation */}
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg mt-6 md:mt-0">
          <Lottie animationData={updateProfile} loop={true} />
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
