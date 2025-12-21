import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../pages/shared/loader/Loader";


const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRouter;
