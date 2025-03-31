import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import UserHeader from '../UserHeader';
import ReposList from '../ReposList';
import SearchBar from '../SearchBar';
import Banner from '../Banner';
import { useToast } from '@/Hooks/UseToast';
import { fetchUserProfile, fetchUserRepositories } from '@/Services/GithubServices';

const UserProfile = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get('username') || '';
  
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userProfile = await fetchUserProfile(username);
      setUser(userProfile);
      
      const userRepos = await fetchUserRepositories(username);
      setRepositories(userRepos);
      
      setSearchParams({ username });
      
      toast({
        title: "Profile Loaded",
        description: `Successfully loaded ${userProfile.name || username}'s profile`,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch user data");
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch user data",
        variant: "[#5B6DF3]"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username && !user) {
      handleSearch(username);
    }
  }, [username]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Banner /> */}
      
      <div className="mb-8">
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          placeholder="Enter GitHub username (e.g., octocat)"
          searchType="user"
        />
      </div>
      
      {error && (
        <div className="mb-8 p-4 bg-[#5B6DF3]/10 border border-[#5B6DF3]/30 rounded-lg text-[#5B6DF3]">
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Fetching user profile...</p>
        </div>
      )}
      
      {user && !isLoading && (
        <div className="space-y-8">
          <UserHeader user={user} />
          
          <Tabs defaultValue="repositories" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex bg-white">
              <TabsTrigger value="repositories" className="border bg-[#5B6DF3] text-white rounded">
                Repositories ({repositories.length})
              </TabsTrigger>
              {/* <TabsTrigger value="stats">
                Profile Stats
              </TabsTrigger> */}
            </TabsList>
            
            <TabsContent value="repositories" className="mt-6">
              <ReposList repositories={repositories} />
            </TabsContent>
            
            <TabsContent value="stats" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg border border-border text-center">
                  <p className="text-muted-foreground">
                    User stats visualization coming soon...
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {!user && !isLoading && !username && (
        <div className="mt-8 p-8 bg-white rounded-lg flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium mb-2">Enter a GitHub Username</h2>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            Enter a GitHub username to view their profile and repositories.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;