import { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TaskModal = ({ isModalOpen, handleOk, handleCancel, form, members, project, currentWeekId }) => {
  const [tasks, setTasks] = useState({
    taskName: "",
    taskDescription: "",
  });

  const { projectName } = useParams();

  const handleInputChange = (e) => {
    setTasks({ ...tasks, [e.target.name]: e.target.value });
  };

  const handleTasks = async () => {
    try {
      if (project.mentor == null) {
        return toast.error("Please select a mentor first..!");
      }

      if (project.projectStatus == "COMPLETED") {
        return toast.error("Project is already Completed");
      }

      const res = await axios.post(
        `http://localhost:1818/tasks/add/${project.id}/${currentWeekId}`,
        tasks,
        {
          withCredentials: true,
        }
      );

      console.log("Task added successfully", res.data);

      axios
        .get(`http://localhost:1818/faculty/groups/g/${projectName.replaceAll("-", " ")}`, { withCredentials: true })
        .then((res) => {
          const demo = res.data;
          handleOk(demo);
        })
        .catch((error) => {
          console.error("There was an error while getting all batches: ", error);
        });

    } catch (error) {
      console.error("Error adding task", error);
    }
  };


  return (
    <Modal
      title="Add New Task"
      open={isModalOpen}
      onOk={handleTasks}
      onCancel={handleCancel}
      okText="Add Task"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="addTaskForm"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[{ required: true, message: "Please input the task name!" }]}
        >
          <Input
            placeholder="Enter task name"
            name="taskName"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          name="taskDescription"
          label="Task Description"
          rules={[{ required: true, message: "Please input the task description!" }]}
        >
          <Input
            rows={4}
            placeholder="Enter task description"
            name="taskDescription"
            onChange={handleInputChange}
          />
        </Form.Item>
        {/* <Form.Item name="assignee" label="Assign To">
          <Select
            mode="multiple"
            placeholder="Select assignees"
            open={dropdownVisible}
            onChange={handleAssigneeChange} 
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={tasks.taskAssignes}
          >
            {members.map((member) => (
              <Select.Option key={member.username} value={member.username}>
                {member.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default TaskModal;
