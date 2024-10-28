import MainContent from "./styles/MainContent";
import PendingTask from "./styles/PendingTask";

function Main() {
  return (
    <div className="w-full flex gap-10 p-4 md:flex-row justify-between items-start">
      <div className="w-3/5">
        <PendingTask />
      </div>
      <div className="w-2/5"> 
        <MainContent />
      </div>
    </div>
  );
}

export default Main;
