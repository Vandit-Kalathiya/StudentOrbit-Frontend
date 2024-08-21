import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";
import { useState } from "react";

const TaskCard = ({ task, updateTaskStatus }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTaskStatus(task.id, "completed");
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4">
      <TaskStatus status={task.status} title={task.title} />
      <TaskDescription description={task.description} />
      <TaskAssignees />
      <TaskActions
        status={task.status}
        showModal={showModal}
        updateTaskStatus={updateTaskStatus}
        taskId={task.id}
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
