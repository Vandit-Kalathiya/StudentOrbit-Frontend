import { List } from "antd";
import { FcTodoList } from "react-icons/fc";
import { forwardRef } from "react";

const todoListData = [
  { task: "Finish report", batch: "A1", id: "22CE047" },
  { task: "Update project documentation", batch: "A1", id: "22CE047" },
  { task: "Prepare presentation for meeting", batch: "A1", id: "22CE047" },
  { task: "Review team feedback", batch: "A1", id: "22CE047" },
  { task: "Organize files and folders", batch: "A1", id: "22CE047" },
  { task: "Prepare presentation for meeting", batch: "A1", id: "22CE047" },
  { task: "Review team feedback", batch: "A1", id: "22CE047" },
  { task: "Organize files and folders", batch: "A1", id: "22CE047" },
  { task: "Prepare presentation for meeting", batch: "A1", id: "22CE047" },
  { task: "Review team feedback", batch: "A1", id: "22CE047" },
  { task: "Organize files and folders", batch: "A1", id: "22CE047" },
];

const PendingTask = forwardRef((props, ref) => (
  <div ref={ref} className="bg-white rounded-lg shadow-lg p-4 w-full">
    <div className="font-semibold text-lg mb-4 flex items-center">
      <FcTodoList className="mr-2 text-xl" />
      Pending tasks
    </div>
    <div className="max-h-[38rem] overflow-y-auto no-scrollbar">
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
            <div className="flex flex-row space-y-1">
              <div className="text-xs mt-7 text-gray-500 italic">
                <p className="inline">Submitted at : </p>
                <p className="inline mr-2">12<sup>th</sup> Dec'24</p>
                <p className="inline mr-3">12:00 PM</p>
              </div>
              <div className="text-gray-600 text-sm">
                <div>Id: {item.id}</div>
                <div>Batch: {item.batch}</div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  </div>
));

PendingTask.displayName = "TodoList";

export default PendingTask;
