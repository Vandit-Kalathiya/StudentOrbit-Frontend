import { useState } from "react";
import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";

const TaskCard = ({ task, updateTaskStatus, updateAssignees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAssignees, setCurrentAssignees] = useState(task.assignees);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTaskStatus(task.id, "completed");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAssigneesChange = (newAssignees) => {
    setCurrentAssignees(newAssignees);
    updateAssignees(task.id, newAssignees);
  };

  return (
    <div className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4">
      <TaskStatus status={task.status} title={task.title} />
      <TaskDescription description={task.description} />
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
