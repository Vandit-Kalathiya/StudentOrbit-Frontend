import { Drawer } from "antd";
import RubricGradingModal from "./RubricGradingModal";
import { useState } from "react";


const TaskCompletionModal = ({ isDrawerVisible, handleOk, handleCancel }) => {
  const [generalComment, setGeneralComment] = useState("");

  const handleGeneralCommentChange = (e) => {
    setGeneralComment(e.target.value);
  };

  const handleSubmit = (grades) => {
    handleOk(grades, generalComment);
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
      />
    </Drawer>
  );
};

export default TaskCompletionModal;