import { getContributionSummary } from '@openpr/core';
import '../packages/react/src/styles.css';

let currentUsername = 'sreeharsha1902';
let currentToken = '';

async function loadUserData(username: string, token: string) {
  const container = document.getElementById('contributions');
  if (!container) {
    console.error('Contributions container not found');
    return;
  }

  container.innerHTML = '<div class="showcase-loading">Loading contributions...</div>';

  try {
    console.log(`[CONPR] Fetching data for user: ${username}`);
    const data = await getContributionSummary(username, token || undefined);
    console.log('[CONPR] Successfully fetched data:', data);

    const colors: { [key: string]: string } = { open: '#238636', closed: '#da3633', merged: '#8957e5' };

    container.innerHTML = `
      <div class="showcase-container theme-light">
        <!-- User Profile -->
        <div class="user-profile">
          <img src="${data.user.avatarUrl}" alt="${data.user.login}" class="user-avatar" />
          <div class="user-info">
            <h1>${data.user.name}</h1>
            <p class="user-login">@${data.user.login}</p>
            ${data.user.bio ? `<p class="user-bio">${data.user.bio}</p>` : ''}
            <div class="user-stats">
              <span>${data.user.publicRepos} Public Repos</span>
              <span>${data.user.followers} Followers</span>
            </div>
            <a href="${data.user.profileUrl}" target="_blank" rel="noopener noreferrer" class="profile-link">View on GitHub</a>
          </div>
        </div>

        <!-- Stats -->
        <div class="contribution-stats">
          <h2>Contributions</h2>
          <div class="stats-cards">
            <div class="stat-card">
              <p class="stat-value">${data.totalContributions}</p>
              <p class="stat-label">Total Contributions</p>
            </div>
            <div class="stat-card">
              <p class="stat-value">${data.pullRequests.length}</p>
              <p class="stat-label">Pull Requests</p>
            </div>
          </div>
        </div>

        <!-- Pull Requests -->
        <div class="pull-requests">
          <h2>Recent Pull Requests</h2>
          <div class="pr-list">
            ${data.pullRequests.slice(0, 10).map((pr: any) => `
              <a href="${pr.url}" target="_blank" rel="noopener noreferrer" class="pr-card">
                <div class="pr-header">
                  <h3>${pr.title}</h3>
                  <span class="pr-state" style="background-color: ${colors[pr.state] || '#666'}">${pr.state}</span>
                </div>
                <p class="pr-meta">${pr.repository.owner}/${pr.repository.name} #${pr.number}</p>
                <p class="pr-date">${new Date(pr.createdAt).toLocaleDateString()}</p>
              </a>
            `).join('')}
          </div>
        </div>

        <!-- Repositories -->
        <div class="repositories">
          <h2>Top Repositories</h2>
          <div class="repositories-grid">
            ${data.repositories.slice(0, 12).map((repo: any) => `
              <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-card">
                <h3>${repo.name}</h3>
                <p class="repo-description">${repo.description || 'No description'}</p>
                <div class="repo-meta">
                  <span class="repo-language">${repo.language}</span>
                  <span class="repo-stats">⭐ ${repo.stars} | 🍴 ${repo.forks}</span>
                </div>
                ${repo.topics && repo.topics.length > 0 ? `
                  <div class="repo-topics">
                    ${repo.topics.slice(0, 3).map((topic: string) => `<span class="topic-badge">${topic}</span>`).join('')}
                  </div>
                ` : ''}
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    console.log('[CONPR] DOM updated successfully');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch data';
    console.error('[CONPR] Error:', error);
    container.innerHTML = `<div class="showcase-error">Error: ${message}</div>`;
  }
}

// Initialize
function init() {
  console.log('[CONPR] Initializing...');
  const searchForm = document.getElementById('search-form') as HTMLFormElement;
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const tokenInput = document.getElementById('token') as HTMLInputElement;

  console.log('[CONPR] Form elements:', { searchForm, usernameInput, tokenInput });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (usernameInput.value.trim()) {
        currentUsername = usernameInput.value.trim();
        currentToken = tokenInput.value;
        console.log('[CONPR] Loading user:', currentUsername);
        loadUserData(currentUsername, currentToken);
      }
    });
  }

  // Load initial user
  console.log('[CONPR] Loading initial user:', currentUsername);
  loadUserData(currentUsername, currentToken);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

