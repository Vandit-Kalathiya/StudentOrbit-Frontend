import { Calendar } from "antd";
import { CheckCircleOutlined, TaobaoSquareFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { getUsernameFromToken } from '../../../authToken';


const CalendarWrapper = ({ onPanelChange }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchedUsername = getUsernameFromToken();
    axios.get(`http://localhost:1818/tasks/s/${fetchedUsername}`,{ withCredentials: true, })
      .then((res) => {
        setCompletedTasks(res.data)
      })
  }, [])

  const isTaskCompleted = (date) => {
    const dateString = date.format("YYYY-MM-DD");

    return completedTasks.some(task => {
      const taskSubmittedDate = task.submittedDate.substring(0, 10);
      return taskSubmittedDate === dateString;
    });
  };


  const isToday = (currentDate) => {
    const today = moment().format("YYYY-MM-DD");
    return currentDate.format("YYYY-MM-DD") === today;
  };

  const cellRender = (current) => {
    const isCompleted = isTaskCompleted(current);
    const isTodayDate = isToday(current);

    return (
      <div
        className="ant-picker-cell-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'white',
        }}
      >
        {completedTasks.length > 0 && isCompleted ? (
          <CheckCircleOutlined style={{
            fontSize: '20px',
            color: 'green'
          }} />
        ) : (
          <span style={{
            zIndex: 1,
            color: isTodayDate ? 'black' : 'inherit',
          }}>{current.date()}</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-md mx-auto">
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
        mode="month"
      />
    </div>
  );
};

export default CalendarWrapper;
