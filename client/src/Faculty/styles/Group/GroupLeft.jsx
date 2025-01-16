import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Modal,
  Input,
  Form,
  Select,
  message,
  Progress,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { getRole } from "../../../../authToken";
import toast from "react-hot-toast";

const colorCombinations = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" },
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" },
];

function GroupLeft({ projectName }) {
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [mentors, setMentors] = useState([]);
  const [temp, setTemp] = useState(0);

  const [form] = Form.useForm();

  const role = getRole();

  const extractLastTwoDigits = (member) => member.username.substring(4);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        addMember();
        setIsModalVisible(false);
        setUsername("");
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const handleCancel = () => setIsModalVisible(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  useEffect(() => {
    axios
      .get("http://localhost:1818/faculty/all", { withCredentials: true })
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Failed to fetch mentors:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/groups/g/${projectName}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProject(response.data);
        setMentor(response.data.mentor);
        setUsername("");
      })
      .catch((error) =>
        console.error("Failed to fetch project details:", error)
      );
  }, [temp]);

  const handleMentorChange = (username) => {
    setSelectedMentor(username);
  };

  const submitMentorSelection = () => {
    Modal.confirm({
      title: "Are you sure?",
      content: `Are you sure you want to select ${selectedMentor} as your mentor?`,
      onOk: () => {
        axios
          .post(
            `http://localhost:1818/faculty/mentor/${selectedMentor}/${project.id}`,
            null,
            { withCredentials: true }
          )
          .then(() => {
            message.success("Mentor selected successfully!");
            setTemp((p) => !p);
          })
          .catch((error) => {
            console.error("Failed to submit mentor selection:", error);
            message.error("Failed to select mentor.");
          });
      },
    });
  };

  const getMonthAbbreviation = (month) => {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month - 1];
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const markProjectAsCompleted = () => {
    Modal.confirm({
      title: "Mark Project as Completed",
      content: `Are you sure you want to mark the project "${project.groupName}" as completed?`,
      onOk: () => {
        axios
          .put(
            `http://localhost:1818/faculty/groups/complete/${project.id}`,
            {},
            { withCredentials: true }
          )
          .then(() => {
            message.success("Project marked as completed!");
            setTemp((prev) => !prev);
          })
          .catch((error) => {
            console.error("Failed to mark project as completed:", error);
            message.error("Failed to mark project as completed.");
          });
      },
    });
  };

  const addMember = () => {
    if (project.projectStatus === "COMPLETED") {
      return toast.error("Project is already Completed");
    }

    let memberUsername = [];
    memberUsername.push(username);
    axios
      .post(
        `http://localhost:1818/faculty/groups/add/member/${project.id}`,
        memberUsername,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setTemp((p) => !p);
        toast.success(`${username} added in ${projectName}.`);
      })
      .catch((e) => {
        if (e.response && e.response.status === 500) {
          setIsModalVisible(false);
          setUsername("");
          setTemp((p) => !p);
          toast.error(e.response.data);
        }
      });
  };

  if (!project)
    return (
      <div className="flex justify-center items-center m-auto h-full">
        Loading...
      </div>
    );

  return (
    <div className="md:px-6 my-6 w-full">
      <h2 className="md:text-3xl text-2xl mb-4 font-semibold">
        {project.groupName}
      </h2>
      <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">
        {project.groupDescription}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies?.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-1.5 text-sm rounded-full border-2 border-[#5B6DF3]/30 text-[#5B6DF3] 
                 hover:bg-[#5B6DF3] hover:text-white transition-all duration-300 
                 cursor-default transform hover:-translate-y-0.5"
          >
            {tech.name
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2 mt-5">
        <h3 className="md:text-lg text-base font-semibold">Project Lead :</h3>
        <h3 className="md:text-lg text-base">
          {project.groupLeader?.toUpperCase() || "N/A"}
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-4 my-4">
        <h3 className="md:text-lg text-base font-semibold">Members :</h3>
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
        {role === "faculty" && (
          <Button
            type="dashed"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={showModal}
            title="Add Member"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="md:text-lg text-base font-semibold">Mentor :</h3>
        {mentor ? (
          <span className="md:text-lg text-base">{mentor.name}</span>
        ) : (
          <>
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
            <Button
              type="primary"
              onClick={submitMentorSelection}
              disabled={!selectedMentor}
            >
              Submit Mentor
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6 mt-4">
        <h3 className="md:text-lg text-base font-semibold">
          Project Start Date :{" "}
        </h3>
        <h3 className="md:text-lg text-base italic">
          {parseInt(project.startDate.substring(8, 10), 10)}
          {getOrdinalSuffix(
            parseInt(project.startDate.substring(8, 10), 10)
          )}{" "}
          {getMonthAbbreviation(
            parseInt(project.startDate.substring(5, 7), 10)
          )}
          , {project.startDate.substring(0, 4)}
        </h3>
      </div>

      <Progress percent={30} strokeColor="#5A6CF1" className="w-[80%]" />

      {role === "faculty" && project.projectStatus === "IN_PROGRESS" && (
        <div className="flex justify-start items-center mt-6 absolute bottom-5">
          <button
            icon={<FaCheckCircle />}
            onClick={markProjectAsCompleted}
            className="bg-[#5A6CF1] text-white p-2 px-4 rounded"
          >
            Mark Completed
          </button>
        </div>
      )}

      <Modal
        title="Add New Member"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter a valid username!" },
              { min: 4, message: "Username must be at least 4 characters." },
            ]}
          >
            <Input
              placeholder="Enter studentId"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupLeft;
