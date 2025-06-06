import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet";
import logins from '../assets/Lottie/loginLottie.json'

const Login = () => {
  const { Login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    Login(email, password)
      .then((result) => {
        console.log(result);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        toast.success("Login Successfully");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      
      <div className="md:flex gap-20 text-base-content mt-[100px] lg:mt-[200px] md:mt-[150px] justify-center items-center px-4">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body shadow-[0px_0px_8px_2px_#2ee235,0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl">
            <h1 className="text-3xl text-center font-bold mb-4">Login now!</h1>

            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={handleLogin} className="fieldset">
                {/* email */}
                <label className="label">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* password */}
                <label className="label mt-4">Password</label>
                <input
                  required
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />

                {/* login btn */}
                <button type="submit" className="btn btn-p mt-4 w-full">
                  Login
                </button>

                {/* google login btn */}
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn bg-white text-black border-[#e5e5e5] mt-3 w-full flex items-center justify-center gap-2"
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

                <p className="mt-4 text-center">
                  Don't Have An Account?{" "}
                  <Link to="/register" className="font-bold text-blue-500">
                    Register
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* animation */}
        <div className="lg:w-[500px] w-full max-w-sm sm:max-w-md">
          <Lottie animationData={logins} loop={true} />
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
