import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Typography, Form, Skeleton } from "antd";
import TaskList from "./TaskList";
import axios from "axios";
import { openNotification } from "../../../../Utils/Notification";
import Loader from "../../../../components/Loader";
import { Plus } from "lucide-react";
import TaskModal from "../../Group/GroupRight/TaskModal";
import { getRole } from "../../../../../authToken";
import TaskSkeleton from "../../../../skeleton/TaskSkeleton";
import TaskSkeletonList from "../../../../skeleton/TaskSkeleton";

const ToDoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const { projectName, week } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const role = getRole();
  console.log(role)

  const currentWeek = week.length === 5 ? week.slice(4, 5) : week.slice(4, 6);

  const fetchTasks = () => {
    setLoading(true);
    axios
      .get(`http://localhost:1818/faculty/groups/g/${projectName}`, {
        withCredentials: true,
      })
      .then((res) => {
        let demo = res.data;
        setProjectData(demo);
        setMembers(demo.students);
        demo = demo.weeks.sort((a, b) => a.weekNumber - b.weekNumber);
        setTasks(demo[currentWeek - 1].tasks);
      })
      .catch((error) => {
        console.error("There was an error while getting all tasks: ", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchTasks();
  }, [projectName, week]);

  const handleModalOk = (updatedProject) => {
    setShowModal(false); 
    setProjectData(updatedProject); 
    fetchTasks(); 
    form.resetFields();
  };

  const handleModalCancel = () => {
    setShowModal(false); 
  };

  const updateTaskStatus = async (id, newStatus, assignees) => {
    if (assignees.length === 0) {
      openNotification(
        "error",
        `Can't move to in progress.!`,
        "No assignees are present in task. Please assign at least one assignee.!"
      );
    } else {
      await changeStatus(id, newStatus);
      openNotification(
        "success",
        "Update Successful",
        `Task is moved to ${
          newStatus === "IN_PROGRESS"
            ? "In Progress"
            : newStatus === "IN_REVIEW"
            ? "In Review"
            : "Completed"
        }.!`
      );
    }
  };

  const changeStatus = async (id, status) => {
    await axios
      .post(
        `http://localhost:1818/tasks/${id}/${status}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Status changed successfully...", res.data);
        fetchTasks();
      })
      .catch((error) => {
        console.error("There was an error while changing status: ", error);
      });
  };

  const updateAssignees = (taskId, newAssignees) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, assignees: newAssignees } : task
      )
    );
  };

  const [form] = Form.useForm();  

  const weekNumber = currentWeek.replace(currentWeek, "Week " + currentWeek);

  return (
    <div className="md:p-4 py-4 m-3">
      {loading ? ( 
        <div className="flex items-center justify-center min-h-screen">
          <TaskSkeletonList />
        </div>
      ) : (
        <>
          <div className="relative flex md:flex-row flex-col items-center justify-center p-2 custom-scrollbar">
            <Typography className="md:m-0 mt-5 text-center text-4xl md:text-5xl flex-grow font-semibold">
              {weekNumber}
            </Typography>
            {role !== "faculty" && <div className="p-2">
              <Button
                shape="round"
                icon={<Plus />}
                className="bg-[#5B6DF3] text-white hover:bg-[#4859da] py-5 text-center mt-2"
                onClick={() => setShowModal(true)}
              >
                Add Task
              </Button>
            </div>}
          </div>
          
          <Row gutter={16}>
            <Col span={24}>
              <h3 className="text-xl mb-4 font-semibold">To-do Tasks</h3>
              <TaskList
                tasks={tasks}
                status="TO_DO"
                updateTaskStatus={updateTaskStatus}
                updateAssignees={updateAssignees}
                members={members}
              />
            </Col>
            <Col span={24}>
              <h3 className="text-xl mb-4 font-semibold">In Progress Tasks</h3>
              <TaskList
                tasks={tasks}
                status="IN_PROGRESS"
                updateTaskStatus={updateTaskStatus}
                updateAssignees={updateAssignees}
                members={members}
              />
            </Col>
            <Col span={24}>
              <h3 className="text-xl mb-4 font-semibold">In Review Tasks</h3>
              <TaskList
                tasks={tasks}
                status="IN_REVIEW"
                updateTaskStatus={updateTaskStatus}
                updateAssignees={updateAssignees}
                members={members}
              />
            </Col>
            <Col span={24}>
              <h3 className="text-xl mb-4 font-semibold">Completed Tasks</h3>
              <TaskList
                tasks={tasks}
                status="COMPLETED"
                updateTaskStatus={updateTaskStatus}
                updateAssignees={updateAssignees}
                members={members}
              />
            </Col>
          </Row>
        </>
      )}
      <TaskModal
        isModalOpen={showModal}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        form={form} 
        project={projectData}
        currentWeekId={currentWeek}
      />
    </div>
  );
};

export default ToDoPage;
