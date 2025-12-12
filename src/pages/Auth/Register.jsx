
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import Button from "../shared/button/Button";
import Loader from "../shared/loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { imageUpload } from "../../utils";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateProfileInfo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = async (data) => {
    setLoading(true);
 const profileImg = data.photo[0];
    try {
     

      // Create user
      await createUser(data.email, data.password);
    

      const imageUrl = await imageUpload(profileImg);

      // Update profile
      await updateProfileInfo({
        displayName: data.name,
        photoURL: imageUrl,
      });

      console.log("Profile updated successfully");
      reset();
      navigate(location.state || "/");
    } catch (error) {
      console.error("Registration failed:", error);
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
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="py-2 text-sm">Register with ZapShift</p>
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              <div>
                <label htmlFor="email" className="label">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot be too long",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* image field */}
              <div>
                <label htmlFor="image" className="label">
                  Profile Image
                </label>

                <input
                  type="file"
                  {...register("image", { required: "Name is required" })}
                  className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-primary
      hover:file:bg-orange-100
      bg-gray-100 border border-dashed border-orange-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-primary/55 focus:border-primary/40
      py-2"
                  placeholder="Your Photo"
                />
              </div>

              {/* email filed */}
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password filed */}
              <div>
                <label className="label">Password</label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="input w-full pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-red-500" role="alert">
                    Password must have at least one uppercase, at least on
                    lowercase and at least one special characters
                  </p>
                )}
              </div>

              <Button label="Sign Up" loading={loading} small />

              <SocialLogin />
            </fieldset>
            <p className="text-sm text-gray-500 font-semibold text-center">
              <span className="hover:text-red-500 ">
                Already have an account ?{" "}
                <Link state={location.state} to="/auth/login">
                  <span className="text-red-500 hover:font-bold"> Login</span>
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
