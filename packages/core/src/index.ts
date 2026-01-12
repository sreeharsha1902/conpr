import axios from 'axios';

export interface GitHubUser {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
}

export interface PullRequest {
  id: number;
  title: string;
  number: number;
  url: string;
  state: 'open' | 'closed' | 'merged';
  createdAt: string;
  mergedAt?: string;
  repository: {
    name: string;
    owner: string;
  };
  additions: number;
  deletions: number;
}

export interface Contribution {
  date: string;
  count: number;
  repository?: Repository;
}

export interface ContributionSummary {
  user: GitHubUser;
  totalContributions: number;
  repositories: Repository[];
  pullRequests: PullRequest[];
  contributions: Contribution[];
}

const GITHUB_API_URL = 'https://api.github.com';

/**
 * Get authorization header for GitHub API requests
 */
function getAuthHeaders(token?: string) {
  return token
    ? { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
    : { Accept: 'application/vnd.github+json' };
}

/**
 * Fetch GitHub user data
 */
export async function getGitHubUser(username: string, token?: string): Promise<GitHubUser> {
  const headers = getAuthHeaders(token);
  
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, { headers });
    const data = response.data;
    
    return {
      login: data.login,
      avatarUrl: data.avatar_url,
      profileUrl: data.html_url,
      name: data.name || data.login,
      bio: data.bio || '',
      publicRepos: data.public_repos,
      followers: data.followers,
    };
  } catch (error) {
    throw new Error(`Failed to fetch GitHub user: ${username}`);
  }
}

/**
 * Fetch user's repositories
 */
export async function getUserRepositories(username: string, token?: string): Promise<Repository[]> {
  const headers = getAuthHeaders(token);
  
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/users/${username}/repos?sort=stars&per_page=100`,
      { headers }
    );
    
    return response.data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
    }));
  } catch (error) {
    throw new Error(`Failed to fetch repositories for user: ${username}`);
  }
}

/**
 * Fetch user's pull requests
 */
export async function getUserPullRequests(
  username: string,
  token?: string
): Promise<PullRequest[]> {
  const headers = getAuthHeaders(token);
  
  try {
    // Fetch merged pull requests
    const response = await axios.get(
      `${GITHUB_API_URL}/search/issues?q=type:pr+author:${username}&per_page=100&sort=updated`,
      { headers }
    );
    
    return response.data.items.map((pr: any) => ({
      id: pr.id,
      title: pr.title,
      number: pr.number,
      url: pr.html_url,
      state: pr.state === 'closed' && pr.pull_request?.merged_at ? 'merged' : pr.state,
      createdAt: pr.created_at,
      mergedAt: pr.pull_request?.merged_at,
      repository: {
        name: pr.repository_url.split('/').pop(),
        owner: pr.repository_url.split('/')[4],
      },
      additions: 0,
      deletions: 0,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch pull requests for user: ${username}`);
  }
}

/**
 * Fetch user contributions for a specific date range
 */
export async function getUserContributions(
  username: string,
  token?: string
): Promise<Contribution[]> {
  const headers = token ? { Authorization: `token ${token}` } : {};
  
  try {
    // This would typically require scraping or using GraphQL
    // For now, we'll return an empty array as placeholder
    const response = await axios.get(
      `${GITHUB_API_URL}/users/${username}/events/public?per_page=100`,
      { headers }
    );
    
    const contributions: { [key: string]: number } = {};
    
    response.data.forEach((event: any) => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      contributions[date] = (contributions[date] || 0) + 1;
    });
    
    return Object.entries(contributions).map(([date, count]) => ({
      date,
      count,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch contributions for user: ${username}`);
  }
}

/**
 * Get complete contribution summary for a user
 */
export async function getContributionSummary(
  username: string,
  token?: string
): Promise<ContributionSummary> {
  const [user, repositories, pullRequests, contributions] = await Promise.all([
    getGitHubUser(username, token),
    getUserRepositories(username, token),
    getUserPullRequests(username, token),
    getUserContributions(username, token),
  ]);
  
  return {
    user,
    totalContributions: contributions.reduce((sum, c) => sum + c.count, 0),
    repositories,
    pullRequests,
    contributions,
  };
}

export default {
  getGitHubUser,
  getUserRepositories,
  getUserPullRequests,
  getUserContributions,
  getContributionSummary,
};
