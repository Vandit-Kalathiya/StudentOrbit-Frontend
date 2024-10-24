import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Faculty/Dashboard";
import DashboardS from "./Students/Dashboard";
import OTPVerification from "./components/Auth/OTPVerification";
import { useEffect, useState } from "react";
import Lenis from '@studio-freight/lenis';
import Loader from "./components/Loader.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  const userRole = localStorage.getItem("role");
  const [isLoggedIn, setIsLoggedIn] = useState(userRole !== null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => t,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }


  return (
    <Router>
      <Navbar loginStatus={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/otp/verify" element={<OTPVerification setLoginStatus={setIsLoggedIn} />} />
        <Route path="/*" element={<NotFound />} />

        <Route
          path="/f/dashboard/*"
          element={
            isLoggedIn && userRole === "faculty" ? (
              <Dashboard setLoginStatus={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/s/dashboard/*"
          element={
            isLoggedIn && userRole === "student" ? (
              <DashboardS setLoginStatus={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              userRole === "faculty" ? (
                <Navigate to="/f/dashboard" />
              ) : (
                <Navigate to="/s/dashboard" />
              )
            ) : (
              <Login setLoginStatus={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              userRole === "faculty" ? (
                <Navigate to="/f/dashboard" />
              ) : (
                <Navigate to="/s/dashboard" />
              )
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/otp/verify"
          element={
            isLoggedIn ? (
              userRole === "faculty" ? (
                <Navigate to="/f/dashboard" />
              ) : (
                <Navigate to="/s/dashboard" />
              )
            ) : (
              <OTPVerification setLoginStatus={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
