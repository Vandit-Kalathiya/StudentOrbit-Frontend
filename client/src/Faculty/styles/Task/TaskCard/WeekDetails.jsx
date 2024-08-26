import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import TaskList from './TaskList'; // Import the TaskList component

const ToDoPage = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);

  // Extract the current week number from the URL
  const currentWeek = location.pathname.split('/').pop(); // e.g., 'week1'

  useEffect(() => {
    // Load tasks from localStorage for the selected week
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    if (savedTasks[currentWeek]) {
      setTasks(savedTasks[currentWeek]);
    } else if (location.state?.tasks) {
      // Initialize tasks with 'todo' status if no saved tasks for the week
      const weekTasks = location.state.tasks.map((task, i) => ({
        id: i + 1,
        title: task,
        status: 'todo',
      }));
      setTasks(weekTasks);
    }
  }, [location.state?.tasks, currentWeek]);

  useEffect(() => {
    if (tasks.length > 0) {
      // Save tasks to localStorage keyed by the current week
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
      savedTasks[currentWeek] = tasks;
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
  }, [tasks, currentWeek]);

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const weekNumber = currentWeek.replace('week', 'Week ');

  return (
    <div className='md:p-10 py-4 m-3'>
      <h1 className='md:text-5xl text-3xl text-center md:my-2 my-5 font-semibold'>{weekNumber}</h1>
      <Row gutter={16}>
        <Col span={24}>
          <h3 className='text-xl mb-4 font-semibold'>To-do Tasks</h3>
          <TaskList tasks={tasks} status='todo' updateTaskStatus={updateTaskStatus} />
        </Col>
        <Col span={24}>
          <h3 className='text-xl mb-4 font-semibold'>In Progress Tasks</h3>
          <TaskList tasks={tasks} status='inprogress' updateTaskStatus={updateTaskStatus} />
        </Col>
        <Col span={24}>
          <h3 className='text-xl mb-4 font-semibold'>In Review Tasks</h3>
          <TaskList tasks={tasks} status='inreview' updateTaskStatus={updateTaskStatus} />
        </Col>
        <Col span={24}>
          <h3 className='text-xl mb-4 font-semibold'>Completed Tasks</h3>
          <TaskList tasks={tasks} status='completed' updateTaskStatus={updateTaskStatus} />
        </Col>
      </Row>
    </div>
  );
};

export default ToDoPage;
