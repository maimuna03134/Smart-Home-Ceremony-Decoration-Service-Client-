import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayouts from "../layouts/authLayout/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import DashBoardLayout from "../layouts/dashboard/DashBoardLayout";
import ErrorPage from "../pages/shared/errorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      //   {
      //     path: "/services",
      //     element: <Coverage />,
      //   },
      //   {
      //     path: "/coverage",
      //     element: <Coverage />,
      //     loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      //   },
      //   {
      //     path: "/rider",
      //     element: (
      //       <PrivateRouter>
      //         <Rider />
      //       </PrivateRouter>
      //     ),
      //   },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
  },
]);
