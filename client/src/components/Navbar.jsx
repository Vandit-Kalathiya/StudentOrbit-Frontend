// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
// import Button from "../Styles/Button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/game-icons_moon-orbit.png";
import "flowbite";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Button from '../Styles/Button.jsx'

function Navbar({ loginStatus }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  const isLoggedIn =
    localStorage.getItem("s_jwt") || localStorage.getItem("f_jwt");

  return (
    <nav className="bg-[#FFFFFF] border-gray-200 text-black p-2 fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="md:h-8 h-12" alt="StudentOrbit Logo" />
          <span className="hidden md:inline self-center md:text-3xl whitespace-nowrap text-[#012970] font-bold text-2xl">
            StudentOrbit
          </span>
        </a>
<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {isLoggedIn ? (
        <div className="flex gap-3 items-center border-2 border-[#9ca8ff] rounded-3xl px-3 py-1">
          <FaUser size={15} />
          <div className="text-lg font-semibold">
            {localStorage.getItem("username").toUpperCase()}
          </div>
        </div>
      ) : (
        <Link to='/login'> <Button className="bg-[#4859DA] text-white" onClick={handleLoginClick} text="Login" /></Link>
          
      )}
    </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-blue-900">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 md:hover:text-blue-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {isLoggedIn && loginStatus ? (
              <li>
                <Link
                  to={
                    localStorage.getItem("s_jwt")
                      ? "/s/dashboard"
                      : "/f/dashboard"
                  }
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Dashboard
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;