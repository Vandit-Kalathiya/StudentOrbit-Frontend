import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskStatus from "./TaskStatus";
import TaskAssignees from "./TaskAssignees";
import FacultyComments from "./FacultyComments";
import AssigneesModal from "./AssigneesModal";
import axios from "axios";

function TaskDetail() {
  const location = useLocation();
  const { task, members } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assigneeMembers, setAssigneeMembers] = useState(task.assignee);

  useEffect(() => {}, [assigneeMembers]);

  const handleAssign = (assigneeIds) => {
    axios
      .post(`http://localhost:1818/tasks/${task.id}`, assigneeIds)
      .then((res) => {
        setAssigneeMembers(res.data.assignee);
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
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
    handleAssign(values.assignees);
  };

  return (
    <div className="m-5 mt-10 px-5">
      <TaskHeader task={task} />
      <TaskDescription description={task.description} />
      <TaskStatus status={task.status} />
      <TaskAssignees
        assignees={assigneeMembers}
        showModal={showModal}
        handleFormSubmit={handleFormSubmit}
        taskId={task.id}
      />

      <div>
        <h1 className="text-lg md:text-xl mb-4 font-semibold">Submitted Task</h1>
      </div>

      <FacultyComments taskId={task.id} />
      <AssigneesModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        assignees={assigneeMembers}
        selectedAssignees={selectedAssignees}
        handleFormSubmit={handleFormSubmit}
        members={members}
      />
    </div>
  );
}

export default TaskDetail;
