import { Code, GitPullRequestIcon, CircleAlert, Users } from 'lucide-react';
import { formatNumber, getTotalCommits } from '@/Utils/DataUtils';

const MainRepoMetrics = ({ 
  contributors, 
  pullRequestCount, 
  issueCount,
}) => {
  const totalCommits = getTotalCommits(contributors);
  
  const metrics = [
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      value: formatNumber(contributors.length),
      label: 'Contributors',
    },
    {
      icon: <Code className="h-5 w-5 text-violet-500" />,
      value: formatNumber(totalCommits),
      label: 'Commits',
    },
    {
      icon: <GitPullRequestIcon className="h-5 w-5 text-green-500" />,
      value: formatNumber(pullRequestCount),
      label: 'Pull Requests',
    },
    {
      icon: <CircleAlert className="h-5 w-5 text-amber-500" />,
      value: formatNumber(issueCount),
      label: 'Issues',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center mb-2">
            {metric.icon}
          </div>
          <div className="text-xl font-bold">{metric.value}</div>
          <div className="text-xs text-[#5B6DF3]">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

export default MainRepoMetrics;