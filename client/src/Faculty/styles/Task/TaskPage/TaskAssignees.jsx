import { Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const colorStyles = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
};

const TaskAssignees = ({ assignees, showModal,taskId }) => {
  const location = useLocation();
  const [assigneeMembers, setAssigneeMembers] = useState(assignees);

  useEffect(() => {
    axios
      .get(`http://localhost:1818/tasks/assignees/${taskId}`)
      .then((res) => {
        // console.log(res.data);
        setAssigneeMembers(res.data)
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
    // setAssigneeMembers(assignees);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:1818/tasks/assignees/${taskId}`)
      .then((res) => {
        // console.log(res.data);
        setAssigneeMembers(res.data)
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
    // setAssigneeMembers(assignees);
  }, [assignees]);

  const isInFDashboard = location.pathname.startsWith("/f/dashboard");

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold">Assignees :</h3>
      <div className="flex items-center gap-2">
        {assigneeMembers.length > 0 ? (
          assigneeMembers.map((assignee, index) => {
            const colorKey = index % 2 === 0 ? "blue" : "coral";
            const { backgroundColor, color, border } = colorStyles[colorKey];

            return assignee ? (
              <Avatar
                key={assignee.id}
                style={{ backgroundColor, color, border: `2px solid ${border}` }}
              >
                {assignee.username.substring(4, 7).toUpperCase()}
              </Avatar>
            ) : (
              "NA"
            );
          })
        ) : (
          <span className="text-gray-500">NA</span> // Display "NA" when no assignees
        )}
        {!isInFDashboard && (
          <Button
            icon={<PlusOutlined />}
            className="ml-2 rounded-full"
            onClick={showModal}
          />
        )}
      </div>
    </div>
  );
};

export default TaskAssignees;
