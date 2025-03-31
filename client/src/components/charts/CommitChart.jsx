import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { processCommitActivity } from '@/utils/dataUtils';

const CommitChart = ({ commitActivity }) => {
  if (!commitActivity || !Array.isArray(commitActivity)) {
    return <div className="text-center py-4 text-muted-foreground">No commit activity data available</div>;
  }
  
  const data = processCommitActivity(commitActivity);
  
  if (data.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No commit activity data available</div>;
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
          <Area type="monotone" dataKey="commits" stroke="#3DEFE9" fill="#3DEFE9" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitChart;