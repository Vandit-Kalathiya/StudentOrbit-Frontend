import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const colorCombinations = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" }, // Green
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" }, // Purple
];

const TaskAssignees = ({
  status,
  assignees,
  updateAssignees,
  members,
  taskId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [assigneeMembers, setAssigneeMembers] = useState(assignees);
  const location = useLocation();

  useEffect(() => {}, [assigneeMembers]);

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
    handleAssign(values.assignees);
  };

  const handleSelect = () => {
    setDropdownVisible(false);
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownVisible(open);
  };

  const handleAssign = (assigneeIds) => {
    console.log(assigneeIds);

    axios
      .post(`http://localhost:1818/tasks/${taskId}`, assigneeIds)
      .then((res) => {
        console.log(res.data);
        setAssigneeMembers(res.data.assignee);
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
  };

  const isInFDashboard = location.pathname.startsWith("/f/dashboard");

  return (
    <div>
      <div className="flex items-center mb-4">
        <Avatar.Group>
          {assigneeMembers.map((assignee, index) => {
            const validAssignee = members.find((a) => a.id === assignee.id);
            const color = colorCombinations[index % colorCombinations.length];

            return assignee ? (
              <Avatar
                key={assignee.id}
                style={{
                  backgroundColor: color.backgroundColor,
                  color: color.color,
                  border: `2px solid ${color.border}`,
                }}
              >
                {assignee.username.substring(4, 7).toUpperCase()}
              </Avatar>
            ) : null;
          })}
        </Avatar.Group>
        {status !== "COMPLETED" &&
          status !== "IN_REVIEW" &&
          !isInFDashboard && (
            <Button
              icon={<PlusOutlined />}
              className="ml-2 rounded-full"
              onClick={showModal}
            />
          )}
      </div>

      <Modal
        title="Select Assignees"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="assignees"
            label="Select Assignees"
            rules={[
              {
                required: true,
                message: "Please select at least one assignee!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select assignees"
              open={dropdownVisible}
              onSelect={handleSelect}
              onDropdownVisibleChange={handleDropdownVisibleChange}
            >
              {members.map((member) => (
                <Option key={member.id} value={member.id}>
                  {member.username}
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
