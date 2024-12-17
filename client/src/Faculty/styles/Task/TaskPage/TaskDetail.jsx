import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskStatus from "./TaskStatus";
import TaskAssignees from "./TaskAssignees";
import FacultyComments from "./FacultyComments";
import AssigneesModal from "./AssigneesModal";
import axios from "axios";
import SubmittedFiles from "./SubmittedFiles";

function TaskDetail() {
  const location = useLocation();
  const { task, members } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assigneeMembers, setAssigneeMembers] = useState(task.assignee);
  // const [submittedFiles, setSubmittedFiles] = useState([]);

  useEffect(() => { }, [assigneeMembers]);

  const handleAssign = (assigneeIds) => {
    axios
      .post(`http://localhost:1818/tasks/${task.id}`, assigneeIds, { withCredentials: true })
      .then((res) => {
        setAssigneeMembers(res.data.assignee);
      })
      .catch((error) => {
        console.error(res.data.message," ",res.data.status);
      });
  };

  const dummyFiles = [
    {
      name: "Project_Report.pdf",
      type: "pdf",
      url: "#",
      uploadedAt: "2023-11-01",
    },
    {
      name: "Presentation_Slides.pptx",
      type: "ppt",
      url: "#",
      uploadedAt: "2023-11-01",
    },
    {
      name: "Design_Mockup.png",
      type: "png",
      url: "#",
      uploadedAt: "2023-11-03",
    },
  ];

  // useEffect(() => {
  //   axios
  //     .get(http://localhost:1818/tasks/${task.id}/files)
  //     .then((res) => {
  //       setSubmittedFiles(res.data.files);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching submitted files: ", error);
  //     });
  // }, [task.id]);

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

      <SubmittedFiles files={dummyFiles} />

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