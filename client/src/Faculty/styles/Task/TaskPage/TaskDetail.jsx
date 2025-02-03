import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskStatus from "./TaskStatus";
import TaskAssignees from "./TaskAssignees";
import FacultyComments from "./FacultyComments";
import AssigneesModal from "./AssigneesModal";
import axios from "axios";
import TaskDetailSkeleton from "../../../../skeleton/TaskDetailSkeleton";
import { Card, Typography } from "antd";
import SubmittedFiles from "./SubmittedFiles";
import { BASE_URL } from "../../../../../authToken";

const { Title } = Typography;

function TaskDetail() {
  const location = useLocation();
  const { task, members } = location.state || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assigneeMembers, setAssigneeMembers] = useState(task.assignee);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {}, [assigneeMembers]);

  const handleAssign = (assigneeIds) => {
    axios
      .post(`${BASE_URL}/tasks/${task.id}`, assigneeIds, { withCredentials: true })
      .then((res) => {
        setAssigneeMembers(res.data.assignee);
      })
      .catch((error) => {
        console.log(error);
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

  if (loading) {
    return <TaskDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Details and Submitted Work */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Details Card */}
            <Card
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 font-poppins"
              bodyStyle={{ padding: "20px 24px" }}
            >
              <div className="border-b pb-4 mb-4">
                <TaskHeader task={task} />
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <TaskDescription description={task.description} />
                </div>
                <div className="border-t pt-6">
                  <TaskStatus status={task.status} />
                </div>
                <div className="border-t pt-6">
                  <TaskAssignees
                    assignees={assigneeMembers}
                    showModal={showModal}
                    handleFormSubmit={handleFormSubmit}
                    taskId={task.id}
                  />
                </div>
              </div>
            </Card>

            {/* Submitted Work Card */}
            {/* <Card
              title={<Title level={4} className="text-primary">Submitted Work</Title>}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              headStyle={{
                borderBottom: "2px solid #f0f0f0",
                fontWeight: "600",
              }}
            >
              <List
                itemLayout="vertical"
                dataSource={submittedFiles}
                renderItem={(file) => (
                  <List.Item key={file.id}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileTextOutlined className="text-lg" />
                          <Text strong>{file.name}</Text>
                        </div>
                        <Button
                          type="link"
                          icon={<DownloadOutlined />}
                          href={file.url}
                          target="_blank"
                        >
                          Download
                        </Button>
                      </div>
                      <Text type="secondary">{file.description}</Text>
                      <div className="flex items-center space-x-2">
                        <Text strong>Review Link:</Text>
                        <Button type="link" href={file.reviewLink} target="_blank">
                          View Review
                        </Button>
                      </div>
                      <Text type="secondary">Uploaded on: {file.uploadedAt}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card> */}
          <Card
            title={<Title level={4} className="text-primary font-poppins">Submitted Work</Title>}
            className="shadow-lg rounded-lg hover:shadow-xl transition duration-300"
          >
            <SubmittedFiles taskId={task.id} />
          </Card>
          </div>

          {/* Right Column - Faculty Comments */}
          <div className="lg:col-span-1 space-y-6">
            <Card
              title={<Title level={4} className="text-primary font-poppins">Faculty Comments</Title>}
              className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              headStyle={{
                borderBottom: "2px solid #f0f0f0",
                fontWeight: "600",
              }}
            >
              <FacultyComments taskId={task.id} />
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
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