const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Access Vite env variable

// Base configuration for all fetch requests
const getFetchOptions = () => ({
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }), // Add token if available
  },
});

// Helper function to handle fetch requests with improved error handling
const fetchFromGitHub = async (endpoint, errorMessage) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, getFetchOptions());
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${errorMessage}: ${response.status} ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`GitHub API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// Extract repository info from URL or string
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
    if (parts.length >= 2) {
      return {
        owner: parts[parts.length - 2],
        repo: parts[parts.length - 1],
      };
    }
    return null;
  }
};

// Fetch user profile
export const fetchUserProfile = async (username) => {
  if (!username || username.trim() === "") {
    throw new Error("Username cannot be empty");
  }
  return fetchFromGitHub(`/users/${username}`, "Failed to fetch user profile");
};

// Fetch user repositories
export const fetchUserRepositories = async (username) => {
  if (!username || username.trim() === "") {
    throw new Error("Username cannot be empty");
  }
  return fetchFromGitHub(`/users/${username}/repos?per_page=100&sort=updated`, "Failed to fetch user repositories");
};

// Fetch repository details
export const fetchRepository = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}`, "Failed to fetch repository");
};

// Fetch contributors
export const fetchContributors = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/contributors?per_page=100`, "Failed to fetch contributors");
};

// Fetch repository languages
export const fetchLanguages = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/languages`, "Failed to fetch languages");
};

// Fetch commits
export const fetchCommits = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/commits?per_page=100`, "Failed to fetch commits");
};

// Fetch commit activity
export const fetchCommitActivity = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/stats/commit_activity`, "Failed to fetch commit activity");
};

// Fetch weekly commits
export const fetchWeeklyCommits = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/stats/participation`, "Failed to fetch weekly commits");
};

// Fetch issues
export const fetchIssues = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/issues?state=all&per_page=100`, "Failed to fetch issues");
};

// Fetch pull requests
export const fetchPullRequests = async (owner, repo) => {
  if (!owner || !repo || owner.trim() === "" || repo.trim() === "") {
    throw new Error("Owner and repo name cannot be empty");
  }
  return fetchFromGitHub(`/repos/${owner}/${repo}/pulls?state=all&per_page=100`, "Failed to fetch pull requests");
};