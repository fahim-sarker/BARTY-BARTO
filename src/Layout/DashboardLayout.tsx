import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Shared/Sidebar";
import Topbar from "../Components/Shared/Topbar";

const DashboardLayout = () => {
  return (
    <div className="bg-[#F9FAFB]">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <main className="ml-[362px] mt-[140px] w-full pr-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
