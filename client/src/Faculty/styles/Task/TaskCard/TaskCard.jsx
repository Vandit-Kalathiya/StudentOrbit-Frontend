import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";

const TaskCard = ({ task, updateTaskStatus, updateAssignees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAssignees, setCurrentAssignees] = useState(task.assignees);
  const navigate = useNavigate();
  const location = useLocation();
  const { batch, projectName, week } = useParams();


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTaskStatus(task.id, "Completed");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAssigneesChange = (newAssignees) => {
    setCurrentAssignees(newAssignees);
    updateAssignees(task.id, newAssignees);
  };

  const handleReadMore = () => {
    // Check if the current path starts with '/f/dashboard'
    if (location.pathname.startsWith('/f/dashboard')) {
      navigate(`/f/dashboard/batches/${batch}/${projectName}/${week}/${task.id}`, {
        state: { task },
      });
    } else if (location.pathname.startsWith('/s/dashboard')) {
      // If the path starts with '/s/projects', modify the last part of the route
      navigate(`/s/dashboard/projects/${projectName}/${week}/${task.id}`, {
        state: { task },
      });
    }
  };
  
  return (
    <div className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4 cursor-pointer">
      <TaskStatus status={task.status} title={task.title} />
      <TaskDescription description={task.description} onReadMore={handleReadMore} />
      <TaskAssignees
        status={task.status}
        assignees={currentAssignees}
        updateAssignees={handleAssigneesChange}
      />
      <TaskActions
        status={task.status}
        showModal={showModal}
        updateTaskStatus={updateTaskStatus}
        taskId={task.id}
        commentsCount={task.commentsCount}
      />
      <TaskCompletionModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default TaskCard;
