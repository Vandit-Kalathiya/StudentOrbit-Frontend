import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Input, Form, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { getUsernameFromToken, getRole } from "../../../../authToken";
import toast from "react-hot-toast";

const colorCombinations = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" },
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" },
];

function GroupLeft() {
  const { projectName } = useParams(); // Assuming projectName is a route parameter
  const [project, setProject] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [mentors, setMentors] = useState([]);
  const [temp, setTemp] = useState(0);

  const [form] = Form.useForm(); // Create form instance

  const extractLastTwoDigits = (member) => member.username.substring(4);
  const fetchedUsername = getUsernameFromToken();

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    form.validateFields() // Validate the form fields before proceeding
      .then(() => {
        addMember()
        setIsModalVisible(false);
        setUsername("");
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const handleCancel = () => setIsModalVisible(false);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  // Fetch mentors from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:1818/faculty/all", { withCredentials: true, })
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Failed to fetch mentors:", error));
  }, []);

  // Fetch project details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/groups/g/${projectName.replaceAll("%", " ")}`, { withCredentials: true, })
      .then((response) => {
        setProject(response.data);
        setMentor(response.data.mentor);
        setUsername("")
      })
      .catch((error) => console.error("Failed to fetch project details:", error));
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
          .post(`http://localhost:1818/faculty/mentor/${selectedMentor}/${project.id}`, null ,{ withCredentials: true, })
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
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[month - 1];
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const markProjectAsCompleted = () => {
    Modal.confirm({
      title: "Mark Project as Completed",
      content: `Are you sure you want to mark the project "${project.groupName}" as completed?`,
      onOk: () => {
        axios
          .put(`http://localhost:1818/faculty/groups/complete/${project.id}`, {}, { withCredentials: true, })
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

  const showAddMemberModal = () => setIsModalVisible(true);

  const addMember = () => {
    if (project.projectStatus == "COMPLETED") {
      return toast.error("Project is already Completed")
    }

    let memberUsername = []
    memberUsername.push(username)
    axios.post(`http://localhost:1818/faculty/groups/add/member/${project.id}`, memberUsername, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setTemp((p) => !p)
        toast.success(`${username} added in ${projectName}.`)
      }).catch((e) => {
        if (e.response && e.response.status === 500) {
          setIsModalVisible(false);
          setUsername("");
          setTemp((p) => !p)
          toast.error(e.response.data)
        }
      })
  }

  if (!project) return <div className="flex justify-center items-center m-auto h-full">Loading...</div>;

  return (
    <div className="md:px-6 my-6 w-full">
      <h2 className="md:text-3xl text-2xl mb-4 font-semibold">{project.groupName}</h2>
      <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">{project.groupDescription}</p>

      <div className="flex flex-wrap items-center gap-2 mb-2 mt-9">
        <h3 className="md:text-lg text-base font-semibold">Project Lead :</h3>
        <h3 className="md:text-lg text-base">{project.groupLeader?.toUpperCase() || "N/A"}</h3>
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
        {getRole() == "faculty" ? <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showAddMemberModal}
          title="Add Member"
        /> : ""}
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
            <Button type="primary" onClick={submitMentorSelection} disabled={!selectedMentor}>
              Submit Mentor
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2 mt-4">
        <h3 className="md:text-lg text-base font-semibold">Project Start Date : </h3>
        <h3 className="md:text-lg text-base italic">{parseInt(project.startDate.substring(8, 10), 10)}
          <sup>{getOrdinalSuffix(parseInt(project.startDate.substring(8, 10), 10))}</sup> {getMonthAbbreviation(parseInt(project.startDate.substring(5, 7), 10))}'{parseInt(project.startDate.substring(0, 4), 10)}</h3>
      </div>

      <div className="flex justify-between mb-1 mt-8 md:w-[70%] w-full">
        <span className="font-medium text-lg">Progress</span>
        <span className="text-sm font-medium text-blue-700">45%</span>
      </div>
      <div className="md:w-[70%] w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-[#5B6DF2] h-2.5 rounded-full" style={{ width: "45%" }}></div>
      </div>

      <Modal
        title="Add Member"
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
        <Form form={form}>
          <Form.Item
            label="Student ID"
            name="username"
            rules={[
              { required: true, message: "Please enter a Student ID.!" },
              {
                pattern: /^\d{2}[Cc][Ee](00[1-9]|0[1-9]\d|1[0-7]\d|180)$/,
                message: "Username must follow the format YYCEXXX, where YY is two digits and XXX is 001 to 180.",
              },
            ]}
          >
            <Input
              placeholder={`Enter Student ID (e.g., ${new Date().getFullYear().toString().slice(-2) - 1}CEXXX)`}
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Item>
        </Form>
      </Modal>


      {project.groupLeader?.toUpperCase() === fetchedUsername.toUpperCase() ?
        (
          <div className={`mt-[11rem]`}>
            <Button
              type="primary"
              className={`flex items-center justify-center  border rounded-lg ${project.projectStatus === "COMPLETED" ? "px-0 py-0" : "px-3 py-2"
                }`}
              onClick={markProjectAsCompleted}
              disabled={project.projectStatus === "COMPLETED"}
            >
              {project.projectStatus === "COMPLETED" ? (
                <div className={`flex items-center px-3 py-2 ${project.projectStatus === "COMPLETED" ? "border border-green-500 rounded-lg bg-white" : "border border-gray-500 rounded-lg"
                  }`}>
                  <FaCheckCircle className="mr-2 text-green-500" />
                  <span className="text-green-500 font-semibold">Project Completed</span>
                </div>
              ) : (
                <span>Mark as Completed</span>
              )}
            </Button>
          </div>
        ) : ""}
    </div >
  );
}

export default GroupLeft;
