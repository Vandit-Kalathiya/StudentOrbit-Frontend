import { List } from "antd";
import moment from "moment";
import { FcTodoList } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const TodoList = ({ projects }) => {
  const currentDate = moment();

  // Prepare the todo list data
  const todoListData = projects
    .flatMap((project) =>
      project.weeks.flatMap((week) => {
        const isCurrentWeek =
          currentDate.isSameOrAfter(moment(week.startDate), 'day') &&
          currentDate.isSameOrBefore(moment(week.endDate), 'day');

        console.log(isCurrentWeek);

        return isCurrentWeek
          ? week.tasks.map((task) => ({
            ...task,
            groupName: project.groupName,
            week: week, 
          }))
          : [];
      })
    )
    .map((task, index) => ({
      ...task,
      key: index,
    }));

  const navigate = useNavigate();

  const handleTaskClick = (groupName, weekNumber) => {
    navigate(`/s/dashboard/projects/${groupName}/week${weekNumber}`);
  };

  console.log(todoListData);


  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full">
      <div className="font-semibold text-lg mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <FcTodoList className="mr-2 text-lg md:text-xl" />
          <NavLink to="/s/dashboard/projects" className={`text-sm md:text-xl`}>To-Do List for This Week</NavLink>
        </div>
        <div>
          <button className="bg-blue-100 text-[0.7rem] md:text-sm text-blue-600 font-semibold rounded-md px-2 py-1 md:px-4 md:py-2 md:mr-2 ml-2">
            {/* {todoListData.length} Tasks */}
            {todoListData.length == 1 ? `${todoListData.length} Task` : `${todoListData.length} Tasks`}
          </button>
        </div>
      </div>
      <div className="max-h-[106px] overflow-y-auto no-scrollbar">
        <List
          dataSource={todoListData}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => handleTaskClick(item.groupName, item.week.weekNumber)}
              className={`flex justify-between items-center border-b border-gray-200 rounded-2xl ${item.status === "COMPLETED" ? "bg-green-50" : ""
                }`}
            >
              <div className="flex items-center px-2">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-5">
                  {index + 1}
                </div>
                <div
                  className={`flex items-center md:text-[1.1rem] ${item.status === "COMPLETED" ? "line-through text-gray-400" : ""
                    }`}
                >
                  {item.name}
                </div>
              </div>
              <div
                className={`text-sm px-2 flex items-center ${item.status === "COMPLETED"
                  ? "text-green-600 font-bold"
                  : "text-gray-400"
                  }`}
              >
                {item.status === "COMPLETED" ? (
                  <div className="flex items-center border-2 rounded-lg py-1 border-green-200 px-2">
                    <FaCheckCircle className="mr-2 text-green-500" />
                    <span>Completed</span>
                  </div>
                ) : <div className="text-xs md:text-sm">
                  Due: {moment(item.week.endDate).format("MMM DD, YYYY")}
                </div>}
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TodoList;
