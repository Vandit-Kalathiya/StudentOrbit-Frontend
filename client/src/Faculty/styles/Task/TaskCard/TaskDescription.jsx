import { useState } from "react";

const TaskDescription = ({ description, onReadMore }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const handleReadMoreToggle = (e) => {
    e.preventDefault();
    setShowFullDescription(!showFullDescription);

    if (!showFullDescription) {
      onReadMore();
    }
  };

  return (
    <p className="text-gray-600 text-sm mb-4">
      {showFullDescription
        ? description
        : description.slice(0, 5) + (description.length > 5 ? "..." : "")}
      {description.length > 1 && (
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
