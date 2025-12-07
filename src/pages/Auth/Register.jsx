import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

import axios from "axios";
import SocialLogin from "./SocialLogin";
import Button from "../shared/button/Button";
import Loader from "../shared/loader/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

    try {
      const profileImg = data.photo[0];

      // Create user
      const result = await createUser(data.email, data.password);
        console.log("User created:", result.user);
         reset();
      navigate("/");
      // Upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );

      const imageUrl = imageResponse.data.data.url;

      // Update profile
      await updateProfileInfo({
        displayName: data.name,
        photoURL: imageUrl,
      });

      console.log("Profile updated successfully");
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
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input w-full"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Name is required
                </p>
              )}
              {/* photo image field */}
              <label className="label">Photo</label>

              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input w-full"
                placeholder="Your Photo"
              />

              {errors.name?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )}
              {/* email filed */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="you@example.com"
                className="input w-full"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Email is required
                </p>
              )}
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
