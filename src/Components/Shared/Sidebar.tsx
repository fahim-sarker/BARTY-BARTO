import {
  Dashboardicon,
  Flight,
  Logout,
  Passenger,
  Settings,
  Signature,
} from "./Icons/Svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useAxios from "../../Hooks/UseAxios";
import { toast, ToastContainer } from "react-toastify";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const Axiosinstance = useAxios();

  const navItems = [
    { label: "Dashboard", icon: <Dashboardicon />, path: "/flight-stats" },
    { label: "Create A Flight", icon: <Flight />, path: "/create-flight" },
    {
      label: "All Passengers & Crew",
      icon: <Passenger />,
      path: "/allpassenger-crew",
    },
    { label: "Signature", icon: <Signature />, path: "/signature" },
    { label: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleLogout = async () => {
    try {
      await Axiosinstance.post("/users/logout");
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="xl:hidden fixed top-5 right-5 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-white bg-[#13A6EF] p-2 rounded-md cursor-pointer"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <section
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-screen xl:w-[320px] w-fit bg-[#002232] z-40 px-[10px] xl:pt-[150px] pt-32 pb-10
          flex flex-col justify-between transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0  xl:flex`}
      >
        <ul className="flex flex-col gap-5">
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-x-3 lg:text-[20px] text-[16px] font-medium px-9 py-5 rounded-lg cursor-pointer transition-colors duration-300 ${
                    isActive
                      ? "bg-[#13A6EF] text-white"
                      : "text-white hover:bg-[#13A6EF]"
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-white hover:bg-[#13A6EF] flex items-center gap-x-3 cursor-pointer text-[20px]
             w-full font-medium px-9 py-5 rounded-lg transition-colors duration-300"
        >
          <Logout />
          Logout
        </button>
      </section>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Sidebar;
