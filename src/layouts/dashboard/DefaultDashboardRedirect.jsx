
import { useEffect } from "react";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router";
import Loader from "../../pages/shared/loader/Loader";


const DefaultDashboardRedirect = () => {
  const [role, isRoleLoading] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (isRoleLoading) return;

    if (role === "admin") {
      navigate("/dashboard/analytics"); 
    } else if (role === "decorator") {
      navigate("/dashboard/decorator-earning");
    } else {
      navigate("/dashboard/profile");
    }
  }, [role, isRoleLoading, navigate]);

  return <Loader />; 
};

export default DefaultDashboardRedirect;
