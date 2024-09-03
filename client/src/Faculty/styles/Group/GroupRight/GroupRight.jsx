import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "./Accordion";
import TaskModal from "./TaskModal";
import { Form } from "antd";

const initialWeekTasks = [
  {
    week: 1,
    tasks: [
      { task_id: 'task-001', title: "Setup environment" },
      { task_id: 'task-002', title: "Install dependencies" },
      { task_id: 'task-003', title: "Create project structure" },
      { task_id: 'task-004', title: "Configure version control (Git)" }
    ]
  },
  {
    week: 2,
    tasks: [
      { task_id: 'task-005', title: "Initialize README and documentation" },
      { task_id: 'task-006', title: "Implement authentication" },
      { task_id: 'task-007', title: "Set up database schema" }
    ]
  },
  {
    week: 3,
    tasks: [
      { task_id: 'task-008', title: "Create REST API endpoints" },
      { task_id: 'task-009', title: "Design and implement basic frontend components" }
    ]
  },
  {
    week: 4,
    tasks: [
      { task_id: 'task-010', title: "Write unit tests for authentication and API endpoints" },
      { task_id: 'task-011', title: "Implement basic UI/UX for the frontend" }
    ]
  },
  {
    week: 5,
    tasks: [
      { task_id: 'task-012', title: "Set up user roles and permissions" },
      { task_id: 'task-013', title: "Create frontend forms and validations" }
    ]
  },
  {
    week: 6,
    tasks: [
      { task_id: 'task-014', title: "Implement data fetching and state management" },
      { task_id: 'task-015', title: "Optimize database queries" }
    ]
  },
  {
    week: 7,
    tasks: [
      { task_id: 'task-016', title: "Integrate third-party services" },
      { task_id: 'task-017', title: "Implement frontend routing" }
    ]
  },
  {
    week: 8,
    tasks: [
      { task_id: 'task-018', title: "Optimize performance (caching, lazy loading)" },
      { task_id: 'task-019', title: "Conduct security audits" }
    ]
  },
  {
    week: 9,
    tasks: [
      { task_id: 'task-020', title: "Perform usability testing" },
      { task_id: 'task-021', title: "Set up continuous integration (CI/CD)" }
    ]
  },
  {
    week: 10,
    tasks: [
      { task_id: 'task-022', title: "Deploy application to the cloud" },
      { task_id: 'task-023', title: "Monitor application performance" }
    ]
  },
  {
    week: 11,
    tasks: [
      { task_id: 'task-024', title: "Implement error tracking and logging" },
      { task_id: 'task-025', title: "Refactor code for maintainability" }
    ]
  },
  {
    week: 12,
    tasks: [
      { task_id: 'task-026', title: "Conduct final quality assurance (QA) checks" },
      { task_id: 'task-027', title: "Release version 1.0" },
      { task_id: 'task-028', title: "Gather user feedback" },
      { task_id: 'task-029', title: "Plan for post-launch improvements" }
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
        const newTaskId = `task-${Date.now()}`; // Unique task_id based on timestamp
        const newTask = {
          task_id: newTaskId,
          title: values.taskName,
          description: values.taskDescription, // Include description if needed
          assignees: values.assignee || [] // Assign default empty array if no assignees
        };
  
        setWeekTasks(prevTasks =>
          prevTasks.map(week =>
            week.week === currentWeekId
              ? { ...week, tasks: [...week.tasks, newTask] }
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