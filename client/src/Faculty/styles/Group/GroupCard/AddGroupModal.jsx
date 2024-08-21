import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

const { TextArea } = Input;

const AddGroupModal = ({ visible, onClose, onAddGroup }) => {
  const [form] = useForm();

  // Custom validation function
  const validateStudentIds = (rule, value) => {
    if (!value) {
      return Promise.reject("Please input the student IDs!");
    }

    const studentIdsArray = value.split(",").map((id) => id.trim());
    if (studentIdsArray.length > 4) {
      return Promise.reject("You can enter a maximum of 4 student IDs.");
    }

    return Promise.resolve();
  };

  const validateGroupLeader = (_, value) => {
    if (value && value.trim().split(",").length > 1) {
      return Promise.reject("You can enter only one Group Leader ID.");
    }
    return Promise.resolve();
  };

  const handleFinish = (values) => {
    const { title, description, technologies, studentIds, groupLeader } = values;

    // Ensure studentIds is an array
    const studentIdsArray = studentIds.split(",").map((id) => id.trim());

    const newGroup = {
      title,
      description,
      technologies: technologies.split(",").map((tech) => tech.trim()),
      groupLeader,
      members: studentIdsArray,
      progress: 0,
      category: "New Category", // Default category or provide input
    };

    onAddGroup(newGroup);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Group"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="technologies"
          label="Technologies"
          rules={[{ required: true, message: "Please input the technologies!" }]}
        >
          <Input placeholder="Comma-separated" />
        </Form.Item>
        <Form.Item
          name="studentIds"
          label="Student IDs"
          rules={[{ validator: validateStudentIds }]}
        >
          <Input placeholder="Comma-separated, max 4 IDs" />
        </Form.Item>
        <Form.Item
          name="groupLeader"
          label="Group Leader"
          rules={[
            { required: true, message: "Please input the Group Leader ID!" },
            { validator: validateGroupLeader },
          ]}
        >
          <Input placeholder="22ce001" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Group
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddGroupModal;
