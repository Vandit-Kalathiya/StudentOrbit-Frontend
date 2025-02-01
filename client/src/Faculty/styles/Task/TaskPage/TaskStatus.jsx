import { FileTextOutlined, CheckCircleOutlined, HourglassOutlined, PlayCircleOutlined } from "@ant-design/icons";

const statusIcons = {
  'TO_DO': <PlayCircleOutlined className="text-blue-600" />,
  'IN_PROGRESS': <HourglassOutlined className="text-yellow-600" />,
  'IN_REVIEW': <FileTextOutlined className="text-purple-600" />,
  'COMPLETED': <CheckCircleOutlined className="text-green-600" />,
};

const TaskStatus = ({ status }) => {
  
  let statusText = '';
  if (status === 'TO_DO') {
    statusText = 'To Do';
  } else if (status === 'IN_PROGRESS') {
    statusText = 'In Progress';
  } else if (status === 'IN_REVIEW') {
    statusText = 'In Review';
  } else {
    statusText = 'Completed';
  }

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <h3 className="text-base md:text-lg font-semibold flex items-center">
        <span className="italic text-gray-700">Status</span>&nbsp;: {" "}
        <span className="text-base md:text-lg font-normal flex items-center ml-2">
          {statusIcons[status] || null}
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-800">{statusText}</span>
        </span>
      </h3>
    </div>
  );
};

export default TaskStatus;
