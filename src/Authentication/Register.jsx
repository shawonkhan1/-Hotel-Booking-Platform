import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet";
import register from '../assets/Lottie/Register.json'

const Register = () => {
  const { createUser, setUser, updateuser, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  // Register function
  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    //  password length cheak
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // password validation cheak
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one lowercase and one uppercase letter."
      );
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // user email and pass +  name and pic (...user,{})
        // if user name and pic then set his data in setUser //
        updateuser({ displayName: name, photoURL: image })
          .then(() => {
            // setUser(result.user)
            setUser({ ...user, displayName: name, photoURL: image });
            e.target.reset();
            toast.success("Registration Successful!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        // alert(error.message);
        toast.error(error.message);
      });
    // end register

    // strt password length cheak

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 100);
    //  end password length cheak
  };

  // google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Login Success", result.user);
        toast.success(" Login Successfully ");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.error("Login Failed", error);
      });
  };

  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className="md:flex gap-20 text-base-content  mt-[100px] lg:mt-[200px] md:mt-[150px] justify-center items-center">
    
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body shadow-[0px_0px_8px_2px_#2a30b1,0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl">
          <h1 className="text-3xl text-center font-bold">
            Register now!
          </h1>

          {loading ? (
            <Loading></Loading>
          ) : (
            <form onSubmit={handleRegister} className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                required
                name="name"
                type="text"
                className="input "
                placeholder="Your Name"
              />
              {/* photo */}
              <label className="label">Photo URL</label>
              <input
               
                name="photo"
                type="text"
                className="input "
                placeholder="Photo URL"
              />
              {/* email */}
              <label className="label">Email</label>
              <input
                required
                name="email"
                type="email"
                className="input "
                placeholder="Your Email"
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                required
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              {/* register btn */}
              <button type="submit" className="btn btn-p mt-4 ">
                Register
              </button>
              {/* google login btn */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>

              <p>
                You Already Have An Account?{" "}
                <Link to="/login" className="font-bold text-blue-500">
                  Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
          {/* animiton add */}
          <div className="lg:w-[500px]">
              <Lottie animationData={register} loop={true} />
          </div>
          {/* animiton add */}
    </div>
    </>
  );
};

export default Register;
