import { useParams } from "react-router-dom";

const TaskHeader = ({ task }) => {
  const {projectName} = useParams()
  return (
    <div className="my-5">
      <div className="md:text-5xl text-3xl text-center font-semibold">
        {projectName.replaceAll('-',' ')}
      </div>
      <div className="text-2xl md:text-4xl my-6 font-semibold">
        {task?.name}
      </div>
    </div>
  );
};

export default TaskHeader;
