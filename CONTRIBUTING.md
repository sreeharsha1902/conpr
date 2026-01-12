# Contributing to OpenSource Showcase

Thank you for your interest in contributing! We welcome all contributions, whether they're bug reports, feature requests, documentation improvements, or code contributions.

## 🚀 Getting Started

1. **Fork the repository** - Click the fork button to create your own copy
2. **Clone your fork** - `git clone https://github.com/YOUR_USERNAME/opensource-showcase.git`
3. **Create a branch** - `git checkout -b feature/your-feature-name`
4. **Install dependencies** - `npm install`

## 📋 Development Workflow

### Building the Project

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Watch mode (for development)
npm run dev
```

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## 📝 Making Changes

### Core Package (`packages/core`)
- Update `packages/core/src/index.ts` for new utilities
- Add TypeScript types
- Update tests in `__tests__` directory
- Update documentation in `packages/core/README.md`

### React Package (`packages/react`)
- Update `packages/react/src/index.tsx` for new components
- Update styles in `packages/react/src/styles.css`
- Maintain component PropTypes
- Update examples in `/examples`

### Package.json Changes
- If adding dependencies, run `npm install` from the package directory
- Update version number using semantic versioning

## 🧪 Testing

Before submitting a PR:

```bash
# Run all tests
npm run test

# Run linter
npm run lint

# Build both packages
npm run build
```

## 📤 Submitting a Pull Request

1. **Push your branch** - `git push origin feature/your-feature-name`
2. **Open a PR** - Click "Compare & pull request"
3. **Fill the template** - Provide:
   - Clear description of changes
   - Link any related issues
   - Mention if it's a breaking change
4. **Request review** - Tag relevant maintainers

### PR Guidelines

- Write clear commit messages
- One feature per PR
- Keep PRs focused and manageable
- Update documentation if needed
- Add tests for new features
- Ensure CI passes

## 🐛 Reporting Issues

### Bug Reports

Include:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, npm version)
- Error messages or screenshots

### Feature Requests

Include:
- Clear description of the feature
- Use cases/motivation
- Potential implementation approach
- Mockups if applicable

## 📚 Documentation

- Update [README.md](README.md) for major features
- Add comments to complex code
- Update package-specific READMEs
- Keep examples up to date

## 🎨 Code Style

We follow:
- TypeScript strict mode
- ESLint configuration in repo
- Prettier formatting
- JSDoc comments for public APIs

Run linter:
```bash
npm run lint
```

## 💡 Ideas for Contributions

- **New Features**
  - Additional GitHub data sources
  - New React components
  - Caching mechanisms
  - GraphQL API support

- **Improvements**
  - Performance optimizations
  - Error handling
  - Type safety
  - Tests coverage

- **Documentation**
  - API docs
  - Tutorial guides
  - Video walkthrough
  - Use case examples

- **Examples**
  - Next.js integration
  - Vue.js components
  - CLI tool
  - Static site generator

## ❓ Questions?

- Open a discussion on GitHub
- Create an issue tagged `question`
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ✨ Contributors

We acknowledge all contributions! Contributors will be listed in our README and changelog.

---

Thank you for helping make OpenSource Showcase better! 🙌
