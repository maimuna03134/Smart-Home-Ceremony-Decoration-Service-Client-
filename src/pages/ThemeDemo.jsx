import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import ThemeToggleAdvanced from '../components/ThemeToggleAdvanced';
import MyContainer from '../components/container/MyContainer';

const ThemeDemo = () => {
  const { theme, isDark, isLight } = useTheme();
  const [count, setCount] = useState(0);

  return (
    <div className={`min-h-screen py-8 transition-all duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <MyContainer>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🎨 Theme System Demo
          </h1>
          <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
            Experience our beautiful light and dark mode implementation with smooth transitions, 
            persistent preferences, and comprehensive component support.
          </p>
        </div>

        {/* Theme Controls */}
        <div className="theme-card p-8 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-6">Theme Controls</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Toggle Variants */}
            <div className="space-y-4">
              <h3 className="font-medium text-base-content">Toggle Switch</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">Small</span>
                  <ThemeToggleAdvanced size="sm" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">Medium</span>
                  <ThemeToggleAdvanced size="md" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content/70">Large</span>
                  <ThemeToggleAdvanced size="lg" />
                </div>
              </div>
            </div>

            {/* Button Variant */}
            <div className="space-y-4">
              <h3 className="font-medium text-base-content">Button Style</h3>
              <div className="space-y-3">
                <ThemeToggleAdvanced variant="button" />
                <ThemeToggleAdvanced variant="button" showLabel={true} />
              </div>
            </div>

            {/* Dropdown Variant */}
            <div className="space-y-4">
              <h3 className="font-medium text-base-content">Dropdown Style</h3>
              <ThemeToggleAdvanced variant="dropdown" />
            </div>
          </div>
        </div>

        {/* Current Theme Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Current Theme</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Mode:</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  isDark 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-warning/20 text-warning'
                }`}>
                  {isDark ? '🌙 Dark' : '☀️ Light'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Auto-save:</span>
                <span className="text-success font-medium">✓ Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/70">System sync:</span>
                <span className="text-success font-medium">✓ Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/70">Transitions:</span>
                <span className="text-success font-medium">✓ Smooth</span>
              </div>
            </div>
          </div>

          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Interactive Demo</h3>
            <div className="text-center space-y-4">
              <button 
                onClick={() => setCount(count + 1)}
                className="btn-theme-primary px-6 py-3 rounded-lg font-medium"
              >
                Click Count: {count}
              </button>
              <p className="text-base-content/70 text-sm">
                This counter demonstrates theme-aware interactive elements
              </p>
            </div>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="space-y-8">
          {/* Buttons */}
          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Button Variants</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-theme-primary px-4 py-2 rounded-lg">Primary</button>
              <button className="btn-theme-secondary px-4 py-2 rounded-lg">Secondary</button>
              <button className="shared-style">Shared Style</button>
              <button className="bg-success text-white px-4 py-2 rounded-lg hover:bg-success/90 transition-colors">
                Success
              </button>
              <button className="bg-warning text-white px-4 py-2 rounded-lg hover:bg-warning/90 transition-colors">
                Warning
              </button>
              <button className="bg-error text-white px-4 py-2 rounded-lg hover:bg-error/90 transition-colors">
                Error
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="theme-card p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-base-content mb-2">Design System</h4>
              <p className="text-base-content/70 text-sm">
                Consistent theming across all components with DaisyUI integration.
              </p>
            </div>

            <div className="theme-card p-6">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-base-content mb-2">Performance</h4>
              <p className="text-base-content/70 text-sm">
                Optimized transitions and efficient theme switching with minimal re-renders.
              </p>
            </div>

            <div className="theme-card p-6">
              <div className="w-12 h-12 bg-info/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-base-content mb-2">Customizable</h4>
              <p className="text-base-content/70 text-sm">
                Easy to extend with custom themes and color schemes.
              </p>
            </div>
          </div>

          {/* Text Variants */}
          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Typography</h3>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-base-content">Heading 1 - Primary Text</h1>
              <h2 className="text-2xl font-semibold text-base-content">Heading 2 - Primary Text</h2>
              <p className="text-base-content">Regular paragraph text with base content color.</p>
              <p className="text-base-content/70">Secondary text with 70% opacity for less emphasis.</p>
              <p className="text-base-content/50">Muted text with 50% opacity for subtle information.</p>
              <code className="bg-base-200 px-2 py-1 rounded text-sm text-base-content">
                Code snippet with theme-aware background
              </code>
            </div>
          </div>

          {/* Color Palette */}
          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Primary</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Secondary</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Accent</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neutral rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Neutral</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-base-100 border border-base-300 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Base 100</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-base-200 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Base 200</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-base-300 rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Base 300</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-info rounded-lg mx-auto mb-2"></div>
                <span className="text-sm text-base-content/70">Info</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="theme-card p-6">
            <h3 className="text-xl font-semibold text-base-content mb-4">Theme Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Automatic system preference detection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Persistent theme storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Smooth CSS transitions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Multiple toggle variants</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">DaisyUI integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Tailwind CSS compatibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Background patterns</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-success">✓</span>
                  <span className="text-base-content">Accessible color contrasts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default ThemeDemo;