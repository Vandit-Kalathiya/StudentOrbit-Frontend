import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

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
  members,
  taskId,
  handleAssign
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [assigneeMembers, setAssigneeMembers] = useState(assignees);
  const location = useLocation();

  useEffect(() => {

  }, [assigneeMembers]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    setSelectedAssignees(values.assignees);
    setIsModalVisible(false);
    const data = await handleAssign(values.assignees, taskId);
    console.log(data);
    if (data.assignee) {
      setAssigneeMembers(data.assignee);
      toast.success('Task assignees added successfully..')
    } else {
      toast.error(data.response.data?.message || "Error while assigning assignees.");
    }
  };


  const handleSelect = () => {
    setDropdownVisible(false);
  };

  const handleDropdownVisibleChange = (open) => {
    setDropdownVisible(open);
  };

  const isInFDashboard = location.pathname.startsWith("/f/dashboard");

  return (
    <div>
      <div className="flex items-center mb-4">
        <Avatar.Group>
          {assigneeMembers.map((assignee, index) => {
            const color = colorCombinations[index % colorCombinations.length];

            return assignee ? (
              <Avatar
                key={assignee.id}
                style={{
                  backgroundColor: color.backgroundColor,
                  color: color.color,
                  border: `2px solid ${color.border}`,
                  marginLeft: 3,
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
