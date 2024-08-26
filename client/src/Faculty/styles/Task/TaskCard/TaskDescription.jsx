import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskDescription = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac tortor fermentum, vehicula risus a, ullamcorper risus. Integer fringilla ex in justo condimentum, id luctus felis elementum.";
  const navigate = useNavigate();

  const handleReadMoreToggle = (e) => {
    e.preventDefault();
    setShowFullDescription(!showFullDescription);

    if (!showFullDescription) {
      navigate("/dashboard/batches/5A1/to-do-app/week1/task1");
    }
  };

  return (
    <p className="text-gray-600 text-sm mb-4">
      {showFullDescription
        ? loremIpsum
        : loremIpsum.slice(0, 25) + (loremIpsum.length > 25 ? "..." : "")}
      {loremIpsum.length > 25 && (
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
