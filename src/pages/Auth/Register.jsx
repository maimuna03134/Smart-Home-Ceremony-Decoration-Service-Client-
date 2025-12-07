import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

import axios from "axios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateProfileInfo } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = (data) => {
    console.log("after register : ", data.photo[0]);
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate("/");

        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateProfileInfo(userProfile)
            .then(() => {
              console.log("user profile updated done.");
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

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
                className="input"
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
                className="file-input"
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
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Email is required
                </p>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
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
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>

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
