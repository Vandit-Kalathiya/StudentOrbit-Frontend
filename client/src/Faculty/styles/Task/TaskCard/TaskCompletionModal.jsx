import { Drawer } from "antd";
import RubricGradingModal from "./RubricGradingModal";
import { useState } from "react";


const TaskCompletionModal = ({ isDrawerVisible, handleOk, handleCancel, taskId }) => {
  const [generalComment, setGeneralComment] = useState("");

  const handleGeneralCommentChange = (e) => {
    setGeneralComment(e.target.value);
  };

  const handleSubmit = (completeTaskRequest) => {
    handleOk(completeTaskRequest);
  };

  return (
    <Drawer
      title="Rubric Grading"
      placement="right"
      width={750}
      onClose={handleCancel}
      open={isDrawerVisible}
      className="font-poppins"
    >
      <RubricGradingModal
        isModalVisible={isDrawerVisible}
        handleOk={handleSubmit}
        handleCancel={handleCancel}
        generalComment={generalComment}
        handleGeneralCommentChange={handleGeneralCommentChange}
        taskId={taskId}
      />
    </Drawer>
  );
};

export default TaskCompletionModal;