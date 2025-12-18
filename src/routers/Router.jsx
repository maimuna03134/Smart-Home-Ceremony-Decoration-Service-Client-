import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayouts from "../layouts/authLayout/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import DashBoardLayout from "../layouts/dashboard/DashBoardLayout";
import ErrorPage from "../pages/shared/errorPage/ErrorPage";
import Contact from "../pages/other/Contact";
import About from "../pages/other/About";
import Services from "../pages/servicesPage/Services";
import AddServices from "../pages/servicesPage/AddServices";
import MyProfile from "../pages/dashboard/userDashboard/MyProfile";
import MyBookings from "../pages/dashboard/userDashboard/bookingCollections/MyBookings";
import ServiceDetails from "../pages/servicesPage/ServiceDetails";
import PaymentHistory from "../pages/dashboard/userDashboard/payment/PaymentHistory";
import PaymentSuccess from "../pages/dashboard/userDashboard/payment/PaymentSuccess";
import DashBoard from "../layouts/dashboard/DashBoard";
import ManageBookings from "../pages/dashboard/adminDashboard/ManageBookings/ManageBookings";
import UpdateProjectStatus from "../pages/dashboard/decoratorDashboard/updateProject/UpdateProjectStatus";
import MyProject from "../pages/dashboard/decoratorDashboard/project/MyProject";
import AdminDashboard from "../pages/dashboard/adminDashboard/AdminDashboard";
import ManageUsers from "../pages/dashboard/adminDashboard/manageUsers/ManageUsers";
import AnalyticsCharts from "../pages/dashboard/adminDashboard/AnalyticsCharts/AnalyticsCharts";
import ManageServices from "../pages/dashboard/adminDashboard/ManageServices/ManageServices";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
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
    element: <DashBoard />,
    children: [
      {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "/dashboard/manage-services",
        element: <ManageServices />,
      },
      {
        path: "/dashboard/my-project",
        element: <MyProject />,
      },
      {
        path: "/dashboard/update-project",
        element: <UpdateProjectStatus />,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/add-service",
        element: <AddServices />,
      },
      {
        path: "/dashboard/add-service",
        element: <AddServices />,
      },
      {
        path: "/dashboard/users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsCharts />,
      },
    ],
  },
]);
