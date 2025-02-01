
const TaskDescription = ({ description }) => {
  return (
    <div className="text-base md:text-xl mb-1 md:w-[85%] w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500">
      <span className="text-gray-700 italic text-lg font-semibold"> Task Description </span> : {description}
    </div>
  );
};

export default TaskDescription;
