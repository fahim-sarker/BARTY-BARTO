import { useState, useEffect, useRef } from "react";
import Container from "./Container";
import Logo from "/logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);


  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-[#F9FAFB] py-4 sm:py-6 fixed w-full top-0 z-50 2xl:px-0 px-5">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <figure className="shrink-0">
            <img src={Logo} alt="Logo" className="w-full" />
          </figure>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden text-2xl text-[#13A6EF] focus:outline-none z-50 cursor-pointer"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-x-6">
            <Link to="/sign-in">
              <button className="px-[38px] py-3 hover:bg-[#13A6EF] hover:text-white duration-300 ease-in-out rounded-[3px] border border-[#13A6EF] font-sans text-[15px] font-bold cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="px-[38px] py-3 rounded-[3px] bg-[#13A6EF] border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out font-sans text-[15px] font-bold cursor-pointer text-white">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Sidebar */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-3/4 sm:w-2/5 bg-[#000] p-6 pt-24 shadow-lg transition-transform duration-700 z-40 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <div className="flex flex-col gap-4">
              <Link to="/sign-in">
                <button className="w-full px-[38px] py-3 border border-[#13A6EF] hover:bg-[#13A6EF] hover:text-white cursor-pointer duration-300 ease-in-out rounded-[3px] font-sans text-[15px] font-bold text-[#fff]">
                  Login
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="w-full px-[38px] py-3 bg-[#13A6EF] border border-[#13A6EF] hover:bg-white hover:text-black duration-300 ease-in-out cursor-pointer rounded-[3px] font-sans text-[15px] font-bold text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
