import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: role = "user", 
    isLoading: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/role/${user?.email}`
      );
      
      return res.data?.role || "user";
    },
    enabled: !authLoading && !!user?.email, 
    retry: 1,
    staleTime: 5 * 60 * 1000, 
  });

 
  const isLoading = authLoading || roleLoading;

    return [
      
    role, 
    isLoading, 
    isError, 
    error, 
  ];
};

export default useRole;
