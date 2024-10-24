import { motion } from 'framer-motion';
import { useState } from 'react';
import { Modal, Button, Input } from 'antd'; 
import ProfileImage from './ProfileImage';
import ProfileDetails from './ProfileDetails';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import Skills from './Skills';
import Mentors from './Mentors';
import Projects from './Projects';
import { MdOutlineEdit } from "react-icons/md";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    profileImage: '',
    github: '',
    linkedin: '',
  });

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

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', profileData);
    setIsModalOpen(false); 
  };

  return (
    <motion.div
      className='mt-10 px-8 md:mt-8 md:px-8'
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
          <ProfileDetails />
          <div className="divider"></div>
          <ContactInfo />
          <div className="divider"></div>
          <SocialLinks /> 
        </motion.div>

        <button 
          className="absolute top-4 right-4 bg-[#5B6DF3] text-white p-2 rounded-md flex items-center"
          onClick={handleEditClick}
        >
          <MdOutlineEdit size={16}/>
        </button>
      </div>

      <Modal 
        title="Edit Profile" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={[
          <Button key="submit" className='bg-[#5B6DF3] text-white' onClick={handleSubmit}>
            Update Profile
          </Button>,
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="github">GitHub Profile URL:</label>
            <Input
              name="github"
              value={profileData.github}
              onChange={handleChange}
              placeholder="Enter your GitHub profile URL"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700" htmlFor="linkedin">LinkedIn Profile URL:</label>
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

      <div className="flex md:flex-row flex-col mt-5 md:mt-0 mb-5 w-full justify-between gap-7 rounded-xl">
        <motion.div variants={sectionVariants}>
          <Projects />
        </motion.div>
        <motion.div className="right md:w-[33%]" variants={sectionVariants}>
          <Skills />
          <Mentors />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;
