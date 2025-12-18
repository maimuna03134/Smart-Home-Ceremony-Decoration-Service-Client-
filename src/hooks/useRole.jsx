
import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
  const { user, loading } = useAuth();
 

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
      );
      return result.data.role;
    },
  });

  //   return { role, isRoleLoading }
  return [role, isRoleLoading];
};

export default useRole;
