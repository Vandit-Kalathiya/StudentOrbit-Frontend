import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avtar';

const ContributorsChart = ({ contributors }) => {
  const topContributors = contributors
    .slice(0, 10)
    .map(contributor => ({
      name: contributor.login,
      contributions: contributor.contributions,
      avatar: contributor.avatar_url
    }));
  
  if (topContributors.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No contributor data available</div>;
  }
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const contributor = topContributors.find(c => c.name === label);
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-md">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={contributor?.avatar} alt={label} />
              <AvatarFallback>{label?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="font-medium">{label}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {`Contributions: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topContributors}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="contributions" fill="#64FFDA" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContributorsChart;