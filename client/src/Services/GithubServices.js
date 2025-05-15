const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN; // Set this in .env

// Base configuration for all fetch requests
const getFetchOptions = () => ({
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }), // Add token if available
  },
});

// Helper function to handle fetch requests
const fetchFromGitHub = async (endpoint, errorMessage) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getFetchOptions());
    if (!response.ok) {
      // const errorText = await response.text(); // Get detailed error message
      throw new Error(
        `User not found`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`GitHub API Error (${endpoint}):`, error.message);
    throw error;
  }
};

export const extractRepoInfo = (repoUrl) => {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== "github.com") return null;

    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) return null;

    return {
      owner: pathParts[0],
      repo: pathParts[1],
    };
  } catch (error) {
    const parts = repoUrl.split("/").filter(Boolean);
    if (parts.length >= 2 && parts[0] !== "github.com") {
      return {
        owner: parts[0],
        repo: parts[1],
      };
    }
    return null;
  }
};

export const fetchUserProfile = (username) =>
  fetchFromGitHub(`/users/${username}`, "Failed to fetch user");

export const fetchUserRepositories = (username) =>
  fetchFromGitHub(
    `/users/${username}/repos?per_page=100&sort=updated`,
    "Failed to fetch repositories"
  );

export const fetchRepository = (owner, repo) =>
  fetchFromGitHub(`/repos/${owner}/${repo}`, "Failed to fetch repository");

export const fetchContributors = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/contributors?per_page=100`,
    "Failed to fetch contributors"
  );

export const fetchLanguages = (owner, repo) =>
  fetchFromGitHub(`/repos/${owner}/${repo}/languages`, "Failed to fetch languages");

export const fetchCommits = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/commits?per_page=100`,
    "Failed to fetch commits"
  );

export const fetchCommitActivity = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/stats/commit_activity`,
    "Failed to fetch commit activity"
  );

export const fetchWeeklyCommits = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/stats/participation`,
    "Failed to fetch weekly commits"
  );

export const fetchIssues = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    "Failed to fetch issues"
  );

export const fetchPullRequests = (owner, repo) =>
  fetchFromGitHub(
    `/repos/${owner}/${repo}/pulls?state=all&per_page=100`,
    "Failed to fetch pull requests"
  );

// Optional: Check rate limit for debugging
export const checkRateLimit = async () => {
  try {
    const data = await fetchFromGitHub("/rate_limit", "Failed to check rate limit");
    console.log("Rate Limit Info:", {
      remaining: data.rate.remaining,
      limit: data.rate.limit,
      reset: new Date(data.rate.reset * 1000).toLocaleString(),
    });
    return data;
  } catch (error) {
    console.error("Rate Limit Check Failed:", error);
    throw error;
  }
};