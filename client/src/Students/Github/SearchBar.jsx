import { useState, useEffect } from "react";
import { Search, X, Loader2, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { extractRepoInfo } from "@/Services/GithubServices";
import { useToast } from "@/Hooks/UseToast";

const SearchBar = ({
  onSubmit,
  onSearch,
  isLoading,
  placeholder,
  searchType = "repo",
  defaultValue = "",
}) => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState(defaultValue || "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (defaultValue && defaultValue !== searchValue) {
      setSearchValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    onSubmit(e, searchValue); 

    // if (searchType === "repo") {
    //   const repoInfo = extractRepoInfo(searchValue);                                                    

    //   if (!repoInfo) {
    //     toast({
    //       title: "Invalid Repository Format",
    //       description:
    //         "Please enter a valid GitHub repository URL or owner/repo format",
    //       variant: "destructive",
    //     });
    //     return;
    //   }

    //   onSearch(repoInfo.owner, repoInfo.repo);
    // } else {
    //   const username = searchValue.trim();

    //   if (!username) {
    //     toast({
    //       title: "Invalid Username",
    //       description: "Please enter a valid GitHub username",
    //       variant: "destructive",
    //     });
    //     return;
    //   }

    //   onSearch(username);
    // }
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-border">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {searchType === "user" ? (
              <Github className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </div>

          <Input
            className={`w-full pl-10 pr-10 py-6 bg-gray-50 border-gray-200 focus:border-[#5B6DF3] focus:ring-1 focus:ring-[#5B6DF3] transition-all ${
              focused ? "shadow-sm" : ""
            }`}
            placeholder={
              placeholder ||
              (searchType === "repo"
                ? "Enter GitHub repo URL (e.g., https://github.com/facebook/react) or owner/repo format"
                : "Enter GitHub username (e.g., octocat)")
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isLoading}
          />

          {searchValue && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={clearSearch}
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !searchValue.trim()}
          className="bg-[#5B6DF3] text-white hover:bg-[#5B6DF3]/90 py-6 px-8 rounded-md text-base font-medium transition-all disabled:opacity-70 disabled:hover:bg-[#5B6DF3] shadow-sm hover:shadow"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>
                {searchType === "repo" ? "Analyze" : "Search User"}
              </span>
            </div>
          )}
        </Button>
      </form>

      {searchType === "repo" && (
        <p className="mt-2 text-xs text-gray-500">
          Search for a repository by URL or by using the format{" "}
          <code className="px-1 py-0.5 bg-gray-100 rounded">owner/repo</code>
        </p>
      )}
    </div>
  );
};

export default SearchBar;
