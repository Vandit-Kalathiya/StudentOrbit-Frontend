import { useState } from "react";
import { Avatar, Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const colorCombinations = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }   // Blue
  
  // { backgroundColor: "#e6f7ff", color: "#1890ff", border: "#1890ff" }, // Light Blue
  // { backgroundColor: "#fde3cf", color: "#f56a00", border: "#f56a00" }, // Orange
  // { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  // { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
};

function GroupLeft({
  title,
  description,
  groupLeader,
  members,
  category,
  progress,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const extractLastTwoDigits = (id) => {
    const matches = id.match(/\d+/g);
    if (matches) {
      const lastNumber = matches[matches.length - 1];
      return lastNumber.slice(-2);
    }
    return "";
  };

  const sortedMembers = members.sort((a, b) => {
    const lastTwoDigitsA = extractLastTwoDigits(a);
    const lastTwoDigitsB = extractLastTwoDigits(b);

    return lastTwoDigitsA.localeCompare(lastTwoDigitsB, undefined, {
      numeric: true,
    });
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="md:m-9 md:px-6 my-6 w-full">
      <h2 className="md:text-3xl text-2xl mb-4 font-semibold">{title}</h2>
      <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="md:text-lg text-base font-semibold">Project Lead:</h3>
        <h3 className="md:text-lg text-base">{groupLeader || "N/A"}</h3>
      </div>
      <div className="flex flex-wrap items-center gap-4 my-4">
        <h3 className="md:text-lg text-base font-semibold">Members:</h3>
        {sortedMembers.map((member, index) => {
          // Determine color based on odd/even index
          const colorType = index % 2 === 0 ? "blue" : "coral";
          const { backgroundColor, color, border } = colorCombinations[colorType];

          return (
            <Avatar
              key={index}
              style={{
                backgroundColor,
                color,
                border: `2px solid ${border}`,
              }}
            >
              {extractLastTwoDigits(member)}
            </Avatar>
          );
        })}
        <Button
          icon={<PlusOutlined />}
          size="small"
          className="border-[#8a8a8a]"
          onClick={showModal}
        >
          Invite
        </Button>
      </div>
      <div className="flex items-center mb-4">
        <h3 className="md:text-lg text-base font-semibold">Category:</h3>
        <h3 className="md:text-lg text-base ml-1">{category}</h3>
      </div>
      <div className="flex justify-between mb-1 mt-8 md:w-[70%] w-full">
        <span className="font-medium text-lg">Progress</span>
        <span className="text-sm font-medium text-blue-700">{progress}%</span>
      </div>
      <div className="md:w-[70%] w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#5B6DF2] h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Modal
        title="Invite Member"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Invite
          </Button>,
        ]}
      >
        <Form>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupLeft;
