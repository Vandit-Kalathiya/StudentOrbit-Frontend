import { useState } from "react";

const TaskDescription = ({ description = "" }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleReadMoreToggle = (e) => {
    e.preventDefault();
    setShowFullDescription(!showFullDescription);
  };

  return (
    <p className="text-gray-600 text-sm mb-4">
      {showFullDescription ? "description Lorem ipsum dolor sit amet consectetur adipisicing." : "description Lorem ipsum dolor sit amet consectetur adipisicing.".slice(0, 25) + "..."}
      {description.length > 25 && (
        <a
          href="#"
          onClick={handleReadMoreToggle}
          className="text-blue-500 underline ml-2 hover:text-blue-700"
        >
          {showFullDescription ? "Read Less" : "Read More"}
        </a>
      )}
    </p>
  );
};

export default TaskDescription;
