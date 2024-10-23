const ProjectDescription = ({ description, onReadMore }) => {
    return (
      <p className="text-gray-700 mb-4">
        {`${description.substring(0, 20)}... `}
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            onReadMore();
          }}
        >
          Read More
        </button>
      </p>
    );
  };
  
  export default ProjectDescription;
  