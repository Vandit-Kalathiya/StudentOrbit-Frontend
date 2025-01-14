
const SkeletonLoader = ({ type }) => {
  switch (type) {
    case "card":
      return (
        <div className="flex flex-wrap justify-between gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="w-full lg:w-[49%] h-28 bg-gray-100 rounded-xl shadow-lg p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "dropdown":
      return (
        <div className="bg-gray-100 p-5 rounded-lg shadow-lg animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-10 bg-blue-200 rounded w-full mt-4"></div>
        </div>
      );

    case "pendingTask":
      return (
        <div className="bg-gray-100 rounded-2xl shadow-xl p-8 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 mb-2"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col">
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>;
  }
};

export default SkeletonLoader;
