import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Skip if still loading or no user
    if (loading) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          // Get token from Firebase auth directly
          const currentUser = auth.currentUser;

          if (currentUser) {
            const token = await currentUser.getIdToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        } catch (error) {
          console.error("Error getting token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        // Only logout for 403 (forbidden), not for 401
        // 401 means token issue, not necessarily need to logout
        if (status === 403) {
          console.log("Forbidden - Logging out...");
          await logOut();
          navigate("/auth/login", { replace: true });
        } else if (status === 401) {
          console.log("Unauthorized - Token may be expired");
          // Try to refresh the token
          try {
            const currentUser = auth.currentUser;
            if (currentUser) {
              const newToken = await currentUser.getIdToken(true); // Force refresh
              // Retry the original request with new token
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return axiosSecure.request(error.config);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            await logOut();
            navigate("/auth/login", { replace: true });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
