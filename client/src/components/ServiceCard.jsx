import React from 'react';
// import { Palette, Settings, Shield } from 'lucide-react';
import { FaChartLine as ProgressChart } from "react-icons/fa"; // Progress Tracking Icon
import { FaCalendarAlt as Calendar } from "react-icons/fa"; // Task Scheduling Icon
import { FaRegClock as Timeline } from "react-icons/fa"; // Structured Project Timelines Icon
import { FaUsers as Groups } from "react-icons/fa"; // Batch and Group Management Icon
import { FaFileAlt as Reports } from "react-icons/fa"; // Reports and Analytics Icon
import { FaShieldAlt as Shield } from "react-icons/fa"; // Role-Based Access Control Icon


const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 space-y-4 font-poppins">
    <div className="relative">
      <div className="w-16 h-16 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-purple-100 opacity-20 rounded-lg transform rotate-45"></div>
        <Icon className="w-8 h-8 text-purple-600" />
      </div>
      {/* Decorative dots */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-pink-300 rounded-full"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-300 rounded-full"></div>
      <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-300 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
    </div>
    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{title}</h3>
    <p className="text-gray-600">{description}</p>
    {/* <a
      href="#"
      className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
    >
      READ MORE
      <span className="ml-2">→</span>
    </a> */}
  </div>
);

const ServicesSection = () => {
  const services = [
    {
      icon: ProgressChart, 
      title: "Comprehensive Progress Tracking",
      description:
        "Monitor real-time progress of group projects with detailed dashboards, ensuring proactive support and accountability.",
    },
    {
      icon: Calendar, 
      title: "Dynamic Task Scheduling and Weekly Updates",
      description:
        "Schedule tasks and submit weekly updates to ensure consistent development and collaboration within groups.",
    },
    {
      icon: Timeline, 
      title: "Structured Project Timelines",
      description:
        "Set realistic project milestones and track deliverables with predefined templates and tools.",
    },
    {
      icon: Groups, 
      title: "Effortless Batch and Group Management",
      description:
        "Automate batch and group creation while ensuring unique and valid group assignments for all projects.",
    },
    {
      icon: Reports, 
      title: "User-Friendly Reports and Analytics",
      description:
        "Generate detailed reports and analytics on task performance, weekly updates, and project health for actionable insights.",
    },
    {
      icon: Shield,
      title: "Role-Based Access Control",
      description:
        "Securely manage data with structured access for faculty, students, and administrators, ensuring system security.",
    },
  ];


  return (
    <section className="py-16 px-4 font-poppins">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Our Best Services
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            The purpose of StudentOrbit is to provide a centralized and interactive platform that
            supports effective project management for student groups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;