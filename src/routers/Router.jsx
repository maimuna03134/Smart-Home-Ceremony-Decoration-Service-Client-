import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/main/MainLayout";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
//   {
//     path: "/auth",
//     element: <AuthLayout />,
//     children: [
//       {
//         path: "/auth/login",
//         element: <Login />,
//       },
//       {
//         path: "/auth/register",
//         element: <Register />,
//       },
//     ],
//   },
]);
