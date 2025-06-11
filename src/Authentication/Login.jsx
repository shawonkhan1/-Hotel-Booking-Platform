import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet";
import logins from "../assets/Lottie/loginLottie.json";
import { motion } from "framer-motion";

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
        toast.success("Login Successful");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        toast.success("Google Login Successful");
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

      <div className="pt-20">
        <div className=" flex items-center justify-center  bg-gradient-to-br px-4">
          <div className=" rounded-2xl  w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/*card color - bg-indigo-100 */}
            {/* Animation */}
            <div className="hidden md:flex rounded-2xl mr-2 items-center justify-center  p-10">
              <Lottie
                animationData={logins}
                className="w-full max-w-md"
                loop={true}
              />
            </div>

            {/* Login Form */}
            <div className="p-8 md:p-10 bg-indigo-100   rounded-2xl">
              <motion.h2
                className="text-3xl heading text-blue-600 font-semibold  mb-6 text-center"
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Login to Your Account
              </motion.h2>

              {loading ? (
                <Loading />
              ) : (
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Password
                    </label>
                    <input
                      required
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold "
                  >
                    Login
                  </button>

                  {/* OR */}
                <div className="divider text-black">OR</div>

                  {/* Google Login */}
                  <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full border border-gray-300 bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <img
                      src="https://img.icons8.com/color/16/000000/google-logo.png"
                      alt="Google"
                    />
                    Login with Google
                  </button>

                  {/* Link to Register */}
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
