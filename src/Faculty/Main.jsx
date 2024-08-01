// eslint-disable-next-line no-unused-vars
import React from "react";
import MainContent from "./styles/MainContent";
import SideContent from "./styles/SideContent";

function Main() {
  return (
    <div className="flex gap-10 mx-10 p-4 flex-col md:flex-row">
      <MainContent />
      <SideContent />
    </div>
  );
}

export default Main;
