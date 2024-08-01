// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
// import Button from "../Styles/Button";
import { Link } from "react-router-dom";
import logo from '../assets/game-icons_moon-orbit.png'
import 'flowbite';


function Navbar() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    // <div className="fixed z-[99] w-full md:px-20 px-4 py-8 flex justify-between items-center bg-[#FCFCFC]">
    //   <div className="logo px-4">
    //     <h3 className="font-semibold">StudentOrbit</h3>
    //   </div>
    //   <div
    //     className="links flex gap-10 items-center"
    //     data-aos="fade-down"
    //     data-aos-delay="100"
    //   >
    //     {[
    //       { name: "Home", path: "/" },
    //       { name: "About", path: "/about" },
    //       { name: "Features", path: "/features" },
    //       { name: "Contact", path: "/contact" },
    //     ].map((item, index) => (
    //       <Link
    //         key={index} to={item.path}
    //         className={`text-md capitalize hover:text-[#4859da] font-semibold py-2`}
    //       >
    //         {item.name}
    //       </Link>
    //     ))}
    //     <Link to="/login">
    //       <Button text="Get Started" p={3} />
    //     </Link>
    //   </div>
    // </div>
    



<nav className="bg-[#FFFFFF] border-gray-200 text-black p-2 fixed top-0 left-0 w-full z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="md:h-8 h-12" alt="StudentOrbit Logo" />
      <span className="hidden md:inline self-center md:text-3xl whitespace-nowrap text-[#012970] font-bold text-2xl">StudentOrbit</span>
  </a>
  <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="flex text-sm bg-gray-200 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-200" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FbpvZh5jwaDNTSer_Ac03nhI6PVoYV400A&s" alt="user photo" />
      </button>

      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-blue-900">
      <li>
        <Link to="/" className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 md:hover:text-blue-700" aria-current="page">Home</Link>
      </li>
      <li>
        <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
      </li>
      <li>
        <Link to="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</Link>
      </li>
      <li>
        <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>


  );
}

export default Navbar;
