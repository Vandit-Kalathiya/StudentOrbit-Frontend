import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaJava,
} from "react-icons/fa";
import { BASE_URL, getUsernameFromToken } from "../../../authToken";

function Skills({ openAddSkillModal, skills, setSkills, newSkill, setNewSkill }) {
  // const [skills, setSkills] = useState([]);
  // const [skillList, setSkillList] = useState([]);
  // const [showModal, setShowModal] = useState(false); 

  const skillIcons = {
    react: <FaReact className="text-blue-500" />,
    node: <FaNodeJs className="text-green-500" />,
    python: <FaPython className="text-blue-600" />,
    html: <FaHtml5 className="text-orange-600" />,
    css: <FaCss3Alt className="text-blue-500" />,
    javascript: <FaJs className="text-yellow-500" />,
    java: <FaJava className="text-blue-600 text-xl" />
  };

  const fetchedUsername = getUsernameFromToken();

  useEffect(() => {
    axios.get(`${BASE_URL}/students/skills/${fetchedUsername}`, { withCredentials: true, })
      .then((res) => {
        const demo = res.data;
        // console.log(demo);

        setSkills(demo);
      })
      .catch(() => console.log("Error while fetching projects in profile")
      );
  }, [])

  // useEffect(() => {
  //   const username = localStorage.getItem("username")
  //   axios.get(`${BASE_URL}/students/skills/${username}`)
  //     .then((res) => {
  //       const demo = res.data;
  //       setSkills(demo);
  //     })
  //     .catch(() => console.log("Error while fetching projects in profile")
  //     );
  // }, [skills])

  const removeSkill = (skillToRemove) => {
    axios.delete(`${BASE_URL}/students/skills/${fetchedUsername}/${skillToRemove}`, { withCredentials: true, })
      .then((res) => {
        setSkills(res.data)
      })
      .catch(() => console.log("Error while removing skill"));
  };

  return (
    <div className="skills p-5 bg-white rounded-lg font-poppins">
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">My Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border-[1px] border-[#8694ff] flex-shrink-0"
          >
            {skillIcons[skill.name] ? (
              skillIcons[skill.name]
            ) : (
              <FaJs className="text-gray-400" />
            )}
            <span className="text-lg font-medium flex-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {skill.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </span>
            <CloseOutlined
              onClick={() => removeSkill(skill.name)}
              className="p-1 text-gray-500 cursor-pointer hover:text-gray-800"
            />
          </div>
        ))}

        <div
          className="flex items-center justify-center p-3 cursor-pointer"
          onClick={openAddSkillModal}
        >
          <PlusOutlined className="text-2xl rounded-full border-2 p-2" />
        </div>
      </div>
    </div>
  );
}

export default Skills;
