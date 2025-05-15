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
    if (url.hostname !== 'github.com') return null;
    
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return null;
    
    return {
      owner: pathParts[0],
      repo: pathParts[1]
    };
  } catch (error) {
    const parts = repoUrl.split('/').filter(Boolean);
    if (parts.length === 2) {
      return {
        owner: parts[0],
        repo: parts[1]
      };
    }
    return null;
  }
};

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchUserRepositories = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchRepository = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchContributors = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchLanguages = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`);
  if (!response.ok) {
    throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchCommits = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/commits?per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchCommitActivity = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`);
  if (!response.ok) {
    throw new Error(`Failed to fetch commit activity: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchWeeklyCommits = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/stats/participation`);
  if (!response.ok) {
    throw new Error(`Failed to fetch weekly commits: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchIssues = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/issues?state=all&per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

export const fetchPullRequests = async (owner, repo) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/pulls?state=all&per_page=100`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pull requests: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};