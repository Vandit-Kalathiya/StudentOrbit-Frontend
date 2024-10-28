import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Projects() {

  const [projects, setProjects] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username")
    // console.log(username);

    axios.get(`http://localhost:1818/students/g/${username}`)
      .then((res) => {
        const demo = res.data;
        setProjects(demo);
        // console.log(res.data);
      })
      .catch((e) => console.log("Error while fetching projects in profile" + e)
      );

  }, [])


  return (
    <div className="projects p-5 bg-white rounded-lg w-full">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {projects.length == 0 ? <p className="text-lg text-gray-600 font-semibold rounded-lg py-3 flex justify-center">
        You don't have any projects yet..! Start by developing one to see it here. 🚀
      </p> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => navigate(`/s/dashboard/projects/${project.groupName.replaceAll(" ", "-")}`, { state: project })}
              className="project-card p-4 border-[1px] border-[#8694ff] rounded-lg shadow-md"
            >
              <h2 className="text-lg font-semibold mb-2">{project.groupName}</h2>
              <p className="text-sm text-gray-700 mb-3">{project.groupDescription}</p>
              <p className="text-sm text-gray-500">Semester: {project.batchName.substring(0, 1)}</p>
            </div>
          ))}
        </div>
      }
      {projects.length == 0 ? "" : <div className="more-projects mt-8 flex flex-col items-center justify-center">
        {/* <img
            src="https://files.oaiusercontent.com/file-IDyteROP5bKGCa1rmHkPG1b3?se=2024-09-15T05%3A34%3A35Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D073f85a9-3c7d-4bd6-a93e-7146d2ac96b6.webp&sig=q8yjgswn6/yc3icffHh/abr/%2BXDcy5CZr0tQEhBnCL8%3D"
            alt="More projects"
            className="mb-4 w-32 h-32 object-cover"
          /> */}
        <h2 className="text-xl font-bold">More Projects to Go! 🚀</h2>
      </div>}
    </div>
  );
}

export default Projects;
