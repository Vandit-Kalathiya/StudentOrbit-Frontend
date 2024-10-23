import { Avatar } from "antd";

const ProjectAvatarList = ({ members }) => {
  const colorStyles = {
    coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
    blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
  };

  const getInitials = (name) => {
    return name.username.slice(-3);
  };

  return (
    <div className="flex space-x-2 my-2">
      {members.map((member, index) => (
        <Avatar
          key={index}
          style={{
            backgroundColor: index % 2 === 0 ? colorStyles.blue.backgroundColor : colorStyles.coral.backgroundColor,
            color: index % 2 === 0 ? colorStyles.blue.color : colorStyles.coral.color,
            border: `2px solid ${index % 2 === 0 ? colorStyles.blue.border : colorStyles.coral.border}`,
          }}
        >
          {getInitials(member)}
        </Avatar>
      ))}
    </div>
  );
};

export default ProjectAvatarList;
