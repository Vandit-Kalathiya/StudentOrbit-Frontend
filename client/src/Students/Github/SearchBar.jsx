import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { extractRepoInfo } from '@/Services/GithubServices';
import { toast } from '@/Hooks/UseToast';

const SearchBar = ({ 
  onSearch, 
  isLoading, 
  placeholder, 
  searchType = 'repo' 
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchType === 'repo') {
      const repoInfo = extractRepoInfo(searchValue);
      
      if (!repoInfo) {
        toast({
          title: "Invalid Repository Format",
          description: "Please enter a valid GitHub repository URL or owner/repo format",
          variant: "destructive"
        });
        return;
      }
      
      onSearch(repoInfo.owner, repoInfo.repo);
    } else {
      const username = searchValue.trim();
      
      if (!username) {
        toast({
          title: "Invalid Username",
          description: "Please enter a valid GitHub username",
          variant: "destructive"
        });
        return;
      }
      
      onSearch(username);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          <Input
            className="w-full pl-10 bg-card"
            placeholder={placeholder || (searchType === 'repo' 
              ? "Enter GitHub repo URL (e.g., https://github.com/facebook/react) or owner/repo format"
              : "Enter GitHub username (e.g., octocat)"
            )}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !searchValue.trim()} 
          className="bg-[#5B6DF3] text-white hover:bg-[#5B6DF3]/90"
        >
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            searchType === 'repo' ? 'Analyze' : 'Search'
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;