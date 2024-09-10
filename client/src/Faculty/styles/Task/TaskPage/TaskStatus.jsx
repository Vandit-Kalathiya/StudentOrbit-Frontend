import { FileTextOutlined, CheckCircleOutlined, HourglassOutlined, PlayCircleOutlined } from "@ant-design/icons";

const statusIcons = {
  'Todo': <PlayCircleOutlined className="text-blue-600" />,
  'In Progress': <HourglassOutlined className="text-yellow-600" />,
  'In Review': <FileTextOutlined className="text-purple-600" />,
  'Completed': <CheckCircleOutlined className="text-green-600" />,
};

const TaskStatus = ({ status }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold flex items-center">
        Status:{" "}
        <span className="text-base md:text-lg font-normal flex items-center ml-2">
          <span className="mr-2">{status}</span>
          {statusIcons[status] || null}
        </span>
      </h3>
    </div>
  );
};

export default TaskStatus;
