import { List } from "antd";
import moment from "moment";
import { FcTodoList } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const todoListData = [
  { task: "Finish report", deadline: "2024-09-20", completed: true },
  { task: "Update project documentation", deadline: "2024-09-22", completed: true },
  { task: "Prepare presentation for meeting", deadline: "2024-09-25", completed: false },
  { task: "Review team feedback", deadline: "2024-09-27", completed: true },
  { task: "Organize files and folders", deadline: "2024-09-30", completed: false },
];

const TodoList = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 w-full">
    <div className="font-semibold text-lg mb-4 flex items-center">
      <FcTodoList className="mr-2 text-xl" />
      <NavLink to='/s/dashboard/projects'>
        To-Do List for This Week
      </NavLink>
    </div>
    <div className="max-h-[106px] overflow-y-auto no-scrollbar">
      <List
        dataSource={todoListData}
        renderItem={(item, index) => (
          <List.Item
            className={`flex justify-between items-center border-b border-gray-200 py-2`}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {index + 1}
              </div>
              <div className={`flex items-center ${item.completed ? 'line-through text-gray-400' : ''}`}>
                {item.task}
                {item.completed && <FaCheckCircle className="ml-2 text-green-500" />}
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {item.completed ? 'Completed' : `Due: ${moment(item.deadline).format("MMM DD, YYYY")}`}
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
);

export default TodoList;
