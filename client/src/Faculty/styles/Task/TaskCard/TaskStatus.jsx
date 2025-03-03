import {
  CheckCircleOutlined,
  HourglassOutlined,
  PlayCircleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const TaskStatus = ({ status, title }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "TO_DO":
        return <PlayCircleOutlined className="text-blue-600 mr-2" />;
      case "IN_PROGRESS":
        return <HourglassOutlined className="text-yellow-600 mr-2" />;
      case "COMPLETED":
        return <CheckCircleOutlined className="text-green-600 mr-2" />;
      case "IN_REVIEW":
        return <FileTextOutlined className="text-purple-600 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <h2 className="text-lg font-semibold mb-2 flex max-w-[70%] items-center">
      {getStatusIcon(status)} {title}
    </h2>
  );
};

export default TaskStatus;
