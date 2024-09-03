import { useState } from "react";
import { Modal, Input } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const TaskActions = ({ status, showModal, updateTaskStatus, taskId, addComment }) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const location = useLocation();

  const isFacultyRoute = location.pathname.startsWith('/f/dashboard');
  const isStudentRoute = location.pathname.startsWith('/s/dashboard');

  const handleMoveToInProgress = () => {
    setIsCommentModalVisible(true);
  };

  const handleOk = () => {
    setIsCommentModalVisible(false);
    updateTaskStatus(taskId, "In Progress", comment);
    addComment(comment);
    setComment("");
  };

  const handleCancel = () => {
    setIsCommentModalVisible(false);
    setComment(""); 
  };

  return (
    <div className="flex justify-between items-center">
      {status !== "Completed" ? (
        <>
          {status === "Todo" && !isFacultyRoute && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => updateTaskStatus(taskId, "In Progress")}
            >   
              Move to In Progress
            </button>
          )}

          {status === "In Progress" && !isFacultyRoute && (
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
              onClick={() => updateTaskStatus(taskId, "In Review")}
            >
              Go for Review
            </button>
          )}
 
          {status === "In Review" && (
            <div className="md:flex flex-col md:flex-row">
            {isStudentRoute && (
              <button
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 md:mr-2 mb-2 md:mb-0"
                onClick={showModal}
              >
                Approve
              </button>
            )}
            {!isFacultyRoute && (
              <button
                className="bg-yellow-500 text-black px-4 py-2 md:ml-0 ml-2 rounded-md hover:bg-yellow-600"
                onClick={handleMoveToInProgress}
              >
                Move to In Progress
              </button>
            )}
          </div>
          )}
        </>
      ) : (
        <div className="flex items-center">
          <CheckCircleFilled className="text-green-600 mr-2" />
          <span className="text-green-600">Completed</span>
        </div>
      )}
      <Modal
        title="Add Comment for Improvement"
        visible={isCommentModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comments here..."
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default TaskActions;
