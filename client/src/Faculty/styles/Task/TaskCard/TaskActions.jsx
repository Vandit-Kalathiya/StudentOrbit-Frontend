import { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TaskActions = ({
  status,
  showModal,
  updateTaskStatus,
  taskId,
  assignees,
}) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isLinkModalVisible, setIsLinkModalVisible] = useState(false);
  const [reviewLink, setReviewLink] = useState("");
  const [assigneeMembers, setAssigneeMembers] = useState(assignees);
  const [taskDescription, setTaskDescription] = useState('');

  const location = useLocation();
  const [file, setFile] = useState(null);

  const isFacultyRoute = location.pathname.startsWith("/f/dashboard");
  const isStudentRoute = location.pathname.startsWith("/s/dashboard");

  const handleMoveToInProgress = () => {
    setIsCommentModalVisible(true);
  };

  const handleOk = () => {
    setIsCommentModalVisible(false);
    updateTaskStatus(taskId, "IN_PROGRESS", assignees);
    addComment(comment);
    setComment("");
  };

  const addComment = (comment) => {
    const commentRequest = {
      commentDescription: comment,
      facultyId: localStorage.getItem("username"),
      taskId: taskId,
    };
    axios
      .post("http://localhost:1818/comment/add", commentRequest)
      .then(() => {
        axios
          .get(`http://localhost:1818/tasks/assignees/${taskId}`)
          .then((res) => {
            setAssigneeMembers(res.data);
          })
          .catch((error) => {
            console.error(
              "There was an error while assigning assignees: ",
              error
            );
          });
      });
  };

  const handleCancel = () => {
    setIsCommentModalVisible(false);
    setComment("");
  };

  const handleGoForReview = () => {
    setIsLinkModalVisible(true);
  };

  const handleOkLink = async () => {
    if (!reviewLink.trim()) {
      message.error(
        "Please enter a review link or any description before submitting."
      );
      return;
    }

    setIsLinkModalVisible(false);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    try {
      // If a file is present, upload it
      if (file) {
        const response = await axios.post("http://localhost:8080/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        message.success("File uploaded successfully!");
        console.log("File uploaded:", response.data);
      }

      // Update task status after uploading the file (if any)
      await updateTaskStatus(taskId, "IN_REVIEW", assignees);

    } catch (error) {
      console.error("File upload or task update failed:", error);
      message.error("Failed to upload file or update task. Please try again.");
    }

    // Clear the review link and file input after submission
    setReviewLink("");
    setFile(null);
  };


  const handleCancelLink = () => {
    setIsLinkModalVisible(false);
    setReviewLink("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="flex justify-between items-center">
      {status !== "COMPLETED" ? (
        <>
          {status === "TO_DO" && !isFacultyRoute && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => updateTaskStatus(taskId, "IN_PROGRESS", assignees)}
            >
              Move to In Progress
            </button>
          )}

          {status === "IN_PROGRESS" && !isFacultyRoute && (
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
              onClick={handleGoForReview}
            >
              Go for Review
            </button>
          )}

          {status === "IN_REVIEW" && (
            <div className="md:flex flex-col md:flex-row">
              {!isStudentRoute && isFacultyRoute && (
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 md:mr-2 mb-2 md:mb-0"
                  onClick={showModal}
                >
                  Approve
                </button>
              )}
              {isFacultyRoute && (
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
        open={isCommentModalVisible}
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

      <Modal
        title="Submit Link of your work"
        open={isLinkModalVisible}
        onOk={handleOkLink}
        onCancel={handleCancelLink}
      >
        <Input
          value={reviewLink}
          onChange={(e) => setReviewLink(e.target.value)}
          placeholder="Paste your review link here..."
          required
          className="mb-2"
        />
        <Input.TextArea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description here..."
          rows={4}
          required
          className="mb-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.png,.jpg"
        />
      </Modal>
    </div>
  );
};

export default TaskActions;
