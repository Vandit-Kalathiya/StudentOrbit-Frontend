import React, { useEffect } from "react";
import heroBg from "../assets/hero-bg.png";
import heroImg from "../assets/hero-img.png";
import "aos/dist/aos.css";
import AOS from "aos";
import Button from "../Styles/Button";
import { Link } from "react-router-dom";
import { getRole } from "../../authToken";

function Hero() {
  useEffect(() => {
    AOS.init();
  }, []);

  let role = getRole();

  return (
    <section
      id="hero"
      className="w-full min-h-[100vh] relative flex items-center justify-center overflow-hidden md:pt-[90px] pt-32 pb-[40px] scroll-mt-24 px-5"
    >
      <div className="hero-bg absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div>
      <div
        className="absolute inset-0 z-2"
        style={{
          background: "rgba(0, 0, 0, 0.01)",
        }}
      ></div>
      <div className="container flex text-center items-center relative z-10 md:flex-row flex-col md:px-16 px-4">
        <div className="flex flex-col justify-center items-center font-poppins">
          <h1
            className="md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600 font-semibold mb-4 text-4xl tracking-tight"
            data-aos="fade-down"
          >
            Welcome to{" "}
            <span className="font-bold md:text-7xl text-5xl">StudentOrbit</span>
          </h1>
          <p
            className="md:text-lg mb-8 text-[#012970] text-sm"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Encircles and keeps track of all aspects of student projects in one
            place.
            <br />
          </p>
          <div className="flex " data-aos="fade-up" data-aos-delay="300">
            {role == null ? (
              <Link to="/signup">
                <Button text="Get Started" />
              </Link>
            ) : role == 'student' ? <Link to="/s/dashboard">
              <Button text="Get Started" />
            </Link> : <Link to="/f/dashboard">
              <Button text="Get Started" />
            </Link>}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-8 ml md:pl-16 md:w-full md:h-full w-[90%] md:-mr-44">
          <img
            src={heroImg}
            alt="Hero"
            data-aos="zoom-out"
            data-aos-delay="400"
            className="mt-4 md:max-w-[600px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
