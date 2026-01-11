import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function AppContent() {
  const [count, setCount] = useState(0);
  const { isDark, theme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDark ? 'bg-pattern-dark' : 'bg-pattern-light'
    }`}>
      {/* Header with theme toggle */}
      <header className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold text-theme-primary">
          Theme Demo App
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-theme-secondary">
            Current theme: <span className="font-medium capitalize">{theme}</span>
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 pb-12">
        {/* Logo section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-8 mb-6">
            <a href="https:vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https:react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1 className="text-4xl font-bold text-theme-primary mb-2">
            Vite + React
          </h1>
          <p className="text-theme-secondary">
            Now with beautiful light and dark mode support!
          </p>
        </div>

        {/* Interactive demo cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Counter card */}
          <div className="theme-card p-6">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">
              Interactive Counter
            </h3>
            <div className="text-center">
              <button 
                onClick={() => setCount((count) => count + 1)}
                className="btn-theme-primary px-6 py-3 rounded-lg font-medium mb-4"
              >
                Count is {count}
              </button>
              <p className="text-theme-secondary text-sm">
                Click the button to increment the counter
              </p>
            </div>
          </div>

          {/* Theme info card */}
          <div className="theme-card p-6">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">
              Theme Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-theme-secondary">Current Mode:</span>
                <span className="font-medium text-theme-primary capitalize">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-secondary">Auto-saves:</span>
                <span className="font-medium text-success">✓ Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-secondary">System Sync:</span>
                <span className="font-medium text-success">✓ Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature showcase */}
        <div className="theme-card p-8 text-center">
          <h3 className="text-2xl font-bold text-theme-primary mb-4">
            Theme Features
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-base-200 rounded-lg">
              <div className="text-2xl mb-2">🌙</div>
              <div className="font-medium text-theme-primary">Dark Mode</div>
              <div className="text-xs text-theme-muted">Easy on the eyes</div>
            </div>
            <div className="p-4 bg-base-200 rounded-lg">
              <div className="text-2xl mb-2">☀️</div>
              <div className="font-medium text-theme-primary">Light Mode</div>
              <div className="text-xs text-theme-muted">Bright and clear</div>
            </div>
            <div className="p-4 bg-base-200 rounded-lg">
              <div className="text-2xl mb-2">💾</div>
              <div className="font-medium text-theme-primary">Auto Save</div>
              <div className="text-xs text-theme-muted">Remembers choice</div>
            </div>
            <div className="p-4 bg-base-200 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium text-theme-primary">Smooth Transitions</div>
              <div className="text-xs text-theme-muted">Animated changes</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-theme-primary px-4 py-2 rounded-lg text-sm">
              Primary Button
            </button>
            <button className="btn-theme-secondary px-4 py-2 rounded-lg text-sm">
              Secondary Button
            </button>
            <button className="shared-style text-sm">
              Shared Style Button
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-theme-secondary mb-2">
            Edit <code className="bg-base-200 px-2 py-1 rounded text-sm">src/App.jsx</code> and save to test HMR
          </p>
          <p className="text-theme-muted text-sm">
            Toggle between light and dark modes using the switch in the header
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;