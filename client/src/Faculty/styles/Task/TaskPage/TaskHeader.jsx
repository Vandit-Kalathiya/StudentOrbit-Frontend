import { useParams } from "react-router-dom";

const TaskHeader = ({ task }) => {
  const {projectName} = useParams()
  return (
    <div className="my-2">
      <div className="md:text-4xl text-2xl text-center pb-4 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        {projectName}
      </div>
      <div className="text-2xl md:text-3xl my-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
        <span className="text-gray-700 italic text-2xl"> Task Name </span> : {task?.name}
      </div>
    </div>
  );
};

export default TaskHeader;
