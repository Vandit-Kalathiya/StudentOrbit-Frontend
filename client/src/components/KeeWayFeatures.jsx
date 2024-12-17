import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import aboutImage from '../assets/keewayfeature.png'; // Replace with an appropriate image for StudentOrbit

const StudentOrbitFeatures = () => {
  return (
    <div className="container mx-auto px-8 md:px-16 py-12 font-poppins">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Our StudentOrbit Features</h2>
        <div className="w-16 h-1 bg-purple-600 mx-auto mt-3 mb-4"></div>
        <p className="text-gray-500">
          Empowering students with seamless project management and collaboration.<br />
          StudentOrbit offers a robust platform for planning, managing, and tracking group projects.
        </p>
      </div>

      {/* Content Section */}
      <div className="grid gap-8 items-center md:grid-cols-2 md:mt-20">
        {/* Image Section */}
        <div className="relative md:pl-32 flex justify-center md:justify-center">
          <img src={aboutImage} alt="StudentOrbit Features" className="w-64 sm:w-80 max-w-full h-auto" />
        </div>

        {/* Text Section */}
        <div className="w-full md:pl-32 text-center md:text-left">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            Streamlining Project Management <br /> for Students and Faculty
          </h3>
          <p className="text-gray-500 mb-6">
            Manage your group projects with ease using StudentOrbit. Track progress, set goals, and collaborate effectively.<br />
            Designed to facilitate team communication and academic success.
          </p>

          {/* List of features */}
          <ul className="space-y-4">
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <BsCheckCircle className="text-purple-600 w-5 h-5 mr-2" />
              Efficient project planning and tracking for students and faculty.
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <BsCheckCircle className="text-purple-600 w-5 h-5 mr-2" />
              Weekly progress updates and task management for enhanced productivity.
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <BsCheckCircle className="text-purple-600 w-5 h-5 mr-2" />
              Seamless collaboration between group members and instructors.
            </li>
            <li className="flex items-center justify-center md:justify-start text-gray-700">
              <BsCheckCircle className="text-purple-600 w-5 h-5 mr-2" />
              Real-time notifications for task deadlines and group updates.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentOrbitFeatures;
