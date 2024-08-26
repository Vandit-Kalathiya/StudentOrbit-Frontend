import React from 'react';
import { Card, Typography, Col, Row } from 'antd';
import { Pie } from '@ant-design/plots';

const { Title, Paragraph } = Typography;

const ProjectProgress = ({ weeks }) => {
  // Prepare data for the pie chart
  const pieData = weeks.map((week, index) => ({
    type: `Week ${index + 1}`,
    value: week.progress,
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{value}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="p-4">
      <Title level={2}>Project Progress</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Pie {...pieConfig} />
        </Col>
        <Col span={12}>
          {weeks.map((week, index) => (
            <Card key={index} title={`Week ${index + 1}`} bordered={false} className="mb-4">
              <Paragraph strong>Progress:</Paragraph>
              <Paragraph>{week.progress}%</Paragraph>
              <Paragraph>{week.details}</Paragraph>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProjectProgress;
