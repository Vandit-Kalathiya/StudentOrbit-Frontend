import { Skeleton, Card } from "antd";

const BatchCardSkeleton = () => {
  return (
    <Card
      bordered={false}
      className="relative mx-auto w-full transition-all duration-300 border-0 rounded-xl bg-white shadow-sm"
      headStyle={{ fontSize: "clamp(1.4rem, 1.5vw, 1.75rem)" }}
    >
      <div className="p-1 pt-0">
        <Skeleton active paragraph={{ rows: 1, width: "50%" }} title={false} />
      </div>
      <div className="p-1">
        <Skeleton.Input style={{ width: "30%" }} active size="small" />
        <Skeleton.Input
          style={{ width: "30%", marginLeft: "10px" }}
          active
          size="small"
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <Skeleton.Button active size="small" shape="round" />
        <Skeleton.Button active size="small" shape="round" />
      </div>
    </Card>
  );
};

const SkeletonCardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <BatchCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonCardGrid;
