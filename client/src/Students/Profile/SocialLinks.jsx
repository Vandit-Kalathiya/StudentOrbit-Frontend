import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const SocialLinks = () => {
  return (
    <div className="md:text-xl text-lg mt-5 md:mt-0 font-semibold flex gap-4 flex-col">
      <div className="flex items-center space-x-2">
        <GithubOutlined />
        <a href="https://github.com/Suhasi05" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>
      <div className="flex items-center space-x-2">
        <LinkedinOutlined />
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
