import { useState } from "react";
import { useNavigate } from "react-router-dom";

const weekTasks = [
  {
    week: 1,
    tasks: [
      "Setup environment",
      "Install dependencies",
      "Create project structure",
      "Configure version control (Git)"
    ]
  },
  {
    week: 2,
    tasks: [
      "Initialize README and documentation",
      "Implement authentication",
      "Set up database schema"
    ]
  },
  {
    week: 3,
    tasks: [
      "Create REST API endpoints",
      "Design and implement basic frontend components"
    ]
  },
  {
    week: 4,
    tasks: [
      "Write unit tests for authentication and API endpoints",
      "Implement basic UI/UX for the frontend"
    ]
  },
  {
    week: 5,
    tasks: [
      "Set up user roles and permissions",
      "Create frontend forms and validations"
    ]
  },
  {
    week: 6,
    tasks: [
      "Implement data fetching and state management",
      "Optimize database queries"
    ]
  },
  {
    week: 7,
    tasks: [
      "Integrate third-party services",
      "Implement frontend routing"
    ]
  },
  {
    week: 8,
    tasks: [
      "Optimize performance (caching, lazy loading)",
      "Conduct security audits"
    ]
  },
  {
    week: 9,
    tasks: [
      "Perform usability testing",
      "Set up continuous integration (CI/CD)"
    ]
  },
  {
    week: 10,
    tasks: [
      "Deploy application to the cloud",
      "Monitor application performance"
    ]
  },
  {
    week: 11,
    tasks: [
      "Implement error tracking and logging",
      "Refactor code for maintainability"
    ]
  },
  {
    week: 12,
    tasks: [
      "Conduct final quality assurance (QA) checks",
      "Release version 1.0",
      "Gather user feedback",
      "Plan for post-launch improvements"
    ]
  }
];

const generateAccordionData = (weekTasks) => {
  return weekTasks.map((weekTask) => ({
    id: weekTask.week,
    title: `Week ${weekTask.week}`,
    content: weekTask.tasks,
  }));
};

const accordionData = generateAccordionData(weekTasks);

function GroupRight() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDoubleClick = (id) => {
    // Navigate and pass tasks for the selected week
    navigate(`week${id}`, {
      state: { tasks: weekTasks.find(week => week.week === id)?.tasks || [] }
    });
  };

  return (
    <div id="accordion-open" data-accordion="open" className="w-full overflow-hidden">
      {accordionData.map((item, index) => (
        <div key={item.id} className={`${item.id === 1 ? "rounded rtl xl bg-gray-100" : ""}`}>
          <h2 id={`accordion-open-heading-${item.id}`}>
            <button
              type="button"
              className={`w-full flex items-center justify-between p-5 font-medium text-black border border-b-0 bg-gray-50 hover:bg-[#5B6DF3] hover:text-white gap-3 text-xl ${
                item.id === 1 ? "rounded-t-xl bg-gray-100" : ""
              }`}
              onClick={() => toggleAccordion(index)}
              onDoubleClick={() => handleDoubleClick(item.id)}
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-open-body-${item.id}`}
            >
              <span className="flex items-center">{item.title}</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
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
            id={`accordion-open-body-${item.id}`}
            className={`transition-all overflow-hidden ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
            aria-labelledby={`accordion-open-heading-${item.id}`}
          >
            <div className="p-5 border border-t-0 border-gray-300 bg-gray-50 text-lg">
              {Array.isArray(item.content) ? (
                <ul className="ps-5 text-gray-700 list-disc">
                  {item.content.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              ) : (
                <p className="mb-2 text-gray-700">{item.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupRight;