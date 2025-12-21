import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (loading || !user) return;

  
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        try {
          const token = await user.getIdToken(); 
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Unauthorized - Logging out...");
          await logOut();
          navigate("/login", { replace: true });
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
