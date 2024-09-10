import { useLocation } from "react-router-dom";
import GroupDetailsNew from "../../Faculty/styles/Group/GroupDetailsNew";

function ProjectDetails({collapsed}) {
  const location = useLocation();
  const projectData = location.state;

  if (!projectData) {
    return <div>No data available</div>;
  }

  return (
      <GroupDetailsNew collapsed={collapsed} />
  );
}

export default ProjectDetails;
