import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Import from the TypeScript source (Vite will handle compilation)
import { ContributionShowcase } from '@conpr/react';
import '@conpr/react/styles.css';

function App() {
  const [username, setUsername] = useState('sreeharsha1902');
  const [inputValue, setInputValue] = useState('sreeharsha1902');
  const [token, setToken] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f6f8fa' }}>
      <header
        style={{
          padding: '2rem',
          textAlign: 'center',
          borderBottom: '1px solid #e1e4e8',
          backgroundColor: '#ffffff',
        }}
      >
        <h1>🚀 OpenSource Showcase</h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Discover and showcase your open-source contributions
        </p>

        <form onSubmit={handleSearch} style={{ marginTop: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter GitHub username (e.g., sreeharsha1902, octocat)..."
              style={{
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                width: '300px',
                maxWidth: '100%',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginRight: '0.5rem',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#0366d6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor = '#0256c7')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.backgroundColor = '#0366d6')
              }
            >
              Search
            </button>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            <label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="GitHub Token (optional for higher rate limits)"
                style={{
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.9rem',
                  width: '300px',
                  maxWidth: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                }}
              />
            </label>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
              Get a token at{' '}
              <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                github.com/settings/tokens
              </a>
            </p>
          </div>
        </form>
      </header>

      <main style={{ padding: '2rem' }}>
        <ContributionShowcase username={username} githubToken={token || undefined} theme="light" />
      </main>

      <footer
        style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#666',
          borderTop: '1px solid #e1e4e8',
          marginTop: '2rem',
        }}
      >
        <p>
          Made with ❤️ By <a href="https://github.com/sreeharsha1902" target="_blank" rel="noopener noreferrer">sreeharsha1902</a> • Try username: <code>sreeharsha1902</code>
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
