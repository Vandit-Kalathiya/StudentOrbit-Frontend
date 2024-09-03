import {
  CheckCircleOutlined,
  HourglassOutlined,
  PlayCircleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const TaskStatus = ({ status, title }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return <PlayCircleOutlined className="text-blue-600 mr-2" />;
      case "In Progress":
        return <HourglassOutlined className="text-yellow-600 mr-2" />;
      case "Completed":
        return <CheckCircleOutlined className="text-green-600 mr-2" />;
      case "In Review":
        return <FileTextOutlined className="text-purple-600 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      {getStatusIcon(status)} {title}
    </h2>
  );
};

export default TaskStatus;
