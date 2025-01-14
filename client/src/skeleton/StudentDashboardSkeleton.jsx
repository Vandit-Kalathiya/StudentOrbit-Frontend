import { Skeleton } from "antd";

const StudentDashboardSkeleton = () => {
  return (
    <div className="overflow-hidden mt-10 px-8 md:mt-8 md:px-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-2/3 lg:w-3/4 px-4 flex flex-col">
        <div className="flex flex-wrap justify-between gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full lg:w-[30%] h-28 bg-gray-100 rounded-xl shadow-lg p-4 animate-pulse"
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

          <div className="w-full mb-6">
            <Skeleton active paragraph={{ rows: 2 }} />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-5">
        <div className="relative">
          <div className="relative">
            <div className="absolute top-3 right-3 z-10">
              <div className="flex justify-end mb-4">
                <Skeleton.Input style={{ width: 200 }} active />
              </div>
            </div>
          </div>

          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
        <div>
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardSkeleton;
