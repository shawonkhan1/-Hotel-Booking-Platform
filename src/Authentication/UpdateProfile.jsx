import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { updateUserProfiles } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo.value;
    updateUserProfiles(name, photoURL)
      .then((result) => {
        console.log(result);
        toast.success("successfully Update Your Profile");
      })
      .catch((error) => {
        alert(error.message);
      });

    navigate("/");
  };

  return (
    <div className="mt-7 md:mt-[100px] lg:mt-[200px] mt-[150px]">
      <div className="card w-11/12 shadow-[0px_0px_15px_0px_rgba(22,36,216,0.5),0px_0px_30px_0px_rgba(0,0,255,0.5)] mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleUpdateProfile} className="fieldset">
            <h1 className="text-2xl text-center font-bold">
              Update Your Profile
            </h1>
            {/* name */}
            <label className="label">Name</label>
            <input
              required
              name="name"
              type="text"
              className="input"
              placeholder="Name"
            />
            {/* photURL */}
            <label className="label">PhotoURL</label>
            <input
              required
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
            />

            <button type="submit" className="btn btn-success mt-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
