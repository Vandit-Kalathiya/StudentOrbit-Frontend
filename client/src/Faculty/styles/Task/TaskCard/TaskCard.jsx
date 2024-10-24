import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";

const TaskCard = ({ task, updateTaskStatus, members }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAssignees, setCurrentAssignees] = useState(task.assignee);
  const navigate = useNavigate(); 
  const location = useLocation();
  const { batch, projectName, week } = useParams();

  useEffect(()=>{
  },[currentAssignees])

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTaskStatus(task.id, "COMPLETED", currentAssignees);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAssigneesChange = (newAssignees) => {
    setCurrentAssignees(newAssignees);
  };

  const handleReadMore = () => {
    if (location.pathname.startsWith('/f/dashboard')) {
      navigate(`/f/dashboard/batches/${batch}/${projectName}/${week}/${task.id}`, {
        state: { task, members },
      });
    } else if (location.pathname.startsWith('/s/dashboard')) {
      navigate(`/s/dashboard/projects/${projectName}/${week}/${task.id}`, {
        state: { task , members},
      });
    }
  };

  return (
    <motion.div
      className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4 cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }} 
    >
      <TaskStatus status={task.status} title={task.name} />
      <TaskDescription description={task.description} onReadMore={handleReadMore} />
      <TaskAssignees
        status={task.status}
        assignees={currentAssignees}
        members={members}
        taskId={task.id}
      />
      <TaskActions
        status={task.status}
        showModal={showModal}
        updateTaskStatus={updateTaskStatus}
        taskId={task.id}
        commentsCount={task.commentsCount}
        assignees={currentAssignees}
      />
      <TaskCompletionModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </motion.div>
  );
};

export default TaskCard;
