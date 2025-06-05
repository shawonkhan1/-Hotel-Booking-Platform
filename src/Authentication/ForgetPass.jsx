import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router";

const ForgetPass = () => {
  const { forgetPass } = useContext(AuthContext);
  const location = useLocation();
  const loginEmail = location.state?.email || "";

  const handleForgetPass = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    forgetPass(email)
      .then((result) => {
        console.log(result);
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-7 md:mt-[100px] lg:mt-[200px] mt-[150px]">
      <div className="card w-11/12 shadow-[0px_0px_15px_0px_rgba(22,36,216,0.5),0px_0px_30px_0px_rgba(0,0,255,0.5)] mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleForgetPass} className="fieldset">
            <h1 className="text-2xl text-center font-bold">forget password</h1>
            <label className="label">Email</label>
            <input
              defaultValue={loginEmail}
              required
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
