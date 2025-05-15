import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import UserHeader from "../UserHeader";
import ReposList from "../ReposList";
import SearchBar from "../SearchBar";
// import { useToast } from "@/Hooks/UseToast";
import {
  fetchUserProfile,
  fetchUserRepositories,
} from "@/Services/GithubServices";
import { BASE_URL, fetchUser } from "../../../../authToken";
import { AlertTriangle, Github, User, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const UserProfile = () => {
  // const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);
  const [noGitHubUrl, setNoGitHubUrl] = useState(false);

  // Function to extract GitHub username from URL or string
  const extractUsername = (githubUrl) => {
    if (!githubUrl) return null;

    try {
      // Handle both full URLs and partial paths
      const urlParts = githubUrl.split(/[/\\]/).filter(Boolean);
      const lastPart = urlParts.pop();

      // Remove any trailing slashes or parameters
      return lastPart.split("?")[0];
    } catch (error) {
      console.error("Error parsing GitHub URL:", error);
      return null;
    }
  };

  const fetchGithubProfile = useCallback(
    async (searchUsername) => {
      if (!searchUsername) return;

      setIsLoading(true);
      setError(null);
      setUser(null);
      setRepositories([]);

      try {
        const [userProfile, userRepos] = await Promise.all([
          fetchUserProfile(searchUsername),
          fetchUserRepositories(searchUsername),
        ]);

        setUser(userProfile);
        setRepositories(userRepos);
        setUsername(searchUsername);
        setSearchParams({ username: searchUsername });
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(
          err.message ||
            "Failed to fetch GitHub profile. Please check the username and try again."
        );
        toast.error(`${err.message}. Please check the username and try again.`);
        // toast({
        //   title: "Error",
        //   description: "Failed to load GitHub profile",
        //   variant: "destructive",
        // });
      } finally {
        setIsLoading(false);
        setInitialLoading(false);
      }
    },
    [setSearchParams, toast]
  );

  const loadCurrentUserProfile = useCallback(async () => {
    setInitialLoading(true);
    try {
      const currentUser = await fetchUser();
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      const githubUsername = extractUsername(currentUser.gitHubUrl);
      console.log(githubUsername);

      if (githubUsername) {
        await fetchGithubProfile(githubUsername);
      } else {
        setNoGitHubUrl(true);
        setInitialLoading(false);
      }
    } catch (err) {
      console.error("Error loading current user profile:", err);
      setError("Failed to load user profile");
      setNoGitHubUrl(true);
      setInitialLoading(false);
    }
  }, [fetchGithubProfile]);

  // Handle search form submission
 const handleSubmit = async (e, searchedValue) => {
   e.preventDefault();
   console.log("In handleSubmit");

   const trimmedValue = searchedValue.trim();
   const studentIdPattern = /^(\d{2})[Cc][Ee](00[1-9]|0[1-9]\d|1\d\d|200)$/;

   if (!trimmedValue) {
     toast.warn("Please enter a student ID or GitHub username.");
     return;
   }

   try {
     if (studentIdPattern.test(trimmedValue)) {
       console.log("Matched student ID pattern.");

       const response = await axios.get(
         `${BASE_URL}/students/gitHubUrl/${trimmedValue}`,
         { withCredentials: true }
       );

       const gitHubUrl = response?.data;
       const githubUsername = extractUsername(gitHubUrl);

       if (githubUsername) {
         await fetchGithubProfile(githubUsername);
       } else {
         toast.error("GitHub URL not found for this student ID.");
         setNoGitHubUrl(true);
         setInitialLoading(false);
       }
     } else {
       await fetchGithubProfile(trimmedValue);
     }
   } catch (error) {
     let errorMessage = "Something went wrong. Please try again later.";

     if (error.response?.data) {
       // Case 1: backend sends { error: "message" }
       if (
         typeof error.response.data === "object" &&
         error.response.data.error
       ) {
         errorMessage = error.response.data.error;
       }
       // Case 2: backend sends plain string like "No student found..."
       else if (typeof error.response.data === "string") {
         errorMessage = error.response.data;
       }
     }

     toast.error(errorMessage);
     setNoGitHubUrl(true);
     setInitialLoading(false);
   }
 };




  // Initial load effect
  useEffect(() => {
    const usernameParam = searchParams.get("username");
    if (usernameParam) {
      fetchGithubProfile(usernameParam);
    } else {
      loadCurrentUserProfile();
    }
  }, [searchParams, loadCurrentUserProfile]);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center h-screen w-screen">
        <div className="w-10 h-10 border-4 border-[#5B6DF3] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 font-poppins">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <Github className="mr-2" /> GitHub Profile
        </h1>

        <SearchBar
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Enter GitHub username"
        />
      </div>

      {noGitHubUrl && !user && (
        <Alert variant="warning" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No GitHub Profile Linked</AlertTitle>
          <AlertDescription>
            You haven't linked a GitHub profile yet. Please add your GitHub URL
            in your profile settings or search for a username above.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {user && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <UserHeader user={user} />

          <Tabs defaultValue="repositories" className="p-4">
            <TabsList className="mb-4">
              <TabsTrigger value="repositories" className="flex items-center">
                <Github className="w-4 h-4 mr-2" /> Repositories
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="w-4 h-4 mr-2" /> Profile Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repositories">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : repositories.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>No repositories found</p>
                </div>
              ) : (
                <ReposList repositories={repositories} />
              )}
            </TabsContent>

            <TabsContent value="profile">
              <div className="space-y-6 p-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                  <p className="text-gray-600">
                    {user.bio || "No bio available"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      {user.location || "Not specified"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Website
                    </h3>
                    {user.blog ? (
                      <a
                        href={
                          user.blog.startsWith("http")
                            ? user.blog
                            : `https://${user.blog}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline break-all"
                      >
                        {user.blog}
                      </a>
                    ) : (
                      <p className="text-gray-600">Not specified</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Joined GitHub
                    </h3>
                    <p className="text-gray-600">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Unknown"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      {user.email || "Not public"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    GitHub Stats
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Repositories", value: user.public_repos },
                      { label: "Followers", value: user.followers },
                      { label: "Following", value: user.following },
                      { label: "Gists", value: user.public_gists || 0 },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-gray-100 p-3 rounded-lg text-center"
                      >
                        <div className="text-xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
