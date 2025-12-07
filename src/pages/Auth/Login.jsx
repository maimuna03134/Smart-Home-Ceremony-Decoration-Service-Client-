import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleLogin = (data) => {
    console.log("after register : ", data);

    signIn(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero-content flex-col">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="py-2 text-sm">Login with ZapShift</p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Email name is required
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
              <button className="btn btn-neutral mt-4">Login</button>
              <SocialLogin />
            </fieldset>
            <p className="text-sm text-gray-500 font-semibold text-center">
              <span className="hover:text-red-500 ">
                New to Zap Shift ?
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
