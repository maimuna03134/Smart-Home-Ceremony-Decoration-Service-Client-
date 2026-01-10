import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../Auth/SocialLogin";
import Button from "../shared/button/Button";
import toast from "react-hot-toast";
import Loader from "../shared/loader/Loader";
import { FaEye, FaEyeSlash, FaPaintBrush, FaUser, FaUserShield } from "react-icons/fa";
import { saveOrUpdateUser } from "../../utils";
import { DEMO_CREDENTIALS } from "../../config/demoCredentials";

const Login = () => {
  const { signIn, loading, setLoading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const email = watch("email");
  const location = useLocation();
  const navigate = useNavigate();

  // Get user-friendly error message
  const getErrorMessage = (error) => {
    console.log("Error object:", error);
    console.log("Error code:", error?.code);
    console.log("Error message:", error?.message);

    const errorCode = error?.code;
    const errorMessage = error?.message || "";

    // Check Firebase error codes (new version)
    if (errorCode === "auth/invalid-credential" ||
      errorCode === "auth/wrong-password" ||
      errorMessage.includes("INVALID_LOGIN_CREDENTIALS") ||
      errorMessage.includes("invalid-credential")) {
      return "❌ Incorrect email or password. Please try again.";
    }

    if (errorCode === "auth/user-not-found" ||
      errorMessage.includes("USER_NOT_FOUND")) {
      return "❌ No account found with this email. Please register first.";
    }

    if (errorCode === "auth/invalid-email" ||
      errorMessage.includes("INVALID_EMAIL")) {
      return "❌ Invalid email address format.";
    }

    if (errorCode === "auth/user-disabled" ||
      errorMessage.includes("USER_DISABLED")) {
      return "❌ This account has been disabled. Contact support.";
    }

    if (errorCode === "auth/too-many-requests" ||
      errorMessage.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
      return "❌ Too many failed attempts. Please try again later.";
    }

    if (errorCode === "auth/network-request-failed") {
      return "❌ Network error. Please check your internet connection.";
    }

    // Default error message
    return "❌ Login failed. Please check your credentials and try again.";
  };

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const { user } = await signIn(data.email, data.password);

      const isDemoAccount = Object.values(DEMO_CREDENTIALS).some(
        (cred) => cred.email === data.email
      );

      await saveOrUpdateUser({
        name: user?.displayName || "User",
        email: user?.email,
        image: user?.photoURL || "https://i.ibb.co/9ZQW8Yx/user.png",
        isDemo: isDemoAccount,
      });

      if (isDemoAccount) {
        toast.success("Logged in with demo account! Note: Some features are read-only.", {
          duration: 4000,
          icon: "ℹ️",
        });
      } else {
        toast.success("✅ Login successful! Welcome back!", {
          duration: 3000,
        });
      }

      reset();
      setSelectedDemoRole(null);
      navigate(location.state?.from || "/", { replace: true });

    } catch (err) {
      console.error("Login error:", err);

      const friendlyMessage = getErrorMessage(err);

      toast.error(friendlyMessage, {
        duration: 5000,
        style: {
          background: "#FEE2E2",
          color: "#991B1B",
          border: "1px solid #FCA5A5",
        },
      });

    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const credentials = DEMO_CREDENTIALS[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
    setSelectedDemoRole(role);

    toast.success(`🎯 Demo ${role} credentials loaded! Click Login to continue.`, {
      duration: 3000,
    });
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
              {/* Demo Login Section */}
              <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-gray-700 mb-3 text-center">
                  🎯 Try Demo Login
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("customer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${selectedDemoRole === "customer"
                      ? "bg-blue-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-blue-100 hover:shadow-md"
                      }`}
                  >
                    <FaUser className="text-xl mb-1" />
                    <span className="text-xs font-medium">Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin("decorator")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${selectedDemoRole === "decorator"
                      ? "bg-purple-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-purple-100 hover:shadow-md"
                      }`}
                  >
                    <FaPaintBrush className="text-xl mb-1" />
                    <span className="text-xs font-medium">Decorator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin("admin")}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${selectedDemoRole === "admin"
                      ? "bg-red-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-red-100 hover:shadow-md"
                      }`}
                  >
                    <FaUserShield className="text-xl mb-1" />
                    <span className="text-xs font-medium">Admin</span>
                  </button>
                </div>
                {selectedDemoRole && (
                  <p className="text-xs text-center mt-2 text-gray-600">
                    ✓ {DEMO_CREDENTIALS[selectedDemoRole].name} selected
                  </p>
                )}
              </div>

              <div className="divider text-xs text-gray-500">OR Login Manually</div>

              {/* Email field */}
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
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password field */}
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
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot password */}
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
                loading={loading}
                disabled={loading}
                className="w-full"
              />

              <SocialLogin />
            </fieldset>

            <p className="text-sm text-gray-500 font-semibold text-center mt-4">
              <span className="hover:text-red-500">
                New to StyleDecor?
                <Link state={location.state} to="/auth/register">
                  <span className="text-red-500 hover:font-bold"> Register</span>
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