export const GitHubRepository = {
    id: 0,
    name: '',
    full_name: '',
    owner: {
      login: '',
      avatar_url: '',
      html_url: ''
    },
    html_url: '',
    description: '',
    fork: false,
    created_at: '',
    updated_at: '',
    pushed_at: '',
    homepage: '',
    stargazers_count: 0,
    watchers_count: 0,
    language: '',
    forks_count: 0,
    open_issues_count: 0,
    license: null,
    topics: [],
    default_branch: '',
    visibility: '',
    subscribers_count: 0,
    archived: false
  };
  
  export const GitHubUser = {
    login: '',
    id: 0,
    avatar_url: '',
    html_url: '',
    name: null,
    company: null,
    blog: '',
    location: null,
    email: null,
    bio: null,
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: ''
  };
  
  export const GitHubContributor = {
    login: '',
    id: 0,
    avatar_url: '',
    html_url: '',
    contributions: 0,
    type: ''
  };
  
  export const GitHubLanguage = {};
  
  export const GitHubCommit = {
    sha: '',
    commit: {
      author: {
        name: '',
        email: '',
        date: ''
      },
      message: ''
    },
    author: {
      login: '',
      avatar_url: ''
    },
    html_url: ''
  };
  
  export const WeeklyCommit = {
    days: [],
    total: 0,
    week: 0
  };
  
  export const GitHubCommitActivity = {
    all: [],
    owner: [],
    total: 0,
    week: 0
  };
  
  export const GitHubIssue = {
    id: 0,
    number: 0,
    title: '',
    state: '',
    html_url: '',
    created_at: '',
    user: {
      login: '',
      avatar_url: ''
    },
    labels: []
  };
  
  export const GitHubPullRequest = {
    id: 0,
    number: 0,
    title: '',
    state: '',
    html_url: '',
    created_at: '',
    user: {
      login: '',
      avatar_url: ''
    }
  };
  
  export const RepositoryData = {
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
  };