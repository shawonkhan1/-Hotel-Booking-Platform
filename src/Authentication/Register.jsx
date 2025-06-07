import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { Helmet } from "react-helmet";
import register from "../assets/Lottie/Register.json";

const Register = () => {
  const { createUser, setUser, updateuser, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one lowercase and one uppercase letter."
      );
      return;
    }

    setLoading(true);

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateuser({ displayName: name, photoURL: image })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: image });
            e.target.reset();
            toast.success("Registration Successful!");
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
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
        <title>Register</title>
      </Helmet>

      <div className="flex items-center justify-center mt-20  px-4">
        <div className=" rounded-3xl max-w-5xl w-full grid md:grid-cols-2 overflow-hidden">
          {/* Left Side - Animation */}
          <div className="hidden md:flex items-center justify-center  mr-4  p-10 rounded-2xl">
            <Lottie animationData={register} loop={true} className="w-full max-w-md" />
          </div>

          {/* Right Side - Register Form */}
          <div className="p-10 bg-indigo-100 rounded-2xl">
            <h2 className="text-4xl font-extrabold text-indigo-700 text-center mb-6">
              Create Account
            </h2>

            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-indigo-700 font-semibold mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="photo" className="block text-indigo-700 font-semibold mb-1">
                    Photo URL
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="text"
                    placeholder="Photo URL (optional)"
                    className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-indigo-700 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-indigo-700 font-semibold mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Register
                </button>

                <div className="text-center text-blue-600 font-semibold">OR</div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-800 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src="https://img.icons8.com/color/24/000000/google-logo.png"
                    alt="Google Logo"
                    className="w-6 h-6"
                  />
                  Register with Google
                </button>

                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Register;
