import React from 'react';
import about3 from '../assets/about-3.png'


// Process Step Component
const ProcessStep = ({ number, title, description }) => (
  <div className="text-center text-white">
    <div className="text-5xl font-bold mb-4">{number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

// Progress Bar Component
const ProgressBar = ({ skill, percentage }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-medium">{skill}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded">
      <div 
        className="h-2 bg-purple-600 rounded transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// Process Section Component
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Project Planning",
      description: "Define the scope, set deadlines, and assign tasks to teams."
    },
    {
      number: "02",
      title: "Development & Collaboration",
      description: "Teams work on tasks with weekly updates and progress tracking."
    },
    {
      number: "03",
      title: "Review & Submission",
      description: "Review tasks, make final updates, and submit the completed project."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Project Section Component
const ProjectSection = () => {
  const skills = [
    { skill: "Project Management", percentage: 90 },
    { skill: "Task Tracking", percentage: 80 },
    { skill: "Team Collaboration", percentage: 85 },
    { skill: "Real-time Updates", percentage: 95 }
  ];

  return (
    <section className="container mx-auto px-8 md:px-16 py-12 font-poppins">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Bringing Your Student Projects to Life
        </h2>
        <p className="text-center text-gray-600 mb-16">
          Manage your group projects with ease using StudentOrbit. Track tasks, collaborate in real-time, and submit projects efficiently.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Illustration */}
          <div className="relative md:pl-32 flex justify-center md:justify-center">
            <img 
              src={about3} 
              alt="StudentOrbit Features" 
              className="w-74 sm:w-80 max-w-full h-auto "
            />
          </div>

          {/* Right Side - Content */}
          <div className='w-full md:w-2/3 text-center md:text-left'>
            <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Empowering Students for Success
            </h3>
            <p className="text-gray-600 mb-8">
              From project planning to final submission, StudentOrbit helps you manage your academic projects smoothly.
            </p>

            {/* Progress Bars */}
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <ProgressBar key={index} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const EndPart = () => {
  return (
    <div className="bg-white min-h-screen mb-16">
      <ProcessSection />
      <ProjectSection />
    </div>
  );
};

export default EndPart;
