import MainContent from "./styles/MainContent";
import PendingTask from "./styles/PendingTask";

function Main() {
  return (
    <div className="w-full flex flex-col gap-10 p-4 mt-5 md:flex-row justify-between items-start">
      <div className="w-full md:w-2/5">
        <PendingTask />
      </div>
      <div className="w-full md:w-3/5"> 
        {/* <MainContent /> */}
      </div>
    </div>
  );
}

export default Main;
