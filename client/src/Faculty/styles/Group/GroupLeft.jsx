// import { useEffect, useState } from "react";
// import { Avatar, Button, Modal, Input, Form, Select, message } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const colorCombinations = [
//   { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
//   { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
//   { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" },
//   { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" },
// ];

// function GroupLeft({projectName}) {
//   const location = useLocation();
//   const project = location.state;

//   const [mentor, setMentor] = useState(project.mentor || null);
//   const [selectedMentor, setSelectedMentor] = useState(project.mentor || null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [mentors, setMentors] = useState([]);

//   const extractLastTwoDigits = (member) => member.username.substring(4);

//   const showModal = () => setIsModalVisible(true);
//   const handleOk = () => {
//     setIsModalVisible(false);
//     console.log("Invited email:", email);
//     setEmail("");
//   };
//   const handleCancel = () => setIsModalVisible(false);
//   const handleEmailChange = (e) => setEmail(e.target.value);

//   // Fetch mentors from backend on component mount
//   useEffect(() => {
//     axios.get("http://localhost:1818/faculty/all")
//       .then((response) => setMentors(response.data))
//       .catch((error) => console.error("Failed to fetch mentors:", error));
//   }, []);

//   useEffect(()=>{
//     axios.get(`http://localhost:1818/faculty/groups/g/${projectName}`)
//       .then((response) => setMentors(response.data))
//       .catch((error) => console.error("Failed to fetch mentors:", error));
//   })

//   const handleMentorChange = (username) => {
//     setSelectedMentor(username);
//   };

//   const submitMentorSelection = () => {
//     Modal.confirm({
//       title: "Are you sure?",
//       content: `Are you sure you want to select ${selectedMentor} as your mentor?`,
//       onOk: () => {
//         axios.post(`http://localhost:1818/faculty/mentor/${selectedMentor}/${project.id}`)
//           .then(() => message.success("Mentor selected successfully!"))
//           .catch((error) => {
//             console.error("Failed to submit mentor selection:", error);
//             message.error("Failed to select mentor.");
//           });
//       }
//     });
//   };

//   return (
//     <div className="md:px-6 my-6 w-full">
//       <h2 className="md:text-3xl text-2xl mb-4 font-semibold">{project.groupName}</h2>
//       <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">{project.groupDescription}</p>

//       <div className="flex flex-wrap items-center gap-2 mb-2">
//         <h3 className="md:text-lg text-base font-semibold">Project Lead :</h3>
//         <h3 className="md:text-lg text-base">{project.groupLeader?.toUpperCase() || "N/A"}</h3>
//       </div>

//       <div className="flex flex-wrap items-center gap-4 my-4">
//         <h3 className="md:text-lg text-base font-semibold">Members :</h3>
//         {project.students.map((member, index) => {
//           const color = colorCombinations[index % colorCombinations.length];
//           return (
//             <Avatar
//               key={index}
//               style={{
//                 backgroundColor: color.backgroundColor,
//                 color: color.color,
//                 border: `2px solid ${color.border}`,
//               }}
//             >
//               {extractLastTwoDigits(member)}
//             </Avatar>
//           );
//         })}
//         <Button
//           icon={<PlusOutlined />}
//           size="small"
//           className="border-[#8a8a8a]"
//           onClick={showModal}
//           disabled={project.students.length >= 4}
//         >
//           Invite
//         </Button>
//       </div>

//       <div className="flex flex-wrap items-center gap-2 mb-2">
//         <h3 className="md:text-lg text-base font-semibold">Mentor :</h3>
//         {mentor ? (
//           <span className="md:text-lg text-base">{mentor.username}</span>
//         ) : (
//           <>
//             <Select
//               value={selectedMentor}
//               onChange={handleMentorChange}
//               style={{ width: 200 }}
//               placeholder="Select a mentor"
//             >
//               {mentors.map((mentor) => (
//                 <Select.Option key={mentor.id} value={mentor.username}>
//                   {mentor.username}
//                 </Select.Option>
//               ))}
//             </Select>
//             <Button type="primary" onClick={submitMentorSelection} disabled={!selectedMentor}>
//               Submit Mentor
//             </Button>
//           </>
//         )}
//       </div>

//       <div className="flex justify-between mb-1 mt-8 md:w-[70%] w-full">
//         <span className="font-medium text-lg">Progress</span>
//         <span className="text-sm font-medium text-blue-700">45%</span>
//       </div>
//       <div className="md:w-[70%] w-full bg-gray-200 rounded-full h-2.5">
//         <div className="bg-[#5B6DF2] h-2.5 rounded-full" style={{ width: "45%" }}></div>
//       </div>

//       <Modal
//         title="Invite Member"
//         open={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleOk}>
//             Invite
//           </Button>,
//         ]}
//       >
//         <Form>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter an email address!",
//               },
//               {
//                 pattern: /^\d{2}[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/,
//                 message: "Email must be in the format yycexxx@charusat.edu.in",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Enter email address"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default GroupLeft;


import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Input, Form, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [email, setEmail] = useState("");
  const [mentors, setMentors] = useState([]);
  const [temp,setTemp] = useState(0)

  const extractLastTwoDigits = (member) => member.username.substring(4);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
    setEmail("");
  };
  const handleCancel = () => setIsModalVisible(false);
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Fetch mentors from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:1818/faculty/all")
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Failed to fetch mentors:", error));
  }, []);

  // Fetch project details from backend
  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/groups/g/${projectName.replaceAll("-"," ")}`)
      .then((response) => {
        setProject(response.data);
        setMentor(response.data.mentor);
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
          .post(`http://localhost:1818/faculty/mentor/${selectedMentor}/${project.id}`)
          .then(() =>{
            message.success("Mentor selected successfully!")
            setTemp(1)
          })
          .catch((error) => {
            console.error("Failed to submit mentor selection:", error);
            message.error("Failed to select mentor.");
          });
      },
    });
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="md:px-6 my-6 w-full">
      <h2 className="md:text-3xl text-2xl mb-4 font-semibold">{project.groupName}</h2>
      <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">{project.groupDescription}</p>

      <div className="flex flex-wrap items-center gap-2 mb-2">
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
        <Button
          icon={<PlusOutlined />}
          size="small"
          className="border-[#8a8a8a]"
          onClick={showModal}
          disabled={project.students.length >= 4}
        >
          Invite
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h3 className="md:text-lg text-base font-semibold">Mentor :</h3>
        {mentor ? (
          <span className="md:text-lg text-base">{mentor.username}</span>
        ) : (
          <>
            <Select
              value={selectedMentor}
              onChange={handleMentorChange}
              style={{ width: 200 }}
              placeholder="Select a mentor"
            >
              {mentors.map((mentor) => (
                <Select.Option key={mentor.id} value={mentor.username}>
                  {mentor.username}
                </Select.Option>
              ))}
            </Select>
            <Button type="primary" onClick={submitMentorSelection} disabled={!selectedMentor}>
              Submit Mentor
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-between mb-1 mt-8 md:w-[70%] w-full">
        <span className="font-medium text-lg">Progress</span>
        <span className="text-sm font-medium text-blue-700">45%</span>
      </div>
      <div className="md:w-[70%] w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-[#5B6DF2] h-2.5 rounded-full" style={{ width: "45%" }}></div>
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
              { required: true, message: "Please enter an email address!" },
              {
                pattern: /^\d{2}[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)@charusat\.edu\.in$/,
                message: "Email must be in the format yycexxx@charusat.edu.in",
              },
            ]}
          >
            <Input placeholder="Enter email address" value={email} onChange={handleEmailChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupLeft;
