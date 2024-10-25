import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
import ProfileImage from "./ProfileImage";
import ProfileDetails from "./ProfileDetails";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import Skills from "./Skills";
import Mentors from "./Mentors";
import Projects from "./Projects";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Profile() {
  const [modalType, setModalType] = useState(null);
  const [profileData, setProfileData] = useState({
    profileImage: "",
    github: "",
    linkedin: "",
  });
  const [newSkill, setNewSkill] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios.get(`http://localhost:1818/students/u/${username}`)
    .then((res) => {
      setUserData(res.data); 
    })
    .catch(() => console.log("Error while fetching user data"));
  }, [])

  console.log(userData);
  

  const handleModalOpen = (type) => {
    setModalType(type);
  };

  const handleModalClose = () => {
    setModalType(null);
    setNewSkill("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  const addSkill = () => {
    let t = []
    if (newSkill) {
      const username = localStorage.getItem("username");
      t.push(newSkill)
      axios.post(`http://localhost:1818/students/skills/${username}`, t)
        .then((res) => {
          setSkills(res.data.skills); 
        })
        .catch(() => console.log("Error while adding skill"));
    } 
  } 

  const handleEditClick = () => {
    handleModalOpen("profileEdit");
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", profileData);
    handleModalClose();
  };

  const handleAddSkill = () => {
    console.log("New Skill:", newSkill);
    addSkill();
    setNewSkill("");
    handleModalClose();
  };

  return (
    <motion.div
      className="mt-10 px-8 md:mt-8 md:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <motion.div
          className="bg-white p-5 md:p-0 md:mb-7 w-full md:h-[30vh] rounded-xl flex flex-col md:flex-row items-center justify-evenly"
          variants={sectionVariants}
        >
          <ProfileImage />
          <ProfileDetails student={userData}/>
          <div className="divider"></div>
          <ContactInfo student={userData}/>
          <div className="divider"></div>
          <SocialLinks student={userData}/>
        </motion.div>

        <button
          className="absolute top-4 right-4 bg-[#5B6DF3] text-white p-2 rounded-md flex items-center"
          onClick={handleEditClick}
        >
          <MdOutlineEdit size={16} />
        </button>
      </div>

      <Modal
        title="Edit Profile"
        open={modalType === "profileEdit"} // Open modal if type matches
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            className="bg-[#5B6DF3] text-white"
            onClick={handleSubmitProfile}
          >
            Update Profile
          </Button>,
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmitProfile} className="mb-4">
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="profileImage">
              Profile Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="github">
              GitHub Profile URL:
            </label>
            <Input
              name="github"
              value={profileData.github}
              onChange={handleChange}
              placeholder="Enter your GitHub profile URL"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="linkedin">
              LinkedIn Profile URL:
            </label>
            <Input
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleChange}
              placeholder="Enter your LinkedIn profile URL"
              required
            />
          </div>
        </form>
      </Modal>

      <div className="flex md:flex-row flex-col mt-5 md:mt-0 mb-5 w-full justify-between gap-7">
        <motion.div className="left md:w-[66%]" variants={sectionVariants}>
          <Projects />
        </motion.div>
        <motion.div className="right md:w-[33%]" variants={sectionVariants}>
          <Skills
            openAddSkillModal={() => handleModalOpen("addSkill")}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            skills={skills}
            setSkills={setSkills}
          />
          <Mentors />
        </motion.div>
      </div>

      <Modal
        title="Add a New Skill"
        open={modalType === "addSkill"}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="submit"
            className="bg-[#5B6DF3] text-white"
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>,
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
        ]}
      >
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter a skill (e.g., React, Node, Python)"
        />
      </Modal>
    </motion.div>
  );
}
export default Profile;
