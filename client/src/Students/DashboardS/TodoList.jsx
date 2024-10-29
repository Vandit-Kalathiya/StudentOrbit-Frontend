import { List } from "antd";
import moment from "moment";
import { FcTodoList } from "react-icons/fc";

const todoListData = [
  { task: "Finish report", deadline: "2024-09-20" },
  { task: "Update project documentation", deadline: "2024-09-22" },
  { task: "Prepare presentation for meeting", deadline: "2024-09-25" },
  { task: "Review team feedback", deadline: "2024-09-27" },
  { task: "Organize files and folders", deadline: "2024-09-30" },
];

const TodoList = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 w-full">
    <div className="font-semibold text-lg mb-4 flex items-center">
      <FcTodoList className="mr-2 text-xl" />
      To-Do List for This Week
    </div>
    <div className="max-h-[106px] overflow-y-auto no-scrollbar">
      <List
        dataSource={todoListData}
        renderItem={(item, index) => (
          <List.Item className="flex justify-between items-center border-b border-gray-200 py-2">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {index + 1}
              </div>
              <div>{item.task}</div>
            </div>
            <div className="text-gray-400 text-sm">
              Due: {moment(item.deadline).format("MMM DD, YYYY")}
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
);

export default TodoList;
