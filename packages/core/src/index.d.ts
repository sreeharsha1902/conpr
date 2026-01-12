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
/**
 * Fetch GitHub user data
 */
export declare function getGitHubUser(username: string, token?: string): Promise<GitHubUser>;
/**
 * Fetch user's repositories
 */
export declare function getUserRepositories(username: string, token?: string): Promise<Repository[]>;
/**
 * Fetch user's pull requests
 */
export declare function getUserPullRequests(username: string, token?: string): Promise<PullRequest[]>;
/**
 * Fetch user contributions for a specific date range
 */
export declare function getUserContributions(username: string, token?: string): Promise<Contribution[]>;
/**
 * Get complete contribution summary for a user
 */
export declare function getContributionSummary(username: string, token?: string): Promise<ContributionSummary>;
declare const _default: {
    getGitHubUser: typeof getGitHubUser;
    getUserRepositories: typeof getUserRepositories;
    getUserPullRequests: typeof getUserPullRequests;
    getUserContributions: typeof getUserContributions;
    getContributionSummary: typeof getContributionSummary;
};
export default _default;
//# sourceMappingURL=index.d.ts.map