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
} from "react-icons/fa"; 

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
  };
  
  let t = []
  useEffect(() => {
    if (newSkill) {
      const username = localStorage.getItem("username");
      t.push(newSkill)
      axios.post(`http://localhost:1818/students/skills/${username}`, t)
        .then((res) => {
          setSkills(res.data.skills); 
        })
        .catch(() => console.log("Error while adding skill"));
    }
  }, [t]);  

  useEffect(() => {
    const username = localStorage.getItem("username")
    axios.get(`http://localhost:1818/students/skills/${username}`)
    .then((res) => {
      const demo = res.data;
      setSkills(demo);
    })
    .catch(() => console.log("Error while fetching projects in profile")
    );
  }, []) 
  
  // const removeSkill = (skillToRemove) => {
  //   const username = localStorage.getItem("username");
  //   axios.delete(`http://localhost:1818/students/skills/${username}/${skillToRemove}`)
  //     .then((res) => {
  //       setSkills(res.data.skills); 
  //     })
  //     .catch(() => console.log("Error while removing skill"));
  // };

  return (
    <div className="skills p-5 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">My Skills</h2>
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
            <span className="text-lg font-medium flex-1 text-center">
              {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
            </span>
            <CloseOutlined
              // onClick={() => removeSkill(skill)}
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
