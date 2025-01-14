import { Skeleton } from "antd";

export const SkeletonCardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <BannerSkeleton key={index} />
      ))}
    </div>
  );
};

const BannerSkeleton = () => {
  return (
    <div className="w-full rounded-xl border bg-white shadow-sm p-8 py-7 relative overflow-hidden">
      <div className="relative">
        <div className="flex justify-between items-start mb-3">
          <Skeleton.Input
            active
            style={{ width: "60%", height: "1.5rem" }}
            size="small"
          />
          <Skeleton.Input
            active
            style={{ width: "30%", height: "1.25rem" }}
            size="small"
          />
        </div>

        <Skeleton
          active
          paragraph={{
            rows: 2,
            width: ["100%", "80%"],
          }}
        />

        <div className="flex flex-wrap gap-2 my-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton.Input
              key={index}
              active
              style={{ width: "100px", height: "1.5rem" }}
              size="small"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 bg-gray-50 p-3 rounded-lg border w-[14rem]">
          <Skeleton.Avatar size="default" active />
          <Skeleton.Input
            active
            style={{ width: "70%", height: "1rem" }}
            size="small"
          />
        </div>

        <div className="flex justify-between items-center">
          <Skeleton.Button
            active
            style={{ width: "50%", height: "2.5rem" }}
          />
          <div className="flex space-x-3">
            <Skeleton.Button active size="small" shape="round" />
            <Skeleton.Button active size="small" shape="round" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardGrid;
