import { createBrowserRouter } from "react-router-dom";
import Signup from "../Pages/Authpage/Signup";
import RootLayout from "../Layout/RootLayout";
import Signin from "../Pages/Authpage/Signin";
import ForgotPassword from "../Pages/Authpage/ForgotPassword";
import AccountConfiramtion from "../Pages/Authpage/AccountConfiramtion";
import Verification from "../Pages/Authpage/Verification";
import ResetPassword from "../Pages/Authpage/ResetPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboardform from "../Pages/Dashboard/Dashboardform";
import AllpassengerCrew from "../Pages/Dashboard/AllpassengerCrew";
import CreateFlight from "../Pages/Dashboard/CreateFlight";
import FlightStats from "../Pages/Dashboard/FlightStats";
import Signature from "../Pages/Dashboard/Signature";
import Settings from "../Pages/Dashboard/Settings";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Signup /> },
      { path: "/sign-in", element: <Signin /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/account-confirmation", element: <AccountConfiramtion /> },
      { path: "/verification", element: <Verification /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard-form",
        element: (
          <PrivateRoute>
            <Dashboardform />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-flight",
        element: (
          <PrivateRoute>
            <CreateFlight />
          </PrivateRoute>
        ),
      },
      {
        path: "/allpassenger-crew",
        element: (
          <PrivateRoute>
            <AllpassengerCrew />
          </PrivateRoute>
        ),
      },
      {
        path: "/flight-stats",
        element: (
          <PrivateRoute>
            <FlightStats />
          </PrivateRoute>
        ),
      },
      {
        path: "/signature",
        element: (
          <PrivateRoute>
            <Signature />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
