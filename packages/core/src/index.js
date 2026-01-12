"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubUser = getGitHubUser;
exports.getUserRepositories = getUserRepositories;
exports.getUserPullRequests = getUserPullRequests;
exports.getUserContributions = getUserContributions;
exports.getContributionSummary = getContributionSummary;
const axios_1 = __importDefault(require("axios"));
const GITHUB_API_URL = 'https://api.github.com';
/**
 * Get authorization header for GitHub API requests
 */
function getAuthHeaders(token) {
    return token
        ? { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }
        : { Accept: 'application/vnd.github+json' };
}
/**
 * Fetch GitHub user data
 */
async function getGitHubUser(username, token) {
    const headers = getAuthHeaders(token);
    try {
        const response = await axios_1.default.get(`${GITHUB_API_URL}/users/${username}`, { headers });
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
    }
    catch (error) {
        throw new Error(`Failed to fetch GitHub user: ${username}`);
    }
}
/**
 * Fetch user's repositories
 */
async function getUserRepositories(username, token) {
    const headers = getAuthHeaders(token);
    try {
        const response = await axios_1.default.get(`${GITHUB_API_URL}/users/${username}/repos?sort=stars&per_page=100`, { headers });
        return response.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || '',
            url: repo.html_url,
            language: repo.language || 'Unknown',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics || [],
        }));
    }
    catch (error) {
        throw new Error(`Failed to fetch repositories for user: ${username}`);
    }
}
/**
 * Fetch user's pull requests
 */
async function getUserPullRequests(username, token) {
    const headers = getAuthHeaders(token);
    try {
        // Fetch merged pull requests
        const response = await axios_1.default.get(`${GITHUB_API_URL}/search/issues?q=type:pr+author:${username}&per_page=100&sort=updated`, { headers });
        return response.data.map((pr) => {
            const stateMap = {
                open: 'open',
                closed: pr.pull_request?.merged_at ? 'merged' : 'closed',
                merged: 'merged',
            };
            return {
                id: pr.id,
                title: pr.title,
                number: pr.number,
                url: pr.html_url,
                state: stateMap[pr.state] || pr.state,
                createdAt: pr.created_at,
                mergedAt: pr.pull_request?.merged_at,
                repository: {
                    name: pr.repository_url.split('/').pop(),
                    owner: pr.repository_url.split('/')[4],
                },
                additions: 0,
                deletions: 0,
            };
        });
    }
    catch (error) {
        throw new Error(`Failed to fetch pull requests for user: ${username}`);
    }
}
/**
 * Fetch user contributions for a specific date range
 */
async function getUserContributions(username, token) {
    const headers = token ? { Authorization: `token ${token}` } : {};
    try {
        // This would typically require scraping or using GraphQL
        // For now, we'll return an empty array as placeholder
        const response = await axios_1.default.get(`${GITHUB_API_URL}/users/${username}/events/public?per_page=100`, { headers });
        const contributions = {};
        response.data.forEach((event) => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            contributions[date] = (contributions[date] || 0) + 1;
        });
        return Object.entries(contributions).map(([date, count]) => ({
            date,
            count,
        }));
    }
    catch (error) {
        throw new Error(`Failed to fetch contributions for user: ${username}`);
    }
}
/**
 * Get complete contribution summary for a user
 */
async function getContributionSummary(username, token) {
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
exports.default = {
    getGitHubUser,
    getUserRepositories,
    getUserPullRequests,
    getUserContributions,
    getContributionSummary,
};
//# sourceMappingURL=index.js.map