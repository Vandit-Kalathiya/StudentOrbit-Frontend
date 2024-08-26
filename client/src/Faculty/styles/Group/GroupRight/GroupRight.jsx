import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "./Accordion";
import TaskModal from "./TaskModal";
import { Form } from "antd";

const initialWeekTasks = [
  {
    week: 1,
    tasks: [
      "Setup environment",
      "Install dependencies",
      "Create project structure",
      "Configure version control (Git)"
    ]
  },
  {
    week: 2,
    tasks: [
      "Initialize README and documentation",
      "Implement authentication",
      "Set up database schema"
    ]
  },
  {
    week: 3,
    tasks: [
      "Create REST API endpoints",
      "Design and implement basic frontend components"
    ]
  },
  {
    week: 4,
    tasks: [
      "Write unit tests for authentication and API endpoints",
      "Implement basic UI/UX for the frontend"
    ]
  },
  {
    week: 5,
    tasks: [
      "Set up user roles and permissions",
      "Create frontend forms and validations"
    ]
  },
  {
    week: 6,
    tasks: [
      "Implement data fetching and state management",
      "Optimize database queries"
    ]
  },
  {
    week: 7,
    tasks: [
      "Integrate third-party services",
      "Implement frontend routing"
    ]
  },
  {
    week: 8,
    tasks: [
      "Optimize performance (caching, lazy loading)",
      "Conduct security audits"
    ]
  },
  {
    week: 9,
    tasks: [
      "Perform usability testing",
      "Set up continuous integration (CI/CD)"
    ]
  },
  {
    week: 10,
    tasks: [
      "Deploy application to the cloud",
      "Monitor application performance"
    ]
  },
  {
    week: 11,
    tasks: [
      "Implement error tracking and logging",
      "Refactor code for maintainability"
    ]
  },
  {
    week: 12,
    tasks: [
      "Conduct final quality assurance (QA) checks",
      "Release version 1.0",
      "Gather user feedback",
      "Plan for post-launch improvements"
    ]
  }
];

function GroupRight({members}) {
  const [weekTasks, setWeekTasks] = useState(initialWeekTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();

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

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        setWeekTasks(prevTasks =>
          prevTasks.map(week =>
            week.week === currentWeekId
              ? { ...week, tasks: [...week.tasks, values.taskName] }
              : week
          )
        );
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
        members={members} 
      />
    </>
  );
}

export default GroupRight;