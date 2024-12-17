import React from 'react';
import about4 from '../assets/about-4.png'

const FeatureSection = ({ title, description, buttonText, imagePosition = 'left' }) => {
  return (
    <div className="container mx-auto sm:px-12 py-12">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Text Content */}
        <div className={`lg:${imagePosition === 'right' ? 'pl-12' : 'pr-12'} ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          {/* <button className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
            {buttonText}
          </button> */}
        </div>
        
        {/* Image */}
        <div className={`relative ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
          <img 
            src={about4}
            alt={title} 
            className="w-full max-w-md h-auto rounded-lg mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

const MainSection = () => {
  return (
    <div className="bg-white container mx-auto px-8 md:px-16 py-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Empower Your Academic Projects
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          StudentOrbit provides an integrated platform to help students manage and collaborate on their software group projects efficiently.
        </p>
      </div>

      {/* Feature Sections */}
      <FeatureSection 
        title="Seamless Project Management for Students"
        description="Manage tasks, track progress, and collaborate with your team for successful project completion."
        buttonText="LEARN MORE"
        imagePosition="left"
      />

      <FeatureSection 
        title="Collaborate Effectively with Your Team"
        description="Stay connected with your team, update tasks in real-time, and receive feedback to improve your work."
        buttonText="LEARN MORE"
        imagePosition="right"
      />
    </div>
  );
};

export default MainSection;
