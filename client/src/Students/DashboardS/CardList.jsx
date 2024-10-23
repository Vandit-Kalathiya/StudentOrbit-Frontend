import { CheckCircleOutlined, PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";

const cardData = [
  {
    title: "12 done",
    description: "in the last 7 days 🎉",
    icon: <CheckCircleOutlined />,
    borderColor: "border-green-200",
    avatarColor: "bg-green-200",
    iconColor: "text-green-500",
  },
  {
    title: "5 In Progress",
    description: "in the last 7 days 🔄",
    icon: <SyncOutlined />,
    borderColor: "border-blue-200",
    avatarColor: "bg-blue-200",
    iconColor: "text-blue-500",
  },
  {
    title: "8 To do",
    description: "in the last 7 days ✨",
    icon: <PlusCircleOutlined />,
    borderColor: "border-yellow-200",
    avatarColor: "bg-yellow-200",
    iconColor: "text-yellow-500",
  },
];

const CardList = () => (
  <div className="flex flex-wrap -mx-4">
    {cardData.map((card, index) => (
      <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
        <div
          className={`w-full p-4 rounded-lg shadow-md flex items-center bg-white h-36 ${card.borderColor}`}
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
              {card.title}
            </div>
            <div className="text-gray-500">{card.description}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CardList;
