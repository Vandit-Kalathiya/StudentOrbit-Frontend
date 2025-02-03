import { useEffect, useRef, useState } from "react";
import PendingTask from "../DashboardF/PendingTask";
import useLenisScroll from "../../../Hooks/useLenisScroll";
import CardList from "../DashboardF/CardList";
import BatchReportDropdown from "./BatchReportDropdown";
import MarksReportDropdown from "./MarksReportDropDown";
import axios from "axios";
import { BASE_URL, getUsernameFromToken } from "../../../../authToken";
import { Skeleton } from "antd";
import SkeletonLoader from "../../../skeleton/SkeletonLoader";

function Main() {
  const [loading, setLoading] = useState(false);
  const todoListRef = useRef(null);
  useLenisScroll([todoListRef]);

  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL}/faculty/batches/g/${getUsernameFromToken()}`,
        { withCredentials: true }
      )
      .then((res) => {
        const tasksInReview = [];
        res.data.forEach((group) => {
          group.weeks.forEach((week) => {
            week.tasks.forEach((task) => {
              if (task.status === "IN_REVIEW") {
                tasksInReview.push({
                  ...task,
                  groupName: group.groupName,
                  batchName: group.batchName,
                  weekNumber: week.weekNumber,
                });
              }
            });
          });
        });
        tasksInReview.sort(
          (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate)
        );
        setPendingTasks(tasksInReview);
      })
      .catch((error) => console.error("Error fetching groups:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex flex-col gap-7 p-4 mt-5 md:mt-2 md:flex-row justify-between items-start">
      {loading ? (
        <>
          <>
          {/* Pending Task Skeleton */}
          <div className="w-full md:w-1/2">
            <SkeletonLoader type="pendingTask" />
          </div>

          {/* Card and Dropdown Skeleton */}
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <SkeletonLoader type="card" />
            <SkeletonLoader type="dropdown" />
            <SkeletonLoader type="dropdown" />
          </div>
        </>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2">
            <PendingTask ref={todoListRef} pendingTasks={pendingTasks} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <CardList />
            <BatchReportDropdown />
            <MarksReportDropdown />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
