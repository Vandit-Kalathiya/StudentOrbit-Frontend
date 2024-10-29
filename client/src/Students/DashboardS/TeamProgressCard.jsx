import { Card } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useState } from "react";

const data = [
  {
    name: "Completed",
    tasks: 12,
  },
  {
    name: "In Progress",
    tasks: 5,
  },
  {
    name: "To Do",
    tasks: 8,
  },
];

const COLORS = ["#00C49F", "#0088FE", "#FFBB28"];

const TeamProgressCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTasks = data.reduce((sum, entry) => sum + entry.tasks, 0);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(0); 
  };

  const getCenterLabel = () => {
    const { name, tasks } = data[activeIndex];
    const percentage = ((tasks / totalTasks) * 100).toFixed(0);
    const color = COLORS[activeIndex];
    return (
      <>
        <tspan x="50%" dy="-0.7em" dx="0.2em" textAnchor="middle" dominantBaseline="middle" className="text-3xl" style={{ fill: color }}>
          {percentage}%
        </tspan>
        <tspan x="50%" dy="1.8em" textAnchor="middle" dominantBaseline="middle" className="text-sm">
          {name}
        </tspan>
      </>
    );
  };

  return (
    <div>
      <Card title="Your Team's Progress" style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="tasks"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <LabelList
                dataKey="tasks"
                position="outsideBottom"
                style={{ fontSize: "12px", fill: "#666" }}
                formatter={(value, entry) => {
                  if (!entry || !entry.payload) return "";
                  const { name, tasks } = entry.payload;
                  return `${name}: ${tasks}`;
                }}
              />
            </Pie>
            <Legend />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                fill: "#333",
              }}
            >
              {getCenterLabel()}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default TeamProgressCard;
