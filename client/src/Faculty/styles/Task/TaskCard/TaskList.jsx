import { Row, Col, Empty } from 'antd';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, status, updateTaskStatus }) => {
  // Filter tasks based on the provided status
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div>
      {filteredTasks.length > 0 ? (
        <Row gutter={16}>
          {filteredTasks.map(task => (
            <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
              <TaskCard task={task} updateTaskStatus={updateTaskStatus} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={`No tasks in ${status}`} />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,
};

export default TaskList;
