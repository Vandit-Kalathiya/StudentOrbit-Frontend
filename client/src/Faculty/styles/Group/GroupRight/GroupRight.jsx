import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Accordion from "./Accordion";
import TaskModal from "./TaskModal";
import { Form } from "antd";
import axios from "axios";

function GroupRight({ project }) {
  const location = useLocation();
  const { projectName } = useParams();

  const [weekTasks, setWeekTasks] = useState(project.weeks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const [projectData, setProjectData] = useState([]);

  const navigate = useNavigate();

  const [form] = Form.useForm();  

  useEffect(() => {
    axios.get(`http://localhost:1818/faculty/groups/g/${project.groupName}`).then((res) => {
      setWeekTasks(res.data.weeks)
    })
  }, [])

  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/groups/g/${project.groupName}`)
      .then((res) => {
        const demo = res.data;
        setProjectData(demo);
      })
      .catch((error) => {
        console.error("There was an error while getting all batches: ", error);
      });
  },[weekTasks])

  const handleDoubleClick = (id) => {
    navigate(`week${id}`, {
      state: { tasks: weekTasks.find(week => week.week === id)?.tasks || [] }
    });
  };

  const showModal = (weekId) => {
    console.log('Opening modal for week:', weekId);
    setCurrentWeekId(weekId);
    setIsModalOpen(true);
  };

  const handleOk = (data) => {
    form.validateFields()
      .then((values) => {

        setWeekTasks(data.weeks)
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validation failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Accordion
        weekTasks={weekTasks}
        onDoubleClick={handleDoubleClick}
        showModal={showModal}
      />
      <TaskModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        members={project.students}
        project={project}
        currentWeekId={currentWeekId}
      />
    </>
  );
}

export default GroupRight;