
const TaskDescription = ({ description }) => {
  return (
    <div className="text-base md:text-xl mb-4 md:w-[85%] w-full">
      {description || "Lorem ipsum dolor sit amet."}
    </div>
  );
};

export default TaskDescription;
