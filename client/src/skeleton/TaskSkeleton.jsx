import { Skeleton, Row, Col } from "antd";

const TaskSkeleton = () => {
  return (
    <div className="border md:min-w-full text-start rounded-lg shadow-md p-4 max-w-md mx-auto bg-white mb-4 cursor-pointer">
      <Skeleton active paragraph={{ rows: 0 }} title={{ width: "60%" }} />
      <div className="task-card-skeleton">
        <Skeleton active paragraph={{ rows: 0 }} title={{ width: "40%" }} />

        <Skeleton.Button active shape="circle" />
        <Skeleton.Button active shape="circle" />
        <div className="flex justify-between items-center mt-2">
          <Skeleton.Button active />
          <Skeleton.Button active />
        </div>
      </div>
    </div>
  );
};

const TaskSkeletonList = () => {
  const rowTitles = [
    "To-Do Tasks",
    "In Progress Tasks",
    "In Review Tasks",
    "Completed Tasks",
  ];

  return (
    <div className="flex flex-col items-start justify-start w-[100rem]">
      <div className="mt-5 text-center text-4xl md:text-5xl flex-grow font-semibold mb-5">
        Week
      </div>
      {rowTitles.map((title, index) => (
        <div key={index} className="mb-3 w-full flex flex-col justify-start ">
          <h3 className="text-xl text-left mb-2 font-semibold">{title}</h3>
          <Row gutter={[32, 32]} className="flex flex-start">
            <Col span={8}>
              <TaskSkeleton />
            </Col>
            <Col span={8}>
              <TaskSkeleton />
            </Col>
            <Col span={8}>
              <TaskSkeleton />
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeletonList;
