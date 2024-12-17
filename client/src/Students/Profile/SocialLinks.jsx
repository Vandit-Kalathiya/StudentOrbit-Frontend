import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

const SocialLinks = ({ student }) => {
  return (
    <div className="md:text-xl text-lg mt-5 md:mt-0 font-semibold flex gap-4 flex-col">
      <div className="flex items-center space-r-2">
        <a href={student.gitHubUrl} target="_blank" rel="noopener noreferrer" className="ml-3 flex gap-3 items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          <FaGithubSquare color="black" />
          Github
        </a>
      </div>
      <div className="flex items-center space-r-2">
        <a href={student.linkedInUrl} target="_blank" rel="noopener noreferrer" className="ml-3 flex gap-3 items-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          <FaLinkedin color="#2b99c1" />
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
