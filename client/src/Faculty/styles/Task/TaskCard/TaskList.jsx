import { Row, Col, Empty } from 'antd';
import PropTypes from 'prop-types';
import TaskCard from './TaskCard';
import { motion } from 'framer-motion';

const TaskList = ({ tasks, status, updateTaskStatus, updateAssignees, members }) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div>
      {filteredTasks.length > 0 ? (
        <Row gutter={16}>
          {filteredTasks.map(task => (
            <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
              <motion.div
                layout 
                transition={{ duration: 0.3 }}
              >
                <TaskCard task={task} updateTaskStatus={updateTaskStatus} updateAssignees={updateAssignees} members={members} />
              </motion.div>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description={`No tasks in ${status.toLowerCase()}`} />
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
