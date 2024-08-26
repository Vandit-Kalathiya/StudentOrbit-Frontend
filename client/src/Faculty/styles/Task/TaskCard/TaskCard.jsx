import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";
import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import TaskManager from "../../Group/GroupRight/TaskManager";

const TaskCard = ({ task, updateTaskStatus }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <div className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4" >
      <TaskStatus status={task.status} title={task.title} />
      <TaskDescription description={task.description} />
      <TaskAssignees assignees={task.assignees} />
      {task.status !== "completed" && (
        <Button
          icon={<PlusOutlined />}
          className="ml-2 rounded-full"
          onClick={showModal}
        />
      )}
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
      {/* <TaskManager assignees={task.assignees} /> */}
    </div>
  );
};


export default TaskCard;
