import { Skeleton, Row, Col } from "antd";

const TaskDetailSkeleton = () => {
  return (
    <div className="m-5 mt-10 px-5">
      <div className="mb-6">
        <Skeleton.Input active size="large" style={{ width: "60%" }} />
      </div>

      <div className="mb-6">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>

      <div className="mb-6">
        <Skeleton.Button active size="large" style={{ width: "40%" }} />
      </div>

      <div className="mb-6">
        <Skeleton.Input active size="default" style={{ width: "50%" }} className="mb-4" />
        <Row gutter={[8, 8]}>
          {[...Array(3)].map((_, index) => (
            <Col key={index}>
              <Skeleton.Avatar active size="large" shape="circle" />
            </Col>
          ))}
        </Row>
      </div>

      <div className="mb-6">
        <Skeleton.Input active size="default" style={{ width: "50%" }} className="mb-4" />
        <Row gutter={[16, 16]}>
          {[...Array(2)].map((_, index) => (
            <Col key={index} span={12}>
              <Skeleton.Button active block />
            </Col>
          ))}
        </Row>
      </div>

      <div className="mb-6">
        <Skeleton.Input active size="default" style={{ width: "50%" }} className="mb-4" />
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>

      <div>
        <Skeleton.Input active size="default" style={{ width: "50%" }} className="mb-4" />
      </div>
    </div>
  );
};

export default TaskDetailSkeleton;
