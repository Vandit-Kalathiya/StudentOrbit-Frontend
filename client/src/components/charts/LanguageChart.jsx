import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateLanguagePercentages } from '@/utils/dataUtils';

const LanguageChart = ({ languages }) => {
  const languageData = calculateLanguagePercentages(languages);
  
  if (Object.keys(languages).length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No language data available</div>;
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={languageData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="bytes"
          >
            {languageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [`${props.payload.percentage}% (${(value / 1024).toFixed(1)} KB)`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;