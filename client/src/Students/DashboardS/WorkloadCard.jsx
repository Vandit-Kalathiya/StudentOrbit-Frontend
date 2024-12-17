import { Card, Table, Avatar, Progress, Typography } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

const colorStyles = {
  coral: { backgroundColor: "#fff1e6", color: "#fa541c", border: "#fa541c" },
  blue: { backgroundColor: "#d6e4ff", color: "#1d39c4", border: "#1d39c4" },
};

const getInitials = (assignee) => {
  if (!assignee) return '';
  return assignee.slice(-3).toUpperCase();
};

const WorkloadCard = ({ members }) => {
  const [workloadData, setWorkloadData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await Promise.all(members.map(async (member) => {
        // Fetch task counts for each member
        const todoCount = await axios.get(`http://localhost:1818/tasks/count/${member.username}/TO_DO`, { withCredentials: true, });
        const inProgressCount = await axios.get(`http://localhost:1818/tasks/count/${member.username}/IN_PROGRESS`, { withCredentials: true, });
        const completedCount = await axios.get(`http://localhost:1818/tasks/count/${member.username}/COMPLETED`, { withCredentials: true, });
        const inReviewCount = await axios.get(`http://localhost:1818/tasks/count/${member.username}/IN_REVIEW`, { withCredentials: true, });

        const totalTasks = todoCount.data + inProgressCount.data + completedCount.data + inReviewCount.data;
        const progress = totalTasks > 0 ? (completedCount.data / totalTasks) * 100 : 0;

        return {
          key: member.username,
          assignee: member.username,
          percentage: progress.toFixed(2),
          task: completedCount.data,
        };
      }));

      setWorkloadData(data);
    };

    fetchProgress();
  }, [members]);

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
        <Progress percent={parseFloat(percentage)} />
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
