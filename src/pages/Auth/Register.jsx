import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from '../Auth/SocialLogin';
import Button from "../shared/button/Button";
import Loader from "../shared/loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import toast from "react-hot-toast";
import { useTheme } from "../../contexts/ThemeContext";

const Register = () => {
  const { createUser, updateProfileInfo, loading } = useAuth();
  const { isDark } = useTheme();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = async (data) => {
    const { name, email, password, image } = data;

    if (!image || image.length === 0) {
      toast.error("Please select a profile image");
      return;
    }

    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      console.log("Uploaded image URL:", imageUrl);

      await createUser(email, password);

      await saveOrUpdateUser({ name, email, image: imageUrl });

      await updateProfileInfo(name, imageUrl);

      toast.success("Registration Successful!");
      reset();
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Registration error:", error);
      toast.error(error.message || "Registration failed");
    }
  };
  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  if (loading) return <Loader />;

  return (
    <div className={`hero-content flex-col ${isDark ? 'text-white' : ''}`}>
      <div className="text-center lg:text-left">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : ''}`}>Create an Account</h1>
        <p className={`py-2 text-sm ${isDark ? 'text-gray-300' : ''}`}>Register with StyleDecor</p>
      </div>

      <div className={`card w-full max-w-sm shrink-0 shadow-2xl ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-base-100'
      }`}>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              {/* name filed */}
              <div>
                <label htmlFor="email" className={`label ${isDark ? 'text-gray-300' : ''}`}>
                  Name
                </label>
                <input
                  type="text"
                  className={`input w-full ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : ''
                  }`}
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
                <label htmlFor="image" className={`label ${isDark ? 'text-gray-300' : ''}`}>
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                  className={`px-2 block w-full text-sm rounded cursor-pointer py-2 ${
                    isDark 
                      ? 'text-gray-300 bg-gray-700 border border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90' 
                      : 'text-gray-500 bg-gray-100 border border-dashed border-orange-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-primary hover:file:bg-orange-100'
                  }`}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* email filed */}
              <div>
                <label className={`label ${isDark ? 'text-gray-300' : ''}`}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input w-full ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : ''
                  }`}
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
                <label className={`label ${isDark ? 'text-gray-300' : ''}`}>Password</label>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    className={`input w-full pr-10 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : ''
                    }`}
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
                    className={`absolute top-3 right-3 ${
                      isDark 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
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
            <p className={`text-sm font-semibold text-center ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span className={`${
                isDark ? 'hover:text-red-400' : 'hover:text-red-500'
              }`}>
                Already have an account ?{" "}
                <Link state={location.state} to="/auth/login">
                  <span className={`${
                    isDark 
                      ? 'text-red-400 hover:font-bold' 
                      : 'text-red-500 hover:font-bold'
                  }`}> Login</span>
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
