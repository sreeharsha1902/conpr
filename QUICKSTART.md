# Quick Start Guide

## Installation

### For React Projects
```bash
npm install @opensource-showcase/react @opensource-showcase/core
```

### For Node.js Projects
```bash
npm install @opensource-showcase/core
```

## Getting Your GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "opensource-showcase"
4. Select scope: `public_repo`
5. Copy the token and keep it safe

## Usage Examples

### React Component

```tsx
import React from 'react';
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';

export default function PortfolioPage() {
  return (
    <div>
      <h1>My Open Source Contributions</h1>
      <ContributionShowcase 
        username="your-github-username"
        githubToken={process.env.REACT_APP_GITHUB_TOKEN}
        theme="dark"
      />
    </div>
  );
}
```

### Node.js / CLI Usage

```typescript
import { getContributionSummary } from '@opensource-showcase/core';

async function displayContributions(username: string, token: string) {
  try {
    const summary = await getContributionSummary(username, token);
    
    console.log(`\n${summary.user.name}`);
    console.log(`@${summary.user.login}`);
    console.log(`\nTotal Contributions: ${summary.totalContributions}`);
    console.log(`Pull Requests: ${summary.pullRequests.length}`);
    console.log(`Repositories: ${summary.repositories.length}`);
    
    console.log('\nTop Repositories:');
    summary.repositories.slice(0, 5).forEach(repo => {
      console.log(`  - ${repo.name} (⭐ ${repo.stars})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

displayContributions('torvalds', 'your-token');
```

## API Reference

### Core Package (`@opensource-showcase/core`)

#### `getGitHubUser(username: string, token?: string): Promise<GitHubUser>`
Fetch GitHub user profile information.

```typescript
const user = await getGitHubUser('octocat', 'token');
// { login: 'octocat', name: 'The Octocat', ... }
```

#### `getUserRepositories(username: string, token?: string): Promise<Repository[]>`
Get all public repositories for a user, sorted by stars.

```typescript
const repos = await getUserRepositories('octocat', 'token');
// [{ name: 'Hello-World', stars: 42, ... }, ...]
```

#### `getUserPullRequests(username: string, token?: string): Promise<PullRequest[]>`
Get recent pull requests authored by the user.

```typescript
const prs = await getUserPullRequests('octocat', 'token');
// [{ title: 'Fix bug', state: 'merged', ... }, ...]
```

#### `getContributionSummary(username: string, token?: string): Promise<ContributionSummary>`
Get complete profile summary including user, repositories, PRs, and contribution data.

```typescript
const summary = await getContributionSummary('octocat', 'token');
// { user, repositories, pullRequests, contributions, ... }
```

### React Package (`@opensource-showcase/react`)

#### `<ContributionShowcase />`
Main component that displays everything.

**Props:**
- `username: string` - GitHub username
- `githubToken?: string` - Personal access token (optional)
- `theme?: 'light' | 'dark'` - Theme preference

```tsx
<ContributionShowcase 
  username="octocat"
  githubToken="ghp_xxx"
  theme="light"
/>
```

## Environment Variables

### React (with .env.local)
```
REACT_APP_GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

Then use in component:
```tsx
<ContributionShowcase 
  username="octocat"
  githubToken={process.env.REACT_APP_GITHUB_TOKEN}
/>
```

### Node.js (with .env)
```
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

Then use in code:
```typescript
const token = process.env.GITHUB_TOKEN;
const summary = await getContributionSummary('octocat', token);
```

## Common Issues

### "Rate limit exceeded"
You're making too many requests without a token. Add a GitHub token to increase the limit from 60 to 5,000 requests per hour.

### "User not found"
Make sure the username is correct and spelled properly (case-sensitive).

### No pull requests showing
The user might not have any public pull requests, or they were made on private repositories.

## Customization

### Custom Styling

The React component uses CSS custom properties that you can override:

```css
:root {
  --color-primary: #0969da;
  --color-text-primary: #24292f;
  --color-bg: #ffffff;
  --border-radius: 6px;
}

.showcase-container.theme-dark {
  --color-text-primary: #e6edf3;
  --color-bg: #0d1117;
}
```

## Support & Issues

For bugs, feature requests, or questions:
1. Check existing issues on GitHub
2. Create a new issue with details about your use case
3. Include your Node.js/npm version in the issue

### 1. Import the component and styles

```tsx
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';
```

### 2. Add to your component

```tsx
export default function Portfolio() {
  return (
    <ContributionShowcase username="torvalds" />
  );
}
```

### 3. Done! 🎉

The component will automatically fetch and display the user's contributions.

## Node.js Utility - 3 Simple Steps

### 1. Import the function

```javascript
import { getContributionSummary } from '@opensource-showcase/core';
```

### 2. Call the function

```javascript
const summary = await getContributionSummary('torvalds');
```

### 3. Use the data

```javascript
console.log(summary.user.name);        // "Linus Torvalds"
console.log(summary.repositories);     // Array of repos
console.log(summary.totalContributions); // Total count
```

## Using a GitHub Token (Optional but Recommended)

For higher API rate limits, get a token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `public_repo` scope
4. Copy and use the token

### React

```tsx
<ContributionShowcase 
  username="torvalds"
  githubToken="ghp_xxxxxxxxxxxx"
/>
```

### Node.js

```javascript
const summary = await getContributionSummary(
  'torvalds',
  'ghp_xxxxxxxxxxxx'
);
```

## Customize Theme

```tsx
<ContributionShowcase 
  username="torvalds"
  theme="dark"  // 'light' or 'dark'
/>
```

## Full Example - React App

```tsx
import React, { useState } from 'react';
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';

function App() {
  const [username, setUsername] = useState('torvalds');

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="GitHub username"
      />
      <ContributionShowcase username={username} />
    </div>
  );
}

export default App;
```

## Full Example - Node.js Script

```javascript
import { getContributionSummary } from '@opensource-showcase/core';

async function main() {
  try {
    const username = 'torvalds';
    const summary = await getContributionSummary(username);

    console.log(`📊 ${summary.user.name}`);
    console.log(`🔗 ${summary.user.profileUrl}`);
    console.log(`⭐ ${summary.repositories.length} public repos`);
    console.log(`💪 ${summary.totalContributions} contributions`);

    console.log('\nTop 5 Repos:');
    summary.repositories.slice(0, 5).forEach(repo => {
      console.log(`  - ${repo.name} (⭐ ${repo.stars})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

## Common Issues

**Q: "GitHub user not found"**
- Check the username is spelled correctly
- User might be private/deleted

**Q: "Rate limit exceeded"**
- Use a GitHub Personal Access Token
- Add caching to reduce API calls

**Q: Component not showing?**
- Ensure CSS is imported: `import '@opensource-showcase/react/src/styles.css'`
- Check browser console for errors
- Verify username prop is correct

## Next Steps

- Check [examples/](examples/) for more advanced usage
- Read full [README.md](README.md) for complete documentation
- Browse [API Reference](README.md#-api-reference) for all options
- See [packages/react/src/styles.css](packages/react/src/styles.css) for styling customization

## Need Help?

- 📖 Read the [full documentation](README.md)
- 🐛 Open an [issue on GitHub](https://github.com/sreeharsha/opensource-showcase/issues)
- 💬 Check [discussions](https://github.com/sreeharsha/opensource-showcase/discussions)

Happy coding! 🚀
