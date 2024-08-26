import {
  CheckCircleOutlined,
  HourglassOutlined,
  PlayCircleOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const TaskStatus = ({ status, title }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "todo":
        return <PlayCircleOutlined className="text-blue-500 mr-2" />;
      case "inprogress":
        return <HourglassOutlined className="text-orange-500 mr-2" />;
      case "completed":
        return <CheckCircleOutlined className="text-green-500 mr-2" />;
      case "inreview":
        return <FileTextOutlined className="text-purple-500 mr-2" />;
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
