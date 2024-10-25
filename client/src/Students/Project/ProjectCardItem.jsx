import { Card } from "antd";
import ProjectAvatarList from "./ProjectAvatarList";
import ProjectDescription from "./ProjectDescription";
import { useNavigate } from "react-router-dom";

const ProjectCardItem = ({ project }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/s/dashboard/projects/${project.groupName.replaceAll(" ","-")}`, { state: project });
  };

  return (
    <div className="flex justify-center">
      <Card
        bordered={false}
        className="max-w-sm w-full shadow-lg rounded-lg cursor-pointer"
        onClick={handleReadMore}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{project.groupName}</h2>
          <span className="text-sm text-gray-500">{project.createdAt.toString().substring(0,4)}</span>
        </div>

        <ProjectDescription description={project.groupDescription} onReadMore={handleReadMore} />

        <div className="mb-2">
          <span className="font-semibold">Semester:</span> {project.batchName.substring(0,1)}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Group Members:</span>
          <ProjectAvatarList members={project.students} />
        </div>
      </Card>
    </div>
  );
};

export default ProjectCardItem;
