import { Star, GitFork, Eye, Code, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { parseDate, formatNumber } from '@/Utils/DataUtils';

const RepoOverview = ({ repository }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <a 
              href={repository.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#5B6DF3] transition-colors"
            >
              {repository.name}
            </a>
            {repository.visibility === 'public' ? (
              <Badge variant="outline" className="ml-2 text-xs">Public</Badge>
            ) : (
              <Badge variant="outline" className="ml-2 text-xs bg-amber-600/20 text-amber-500 border-amber-700/20">Private</Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            {repository.owner.login}/{repository.name}
          </p>
          <p className="mt-2">{repository.description || 'No description provided'}</p>
          
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repository.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <div>
            <div className="font-medium">{formatNumber(repository.stargazers_count)}</div>
            <div className="text-xs text-muted-foreground">Stars</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <GitFork className="h-4 w-4 text-blue-500" />
          <div>
            <div className="font-medium">{formatNumber(repository.forks_count)}</div>
            <div className="text-xs text-muted-foreground">Forks</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-green-500" />
          <div>
            <div className="font-medium">{formatNumber(repository.watchers_count)}</div>
            <div className="text-xs text-muted-foreground">Watchers</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-purple-500" />
          <div>
            <div className="font-medium">{repository.language || 'N/A'}</div>
            <div className="text-xs text-muted-foreground">Main Language</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">Created: {parseDate(repository.created_at)}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Repository created on {new Date(repository.created_at).toLocaleString()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">Updated: {parseDate(repository.updated_at)}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last updated on {new Date(repository.updated_at).toLocaleString()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {repository.license && (
          <div className="flex items-center gap-2">
            <div className="text-sm">License: {repository.license.spdx_id || repository.license.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoOverview;