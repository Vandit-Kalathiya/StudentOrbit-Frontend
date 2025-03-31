import { FiGithub } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-github-navy py-6 px-4 sm:px-6 rounded-lg mb-6">
      <div className="flex items-center">
        <FiGithub className="h-12 w-12 text-github-teal" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-white">GitHub Repository Insight Generator</h1>
          <p className="text-github-gray mt-1">
            Analyze any GitHub repository to get comprehensive project insights
          </p>
        </div>
      </div>
      <div 
        className="absolute top-0 right-0 w-40 h-40 transform translate-x-8 -translate-y-8 opacity-10"
        style={{ 
          background: 'radial-gradient(circle, rgba(61, 239, 233, 1) 0%, rgba(61, 239, 233, 0) 70%)' 
        }}
      />
    </div>
  );
};

export default Banner;