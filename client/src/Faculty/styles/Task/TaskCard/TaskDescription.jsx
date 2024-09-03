import { useState } from "react";

const TaskDescription = ({ description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac tortor", onReadMore }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  // const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac tortor fermentum, vehicula risus a, ullamcorper risus. Integer fringilla ex in justo condimentum, id luctus felis elementum.";

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
        : description.slice(0, 15) + (description.length > 25 ? "..." : "")}
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
