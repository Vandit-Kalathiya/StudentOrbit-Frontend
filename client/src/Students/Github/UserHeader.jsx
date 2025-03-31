import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avtar';
import { MapPin, Link2, Calendar, Users, GitFork } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatNumber, parseDate } from '@/Utils/DataUtils';

const UserHeader = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-grow text-center sm:text-left">
          <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
          <a 
            href={user.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            @{user.login}
          </a>
          
          {user.bio && (
            <p className="mt-2">{user.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            {user.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.blog && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Link2 className="h-4 w-4" />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {user.blog}
                </a>
              </div>
            )}
            
            {user.created_at && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {parseDate(user.created_at)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="font-bold">{formatNumber(user.followers)}</span>
            </div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <Users className="h-4 w-4 text-green-500" />
              <span className="font-bold">{formatNumber(user.following)}</span>
            </div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center">
              <GitFork className="h-4 w-4 text-violet-500" />
              <span className="font-bold">{formatNumber(user.public_repos)}</span>
            </div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
        </div>
      </div>

      {user.company && (
        <Badge variant="outline" className="ml-0">
          {user.company}
        </Badge>
      )}
    </div>
  );
};

export default UserHeader;