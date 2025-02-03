import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, getUsernameFromToken } from "../../../../authToken";

const cardData = [
  {
    title: "Done",
    description: "Total tasks Approved 🎉",
    icon: <CheckCircleOutlined />,
    borderColor: "border-green-200",
    avatarColor: "bg-green-200",
    iconColor: "text-green-500",
  },
  {
    title: "In Review",
    description: "Total tasks Pending 🔄",
    icon: <SyncOutlined />,
    borderColor: "border-orange-200",
    avatarColor: "bg-orange-200",
    iconColor: "text-orange-500",
  },
];

const CardList = () => {

  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTask, setCompletedTasks] = useState(0);
  const fetchedUsername = getUsernameFromToken()

  useEffect(() => {
    axios
      .get(`${BASE_URL}/faculty/batches/g/${fetchedUsername}`, { withCredentials: true })
      .then((res) => {
        const tasksInReview = [];
        const tasksCompleted = [];

        res.data.forEach((group) => {
          group.weeks.forEach((week) => {
            week.tasks.forEach((task) => {
              if (task.status === "IN_REVIEW") {
                tasksInReview.push(task);
              } else if (task.status === 'COMPLETED') {
                tasksCompleted.push(task)
              }
            });
          });
        });
        setPendingTasks(tasksInReview.length);
        setCompletedTasks(tasksCompleted.length)
      })
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  return (
    <div className="flex flex-wrap justify-between">
      {cardData.map((card, index) => (
        <div key={index} className="w-full lg:w-[49%] md:mb-2 mb-5">
          <div
            className={`flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-xl p-8 w-full h-28 ${card.borderColor}`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${card.avatarColor}`}
            >
              <span className={`text-2xl ${card.iconColor}`}>
                {card.icon}
              </span>
            </div>
            <div>
              <div className={`font-semibold text-lg ${card.iconColor}`}>
                {card.title == 'In Review' ? pendingTasks : completedTask} {card.title}
              </div>
              <div className="text-gray-500">{card.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default CardList;
