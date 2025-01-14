import { Skeleton, Card } from "antd";

const ProjectCardSkeleton = () => {
  return (
    <div className="flex justify-center p-2">
      {/* Parent container for 3 skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <Card
          bordered={false}
          className="max-w-md w-full shadow-lg rounded-lg cursor-pointer border"
        >
          <div className="flex justify-between items-center mb-4">
            <Skeleton.Input active style={{ width: "50%" }} />
            <Skeleton.Input active style={{ width: "30%" }} />
          </div>

          <Skeleton active paragraph={{ rows: 2 }} title={false} />

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "40%" }} />
          </div>

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "60%" }} />
            <div className="ml-5 mt-2 flex gap-2">
              {[1, 2, 3].map((_, index) => (
                <Skeleton.Avatar key={index} active size="small" />
              ))}
            </div>
          </div>
        </Card>

        {/* Repeat the same structure for two more cards */}
        <Card
          bordered={false}
          className="max-w-md w-full shadow-lg rounded-lg cursor-pointer border"
        >
          <div className="flex justify-between items-center mb-4">
            <Skeleton.Input active style={{ width: "50%" }} />
            <Skeleton.Input active style={{ width: "30%" }} />
          </div>

          <Skeleton active paragraph={{ rows: 2 }} title={false} />

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "40%" }} />
          </div>

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "60%" }} />
            <div className="ml-5 mt-2 flex gap-2">
              {[1, 2, 3].map((_, index) => (
                <Skeleton.Avatar key={index} active size="small" />
              ))}
            </div>
          </div>
        </Card>

        <Card
          bordered={false}
          className="max-w-md w-full shadow-lg rounded-lg cursor-pointer border"
        >
          <div className="flex justify-between items-center mb-4">
            <Skeleton.Input active style={{ width: "50%" }} />
            <Skeleton.Input active style={{ width: "30%" }} />
          </div>

          <Skeleton active paragraph={{ rows: 2 }} title={false} />

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "40%" }} />
          </div>

          <div className="mb-2">
            <Skeleton.Input active style={{ width: "60%" }} />
            <div className="ml-5 mt-2 flex gap-2">
              {[1, 2, 3].map((_, index) => (
                <Skeleton.Avatar key={index} active size="small" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
