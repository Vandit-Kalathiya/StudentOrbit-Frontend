import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

function Dashboard({ setLoginStatus }) {

  return (
    <section id="hero">
      <div className="justify-between">
        <Sidebar setLoginStatus={setLoginStatus} />
      </div>
      
    </section>
  );
}

export default Dashboard;
