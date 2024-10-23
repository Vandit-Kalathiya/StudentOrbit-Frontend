import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Input, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";

const colorCombinations = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" }, // Green
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" }, // Purple
];

function GroupLeft() {

  const location = useLocation();

  const project = location.state;

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const extractLastTwoDigits = (member) => {

    return member.username.substring(4);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Invited email:", email);
    setEmail("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const mentors = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' },
  ];

  const handleMentorChange = () => {

  }
  // console.log('in groupLeft...',project)

  return (
    <div className="md:px-6 my-6 w-full">
      <h2 className="md:text-3xl text-2xl mb-4 font-semibold">{project.groupName}</h2>
      <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">
        {project.groupDescription}
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="md:text-lg text-base font-semibold">Project Lead:</h3>
        <h3 className="md:text-lg text-base">{project.groupLeader?.toUpperCase() || "N/A"}</h3>
      </div>
      <div className="flex flex-wrap items-center gap-4 my-4">
        <h3 className="md:text-lg text-base font-semibold">Members:</h3>
        {project.students.map((member, index) => {
          const color = colorCombinations[index % colorCombinations.length];
          return (
            <Avatar
              key={index}
              style={{
                backgroundColor: color.backgroundColor,
                color: color.color,
                border: `2px solid ${color.border}`,
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
          disabled={project.students.length >= 4} // Disable the button if there are 4 or more members
        >
          Invite
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="md:text-lg text-base font-semibold">Mentor:</h3>
        <Select
          value={selectedMentor}
          onChange={handleMentorChange}
          style={{ width: 200 }}
          placeholder="Select a mentor"
        >
          {mentors.map((mentor) => (
            <Select.Option key={mentor.id} value={mentor.name}>
              {mentor.name}
            </Select.Option>
          ))}
        </Select>
        {/* <button>Select</button> */}
      </div>


      {/* <div className="flex items-center mb-4">
        <h3 className="md:text-lg text-base font-semibold">Category:</h3>
        <h3 className="md:text-lg text-base ml-1">{category}</h3>
      </div> */}
      <div className="flex justify-between mb-1 mt-8 md:w-[70%] w-full">
        <span className="font-medium text-lg">Progress</span>
        <span className="text-sm font-medium text-blue-700">{45}%</span>
      </div>
      <div className="md:w-[70%] w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-[#5B6DF2] h-2.5 rounded-full"
          style={{ width: `${45}%` }}
        ></div>
      </div>

      <Modal
        title="Invite Member"
        open={isModalVisible}
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
                required: true,
                message: "Please enter an email address!",
              },
              {
                pattern:
                  /^\d{2}[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/,
                message: "Email must be in the format yycexxx@charusat.edu.in",
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
