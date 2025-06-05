import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import Register from "./Register";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { Login, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // login function

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    Login(email, password)
      .then((result) => {
        console.log(result);
        // when locion state is true then goes to user state . or no loacion state -> goes to home page
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message);
      });

    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  // forget password

  const handleForgetPass = () => {
    navigate("/forgetpass", { state: { email } });
  };

  // google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log("Login Success", result.user);
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("Login Successfully");
      })
      .catch((error) => {
        console.error("Login Failed", error);
      });
  };

  return (
    <div className="flex mt-[100px] md:mt-[150px] lg:mt-[200px] justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body shadow-[0px_0px_8px_2px_#2ee235,0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-2xl">
          <h1 className="text-3xl text-center text-black font-bold">
            Login now!
          </h1>

          {loading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            <form onSubmit={handleLogin} className="fieldset">
              {/* email     */}
              <label className="label">Email</label>
              <input
                required
                name="email"
                type="email"
                className="input text-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* password */}
              <label className="label">Password</label>
              <input
                required
                name="password"
                type="password"
                className="input text-black"
                placeholder="Password"
              />
              <div>
                <button onClick={handleForgetPass} className="link link-hover">
                  Forgot password?
                </button>
              </div>
              {/* login btn */}
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>

              {/* google login */}
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
                Don't Have An Account?{" "}
                <Link to="/register" className="font-bold text-blue-500">
                  Register
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>


     
    </div>
  );
};

export default Login;
