import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa"; // Importing some icons

function Skills() {
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  const skillIcons = {
    react: <FaReact className="text-blue-500" />,
    node: <FaNodeJs className="text-green-500" />,
    python: <FaPython className="text-blue-600" />,
    html: <FaHtml5 className="text-orange-600" />,
    css: <FaCss3Alt className="text-blue-500" />,
    javascript: <FaJs className="text-yellow-500" />,
  };

  const addSkill = () => {
    if (skills.trim() !== "") {
      setSkillList([...skillList, skills.trim().toLowerCase()]);
      setSkills("");
      setShowModal(false);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillList(skillList.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="skills p-5 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">My Skills</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {skillList.map((skill, index) => (
          <div
            key={index}
            className="relative flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border-[1px] border-[#8694ff] flex-shrink-0"
          >
            {skillIcons[skill] ? (
              skillIcons[skill]
            ) : (
              <FaJs className="text-gray-400" />
            )}
            <span className="text-lg font-medium flex-1 text-center">
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
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
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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
