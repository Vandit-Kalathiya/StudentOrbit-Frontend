// eslint-disable-next-line no-unused-vars
import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import heroBg from "../assets/hero-bg.png";
import Sidebar from "./styles/Sidebar";

function Dashboard() {
  return (
    <section
      id="hero"
      className="w-full min-h-[100vh] relative items-center justify-center overflow-hidden"
    >
      {/* <div className="hero-bg absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div> */}
      <div
        className="absolute inset-0 z-10 text-black flex justify-between overflow-x-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.01)",
        }}
      >
          <Sidebar />
      </div>
    </section>
  );
}

export default Dashboard;
