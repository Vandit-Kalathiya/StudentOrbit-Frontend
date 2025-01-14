import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../../../authToken";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedUsername = getUsernameFromToken();

    axios
      .get(`http://localhost:1818/students/g/${fetchedUsername}`, {
        withCredentials: true,
      })
      .then((res) => {
        const demo = res.data;
        setProjects(demo);
      })
      .catch((e) =>
        console.log("Error while fetching projects in profile: " + e)
      );
  }, []);

  const handleViewMore = () => {
    navigate("/s/dashboard/projects");
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="projects p-5 bg-white rounded-lg w-full font-poppins">
      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
        Projects
      </h1>
      {projects.length === 0 ? (
        <p className="text-lg text-gray-600 font-semibold rounded-lg py-3 flex justify-center">
          You don't have any projects yet..! Start by developing one to see it
          here. 🚀
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/s/dashboard/projects/${project.groupName}`, {
                    state: project,
                  })
                }
                className="project-card p-4 border-[1px] border-[#8694ff] rounded-lg shadow-md cursor-pointer"
              >
                <h2 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  {project.groupName}
                </h2>
                <p className="text-sm text-gray-700 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                  {project.groupDescription}
                </p>
                <p className="text-sm text-gray-500">
                  Semester : {project.batchName.substring(0, 1)}
                </p>
              </div>
            ))}
          </div>
          {projects.length > 4 && (
            <div className="more-projects mt-8 flex items-center justify-center">
              <button
                onClick={handleViewMore}
                className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                View More
              </button>
            </div>
          )}
        </>
      )}
      {projects.length === 0 ? (
        ""
      ) : (
        <div className="more-projects mt-8 flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            More Projects to Go! <span className="text-black">🚀</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default Projects;
