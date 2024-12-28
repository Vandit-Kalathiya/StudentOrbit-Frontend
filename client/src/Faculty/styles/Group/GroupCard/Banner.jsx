import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = ({ project, batch }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(
      `/f/dashboard/batches/${batch}/${project.groupName.replaceAll(" ", "-")}`,
      { state: project }
    );
  };

  return (
    <div className="w-full rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-8 relative overflow-hidden">
      {/* Decorative background element */}
      {/* <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#5B6DF3] opacity-5 rounded-full blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#5B6DF3] opacity-5 rounded-full blur-2xl" /> */}

      <div className="relative">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-[#5B6DF3] transition-colors">
            {project.groupName}
          </h3>
          <div className="px-4 py-2 text-sm font-bold rounded-lg bg-[#5B6DF3]/10 text-[#5B6DF3] border border-[#5B6DF3]/20">
            {project.uniqueGroupId}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-5 leading-relaxed text-base">
          {project.groupDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm rounded-full border-2 border-[#5B6DF3]/30 text-[#5B6DF3] 
                       hover:bg-[#5B6DF3] hover:text-white transition-all duration-300 
                       cursor-default transform hover:-translate-y-0.5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Group Leader with enhanced styling */}
        <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-lg border w-[14rem]">
          <div className="h-8 w-8 rounded-full bg-[#5B6DF3]/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[#5B6DF3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-semibold text-gray-700">Group Leader:</span>
          <span className="text-gray-600">
            {project.groupLeader?.toUpperCase()}
          </span>
        </div>

        {/* Action Button with animation */}
        <div className="flex">
          <button
            onClick={handleReadMore}
            className="group w-full sm:w-auto px-4 py-3 bg-[#5B6DF3] text-white rounded-lg
                     hover:bg-[#4859da] transition-all duration-300 
                     transform hover:-translate-y-0.5 hover:shadow-lg
                     flex items-center justify-center gap-2"
          >
            <span>Explore Innovations</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;