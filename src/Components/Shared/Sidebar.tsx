import {
  Dashboardicon,
  Flight,
  Logout,
  Passenger,
  Settings,
  Signature,
  Plane,
} from "./Icons/Svg";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoAirplaneSharp } from "react-icons/io5";


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Dashboard", icon: <Dashboardicon />, path: "/dashboard-form" },
    { label: "Create A Flight", icon: <Flight />, path: "/create-flight" },
    {
      label: "All Passengers & Crew",
      icon: <Passenger />,
      path: "/allpassenger-crew",
    },
    { label: "Signature", icon: <Signature />, path: "" },
    { label: "Settings", icon: <Settings />, path: "" },
    { label: "Flight Stats", icon: <Plane />, path: "/flight-stats" },
    { label: "Signature", icon: <Signature />, path: "/signature" },
    { label: "Settings", icon: <Settings />, path: "/settings" },
  ];

  const handleLogout = () => {
    console.log("Logged out");
  };

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Close on outside click (mobile only)
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
      {/* Mobile Toggle Button */}
      <div className="xl:hidden fixed top-8 right-5 z-50">
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
          fixed top-0 left-0 h-screen xl:w-[320px] w-fit bg-[#002232] z-40 px-[10px] xl:pt-[150px] pt-10 pb-10
          flex flex-col justify-between transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0  xl:flex`}
      >
        <ul className="flex flex-col gap-5">
          <figure className="flex justify-center xl:hidden mb-8 px-5">
           <IoAirplaneSharp className="size-20 text-white"/>
          </figure>

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

        <button
          onClick={handleLogout}
          className="text-white hover:bg-[#13A6EF] flex items-center gap-x-3 cursor-pointer text-[20px] font-medium px-9 py-5 rounded-lg transition-colors duration-300"
        >
          <Logout />
          Logout
        </button>
      </section>
    </>
  );
};

export default Sidebar;
