import React from "react";
import about from "../assets/about.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSlide = ({ title, description, imageSrc }) => (
  <div className="relative min-h-[600px] flex items-center px-6 md:px-16">
    <div className="relative z-10 max-w-xl">
      <span className="text-pink-200 font-medium mb-4 block">
        {title}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        {title}
      </h1>
      <div className="w-24 h-1 bg-white mb-6"></div>
      <p className="text-pink-100 mb-8 leading-relaxed">
        {description}
      </p>
    </div>

    {/* First Additional Block
    <div className="relative z-10 max-w-xl mt-10">
      <span className="text-pink-200 font-medium mb-4 block">
        NEW MODULE
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        StudentOrbit Project Management
      </h1>
      <div className="w-24 h-1 bg-white mb-6"></div>
      <p className="text-pink-100 mb-8 leading-relaxed">
        StudentOrbit is a comprehensive platform for managing student projects with weekly task planning, progress tracking, and collaborative features.
      </p>
    </div> */}

    {/* Decorative Elements */}
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 hidden md:block">
      <div className="relative">
        <img src={imageSrc} alt="Creative illustration" className="w-80 h-auto" />
      </div>
    </div>

    {/* Background Circles */}
    <div className="absolute left-0 top-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute right-0 bottom-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
  </div>
);

const CreativeHeroSlider = () => {
  return (
    <div className="relative bg-purple-700 overflow-hidden font-poppins mx-[1.5rem] sm:mx-[5rem] rounded-xl mb-16">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full"
      >
        <SwiperSlide>
          <HeroSlide
            title="Our Creative Design Module"
            description="StudentOrbit's Creative Design Module offers a structured approach to project design, enabling seamless collaboration and innovative solutions."
            imageSrc={about}
          />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide
            title="Project Management"
            description="StudentOrbit is a comprehensive platform to manage student projects with weekly task planning, progress tracking, and collaborative features."
            imageSrc={about} // Add this image related to StudentOrbit
          />
        </SwiperSlide>
        {/* <SwiperSlide>
          <HeroSlide
            title="Our Creative Design Module"
            description="StudentOrbit's Creative Design Module offers a structured approach to project design, enabling seamless collaboration and innovative solutions."
            imageSrc={about}
          />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default CreativeHeroSlider;
