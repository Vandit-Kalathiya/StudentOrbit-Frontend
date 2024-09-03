const TaskHeader = ({ task }) => {
  return (
    <div className="my-5">
      <div className="md:text-5xl text-3xl text-center font-semibold">
        Task {task?.id}
      </div>
      <div className="text-2xl md:text-4xl my-6 font-semibold">
        {task?.title}
      </div>
    </div>
  );
};

export default TaskHeader;
