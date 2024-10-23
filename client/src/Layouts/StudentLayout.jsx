import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default StudentLayout;
