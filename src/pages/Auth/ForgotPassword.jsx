import React, { useEffect } from "react";
import { Link, useLocation } from "react-router";

import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import { useTheme } from "../../contexts/ThemeContext";

const ForgotPassword = () => {
  const { forgotPass } = useAuth();
  const { isDark } = useTheme();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (location.state?.email) {
      setValue("email", location.state.email);
    }
  }, [location.state, setValue]);

  const handleForgotPassword = async (data) => {
    try {
      await forgotPass(data.email);
      toast.success("Password reset email sent! Check your inbox.");

      window.open("https:mail.google.com", "_blank");
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
    }
  };
  return (
    <div className={`flex justify-center items-center min-h-screen ${
      isDark ? 'bg-gray-900' : ''
    }`}>
      <div className={`card w-full max-w-md shadow-2xl p-8 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-base-100'
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-orange-400' : 'text-orange-600'
          }`}>Reset Password</h2>
          <p className={`mt-2 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="space-y-6"
        >
          <div className="form-control">
            <label className="label">
              <span className={`label-text font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`input input-bordered w-full ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : ''
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            label="Send Reset Link"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          />

          <div className="text-center">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Remember your password?{" "}
              <Link
                to="/auth/login"
                className={`font-semibold hover:underline ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
