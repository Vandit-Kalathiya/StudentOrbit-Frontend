import { Form, Input, Modal } from "antd";

function EditTaskModal({ isVisible, onClose, onSave, task = {} }) {
  const [editForm] = Form.useForm();

  const handleSave = () => {
    editForm
      .validateFields()
      .then((values) => {
        onSave(values);
        editForm.resetFields(); 
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Edit Task"
      open={isVisible}
      onOk={handleSave}
      onCancel={onClose}
      okText="Save Changes"
      cancelText="Cancel"
    >
      <Form
        form={editForm}
        layout="vertical"
        name="editTaskForm"
        initialValues={{
          taskName: task.name || "", 
          taskDescription: task.description || "", 
        }}
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
      </Form>
    </Modal>
  );
}

export default EditTaskModal;
