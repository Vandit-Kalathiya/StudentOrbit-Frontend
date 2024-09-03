import { Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const colorStyles = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }
};

const TaskAssignees = ({ assignees, selectedAssignees, showModal }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold">Assignees :</h3>
      <div className="flex items-center gap-2">
        {selectedAssignees.map((initials, index) => {
          const assignee = assignees.find(a => a.initials === initials);
          // Determine color based on index (odd/even)
          const colorKey = index % 2 === 0 ? 'blue' : 'coral';
          const { backgroundColor, color, border } = colorStyles[colorKey];

          return assignee ? (
            <Avatar
              key={initials}
              style={{ backgroundColor, color, border: `2px solid ${border}` }}
            >
              {assignee.initials}
            </Avatar>
          ) : null;
        })}
        <Button
          icon={<PlusOutlined />}
          className="ml-2 rounded-full"
          onClick={showModal}
        />
      </div>
    </div>
  );
};

export default TaskAssignees;
