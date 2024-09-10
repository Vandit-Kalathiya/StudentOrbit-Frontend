import { Card, Table, Avatar, Progress, Typography } from 'antd';

// Sample data for the table
const workloadData = [
  {
    key: '1',
    assignee: '22CE001',
    percentage: 75,
    task: 9,
  },
  {
    key: '2',
    assignee: '22CE003',
    percentage: 50,
    task: 6,
  },
  {
    key: '3',
    assignee: '22CE020',
    percentage: 85,
    task: 12,
  },
];

const colorStyles = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
};

const getInitials = (assignee) => {
  if (!assignee) return ''; 
  return assignee.slice(-2).toUpperCase();
};

// Define columns for the table
const columns = [
  {
    title: 'Assignees',
    dataIndex: 'assignee',
    key: 'assignee',
    render: (text, record, index) => {
      const style = index % 2 === 0 ? colorStyles.blue : colorStyles.coral;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            style={{
              backgroundColor: style.backgroundColor,
              color: style.color,
              border: `2px solid ${style.border}`,
            }}
          >
            {getInitials(text)}
          </Avatar>
          <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
      );
    },
  },
  {
    title: 'Percentage',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => (
      <Progress percent={percentage} />
    ),
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
    render: (task) => (
      <div style={{ textAlign: 'start', marginLeft: '1rem' }}>
        <Typography.Text>{task}</Typography.Text>
      </div>
    ),
  },
];

const WorkloadCard = () => {
  return (
    <Card title="Your Team's Workload" style={{ width: '100%', height: '100%' }}>
      <Table
        dataSource={workloadData}
        columns={columns}
        pagination={false}
        size="middle"
      />
    </Card>
  );
};

export default WorkloadCard;
