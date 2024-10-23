import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import FacultyLayout from '../Layouts/FacultyLayout';

const ProtectedFacultyRoute = ({ ...rest }) => {
  const { user } = useAuth();

  const role = localStorage.getItem('role');
  if (!user || role !== 'faculty') {
    return <Navigate to="/login" />; 
  }
  return <FacultyLayout {...rest} />;
};

export default ProtectedFacultyRoute;
