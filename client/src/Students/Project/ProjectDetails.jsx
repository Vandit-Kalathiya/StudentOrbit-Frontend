import GroupDetails from "../../Faculty/styles/Group/GroupDetails";
import { useLocation } from "react-router-dom";

function ProjectDetails({collapsed}) {
  const location = useLocation();
  const projectData = location.state;

  if (!projectData) {
    return <div>No data available</div>;
  }

  return (
    <div className="w-full">
      <GroupDetails collapsed={collapsed} />
    </div>
  );
}

export default ProjectDetails;
