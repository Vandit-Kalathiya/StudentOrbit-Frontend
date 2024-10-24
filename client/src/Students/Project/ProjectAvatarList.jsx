import { Avatar } from "antd";

const ProjectAvatarList = ({ members }) => {
  const colorStyles = [
    { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
    { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
    { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" }, // Green
    { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" }, // Purple
  ];

  const getInitials = (name) => {
    return name.username.slice(-3);
  };

  return (
    <div className="flex space-x-2 my-2">
      {members.map((member, index) => {
        const color = colorStyles[index % colorStyles.length];
        return (
          <Avatar
            key={index}
            style={{
              backgroundColor: color.backgroundColor,
              color: color.color,
              border: `2px solid ${color.border}`,
            }}
          >
            {getInitials(member)}
          </Avatar>
        )
      })}
    </div>
  );
};

export default ProjectAvatarList;
