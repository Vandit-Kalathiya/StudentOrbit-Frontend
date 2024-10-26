import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import TaskList from "./TaskList";
import axios from "axios";
import { openNotification } from "../../../../Utils/Notification";

const ToDoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const { projectName, week } = useParams();
  const [members, setMembers] = useState([]);

  const currentWeek = week.charAt(4);
  // console.log(projectName, currentWeek);

  // Reusable function to fetch tasks
  const fetchTasks = () => {
    axios
      .get(`http://localhost:1818/faculty/groups/g/${projectName.replaceAll("-"," ")}`)
      .then((res) => {
        let demo = res.data;
        setProjectData(demo);
        setMembers(demo.students);
        demo = demo.weeks.sort((a, b) => a.weekNumber - b.weekNumber);
        setTasks(demo[currentWeek - 1].tasks);
      })
      .catch((error) => {
        console.error("There was an error while getting all tasks: ", error);
      });
  };
  // console.log(members);

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount and when projectName or week changes
  }, [projectName, week]);

  // console.log(tasks);

  const updateTaskStatus = (id, newStatus, assignees) => {
    console.log(assignees);

    if (assignees.length === 0) {
      // alert(
      //   "Please assign at least one user to the task before moving it to progress."
      // );
      openNotification('error', `Can't move to in progress.!`, 'No assignees are present in task. Please assign at least one assignee.!');
    } else {
      changeStatus(id, newStatus)
      openNotification('success', 'Update Successful', `Task is moved to ${newStatus=="IN_PROGRESS"?"In Progress":newStatus=="IN_REVIEW"?"In Review":"Completed"}.!`);
    };
  };

  // Function to change task status
  const changeStatus = (id, status) => {
    axios
      .post(`http://localhost:1818/tasks/${id}/${status}`)
      .then((res) => {
        console.log("Status changed successfully...", res.data);
        fetchTasks(); // Refetch tasks after status change to trigger re-render
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

  const weekNumber = currentWeek.replace(currentWeek, "Week " + currentWeek);

  return (
    <div className="md:p-4 py-4 m-3">
      <h1 className="md:text-5xl text-3xl text-center md:my-2 my-5 font-semibold">
        {weekNumber}
      </h1>
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
    </div>
  );
};

export default ToDoPage;
