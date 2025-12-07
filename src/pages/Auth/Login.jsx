import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import Button from "../shared/button/Button";
import toast from "react-hot-toast";
import Loader from "../shared/loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

    const email = watch("email");
    
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useAuth();

    const handleLogin = async (data) => {
      setLoading(true); 

      try {
        await signIn(data.email, data.password);
          toast.success("Login successful!");
          reset();
        navigate(location.state?.from || "/", { replace: true });
      } catch (err) {
        toast.error(err.message || "Login failed");
      } finally {
        setLoading(false); 
      }
    };
    
     const handleTogglePasswordShow = (e) => {
       e.preventDefault();
       setShowPass(!showPass);
    };
    

    if (loading) return <Loader />;

  return (
    <div className="hero-content flex-col">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="py-2 text-sm">Login with StyleDecor</p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset space-y-4">
              {/* Email */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password filed */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="input w-full pr-10"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                  })}
                />
                <button
                  type="button"
                  onClick={handleTogglePasswordShow}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500" role="alert">
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Password must have at least one uppercase, at least on
                  lowercase and at least one special characters
                </p>
              )}

              {/* forgot pass */}
              <label className="label my-2">
                <Link
                  to="/auth/forgot-password"
                  state={{ email: email || "" }}
                  className="label-text-alt link link-hover hover:text-orange-500"
                >
                  Forgot password?
                </Link>
              </label>

              <Button
                label="Login"
                loading={false}
                disabled={false}
                className="w-full"
              />
              <SocialLogin />
            </fieldset>
            <p className="text-sm text-gray-500 font-semibold text-center">
              <span className="hover:text-red-500 ">
                New to StyleDecor ?
                <Link state={location.state} to="/auth/register">
                  <span className="text-red-500 hover:font-bold">
                    {" "}
                    Register
                  </span>
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
