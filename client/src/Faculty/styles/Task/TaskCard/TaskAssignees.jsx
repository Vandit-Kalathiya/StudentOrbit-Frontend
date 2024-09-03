import { useState } from "react";
import { Avatar, Button, Modal, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

// Define color styles for Coral and Blue
const colorStyles = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }
};

const TaskAssignees = ({ status, assignees = [], updateAssignees }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState(assignees);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const availableAssignees = [
    { initials: "03", name: "22CE003" },
    { initials: "04", name: "22CE004" },
    { initials: "05", name: "22CE005" },
    { initials: "12", name: "22CE012" }
  ];

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
    updateAssignees(values.assignees);
  };

  const handleSelect = () => {
    // Close dropdown when an option is selected
    setDropdownVisible(false);
  };

  const handleDropdownVisibleChange = (open) => {
    // Set the state based on dropdown open/close
    setDropdownVisible(open);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Avatar.Group>
          {selectedAssignees.map((initials, index) => {
            const assignee = availableAssignees.find((a) => a.initials === initials);
            // Determine color based on index (odd/even)
            const colorKey = index % 2 === 0 ? 'blue' : 'coral';
            const { backgroundColor, color, border } = colorStyles[colorKey];

            return assignee ? (
              <Avatar
                key={initials}
                style={{ backgroundColor, color, border: `2px solid ${border}` }}
              >
                {assignee.initials}
              </Avatar>
            ) : null;
          })}
        </Avatar.Group>
        {status !== "Completed" && (
          <Button
            icon={<PlusOutlined />}
            className="ml-2 rounded-full"
            onClick={showModal}
          />
        )}
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
            rules={[{ required: true, message: "Please select at least one assignee!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select assignees"
              defaultValue={selectedAssignees}
              open={dropdownVisible}
              onSelect={handleSelect}
              onDropdownVisibleChange={handleDropdownVisibleChange}
            >
              {availableAssignees.map((assignee) => (
                <Option key={assignee.initials} value={assignee.initials}>
                  {assignee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskAssignees;
