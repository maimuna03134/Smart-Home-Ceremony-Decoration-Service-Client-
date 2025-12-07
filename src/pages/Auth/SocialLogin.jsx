import React from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { signInWithGoogle, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // google sign in
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then((res) => {
        const user = res.user;
        setUser(user);
        setUser(user);
        toast(`Welcome ${user.displayName || "User"}!`);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        if (err.code === "auth/account-exists-with-different-credential") {
          toast.error(
            "This email is already registered with another login provider. Please use that method."
          );
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="h-px w-16 bg-gray-600/40"></div>
        <span className="text-sm text-gray-400/90">or</span>
        <div className="h-px w-16 bg-gray-600/40"></div>
      </div>
      {/* google signin */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
