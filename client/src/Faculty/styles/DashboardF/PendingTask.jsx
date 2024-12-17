import React, { forwardRef, useEffect, useState } from 'react';
import { List } from "antd";
import { Clock, Users, Folder, CheckCircle } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiGraduationCapFill } from "react-icons/ri";
import { SlGraduation } from "react-icons/sl";
import { getUsernameFromToken } from "../../../../authToken";

const getMonthAbbreviation = (month) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[month - 1];
};

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const formatTime = (dateString) => {
  const hour24 = parseInt(dateString.substring(11, 13), 10);
  const minute = dateString.substring(14, 16);
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minute} ${period}`;
};

const PendingTask = forwardRef((props, ref) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:1818/faculty/batches/g/${getUsernameFromToken()}`, { withCredentials: true })
      .then((res) => {
        const tasksInReview = [];
        res.data.forEach((group) => {
          group.weeks.forEach((week) => {
            week.tasks.forEach((task) => {
              if (task.status === "IN_REVIEW") {
                tasksInReview.push({ ...task, groupName: group.groupName, batchName: group.batchName, weekNumber: week.weekNumber });
              }
            });
          });
        });
        tasksInReview.sort((a, b) => new Date(a.submittedDate) - new Date(b.submittedDate));
        setPendingTasks(tasksInReview);
      })
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);

  const handleTaskClick = (batchName, groupName, weekNumber) => {
    navigate(`/f/dashboard/batches/${batchName}/${groupName}/week${weekNumber}`);
  };

  return (
    <div ref={ref} className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-xl p-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg mr-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-gray-800">Pending Tasks</h2>
            <p className="text-gray-500 text-sm">Review and manage submissions</p>
          </div>
        </div>
        <div className="bg-blue-100 px-4 py-2 rounded-lg">
          <span className="font-semibold text-blue-600">{pendingTasks.length} Tasks</span>
        </div>
      </div>

      <div className="flex-grow h-[34rem] overflow-y-auto no-scrollbar">
        <List
          dataSource={pendingTasks}
          renderItem={(task, index) => {
            const day = parseInt(task.submittedDate.substring(8, 10), 10);
            const month = parseInt(task.submittedDate.substring(5, 7), 10);
            const year = task.submittedDate.substring(0, 4);
            const formattedTime = formatTime(task.submittedDate);

            return (
              <List.Item
                className="group relative transition-all duration-300 flex justify-between items-center border-0 rounded-xl mb-4 cursor-pointer bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 shadow-sm hover:shadow-lg"
                onClick={() => handleTaskClick(task.batchName, task.groupName, task.weekNumber)}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center flex-1 gap-6 p-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl w-10 h-10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {task.name}
                    </span>
                    <span className="flex items-center text-sm text-gray-500 mt-2">
                      <SlGraduation className='w-4 h-4 text-purple-400' />&nbsp;&nbsp;Sem : {task.batchName.substring(0, 1)} &nbsp;&nbsp;<Folder className="w-4 h-4 mr-2 text-purple-400" />Batch : {task.batchName.substring(1)}
                    </span>
                  </div>
                </div>

                <div className=" items-center pr-2">
                  <div className="text-right bg-gray-50 group-hover:bg-white p-2 rounded-xl shadow-sm mb-2">
                    <div className="font-semibold text-gray-700 mb-1 flex items-center justify-start">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      {task.groupName}
                    </div>
                    {task.assignee && task.assignee.map((assignee, idx) => (
                      <div key={idx} className="text-sm text-gray-500 flex items-center justify-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2" />
                        {assignee.username}
                      </div>
                    ))}
                  </div>

                  <div className="text-right min-w-[100px] rounded-xl shadow-sm mr-2">
                    <div className="text-xs font-semibold text-gray-600 flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-2 text-blue-400" />
                      Submitted at : {day}<sup>{getOrdinalSuffix(day)}</sup> &nbsp; {getMonthAbbreviation(month)} '{year.substring(2)} &nbsp;{formattedTime}
                    </div>
                    {/* <div className="text-xs text-gray-500 font-medium">
                    </div>
                    <div className="text-xs font-semibold text-blue-600 mt-1">
                    </div> */}
                  </div>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
});

PendingTask.displayName = "PendingTask";

export default PendingTask;