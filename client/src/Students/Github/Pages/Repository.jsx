import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from '../Banner';
import SearchBar from '../SearchBar';
import DataCard from '../DataCard';
import RepoOverview from '../RepoOverview';
import LanguageChart from '@/components/charts/LanguageChart';
import CommitChart from '@/components/charts/CommitChart';
import ContributorsChart from '@/components/charts/ContributorsChart';
import ContributorsList from '../ContributorsList';
import MainRepoMetrics from '../MainRepoMetrics';
import { useToast } from '@/Hooks/UseToast';
import { 
  fetchRepository,
  fetchContributors, 
  fetchLanguages,
  fetchCommits,
  fetchCommitActivity,
  fetchWeeklyCommits,
  fetchIssues,
  fetchPullRequests
} from '@/Services/GithubServices';
import { GitFork, ArrowUpRight } from 'lucide-react';
import { FiGithub } from "react-icons/fi";

const Repository = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const owner = searchParams.get('owner') || '';
  const repo = searchParams.get('repo') || '';
  
  const [data, setData] = useState({
    repository: null,
    contributors: [],
    languages: {},
    commits: [],
    commitActivity: [],
    weeklyCommits: [],
    issues: [],
    pullRequests: [],
    isLoading: false,
    error: null
  });

  const fetchRepositoryData = async (owner, repo) => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const [
        repository,
        contributors,
        languages,
        commits,
        commitActivity,
        weeklyCommits,
        issues,
        pullRequests
      ] = await Promise.all([
        fetchRepository(owner, repo),
        fetchContributors(owner, repo),
        fetchLanguages(owner, repo),
        fetchCommits(owner, repo),
        fetchCommitActivity(owner, repo),
        fetchWeeklyCommits(owner, repo),
        fetchIssues(owner, repo),
        fetchPullRequests(owner, repo)
      ]);
      
      setData({
        repository,
        contributors,
        languages,
        commits,
        commitActivity,
        weeklyCommits,
        issues,
        pullRequests,
        isLoading: false,
        error: null
      });
      
      setSearchParams({ owner, repo });
      
      toast({
        title: "Repository Analysis Complete",
        description: `Successfully analyzed ${repository.full_name}`,
      });
    } catch (error) {
      console.error("Error fetching repository data:", error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An unknown error occurred"
      }));
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch repository data",
        variant: "[#5B6DF3]"
      });
    }
  };

  useEffect(() => {
    if (owner && repo) {
      fetchRepositoryData(owner, repo);
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Banner /> */}
      
      <div className="mb-8">
        <SearchBar onSearch={fetchRepositoryData} isLoading={data.isLoading} searchType="repo" />
      </div>
      
      {data.error && (
        <div className="mb-8 p-4 bg-[#5B6DF3]/10 border border-[#5B6DF3]/30 rounded-lg text-[#5B6DF3]">
          {data.error}
        </div>
      )}
      
      {data.isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-[#5B6DF3] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Fetching repository data...</p>
        </div>
      )}
      
      {data.repository && !data.isLoading && (
        <div className="space-y-8">
          <DataCard 
            title="Repository Overview"
            className="bg-white"
          >
            <RepoOverview repository={data.repository} />
          </DataCard>
          
          <MainRepoMetrics 
            contributors={data.contributors}
            pullRequestCount={data.pullRequests.length}
            issueCount={data.issues.length}
            languageCount={Object.keys(data.languages).length}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataCard 
              title="Language Distribution"
              description="Programming languages used in this repository"
              className='bg-white'
            >
              <LanguageChart languages={data.languages} />
            </DataCard>
            
            <DataCard 
              title="Commit Activity"
              description="Commit frequency over the last 12 weeks"
              className='bg-white'
            >
              <CommitChart commitActivity={data.commitActivity} />
            </DataCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DataCard 
              title="Top Contributors"
              description="Contributions by developer"
              className='bg-white'
            >
              <ContributorsChart contributors={data.contributors} />
            </DataCard>
            
            <DataCard 
              title="Contributors List"
              description={`${data.contributors.length} contributors in total`}
              className='bg-white'
            >
              <ContributorsList contributors={data.contributors} />
            </DataCard>
          </div>
        </div>
      )}
      
      {!data.repository && !data.isLoading && !owner && !repo && (
        <div className="mt-8 p-8 border border-dashed border-muted rounded-lg flex flex-col items-center justify-center">
          <FiGithub className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">Enter a GitHub Repository</h2>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            Enter a GitHub repository URL or owner/repo format to analyze and get comprehensive insights about the project.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitFork className="h-4 w-4" />
              <span>Example: facebook/react</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowUpRight className="h-4 w-4" />
              <span>Example: https://github.com/facebook/react</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Repository;