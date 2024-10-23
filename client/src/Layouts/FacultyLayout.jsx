import { Outlet } from "react-router-dom";

const FacultyLayout = () => {
  return (
    <div>
      <h1>Faculty Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default FacultyLayout;
