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

function Skills() {
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const skillIcons = {
    react: <FaReact className="text-blue-500" />,
    node: <FaNodeJs className="text-green-500" />,
    python: <FaPython className="text-blue-600" />,
    html: <FaHtml5 className="text-orange-600" />,
    css: <FaCss3Alt className="text-blue-500" />,
    javascript: <FaJs className="text-yellow-500" />,
  };

  const addSkill = () => {
    const username = localStorage.getItem("username")
    let t = []
    t.push(skillList)
    axios.post(`http://localhost:1818/students/skills/${username}`, t)
    .then((res) => {
      const demo = res.data;
      setSkills(demo.skills)
      setShowModal(false);
      setSkillList([]);
    })
    .catch((error) => console.log("Error while fetching projects in profile")
    );
  };


  useEffect(() => {
    const username = localStorage.getItem("username")

    axios.get(`http://localhost:1818/students/skills/${username}`)
    .then((res) => {
      const demo = res.data;
      setSkills(demo);
    })
    .catch((error) => console.log("Error while fetching projects in profile")
    );
  }, []) 
  
  const removeSkill = (skillToRemove) => {
    setSkillList(skills.filter((skill) => skill !== skillToRemove));
  };

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
              onClick={() => removeSkill(skill)}
              className="p-1 text-gray-500 cursor-pointer hover:text-gray-800"
            />
          </div>
        ))}

        <div
          className="flex items-center justify-center p-3 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <PlusOutlined className="text-2xl rounded-full border-2 p-2" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add a New Skill</h2>
            <input
              type="text"
              value={skillList}
              onChange={(e) => setSkillList(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSkill();
              }}
              className="border border-gray-400 p-2 rounded-lg w-full mb-4"
              placeholder="Enter a skill (e.g., React, Node, Python)"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white p-2 rounded-lg mr-3"
              >
                Cancel
              </button>
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white p-2 rounded-lg"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
