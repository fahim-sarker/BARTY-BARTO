import { createBrowserRouter } from "react-router-dom";
import Signup from "../Pages/Authpage/Signup";
import  RootLayout from "../Layout/RootLayout";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: "",
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
    element: <DashboardLayout/>,
    errorElement: "",
    children: [
      { path: "/dashboard-form", element: <Dashboardform /> },
      { path: "/create-flight", element: <CreateFlight /> },
      { path: "/allpassenger-crew", element: <AllpassengerCrew /> },
      { path: "/flight-stats", element: <FlightStats /> },
      { path: "/signature", element: <Signature /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);
