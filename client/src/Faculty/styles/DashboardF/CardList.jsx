import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";

const cardData = [
  {
    title: "12 done",
    description: "Total tasks Approved 🎉",
    icon: <CheckCircleOutlined />,
    borderColor: "border-green-200",
    avatarColor: "bg-green-200",
    iconColor: "text-green-500",
  },
  {
    title: "5 In Review",
    description: "Total tasks Pending 🔄",
    icon: <SyncOutlined />,
    borderColor: "border-orange-200",
    avatarColor: "bg-orange-200",
    iconColor: "text-orange-500",
  },
];

const CardList = () => (
  <div className="flex flex-wrap justify-between">
    {cardData.map((card, index) => (
      <div key={index} className="w-full lg:w-[49%] md:mb-2 mb-5">
        <div
          className={`w-full p-4 rounded-lg shadow-md flex items-center bg-white h-28 ${card.borderColor}`}
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
