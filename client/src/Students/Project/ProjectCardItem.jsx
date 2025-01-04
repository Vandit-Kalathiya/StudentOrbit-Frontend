import { Card } from "antd";
import ProjectAvatarList from "./ProjectAvatarList";
import ProjectDescription from "./ProjectDescription";
import { useNavigate } from "react-router-dom";
import { BookOutlined, TeamOutlined } from "@ant-design/icons";

const ProjectCardItem = ({ project }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/s/dashboard/projects/${project.groupName}`, { state: project });
  };

  // console.log(project.students);


  return (
    <div className="flex justify-center p-2">
      <Card
        bordered={false}
        className="max-w-md w-full shadow-lg rounded-lg cursor-pointer border  hover:shadow-lg"
        onClick={handleReadMore}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{project.groupName}</h2>
          <span className="text-sm text-gray-500">{project.createdAt.toString().substring(0, 4)}</span>
        </div>

        <ProjectDescription description={project.groupDescription} onReadMore={handleReadMore} />

        <div className="mb-2">
          <span className="font-semibold"><BookOutlined className="text-purple-500" /> Semester :</span> {project.batchName.substring(0, 1)}
        </div>

        <div className="mb-2">
          <span className="font-semibold"><TeamOutlined className="text-purple-500" /> Group Members :</span>
          <div className="ml-5"><ProjectAvatarList members={project.students} /></div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCardItem;
