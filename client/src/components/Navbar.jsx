import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/game-icons_moon-orbit.png";
import "flowbite";
import { FaUser } from "react-icons/fa";
import Button from "../Styles/Button.jsx";
import { GiMoonOrbit } from "react-icons/gi";
import { getUsernameFromToken } from "../../authToken.js";

function Navbar({ loginStatus }) {
  const navigate = useNavigate();
  const fetchedUsername = getUsernameFromToken();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const isLoggedIn = getUsernameFromToken();

  const getNavLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded ${isActive ? "text-[#4859DA]" : "text-gray-900"
    } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#4859DA] md:p-0`;

  return (
    <nav className="bg-[#FFFFFF] border-gray-200 text-black p-2 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <svg width="3em" height="3em" viewBox="0 0 24 24">
            {/* Define the gradient */}
            <defs>
              <linearGradient id="purpleBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#7b2cbf", stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            {/* Apply the gradient to the icon */}
            <GiMoonOrbit size="1.5em" style={{ fill: "url(#purpleBlueGradient)" }} />
          </svg>

          {/* } className="md:h-10 h-12" alt="StudentOrbit Logo" /> */}
          <span className="inline self-center md:text-3xl whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800 font-bold text-[1.75rem]">
            StudentOrbit
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <div className="flex gap-3 items-center border-2 border-[#9ca8ff] rounded-3xl px-3 py-3 md:px-3 md:py-1">
              <FaUser size={15} color="#6727e8" />
              <div className="hidden md:block text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {getUsernameFromToken().toUpperCase()}
              </div>
            </div>
          ) : (
            <NavLink to="/login">
              <Button
                className="bg-[#4859DA] text-white"
                onClick={handleLoginClick}
                text="Login"
              />
            </NavLink>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-blue-900">
            <li>
              <NavLink
                to="/"
                className={getNavLinkClass}
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn && loginStatus ? (
              <li>
                <NavLink
                  to={
                    fetchedUsername.startsWith("22CE")
                      ? "/s/dashboard"
                      : "/f/dashboard"
                  }
                  className={getNavLinkClass}
                >
                  Dashboard
                </NavLink>
              </li>
            ) : null}
            {/* <li>
              <NavLink
                to="/about"
                className={getNavLinkClass}
              >
                About
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/contact"
                className={getNavLinkClass}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
