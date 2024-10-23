// eslint-disable-next-line no-unused-vars
import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import heroBg from "../assets/hero-bg.png";
import Sidebar from "./styles/Sidebar";

function Dashboard({ setLoginStatus }) {
  return (
    <section
      id="hero"
      // className="w-full min-h-[100vh] relative items-center justify-center overflow-hidden"
    >
      <div
        // className="absolute inset-0 z-10 text-black flex justify-between overflow-x-hidden"
        className="justify-between overflow-x-hidden"
        // style={{
        //   background: "rgba(0, 0, 0, 0.01)",
        // }}
      >
          <Sidebar setLoginStatus={setLoginStatus} />
      </div>
    </section>
  );
}

export default Dashboard;
