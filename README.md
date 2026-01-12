# OpenSource Showcase

A modern, scalable monorepo npm package for showcasing open-source contributions. Choose from ready-to-use React components or leverage Node.js utilities for custom implementations.

## 🎯 Overview

OpenSource Showcase helps developers and organizations display their open-source contributions in a beautiful, professional manner. Perfect for portfolios, team websites, and contribution tracking.

## ✨ Features

- 🚀 **Fetch GitHub Data** - Retrieve user profiles, repositories, and contribution history
- 📊 **Display Statistics** - Show contribution counts and repository metrics
- ⚛️ **React Components** - Drop-in components for any React project
- 🔧 **Node.js Utilities** - Powerful core library for custom implementations
- 🎨 **Theming** - Built-in light/dark themes with custom styling
- 📱 **Responsive Design** - Mobile-friendly layouts
- ⚡ **TypeScript** - Full type support out of the box
- 🔐 **GitHub API** - Supports authentication tokens for higher rate limits

## 📦 Packages

### `@opensource-showcase/core`

Node.js/TypeScript utilities for fetching and processing GitHub contribution data.

**API:**
- `getGitHubUser(username, token?)` - Fetch user profile information
- `getUserRepositories(username, token?)` - Get list of repositories
- `getUserContributions(username, token?)` - Fetch contribution history
- `getContributionSummary(username, token?)` - Get complete profile summary

**Example:**
```typescript
import { getContributionSummary } from '@opensource-showcase/core';

const summary = await getContributionSummary('username', 'github-token');
console.log(summary.user.name);        // User's name
console.log(summary.repositories);     // List of repos
console.log(summary.totalContributions); // Total contribution count
```

### `@opensource-showcase/react`

React component library for displaying GitHub contributions.

**Components:**
- `<ContributionShowcase />` - Complete contribution display
- `<UserProfile />` - User profile card
- `<Stats />` - Contribution statistics
- `<RepositoriesList />` - Repository grid

**Props:**
```typescript
interface ContributionShowcaseProps {
  username: string;        // GitHub username
  githubToken?: string;    // Personal access token (optional)
  theme?: 'light' | 'dark'; // Theme preference (default: 'light')
}
```

**Example:**
```tsx
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';

function App() {
  return (
    <ContributionShowcase 
      username="torvalds" 
      githubToken={process.env.GITHUB_TOKEN}
      theme="dark"
    />
  );
}

export default App;
```

## 🚀 Quick Start

### Installation

```bash
npm install @opensource-showcase/react @opensource-showcase/core
```

Or use individual packages:

```bash
npm install @opensource-showcase/react  # React components only
npm install @opensource-showcase/core   # Core utilities only
```

### Basic Usage (React)

```tsx
import React from 'react';
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';

export default function Portfolio() {
  return (
    <div>
      <h1>My Open Source Contributions</h1>
      <ContributionShowcase username="your-github-username" />
    </div>
  );
}
```

### Basic Usage (Node.js)

```javascript
import { getGitHubUser, getUserRepositories } from '@opensource-showcase/core';

async function main() {
  const user = await getGitHubUser('your-github-username');
  const repos = await getUserRepositories('your-github-username');
  
  console.log(`${user.name} has ${repos.length} public repositories`);
}

main();
```

## 🔐 Authentication

GitHub API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

### Create a Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `public_repo` scope
4. Copy the token

### Use the Token

```typescript
// React
<ContributionShowcase 
  username="username"
  githubToken="ghp_xxxxxxxxxxxx"
/>

// Node.js
const summary = await getContributionSummary('username', 'ghp_xxxxxxxxxxxx');
```

## 📋 Development

### Setup

```bash
git clone <repo-url>
cd opensource-showcase
npm install
```

### Build

```bash
npm run build
```

### Watch Mode (Development)

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Test

```bash
npm run test
```

## 📁 Project Structure

```
opensource-showcase/
├── packages/
│   ├── core/                    # Node.js core library
│   │   ├── src/
│   │   │   └── index.ts        # Main API exports
│   │   ├── dist/               # Compiled output
│   │   └── package.json
│   │
│   └── react/                   # React components
│       ├── src/
│       │   ├── index.tsx        # React components
│       │   └── styles.css       # Component styles
│       ├── dist/                # Compiled output
│       └── package.json
│
├── examples/                     # Example implementations
├── README.md
└── package.json
```

## 🎨 Styling

The React component comes with built-in CSS, but you can customize it:

```tsx
import { ContributionShowcase } from '@opensource-showcase/react';
import '@opensource-showcase/react/src/styles.css';
import './custom-styles.css'; // Override styles here

// Your CSS
.showcase-container {
  max-width: 100%;
  padding: 4rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 API Reference

### Core Package (`@opensource-showcase/core`)

#### `getGitHubUser(username, token?)`

Fetch GitHub user profile information.

**Parameters:**
- `username` (string) - GitHub username
- `token?` (string) - Optional authentication token

**Returns:** `Promise<GitHubUser>`

```typescript
interface GitHubUser {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  name: string;
  bio: string;
  publicRepos: number;
  followers: number;
}
```

#### `getUserRepositories(username, token?)`

Get list of user's public repositories.

**Returns:** `Promise<Repository[]>`

```typescript
interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
}
```

#### `getContributionSummary(username, token?)`

Get complete contribution profile including user, repos, and contribution stats.

**Returns:** `Promise<ContributionSummary>`

```typescript
interface ContributionSummary {
  user: GitHubUser;
  totalContributions: number;
  repositories: Repository[];
  contributions: Contribution[];
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### "GitHub user not found"
- Ensure the username is correct
- Check GitHub API status at https://www.githubstatus.com

### Rate limit exceeded
- Use a GitHub Personal Access Token for higher limits
- Implement caching in your application

### Component not rendering
- Ensure CSS is imported
- Check that username prop is provided
- Open browser console for error messages

## 📚 Resources

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🙏 Acknowledgments

Built with ❤️ by the open-source community.

---

**Questions?** Open an issue or reach out on GitHub!
