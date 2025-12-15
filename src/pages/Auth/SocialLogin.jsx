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

      const result = await signInWithGoogle();
      const user = result.user;

      toast.success(`Welcome ${user.displayName || "back"}!`);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

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
