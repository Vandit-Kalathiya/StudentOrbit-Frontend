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
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
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
  const [technology, setTechnology] = useState("");
  const [mentors, setMentors] = useState([]);
  const [temp, setTemp] = useState(0);
  const [isTechModalVisible, setIsTechModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [technologiesToDelete, setTechnologiesToDelete] = useState([]);

  const [form] = Form.useForm();

  const role = getRole();

  const extractLastTwoDigits = (member) => member.username.substring(4);

  const showModal = () => setIsModalVisible(true);

  const showTechModal = () => setIsTechModalVisible(true);

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

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsTechModalVisible(false);
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setTechnologiesToDelete([]);
  };

  const handleTechnologyDelete = (techId) => {
    setTechnologiesToDelete(prevTechnologies => {
      if (prevTechnologies.includes(techId)) {
        return prevTechnologies.filter(id => id !== techId);
      } else {
        return [...prevTechnologies, techId];
      }
    });
  };

  const handleUpdateTechnologies = () => {
    if (technologiesToDelete.length === 0) {
      setIsEditMode(false);
      return;
    }

    axios
      .delete(`http://localhost:1818/tech/delete/${project.id}`, {
        data: technologiesToDelete,
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data);
        setTemp((prev) => !prev);
        setIsEditMode(false);
        setTechnologiesToDelete([]);
      })
      .catch((err) => {
        console.error("Failed to update technologies:", err);
        toast.error("Failed to update technologies");
      });
  };

  const handleTechOk = () => {
    if (!technology.trim()) {
      toast.error("Please enter a technology name");
      return;
    }

    axios
      .post(
        `http://localhost:1818/tech/add/${project.id}`,
        technology.trim(),
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("Technology added successfully!");
        setTemp((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to add technology");
      });
    setIsTechModalVisible(false);
    setTechnology("");
  };

  const handleTechChange = (e) => setTechnology(e.target.value);

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
      .catch((error) => console.error("Failed to fetch project details:", error));
  }, [temp, projectName]);

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
      content: (
        <span>
          Are you sure you want to mark the project{' '}
          <strong>{project.groupName}</strong> as Completed.?
        </span>
      ),
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
        {project.technologies?.map((tech, index) => {
          const isMarkedForDeletion = technologiesToDelete.includes(tech.id);
          return (
            <span
              key={index}
              className={`px-4 py-1.5 text-sm rounded-full border-2 
              ${isMarkedForDeletion
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-[#5B6DF3]/30 text-[#5B6DF3] hover:bg-[#5B6DF3] hover:text-white'
                } transition-all duration-300 
              cursor-default transform hover:-translate-y-0.5 relative group flex items-center gap-2`}
            >
              {tech.name
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
              {isEditMode && (
                <button
                  onClick={() => handleTechnologyDelete(tech.id)}
                  className="flex items-center justify-center"
                  title={isMarkedForDeletion ? "Undo remove" : "Remove technology"}
                >
                  <CloseOutlined
                    style={{
                      fontSize: '12px',
                      paddingLeft: '2px',
                      fontWeight: 'bold',
                      transform: isMarkedForDeletion ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>
              )}
            </span>
          );
        })}
        <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showTechModal}
          title="Add a technology"
        />
        <Button
          type="dashed"
          shape="circle"
          icon={<EditOutlined />}
          onClick={toggleEditMode}
          title="Edit technologies"
          className={isEditMode ? "bg-blue-100" : ""}
        />
      </div>

      {isEditMode && (
        <div className="mt-4 space-x-2">
          <Button
            type="primary"
            onClick={handleUpdateTechnologies}
            disabled={technologiesToDelete.length === 0}
          >
            Update
          </Button>
          <Button onClick={toggleEditMode}>Cancel</Button>
        </div>
      )}

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
          {getOrdinalSuffix(parseInt(project.startDate.substring(8, 10), 10))}{" "}
          {getMonthAbbreviation(parseInt(project.startDate.substring(5, 7), 10))},{" "}
          {project.startDate.substring(0, 4)}
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

      <Modal
        title="Add New Technology"
        open={isTechModalVisible}
        onCancel={handleCancel}
        onOk={handleTechOk}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form}>
          <Form.Item name="technology">
            <Input
              placeholder="Enter new technology"
              value={technology}
              onChange={handleTechChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupLeft;