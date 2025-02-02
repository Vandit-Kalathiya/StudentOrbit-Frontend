import { adminRole, getRole } from "../../../../../authToken";

const AccordionItem = ({
  week,
  isActive,
  onToggle,
  onDoubleClick,
  showModal,
}) => {

  const isCurrentWeek = (week) => {
    if (!week || !week.startDate || !week.endDate) {
      return false;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startDate = new Date(week.startDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(week.endDate);
    endDate.setHours(0, 0, 0, 0);

    return currentDate <= endDate;
  };

  return (
    <div className={`${week.weekNumber === 1 ? "rounded rtl xl bg-gray-100" : ""}`}>
      <h2 id={`accordion-open-heading-${week.weekNumber}`}>
        <button
          type="button"
          className={`w-full flex items-center justify-between p-5 font-medium text-black border border-b-0 bg-gray-50 hover:bg-[#5B6DF3] hover:text-white gap-3 text-xl ${week.weekNumber === 1 ? "rounded-t-xl bg-gray-100" : ""} group`}
          onClick={onToggle}
          onDoubleClick={onDoubleClick}
          aria-expanded={isActive}
          aria-controls={`accordion-open-body-${week.weekNumber}`}
        >
          <span className="flex items-center">Week {week.weekNumber}</span>

          <span className="ml-auto text-[0.7rem] italic text-gray-600 group-hover:text-white">Start Date: {week.startDate} &nbsp;&nbsp; End Date: {week.endDate}</span>

          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transform transition-transform duration-300 ${isActive ? "rotate-0" : "rotate-180"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>

      </h2>
      <div
        id={`accordion-open-body-${week.weekNumber}`}
        className={`transition-all overflow-hidden ${isActive ? "max-h-screen" : "max-h-0"}`}
        aria-labelledby={`accordion-open-heading-${week.weekNumber}`}
      >
        <div className="px-5 pb-5 pt-2 border border-t-0 border-gray-300 bg-gray-50 text-lg">
          {Array.isArray(week.tasks) ? (
            <ul className="ps-5 text-gray-700 list-disc">
              {week.tasks.length === 0 ? <p>No tasks yet.</p> :
                week.tasks.map((task) => (
                  <li key={task.id}>{task.name}</li>
                ))
              }
            </ul>
          ) : (
            <p className="mb-2 text-gray-700">{week.tasks}</p>
          )}
          {(isCurrentWeek(week) || getRole() === adminRole) && (
            <button
              className="mt-3 text-[#5B6DF2] text-sm border-2 p-[0.4rem] rounded-md border-[#5B6DF2]"
              onClick={showModal}
            >
              Add Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
