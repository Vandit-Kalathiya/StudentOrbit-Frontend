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

const TaskCard = ({ singleTask, updateTaskStatus, members }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [task, setTask] = useState(singleTask);
  const [currentAssignees, setCurrentAssignees] = useState(singleTask.assignee);
  const navigate = useNavigate();
  const location = useLocation();
  const { batch, projectName, week } = useParams();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const role = getRole();

  useEffect(() => {}, [currentAssignees, task]);

  const handleAssign = async (assigneeIds, taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:1818/tasks/${taskId}`,
        assigneeIds,
        { withCredentials: true }
      );
      setTask(res.data);
      setCurrentAssignees(res.data.assignee);
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
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateTaskStatus(task.id, "COMPLETED", currentAssignees);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveTask = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    setTask(updatedTask);
    closeEditModal();
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
    axios
      .delete(`http://localhost:1818/tasks/s/delete/${task.id}`, {
        withCredentials: true,
      })
      .then(() => {
        console.log(" deleted ");
        toast.success("Task deleted successfully!");
      })
      .catch((err) => console.log(err));
    setDeleteModalVisible(false);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  useEffect(() => {}, [task]);

  return (
    <motion.div
      className="border md:min-w-full rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4 cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <TaskStatus status={task.status} title={task.name} />
        {role === "student" && (
          <div className="flex space-x-3">
            <Button
              type="text"
              size="medium"
              icon={<EditOutlined style={{ color: "blue" }} />}
              onClick={(e) => {
                e.preventDefault();
                setEditModalVisible(true);
              }}
            />
            <Button
              type="text"
              size="medium"
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
        isModalVisible={isModalVisible}
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
