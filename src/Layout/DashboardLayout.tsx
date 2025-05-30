import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Shared/Sidebar";
import Topbar from "../Components/Shared/Topbar";

const DashboardLayout = () => {
  return (
    <div className="bg-[#F9FAFB] h-full">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="xl:ml-[330px] mt-[140px] px-5 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
