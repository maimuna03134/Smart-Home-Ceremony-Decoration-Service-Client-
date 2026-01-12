import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import AuthLayouts from "../layouts/authLayout/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
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
import ManageServices from "../pages/dashboard/adminDashboard/ManageServices/ManageServices";
import PrivateRouter from "./PrivateRouter";
import BecomeDecorator from "../pages/dashboard/userDashboard/BecomeDecorator";
import ManageDecorators from "../pages/dashboard/adminDashboard/ManageDecorators/ManageDecorators";
import AssignDecorator from "../pages/dashboard/adminDashboard/AssignDecorator";
import DecoratorAssignedProjects from "../pages/dashboard/decoratorDashboard/decoratorProject/DecoratorAssignedProjects";
import DecoratorTodaysSchedule from "../pages/dashboard/decoratorDashboard/todaysSchedule/DecoratorTodaysSchedule";
import DecoratorUpdateStatus from "../pages/dashboard/decoratorDashboard/updateProject/DecoratorUpdateStatus";
import DecoratorEarnings from "../pages/dashboard/decoratorDashboard/decoratorEarning/DecoratorEarnings";
import AdminAnalytics from "../pages/dashboard/adminDashboard/AnalyticsCharts/AdminAnalytics";
import DefaultDashboardRedirect from "../layouts/dashboard/DefaultDashboardRedirect";
import Loader from "../pages/shared/loader/Loader";
import Coverage from "../pages/coverage/Coverage";
import ThemeDemo from "../pages/ThemeDemo";
import Pricing from "../pages/pricing/Pricing";
import FAQ from "../pages/faq/FAQ";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import ShippingInfo from "../pages/legal/ShippingInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loader />,
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
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "shipping-info",
        element: <ShippingInfo />,
      },
      {
        path: "service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/coverage",
        element: <Coverage />,
      },
      {
        path: "/theme-demo",
        element: <ThemeDemo />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/become-decorator",
        element: (
          <PrivateRouter>
            <BecomeDecorator />
          </PrivateRouter>
        ),
      },
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
    element: (
      <PrivateRouter>
        <DashBoard />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <DefaultDashboardRedirect />,
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
        element: <DecoratorAssignedProjects />,
      },
      {
        path: "/dashboard/today-schedule",
        element: <DecoratorTodaysSchedule />,
      },
      {
        path: "/dashboard/update-project",
        element: <DecoratorUpdateStatus />,
      },
      {
        path: "/dashboard/decorator-earning",
        element: <DecoratorEarnings />,
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
        path: "/dashboard/decorator",
        element: <ManageDecorators />,
      },
      {
        path: "/dashboard/assign-decorator",
        element: <AssignDecorator />,
      },

      {
        path: "/dashboard/analytics",
        element: <AdminAnalytics />,
      },
    ],
  },
]);
