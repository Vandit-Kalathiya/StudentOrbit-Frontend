// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avtar';
// import { MapPin, Link2, Calendar, Users, GitFork } from 'lucide-react';
// import { Badge } from '@/components/ui/Badge';
// import { formatNumber, parseDate } from '@/Utils/DataUtils';

// const UserHeader = ({ user }) => {
//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
//         <Avatar className="h-24 w-24 border-2 border-border">
//           <AvatarImage src={user.avatar_url} alt={user.login} />
//           <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
//         </Avatar>
        
//         <div className="flex-grow text-center sm:text-left">
//           <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
//           <a
//             href={user.html_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-muted-foreground hover:text-primary transition-colors"
//           >
//             @{user.login}
//           </a>
          
//           {user.bio && (
//             <p className="mt-2">{user.bio}</p>
//           )}
          
//           <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
//             {user.location && (
//               <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 <MapPin className="h-4 w-4" />
//                 <span>{user.location}</span>
//               </div>
//             )}
            
//             {user.blog && (
//               <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 <Link2 className="h-4 w-4" />
//                 <a
//                   href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-primary transition-colors"
//                 >
//                   {user.blog}
//                 </a>
//               </div>
//             )}
            
//             {user.created_at && (
//               <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                 <Calendar className="h-4 w-4" />
//                 <span>Joined {parseDate(user.created_at)}</span>
//               </div>
//             )}
//           </div>
//         </div>
        
//         <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
//           <div className="text-center">
//             <div className="flex items-center gap-1 justify-center">
//               <Users className="h-4 w-4 text-blue-500" />
//               <span className="font-bold">{formatNumber(user.followers)}</span>
//             </div>
//             <div className="text-xs text-muted-foreground">Followers</div>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center gap-1 justify-center">
//               <Users className="h-4 w-4 text-green-500" />
//               <span className="font-bold">{formatNumber(user.following)}</span>
//             </div>
//             <div className="text-xs text-muted-foreground">Following</div>
//           </div>
          
//           <div className="text-center">
//             <div className="flex items-center gap-1 justify-center">
//               <GitFork className="h-4 w-4 text-violet-500" />
//               <span className="font-bold">{formatNumber(user.public_repos)}</span>
//             </div>
//             <div className="text-xs text-muted-foreground">Repositories</div>
//           </div>
//         </div>
//       </div>

//       {user.company && (
//         <Badge variant="outline" className="ml-0">
//           {user.company}
//         </Badge>
//       )}
//     </div>
//   );
// };

// export default UserHeader;

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avtar";
import {
  MapPin,
  Link2,
  Calendar,
  Users,
  GitFork,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, parseDate } from "@/Utils/DataUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const UserHeader = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-[#5B6DF3]/20 ring-2 ring-[#5B6DF3]/10">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback className="bg-[#5B6DF3]/10 text-[#5B6DF3]">
              {user.login.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user.type === "Organization" && (
            <Badge className="absolute -bottom-2 -right-2 bg-orange-500">
              Org
            </Badge>
          )}
        </div>

        <div className="flex-grow text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
              {user.name || user.login}
            </h1>
            {user.company && (
              <Badge variant="outline" className="ml-0 text-xs">
                {user.company}
              </Badge>
            )}
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5B6DF3] hover:text-[#5B6DF3]/80 transition-colors flex items-center gap-1 justify-center sm:justify-start"
          >
            @{user.login}
            <ExternalLink className="h-3 w-3" />
          </a>

          {user.bio && (
            <p className="mt-3 text-gray-700 max-w-lg">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
            {user.location && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{user.location}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {user.blog && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={
                        user.blog.startsWith("http")
                          ? user.blog
                          : `https://${user.blog}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      <span className="truncate max-w-[150px]">
                        {user.blog}
                      </span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Website</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {user.created_at && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Joined {parseDate(user.created_at)}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      GitHub member since{" "}
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <div className="flex gap-6 mt-4 sm:mt-0 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Users className="h-4 w-4 text-[#5B6DF3]" />
                    <span className="font-bold">
                      {formatNumber(user.followers)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.followers.toLocaleString()} GitHub followers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="font-bold">
                      {formatNumber(user.following)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Following {user.following.toLocaleString()} GitHub users</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <GitFork className="h-4 w-4 text-violet-500" />
                    <span className="font-bold">
                      {formatNumber(user.public_repos)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Repositories</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.public_repos.toLocaleString()} public repositories</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;