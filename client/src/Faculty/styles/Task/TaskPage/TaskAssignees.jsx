import { Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../authToken";

const colorCombinations = [
  { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" }, // Coral
  { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" }, // Blue
  { backgroundColor: "#f6ffed", color: "#237804", border: "#237804" }, // Green
  { backgroundColor: "#f9f0ff", color: "#531dab", border: "#531dab" }, // Purple
];

const TaskAssignees = ({ assignees, showModal, taskId }) => {
  const location = useLocation();
  const [assigneeMembers, setAssigneeMembers] = useState(assignees);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tasks/assignees/${taskId}`, { withCredentials: true })
      .then((res) => {
        setAssigneeMembers(res.data);
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tasks/assignees/${taskId}`, { withCredentials: true })
      .then((res) => {
        setAssigneeMembers(res.data);
      })
      .catch((error) => {
        console.error("There was an error while assigning assignees: ", error);
      });
  }, [assignees]);

  const isInFDashboard = location.pathname.startsWith("/f/dashboard");

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold italic text-gray-700">Assignees :</h3>
      <div className="flex items-center gap-2">
        {assigneeMembers.length > 0 ? (
          assigneeMembers.map((assignee, index) => {
            const color = colorCombinations[index % colorCombinations.length];
            return assignee ? (
              <Avatar
                key={assignee.id}
                style={{
                  backgroundColor: color.backgroundColor,
                  color: color.color,
                  border: `2px solid ${color.border}`,
                }}
              >
                {assignee.username.substring(4, 7).toUpperCase()}
              </Avatar>
            ) : (
              "NA"
            );
          })
        ) : (
          <span className="text-gray-500">NA</span>
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
