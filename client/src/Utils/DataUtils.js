export const calculateLanguagePercentages = (languages) => {
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    
    return Object.entries(languages).map(([name, bytes]) => {
      return {
        name,
        percentage: Math.round((bytes / total) * 100),
        bytes,
        color: getLanguageColor(name)
      };
    }).sort((a, b) => b.bytes - a.bytes);
  };
  
  export const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  export const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      'C#': '#178600',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#F05138',
      Kotlin: '#A97BFF',
      Dart: '#00B4AB',
      CSS: '#563d7c',
      HTML: '#e34c26',
      Shell: '#89e051',
      Vue: '#41b883',
      React: '#61dafb',
    };
  
    return colors[language] || '#6e7681';
  };
  
  export const processCommitActivity = (commitActivity) => {
    if (!Array.isArray(commitActivity) || commitActivity.length === 0) {
      return [];
    }
    
    try {
      return commitActivity
        .slice(-12)
        .map(week => {
          const date = new Date(week.week * 1000);
          return {
            week: `${date.getMonth() + 1}/${date.getDate()}`,
            commits: week.total
          };
        });
    } catch (error) {
      console.error("Error processing commit activity:", error);
      return [];
    }
  };
  
  export const getTotalCommits = (contributors) => {
    return contributors.reduce((total, contributor) => total + contributor.contributions, 0);
  };
  
  export const groupCommitsByDay = (commits) => {
    const grouped = {};
    
    commits.forEach(({ date, count }) => {
      const day = new Date(date).toLocaleDateString();
      grouped[day] = (grouped[day] || 0) + count;
    });
    
    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  };
  
  export const parseDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };