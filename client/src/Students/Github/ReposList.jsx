import { useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber, parseDate } from "@/utils/dataUtils";
import { Star, GitFork, Calendar, SortAsc as SortAZ } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReposList = ({ repositories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  const filteredRepos = repositories
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "updated":
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (repositories.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg border border-border text-center">
        <p className="text-muted-foreground">No repositories found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-end">
        <div className="flex-grow">
          <Input
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "stars" ? "selected" : "outline"}
            size="sm"
            onClick={() => setSortBy("stars")}
          >
            <Star className="h-4 w-4 mr-1" />
            Stars
          </Button>
          <Button
            variant={sortBy === "updated" ? "selected" : "outline"}
            size="sm"
            onClick={() => setSortBy("updated")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Updated
          </Button>
          <Button
            variant={sortBy === "name" ? "selected" : "outline"}
            size="sm"
            onClick={() => setSortBy("name")}
          >
            <SortAZ className="h-4 w-4 mr-1" />
            Name
          </Button>
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="p-6 bg-white rounded-lg border border-border text-center">
          <p className="text-muted-foreground">
            No repositories match your search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-4 bg-white rounded-lg border border-border hover:border-[#5B6DF3] hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      <Link
                        to={`/s/dashboard/github/repository?owner=${repo.owner.login}&repo=${repo.name}`}
                        className="hover:text-[#5B6DF3] transition-colors"
                      >
                        {repo.name}
                      </Link>
                    </h3>
                    {repo.fork && (
                      <Badge className="text-xs bg-[#5B6DF3] text-white">
                        Forked
                      </Badge>
                    )}
                    {repo.archived && (
                      <Badge variant="outline" className="text-xs">
                        Archived
                      </Badge>
                    )}
                  </div>

                  {repo.description && (
                    <p className="text-sm text-muted-foreground">
                      {repo.description}
                    </p>
                  )}

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{repo.topics.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <Link
                  to={`/s/dashboard/github/repository?owner=${repo.owner.login}&repo=${repo.name}`}
                  className="px-3 py-1 text-sm bg-[#5B6DF3]/10 text-[#5B6DF3] hover:bg-[#5B6DF3] hover:text-white rounded-md transition-colors"
                >
                  Analyze
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 mt-3">
                {repo.language && (
                  <div className="flex items-center text-sm">
                    <span className="w-3 h-3 rounded-full bg-[#5B6DF3] mr-1"></span>
                    <span>{repo.language}</span>
                  </div>
                )}

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>{formatNumber(repo.stargazers_count)}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <GitFork className="h-4 w-4" />
                  <span>{formatNumber(repo.forks_count)}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>Updated {parseDate(repo.updated_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReposList;
