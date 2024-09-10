import { Card, Avatar, Typography, Row, Col } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  PlusCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import TeamProgressCard from "./TeamProgressCard";
import WorkloadCard from "./WorkloadCard";

const { Text } = Typography;

function DashboardDetails() {
  const cardData = [
    {
      title: "12 done",
      description: "in the last 7 days 🎉",
      icon: <CheckCircleOutlined />,
      borderColor: "#b7eb8f",
      avatarColor: "#b7eb8f",
      iconColor: "#52c41a",
    },
    {
      title: "5 updated",
      description: "in the last 7 days 🔄",
      icon: <SyncOutlined />,
      borderColor: "#91d5ff",
      avatarColor: "#91d5ff",
      iconColor: "#1890ff",
    },
    {
      title: "8 new",
      description: "in the last 7 days ✨",
      icon: <PlusCircleOutlined />,
      borderColor: "#ffd591",
      avatarColor: "#ffd591",
      iconColor: "#fa8c16",
    },
    {
      title: "3 due",
      description: "in the next 7 days ⏳",
      icon: <ClockCircleOutlined />,
      borderColor: "#ffa39e",
      avatarColor: "#ffa39e",
      iconColor: "#f5222d",
    },
  ];

  return (
    <div style={{ overflowX: "hidden" }} className="my-10 px-8 md:my-8 md:px-8">
      <Row gutter={[16, 16]} style={{ flexWrap: "wrap" }}>
        {cardData.map((card, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ flex: "1 0 auto", minWidth: "250px" }}
          >
            <Card
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                padding: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Avatar
                icon={card.icon}
                style={{
                  backgroundColor: card.avatarColor,
                  color: card.iconColor,
                  marginRight: "10px",
                }}
              />
              <div>
                <Text
                  strong
                  style={{ color: card.iconColor, fontSize: "16px" }}
                >
                  {card.title}
                </Text>
                <br />
                <Text type="secondary">{card.description}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <TeamProgressCard />
        </div>
        <div>
          <WorkloadCard />
        </div>
      </div>
    </div>
  );
}

export default DashboardDetails;
