import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const WorkInfo = ({ title, description }) => (
  <div className="work_info h-[100vh] flex flex-col justify-center p-4 md:p-0">
    <div className="work_left-bl p-2">
      <h2 className="title text-4xl md:text-5xl uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{title}</h2>
      <p className="text-base md:text-xl mt-4">{description}</p>
    </div>
  </div>
);

function About() {
  const workPhotoItemsRef = useRef([]);

  useEffect(() => {
    gsap.set(workPhotoItemsRef.current, {
      clipPath: "inset(0px 0px 100% 0px)"
    });

    if (workPhotoItemsRef.current[0]) {
      gsap.set(workPhotoItemsRef.current[0], {
        clipPath: "inset(0px 0px 0px 0px)"
      });
    }

    const animation = gsap.to(workPhotoItemsRef.current.slice(1), {
      clipPath: "inset(0px 0px 0px 0px)",
      stagger: 0.5,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: ".work",
      start: "top top",
      end: "bottom bottom",
      animation: animation,
      scrub: 1
    });
  }, []);

  const workItems = [
    {
      number: "01",
      title: "Introduction to StudentOrbit",
      description: "StudentOrbit is a cutting-edge platform designed to transform how Student Graduation Projects (SGP) are managed in academic settings. It centralizes essential tools, making the project lifecycle—from assignment to submission—more efficient and user-friendly.",
      src: "https://img.freepik.com/premium-psd/cuttingedge-astrophysics-services-cosmic-understanding_996812-845.jpg?ga=GA1.1.1702925771.1726489567&semt=ais_hybrid",
    },
    {
      number: "02",
      title: "Streamlined Project Management",
      description: "The platform simplifies project oversight for faculty by enabling easy project assignment, progress tracking, task management, and feedback delivery. Students benefit from a structured environment to manage tasks, track milestones, and receive automated updates.",
      src: "https://img.freepik.com/premium-vector/business-team-having-meeting-brainstorming-working-together-looking-charts-graphs-using-laptop-tablet_123891-121697.jpg?ga=GA1.1.1702925771.1726489567&semt=ais_hybrid",
    },
    // {
    //   number: "03",
    //   title: "Automated Monitoring and Resource Optimization",
    //   description: "StudentOrbit features automated progress monitoring, keeping everyone informed of project status, and enhances lab hour management to optimize the use of resources, ensuring efficiency throughout the project.",
    //   src: "https://via.placeholder.com/400x400.png?text=Dummy+Image+3",
    // },
    {
      number: "04",
      title: "Enhanced Communication and Collaboration",
      description: "The platform fosters a collaborative environment by facilitating seamless communication between faculty and students. This ensures that projects are guided effectively and completed successfully.",
      src: "https://img.freepik.com/free-vector/flat-design-international-employees-illustration_23-2149516268.jpg?ga=GA1.1.1702925771.1726489567&semt=ais_hybrid",
    },
    {
      number: "05",
      title: "Powerful Reporting and Analytics",
      description: "Robust reporting and analytics tools provide insights into project performance, helping faculty make informed decisions and allowing students to monitor their progress, ultimately supporting academic success.",
      src: "https://img.freepik.com/premium-vector/tablet-displaying-bar-graph-symbolizing-business-growth-through-data-analysis-business-growth-reporting-data-analysis-simple-minimalist-flat-vector-illustration_538213-119503.jpg?ga=GA1.1.1702925771.1726489567&semt=ais_hybrid",
    },
    {
      number: "06",
      title: "A Vital Resource for Academic Excellence",
      description: "StudentOrbit is more than just a management tool—it's a comprehensive resource designed to support both faculty and students in achieving success in their graduation projects, ensuring an enhanced academic experience.",
      src: "https://img.freepik.com/free-vector/flat-university-concept-background_52683-11961.jpg?ga=GA1.1.1702925771.1726489567&semt=ais_hybrid",
    }
  ];

  return (
    <div className="wrapp relative w-full z-1 font-poppins">
      <section className="work flex flex-col md:flex-row md:px-24">
        <div className="work_left relative w-full md:w-[60%] z-2">
          <div className="work_text w-full md:w-[80%]">
            {workItems.map((item, index) => (
              <WorkInfo key={index} number={item.number} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
        <div className="work_right w-full md:w-[30%] mt-6 md:mt-0">
          <div className="work_right-bl flex md:flex-col justify-center sticky w-full h-[60vh] md:h-[100vh] top-0">
            <div className="work_photo w-full md:w-[35vw] h-[40vh] md:h-[30vw] relative">
              {workItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (workPhotoItemsRef.current[index] = el)}
                  className="work_photo-item absolute w-full h-full cursor-pointer rounded-lg overflow-hidden"
                  title={item.number}
                >
                  <img src={item.src} alt={`Image ${item.number}`} className="block w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="spacer"></div>
      <Footer/>
    </div>
  );
}


export default About;
