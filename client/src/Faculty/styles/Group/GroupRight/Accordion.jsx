import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ weekTasks, onDoubleClick, showModal }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  if (!Array.isArray(weekTasks)) {
    console.log("Empty");
    
  } else {
    weekTasks = weekTasks.sort((a, b) => a.weekNumber - b.weekNumber);
  }
  
  return (
    <div id="accordion-open" data-accordion="open" className="w-full overflow-hidden">
      {weekTasks.map((week, index) => (
        <AccordionItem
          key={week.weekNumber}
          week={week}
          isActive={activeIndex === index}
          onToggle={() => toggleAccordion(index)}
          onDoubleClick={() => onDoubleClick(week.weekNumber)}
          showModal={() => showModal(week.weekNumber)}
        />
      ))}
    </div>
  );
};

export default Accordion;
