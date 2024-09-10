import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskStatus from "./TaskStatus";
import TaskAssignees from "./TaskAssignees";
import FacultyComments from "./FacultyComments";
import AssigneesModal from "./AssigneesModal";

function TaskDetail() {
  const location = useLocation();
  const { task } = location.state || {};

  const [comments, setComments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignees, setAssignees] = useState([
    { initials: "03", name: "22CE003" },
    { initials: "04", name: "22CE004" },
    { initials: "05", name: "22CE005" },
    { initials: "12", name: "22CE012" }
  ]);
  const [selectedAssignees, setSelectedAssignees] = useState(task.assignees || []);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${task.id}`)) || [];
    setComments(storedComments);
  }, [task.id]);

  useEffect(() => {
    localStorage.setItem(`comments_${task.id}`, JSON.stringify(comments));
  }, [comments, task.id]);

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    setSelectedAssignees(values.assignees);
    setIsModalVisible(false);
  };

  return (
    <div className="m-5 mt-10">
      <TaskHeader task={task} />
      <TaskDescription description={task.description} />
      <TaskStatus status={task.status} />
      <TaskAssignees
        assignees={assignees}
        selectedAssignees={selectedAssignees}
        showModal={showModal}
      />
      <FacultyComments
        comments={comments}
        handleDeleteComment={handleDeleteComment}
      />
      <AssigneesModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        assignees={assignees}
        selectedAssignees={selectedAssignees}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default TaskDetail;
