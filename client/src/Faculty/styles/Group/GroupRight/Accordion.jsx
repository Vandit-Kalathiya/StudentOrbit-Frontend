import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ weekTasks, onDoubleClick, showModal }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const generateAccordionData = (weekTasks) => {
    return weekTasks.map((weekTask) => ({
      id: weekTask.week,
      title: `Week ${weekTask.week}`,
      content: weekTask.tasks,
    }));
  };

  const accordionData = generateAccordionData(weekTasks);

  return (
    <div id="accordion-open" data-accordion="open" className="w-full overflow-hidden">
      {accordionData.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={activeIndex === index}
          onToggle={() => toggleAccordion(index)}
          onDoubleClick={() => onDoubleClick(item.id)}
          showModal={() => showModal(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
