import { useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber, parseDate } from "@/Utils/DataUtils";
import {
  Star,
  GitFork,
  Calendar,
  Code,
  BookOpen,
  Search,
  X,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const ReposList = ({ repositories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [visibleTopics, setVisibleTopics] = useState({});

  const toggleTopicsVisibility = (repoId) => {
    setVisibleTopics((prev) => ({
      ...prev,
      [repoId]: !prev[repoId],
    }));
  };

  const filteredRepos = repositories
    .filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.topics &&
          repo.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          ))
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

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      C: "#555555",
      "C++": "#f34b7d",
      "C#": "#178600",
      Go: "#00ADD8",
      Ruby: "#701516",
      PHP: "#4F5D95",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Swift: "#ffac45",
      Kotlin: "#F18E33",
      Rust: "#dea584",
      Dart: "#00B4AB",
    };
    return colors[language] || "#5B6DF3";
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (repositories.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg border border-border text-center">
        <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium mb-1">No repositories found</h3>
        <p className="text-muted-foreground">
          This user doesn't have any public repositories yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Filter by name, description or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-9 py-2 border-gray-200 focus:border-[#5B6DF3] focus:ring-1 focus:ring-[#5B6DF3]"
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 self-stretch sm:self-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sortBy === "stars" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("stars")}
                    className={
                      sortBy === "stars"
                        ? "bg-[#5B6DF3] text-white"
                        : "text-gray-600"
                    }
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Stars
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort by star count</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sortBy === "updated" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("updated")}
                    className={
                      sortBy === "updated"
                        ? "bg-[#5B6DF3] text-white"
                        : "text-gray-600"
                    }
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Updated
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort by last updated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sortBy === "name" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("name")}
                    className={
                      sortBy === "name"
                        ? "bg-[#5B6DF3] text-white"
                        : "text-gray-600"
                    }
                  >
                    {/* <SortAZ className="h-4 w-4 mr-1" /> */}
                    Name
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort alphabetically</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-500">
          Showing {filteredRepos.length} of {repositories.length} repositories
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="p-8 bg-white rounded-lg border border-border text-center">
          <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-medium mb-1">No matching repositories</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <Button variant="outline" className="mt-4" onClick={clearSearch}>
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="p-5 bg-white rounded-lg border border-border hover:border-[#5B6DF3] hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className="text-lg font-semibold text-[#5B6DF3]">
                      <Link
                        to={`/s/dashboard/github/repository?owner=${repo.owner.login}&repo=${repo.name}`}
                        className="hover:underline transition-colors flex items-center gap-1"
                      >
                        {repo.name}
                        <Eye className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </h3>
                    {repo.private && (
                      <Badge className="text-xs bg-amber-500 text-white">
                        Private
                      </Badge>
                    )}
                    {repo.fork && (
                      <Badge className="text-xs bg-violet-500 text-white">
                        Forked
                      </Badge>
                    )}
                    {repo.archived && (
                      <Badge
                        variant="outline"
                        className="text-xs border-amber-500 text-amber-700"
                      >
                        Archived
                      </Badge>
                    )}
                  </div>

                  {repo.description && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {repo.description}
                    </p>
                  )}

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(visibleTopics[repo.id]
                        ? repo.topics
                        : repo.topics.slice(0, 5)
                      ).map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-[#5B6DF3]/10 text-[#5B6DF3] hover:bg-[#5B6DF3]/20 transition-colors cursor-default"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 5 && !visibleTopics[repo.id] && (
                        <Badge
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-gray-100"
                          onClick={() => toggleTopicsVisibility(repo.id)}
                        >
                          +{repo.topics.length - 5} more
                        </Badge>
                      )}
                      {visibleTopics[repo.id] && repo.topics.length > 5 && (
                        <Badge
                          variant="outline"
                          className="text-xs cursor-pointer hover:bg-gray-100"
                          onClick={() => toggleTopicsVisibility(repo.id)}
                        >
                          Show less
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <Link
                    to={`/s/dashboard/github/repository?owner=${repo.owner.login}&repo=${repo.name}`}
                    className="px-4 py-2 text-sm bg-[#5B6DF3]/10 text-[#5B6DF3] hover:bg-[#5B6DF3] hover:text-white rounded-md transition-colors font-medium"
                  >
                    Analyze Repo
                  </Link>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-[#5B6DF3] flex items-center gap-1"
                  >
                    View on GitHub
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-100">
                {repo.language && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-sm">
                          <span
                            className="w-3 h-3 rounded-full mr-1.5"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          ></span>
                          <span className="text-gray-700">{repo.language}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Primary language</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span>{formatNumber(repo.stargazers_count)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{repo.stargazers_count.toLocaleString()} stars</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <GitFork className="h-4 w-4 text-violet-500" />
                        <span>{formatNumber(repo.forks_count)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{repo.forks_count.toLocaleString()} forks</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Code className="h-4 w-4 text-green-500" />
                        <span>
                          {repo.size
                            ? formatNumber(repo.size) + " KB"
                            : "Unknown size"}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Repository size</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>Updated {parseDate(repo.updated_at)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Last updated on{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReposList;
