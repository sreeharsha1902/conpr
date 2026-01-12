import React, { useEffect, useState } from 'react';
import {
  getContributionSummary,
  ContributionSummary,
  GitHubUser,
  Repository,
  PullRequest,
} from '@opensource-showcase/core';

interface ContributionShowcaseProps {
  username: string;
  githubToken?: string;
  theme?: 'light' | 'dark';
}

export const ContributionShowcase: React.FC<ContributionShowcaseProps> = ({
  username,
  githubToken,
  theme = 'light',
}) => {
  const [summary, setSummary] = useState<ContributionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for user: ${username}`);
        const data = await getContributionSummary(username, githubToken);
        console.log('Successfully fetched data:', data);
        setSummary(data);
        setError(null);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch data';
        console.error('Error fetching contributions:', err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, githubToken]);

  if (loading) {
    return <div className="showcase-loading">Loading contributions...</div>;
  }

  if (error) {
    return <div className="showcase-error">Error: {error}</div>;
  }

  if (!summary) {
    return <div className="showcase-empty">No data available</div>;
  }

  return (
    <div className={`showcase-container theme-${theme}`}>
      <UserProfile user={summary.user} />
      <Stats totalContributions={summary.totalContributions} prCount={summary.pullRequests.length} />
      <PullRequestsList pullRequests={summary.pullRequests} />
      <RepositoriesList repositories={summary.repositories} />
    </div>
  );
};

interface UserProfileProps {
  user: GitHubUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.avatarUrl} alt={user.login} className="user-avatar" />
      <div className="user-info">
        <h1>{user.name}</h1>
        <p className="user-login">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span>{user.publicRepos} Public Repos</span>
          <span>{user.followers} Followers</span>
        </div>
        <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

interface StatsProps {
  totalContributions: number;
  prCount: number;
}

const Stats: React.FC<StatsProps> = ({ totalContributions, prCount }) => {
  return (
    <div className="contribution-stats">
      <h2>Contributions</h2>
      <div className="stats-cards">
        <div className="stat-card">
          <p className="stat-value">{totalContributions}</p>
          <p className="stat-label">Total Contributions</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{prCount}</p>
          <p className="stat-label">Pull Requests</p>
        </div>
      </div>
    </div>
  );
};

interface RepositoriesListProps {
  repositories: Repository[];
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({ repositories }) => {
  return (
    <div className="repositories">
      <h2>Top Repositories</h2>
      <div className="repositories-grid">
        {repositories.slice(0, 12).map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>
    </div>
  );
};

interface PullRequestsListProps {
  pullRequests: PullRequest[];
}

const PullRequestsList: React.FC<PullRequestsListProps> = ({ pullRequests }) => {
  return (
    <div className="pull-requests">
      <h2>Recent Pull Requests</h2>
      <div className="pr-list">
        {pullRequests.slice(0, 10).map((pr) => (
          <PullRequestCard key={pr.id} pullRequest={pr} />
        ))}
      </div>
    </div>
  );
};

interface PullRequestCardProps {
  pullRequest: PullRequest;
}

const PullRequestCard: React.FC<PullRequestCardProps> = ({ pullRequest }) => {
  const stateColor = {
    open: '#238636',
    closed: '#da3633',
    merged: '#8957e5',
  };

  return (
    <a href={pullRequest.url} target="_blank" rel="noopener noreferrer" className="pr-card">
      <div className="pr-header">
        <h3>{pullRequest.title}</h3>
        <span
          className="pr-state"
          style={{ backgroundColor: stateColor[pullRequest.state as keyof typeof stateColor] }}
        >
          {pullRequest.state}
        </span>
      </div>
      <p className="pr-meta">
        {pullRequest.repository.owner}/{pullRequest.repository.name} #{pullRequest.number}
      </p>
      <p className="pr-date">
        {new Date(pullRequest.createdAt).toLocaleDateString()}
      </p>
    </a>
  );
};

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <a href={repository.url} target="_blank" rel="noopener noreferrer" className="repo-card">
      <h3>{repository.name}</h3>
      <p className="repo-description">{repository.description}</p>
      <div className="repo-meta">
        <span className="repo-language">{repository.language}</span>
        <span className="repo-stats">
          ⭐ {repository.stars} | 🍴 {repository.forks}
        </span>
      </div>
      {repository.topics.length > 0 && (
        <div className="repo-topics">
          {repository.topics.slice(0, 3).map((topic: string) => (
            <span key={topic} className="topic-badge">
              {topic}
            </span>
          ))}
        </div>
      )}
    </a>
  );
};

export default ContributionShowcase;
