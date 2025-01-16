import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GroupSkeleton = () => {
  return (
    <div className="md:px-6 my-6 w-full flex">
      <div className="w-[50%]">
        <h2 className="md:text-3xl text-2xl mb-4 font-semibold">
          <Skeleton width={200} height={30} />
        </h2>

        <p className="md:text-xl text-base mb-4 md:w-[85%] w-full">
          <Skeleton count={3} />
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className="px-4 py-1.5 text-sm rounded-full border-2 border-gray-300 bg-gray-200 text-transparent"
            >
              <Skeleton width={50} height={20} />
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2 mt-5">
          <h3 className="md:text-lg text-base font-semibold">
            <Skeleton width={100} height={20} />
          </h3>
          <h3 className="md:text-lg text-base">
            <Skeleton width={150} height={20} />
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-4 my-4">
          <h3 className="md:text-lg text-base font-semibold">
            <Skeleton width={100} height={20} />
          </h3>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
            >
              <Skeleton circle width={40} height={40} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="md:text-lg text-base font-semibold">
            <Skeleton width={100} height={20} />
          </h3>
          <Skeleton width={150} height={20} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6 mt-4">
          <h3 className="md:text-lg text-base font-semibold">
            <Skeleton width={150} height={20} />
          </h3>
          <h3 className="md:text-lg text-base italic">
            <Skeleton width={100} height={20} />
          </h3>
        </div>

        <div className="w-[80%] my-4">
          <Skeleton height={10} />
        </div>

        <div className="flex justify-start items-center mt-6">
          <Skeleton width={150} height={40} />
        </div>
      </div>

      <div className="max-h-100 overflow-y-auto w-[50%]">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="w-full p-5 border border-gray-300 bg-gray-50 mb-3 rounded-md"
          >
            <Skeleton width={300} height={20} />
            <Skeleton width="100%" height={20} count={3} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSkeleton;
