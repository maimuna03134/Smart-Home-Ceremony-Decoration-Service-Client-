import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Button from "../shared/button/Button";
import { FcGoogle } from "react-icons/fc"; 
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
   const from = location.state || "/";
  const handleGoogleSignIn = async () => {
  setLoading(true); 
  try {
    //User Registration using google
    await signInWithGoogle();

    navigate(from, { replace: true });
    toast.success("Signup Successful");
  } catch (err) {
    console.log(err);
    toast.error(err?.message);
  } finally {
    setLoading(false);
  }
};
  // const handleGoogleSignIn = async () => {
  //   setLoading(true); 
  //   try {
  //     const result = await signInWithGoogle();
  //     const user = result.user;

  //     toast.success(`Welcome ${user.displayName || "back"}!`);
  //     navigate(location.state || "/");
  //   } catch (err) {
  //     console.error("Google sign-in error:", err);

  //     if (err.code === "auth/account-exists-with-different-credential") {
  //       toast.error(
  //         "This email is already linked to another login method. Please use that instead."
  //       );
  //     } else if (err.code === "auth/popup-closed-by-user") {
  //       // User closed popup — no toast needed
  //     } else {
  //       toast.error("Google sign-in failed. Try again.");
  //     }
  //   } finally {
  //     setLoading(false); 
  //   }
  // };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-2 my-6">
        <div className="h-px w-20 bg-gray-300"></div>
        <span className="text-sm text-gray-500">or</span>
        <div className="h-px w-20 bg-gray-300"></div>
      </div>

     
      <Button
        label="Continue with Google"
        icon={FcGoogle} 
        onClick={handleGoogleSignIn}
        loading={loading} 
        disabled={loading}
        outline 
        className="w-full justify-center"
      />
    </div>
  );
};

export default SocialLogin;
