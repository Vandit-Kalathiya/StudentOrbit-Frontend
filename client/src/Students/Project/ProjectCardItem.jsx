import { Card } from "antd";
import ProjectAvatarList from "./ProjectAvatarList";
import ProjectDescription from "./ProjectDescription";
import { useNavigate } from "react-router-dom";
import {
  BookOutlined,
  InfoCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const ProjectCardItem = ({ project }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/s/dashboard/projects/${project.groupName}`, { state: project });
  };

  console.log(project);

  return (
    <div className="flex justify-center p-2 cursor-pointer">
      <Card
        bordered={false}
        className="relative group max-w-lg w-full shadow-lg rounded-xl border-2 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg transition-transform transform hover:scale-[1.02] font-poppins"
        onClick={handleReadMore}
        bodyStyle={{ padding: "1.5rem" }}
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold">{project.groupName}</h2>
          </div>
          <div className="px-4 py-2 text-sm font-bold rounded-lg bg-[#5B6DF3]/10 text-[#5B6DF3] border border-[#5B6DF3]/20">
            {project.uniqueGroupId}
          </div>
        </div>

        <ProjectDescription
          description={project.groupDescription}
          onReadMore={handleReadMore}
        />

        <div className="flex gap-5">
          <div className="mb-2">
            <span className="font-semibold">
              <BookOutlined className="text-purple-500" /> Semester:{" "}
            </span>
            {project.batchName.substring(0, 1)}
          </div>

          <div className="mb-2">
            <InfoCircleOutlined className="text-purple-500 mr-1" />
            <span className="font-semibold">Batch:</span>{" "}
            {project.batchName.substring(1)}
          </div>
        </div>

        <div className="mb-2">
          <span className="font-semibold">
            <TeamOutlined className="text-purple-500" /> Group Members:{" "}
          </span>
          <div className="ml-5">
            <ProjectAvatarList members={project.students} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCardItem;
