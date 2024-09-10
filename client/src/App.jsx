// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Faculty/Dashboard";
import DashboardS from "./Students/Dashboard";

function App() {
  return (
    // 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/f/dashboard/*" element={<Dashboard />} />
        <Route path="/s/dashboard/*" element={<DashboardS />} />
      </Routes>
    </Router>
  );
}

export default App;
