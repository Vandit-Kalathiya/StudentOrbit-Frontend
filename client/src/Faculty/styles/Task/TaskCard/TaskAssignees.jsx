import { useState } from "react";
import { Avatar, Button, Modal, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const TaskAssignees = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [assignees] = useState([
    { initials: "03", name: "22CE003" },
    { initials: "04", name: "22CE004" },
    { initials: "05", name: "22CE005" },
    { initials: "12", name: "22CE012" }
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    setSelectedAssignees(values.assignees);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Avatar.Group>
          {selectedAssignees.map((initials) => {
            const assignee = assignees.find((a) => a.initials === initials);
            return assignee ? (
              <Avatar key={initials} style={{ backgroundColor: "#f56a00" }}>
                {assignee.initials}
              </Avatar>
            ) : null;
          })}
          {/* <Button
            icon={<PlusOutlined />}
            className="ml-2 rounded-full"
            onClick={showModal}
          >
          </Button> */}
        </Avatar.Group>
      </div>

      <Modal
        title="Select Assignees"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="assignees"
            label="Select Assignees"
            rules={[{ required: true, message: 'Please select at least one assignee!' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select assignees"
              defaultValue={selectedAssignees}
            >
              {assignees.map((assignee) => (
                <Option key={assignee.initials} value={assignee.initials}>
                  {assignee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskAssignees;
