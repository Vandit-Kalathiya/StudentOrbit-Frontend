import { Modal, Form, Input, Select } from "antd";

const TaskModal = ({ isModalOpen, handleOk, handleCancel, form, members }) => {
  return (
    <Modal
      title="Add New Task"
      open={isModalOpen}
      onOk={handleOk}
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
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item
          name="taskDescription"
          label="Task Description"
          rules={[
            { required: true, message: "Please input the task description!" },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>
        <Form.Item
          name="assignee"
          label="Assign To"
          // rules={[{ message: "Please select an assignee!" }]}
        >
          <Select
            mode="multiple" // Enable multiple selections
            placeholder="Select assignees"
          >
            {members.map((memberId) => (
              <Select.Option key={memberId} value={memberId}>
                {memberId}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
