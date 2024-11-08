import { useRef } from "react";
import PendingTask from "../DashboardF/PendingTask";
import useLenisScroll from "../../../Hooks/useLenisScroll";
import CardList from "../DashboardF/CardList";
// import BatchProgressChart from "./BatchProgressChart";
import BatchReportDropdown from "./BatchReportDropdown";
import MarksReportDropdown from "./MarksReportDropDown";

function Main() {

  const todoListRef = useRef(null);
  useLenisScroll([todoListRef]);

  // const batchData = [
  //   { name: "Batch A", progress: 70 },
  //   { name: "Batch B", progress: 85 },
  //   { name: "Batch C", progress: 60 },
  //   { name: "Batch D", progress: 90 },
  // ];

  return (
    <div className="w-full flex flex-col gap-7 p-4 mt-5 md:mt-2 md:flex-row justify-between items-start">
      <div className="w-full md:w-1/2">
        <PendingTask ref={todoListRef} />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-2"> 
        <CardList />
        <BatchReportDropdown />
        <MarksReportDropdown />
        {/* <BatchProgressChart batchData={batchData} /> */}
      </div>
    </div>
  );
}

export default Main;
