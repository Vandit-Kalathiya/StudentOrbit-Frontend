import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TaskStatus from "./TaskStatus";
import TaskDescription from "./TaskDescription";
import TaskAssignees from "./TaskAssignees";
import TaskActions from "./TaskActions";
import TaskCompletionModal from "./TaskCompletionModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getRole } from "../../../../../authToken";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ singleTask, updateTaskStatus, members, onTaskUpdate, groupId }) => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [task, setTask] = useState(singleTask);
  const [currentAssignees, setCurrentAssignees] = useState(singleTask.assignee);
  const navigate = useNavigate();
  const location = useLocation();
  const { batch, projectName, week } = useParams();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const role = getRole();

  let currentWeek = week.length === 5 ? week.slice(4, 5) : week.slice(4, 6);
  currentWeek = parseInt(currentWeek[0], 10); // Base 10

  useEffect(() => {
    // Update local state when singleTask prop changes
    setTask(singleTask);
    setCurrentAssignees(singleTask.assignee);
  }, [singleTask]);

  const handleAssign = async (assigneeIds, taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:1818/tasks/${taskId}`,
        assigneeIds,
        { withCredentials: true }
      );
      setTask(res.data);
      setCurrentAssignees(res.data.assignee);
      // onTaskUpdate?.(res.data); // Notify parent component
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "An error occurred while assigning tasks."
      );
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const showModal = () => {
    setIsDrawerVisible(true);
    // setIsModalVisible(true);
  };

  const handleOk = (grades, comments) => {
    console.log("Final Grades:", grades);
    console.log("Faculty Comments:", comments);
    updateTaskStatus(task.id, "COMPLETED", currentAssignees);
    // setIsModalVisible(false);
    setIsDrawerVisible(false); 
  };

  const handleCancel = () => {
    // setIsModalVisible(false);
    setIsDrawerVisible(false);
  };

  const saveTask = async (updatedTask) => {
    try {
      updatedTask = { ...updatedTask, taskStatus: task.status };
      const response = await axios.put(
        `http://localhost:1818/tasks/${task.id}`,
        updatedTask,
        { withCredentials: true }
      );

      setTask(response.data);
      onTaskUpdate?.(response.data); // Notify parent component
      toast.success("Task Updated Successfully");
      closeEditModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "An error occurred while updating the task."
      );
    }
  };

  const handleReadMore = () => {
    if (location.pathname.startsWith("/f/dashboard")) {
      navigate(
        `/f/dashboard/batches/${batch}/${projectName}/${week}/${task.id}`,
        {
          state: { task, members },
        }
      );
    } else if (location.pathname.startsWith("/s/dashboard")) {
      navigate(`/s/dashboard/projects/${projectName}/${week}/${task.id}`, {
        state: { task, members },
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:1818/tasks/${task.id}/${groupId}/${currentWeek}`, {
        withCredentials: true,
      });
      onTaskUpdate?.(task.id); // Notify parent about deletion
      toast.success("Task Deleted Successfully");
      setDeleteModalVisible(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "An error occurred while deleting the task."
      );
    }
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  useEffect(() => {}, [task]);

  return (
    <motion.div
      className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4 cursor-pointer font-poppins"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <TaskStatus status={task.status} title={task.name} />
        {(role === "student" || role === 'admin') && (task.status === 'TO_DO' || task.status === 'IN_PROGRESS') && (
          <div className="flex space-x-3">
            <Button
              type="text"
              size="medium"
              title="Edit Task"
              icon={<EditOutlined style={{ color: "blue" }} />}
              onClick={(e) => {
                e.preventDefault();
                setEditModalVisible(true);
              }}
            />
            <Button
              type="text"
              size="medium"
              title="Delete Task"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={(e) => {
                e.preventDefault();
                setDeleteModalVisible(true);
              }}
            />
          </div>
        )}
      </div>
      <TaskDescription
        description={task.description}
        onReadMore={handleReadMore}
      />
      <TaskAssignees
        status={task.status}
        assignees={currentAssignees}
        members={members}
        taskId={task.id}
        handleAssign={handleAssign}
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
        // isModalVisible={isModalVisible}
        isDrawerVisible={isDrawerVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <Modal
        title="Confirm Delete.? It's very sensitive..."
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the task{" "}
          <strong>{singleTask.name}</strong>?
        </p>
      </Modal>

      <EditTaskModal
        isVisible={isEditModalVisible}
        onClose={closeEditModal}
        onSave={saveTask}
        task={task}
      />
    </motion.div>
  );
};

export default TaskCard;