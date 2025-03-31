import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avtar';
import { formatNumber } from '@/Utils/DataUtils';

const ContributorsList = ({ contributors }) => {
  return (
    <div className="space-y-4">
      {contributors.length === 0 ? (
        <div className="text-center py-4 text-[#5B6DF3]">No contributors data available</div>
      ) : (
        <div className="space-y-3">
          {contributors.slice(0, 10).map((contributor) => (
            <div 
              key={contributor.id} 
              className="flex items-center justify-between border-b border-[#5B6DF3] pb-2 last:border-0"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={contributor.avatar_url} alt={contributor.login} />
                  <AvatarFallback>{contributor.login.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <a 
                  href={contributor.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#5B6DF3] transition-colors"
                >
                  {contributor.login}
                </a>
              </div>
              <div className="text-sm">
                <span className="font-medium">{formatNumber(contributor.contributions)}</span>
                <span className="text-[#5B6DF3] ml-1">commits</span>
              </div>
            </div>
          ))}
          
          {contributors.length > 10 && (
            <div className="text-center text-sm text-[#5B6DF3] pt-2">
              +{contributors.length - 10} more contributors
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContributorsList;